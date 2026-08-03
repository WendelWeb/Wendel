// Moteur de sélection des emails horaires. Pur et déterministe : la graine est
// (date + heure), donc chaque email de la journée est différent, et le même
// créneau ne renvoie jamais deux fois la même chose le même jour.
// Il puise dans TOUT le contenu de l'app. Client-safe.

import { OATH_STEPS, type OathStep } from "./oath";
import {
  SI_TU_CEDES,
  INTERROGATION_LINES,
  OBJECTIFS_RAPPEL,
  DECLARATIONS,
} from "./sting";
import { QUOTES, categoryMeta, type Quote } from "./quotes";
import { CHAPTER_META } from "./vaisseau-meta";
import { NOTES } from "./notes";
import { DEFAULT_VISION } from "./vision-content";
import { RETENTION_AFFIRMATIONS, PROTOCOL_PHASES, retentionPhase } from "./affirmations";
import { ALL_STOPP_PHRASES } from "./stopp";
import { STATES, stateChapterTitle } from "./states";
import { VERDICTS, ITEM_LABEL } from "./verdict";

/** Heures de réveil (Haïti) — un email par heure sur cette plage. */
export const WAKE_START = 5;
export const WAKE_END = 21;

export function isWakingHour(h: number): boolean {
  return h >= WAKE_START && h <= WAKE_END;
}

function hash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], seed: string, n = 1): T[] {
  if (arr.length === 0) return [];
  const out: T[] = [];
  const used = new Set<number>();
  for (let k = 0; out.length < Math.min(n, arr.length); k++) {
    const idx = hash(`${seed}:${k}`) % arr.length;
    if (used.has(idx)) continue;
    used.add(idx);
    out.push(arr[idx]);
  }
  return out;
}

// ——— Extraction des sources riches ———

/** Les sections de la Vision, titre + lignes. */
const VISION_SECTIONS = (() => {
  const out: { title: string; lines: string[] }[] = [];
  for (const raw of DEFAULT_VISION.split("\n")) {
    const l = raw.trim();
    if (l.startsWith("# ")) out.push({ title: l.slice(2), lines: [] });
    else if (out.length && l && !l.startsWith("## "))
      out[out.length - 1].lines.push(l.replace(/^- /, ""));
  }
  return out.filter((s) => s.lines.length > 0);
})();

/** Le POURQUOI, découpé en paragraphes déclarables. */
const POURQUOI_PARAS = (
  VISION_SECTIONS.find((s) => /pourquoi/i.test(s.title))?.lines ?? []
).filter((l) => l.length > 80);

/** Les chantiers de l'empire (tout sauf le pourquoi et l'objectif). */
const CHANTIERS = VISION_SECTIONS.filter(
  (s) => !/pourquoi|objectif/i.test(s.title),
);

/** Toutes les lignes du Carnet, à plat. */
const CARNET_LINES = NOTES.flatMap((n) =>
  n.lines
    .filter((l) => l.trim() && !l.startsWith("## "))
    .map((l) => ({ text: l.replace(/^[->] /, "").trim(), section: n.title })),
).filter((l) => l.text.length > 40);

/** Les cascades domino des verdicts — le prix d'un objectif raté. */
const DOMINOS = Object.entries(VERDICTS).map(([id, v]) => ({
  item: ITEM_LABEL[id] ?? id,
  line: v.domino[0],
  chapter: v.chapter,
}));

export interface DeepBlock {
  kind:
    | "vaisseau"
    | "pourquoi"
    | "carnet"
    | "retention"
    | "urgence"
    | "chantier"
    | "domino";
  eyebrow: string;
  title?: string;
  body: string;
  meta?: string;
  href?: string;
}

/** Le bloc profond tourne d'une heure à l'autre : il traverse toute l'app. */
function deepBlock(seed: string, hour: number, retentionDays: number): DeepBlock {
  const slot = (hour - WAKE_START + 7) % 7;

  if (slot === 0) {
    const c = pick(CHAPTER_META, `${seed}:ch`)[0];
    return {
      kind: "vaisseau",
      eyebrow: "Le Vaisseau — lis ce chapitre",
      title: `Chapitre ${c.n} — ${c.title}`,
      body: c.book,
      href: `/vaisseau/${c.n}`,
    };
  }
  if (slot === 1 && POURQUOI_PARAS.length) {
    return {
      kind: "pourquoi",
      eyebrow: "Ton POURQUOI — relis-le à voix haute",
      body: pick(POURQUOI_PARAS, `${seed}:pq`)[0],
      href: "/vision",
    };
  }
  if (slot === 2 && CARNET_LINES.length) {
    const l = pick(CARNET_LINES, `${seed}:ca`)[0];
    return {
      kind: "carnet",
      eyebrow: "Ton Carnet — ce que tu t'es écrit",
      title: l.section,
      body: l.text,
      href: "/carnet",
    };
  }
  if (slot === 3) {
    const ph = retentionPhase(retentionDays) ?? PROTOCOL_PHASES[0];
    return {
      kind: "retention",
      eyebrow: `Rétention — phase : ${ph.title}`,
      body: pick(RETENTION_AFFIRMATIONS, `${seed}:af`)[0],
      meta: ph.text,
      href: "/vaisseau",
    };
  }
  if (slot === 4) {
    const st = pick(STATES, `${seed}:st`)[0];
    return {
      kind: "urgence",
      eyebrow: "Quand tu penses à…",
      title: st.label,
      body: pick(ALL_STOPP_PHRASES, `${seed}:sp`)[0],
      meta: `Le chapitre qui tue cette tentation : ${st.chapter} — ${stateChapterTitle(st)}`,
      href: "/urgence",
    };
  }
  if (slot === 5 && CHANTIERS.length) {
    const c = pick(CHANTIERS, `${seed}:cn`)[0];
    return {
      kind: "chantier",
      eyebrow: "Un chantier de ton empire",
      title: c.title,
      body: pick(c.lines, `${seed}:cl`)[0],
      href: "/vision",
    };
  }
  const d = pick(DOMINOS, `${seed}:do`)[0];
  return {
    kind: "domino",
    eyebrow: "L'effet domino — si tu rates ça",
    title: d.item,
    body: d.line,
    meta: `Obligation : chapitre ${d.chapter}`,
    href: "/today",
  };
}

export interface HourlyPayload {
  hour: number;
  index: number;
  total: number;
  law: OathStep;
  sting: string;
  question: string;
  objectif: string;
  declaration: string;
  quotes: Quote[];
  quoteColors: string[];
  deep: DeepBlock;
}

export function hourlyPayload(
  date: string,
  hour: number,
  retentionDays = 0,
): HourlyPayload {
  const seed = `${date}:${hour}`;
  const quotes = pick(QUOTES, `${seed}:q`, 3);
  return {
    hour,
    index: Math.max(1, hour - WAKE_START + 1),
    total: WAKE_END - WAKE_START + 1,
    law: OATH_STEPS[(hour - WAKE_START + OATH_STEPS.length) % OATH_STEPS.length],
    sting: pick(SI_TU_CEDES, `${seed}:s`)[0],
    question: pick(INTERROGATION_LINES, `${seed}:i`)[0],
    objectif: pick(OBJECTIFS_RAPPEL, `${seed}:o`)[0],
    declaration: pick(DECLARATIONS, `${seed}:d`)[0],
    quotes,
    quoteColors: quotes.map((q) => categoryMeta(q.c).color),
    deep: deepBlock(seed, hour, retentionDays),
  };
}

export function hourlySubject(
  hour: number,
  daysToJan: number,
  retentionDays: number,
  coreDone: number,
  coreTotal: number,
): string {
  const h = `${String(hour).padStart(2, "0")}h`;
  if (hour === WAKE_START)
    return `${h} · Debout. J−${daysToJan} · rétention jour ${retentionDays}`;
  if (hour === WAKE_END)
    return `${h} · Dernière heure — noyau ${coreDone}/${coreTotal}`;
  return `${h} · Noyau ${coreDone}/${coreTotal} · J−${daysToJan} — lis à voix haute`;
}
