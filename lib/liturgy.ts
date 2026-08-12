// LA LITURGIE — le moteur des emails.
//
// Deux formats, une seule forme.
//
//   La messe (5h, 12h, 21h) — le format long, ~27 min à voix haute. Un chapitre
//   entier du Vaisseau, les répétitions à sept, les douze retards, la décision.
//
//   L'heure (6h à 20h, sauf 12h) — le format court, ~7 min. Le même squelette,
//   réduit : un paragraphe au lieu d'un chapitre, les répétitions à trois. Une
//   seule case reçoit une ration double, et c'est celle qui colle à ce qu'il
//   fait à cette heure-là. Même forme, quatorze visages.
//
// Tout est écrit pour être DIT, pas parcouru : phrases courtes, aucune liste à
// puces dans le corps, et la dernière chose que sa bouche prononce est toujours
// une déclaration au « je ».
//
// Déterministe : la graine est (date + heure). Le même créneau ne renvoie
// jamais deux fois la même chose le même jour, et la journée entière est
// reproductible — donc testable.

import "server-only";
import { getChapter } from "./vaisseau";
import { QUOTES, type Quote } from "./quotes";
import { DELAYED } from "./delayed";
import { MANTRA_LINES, MANTRA_BLOC, type MantraGroup } from "./mantra-lines";
import { BINARY_CORE, BINARY_FRAME_EN, BINARY_FRAME_FR, type BinaryQuestion } from "./binary";
import {
  OBJECTIFS_2027,
  OBJECTIFS_2033,
  DATE_JANVIER,
  DATE_TRENTE_ANS,
  daysUntil,
} from "./objectives";
import { NOTES } from "./notes";
import { DEFAULT_VISION } from "./vision-content";
import {
  DECLARATIONS,
  INTERROGATION_LINES,
  SI_TU_CEDES,
  OBJECTIFS_RAPPEL,
} from "./sting";
import { ALL_STOPP_PHRASES } from "./stopp";
import {
  MIROIR,
  MIROIR_LIGNES,
  MIROIR_THESE,
  MIROIR_SORTIE,
} from "./miroir";
import { MIROIR_RETOURNE } from "./miroir-plus";
import { MIROIR_EN, MIROIR_EN_THESE, MIROIR_EN_SORTIE } from "./miroir-en";
import { MIROIR_HT, MIROIR_HT_THESE, MIROIR_HT_SORTIE } from "./miroir-ht";
import {
  ACCOMPLISSEMENTS,
  PROMESSES,
  CORPS_RAPPEL,
  ALLIANCE_RAPPEL,
  BOUGE,
} from "./decision";
import { RETENTION_AFFIRMATIONS, retentionPhase, PROTOCOL_PHASES } from "./affirmations";

// ——————————————————————————————————————————————————————————————
// Cadran
// ——————————————————————————————————————————————————————————————

export const WAKE_START = 5;
export const WAKE_END = 21;

/** Les trois grandes messes : le matin, le milieu, le jugement. */
export const MESSE_HOURS = [5, 12, 21] as const;

export function isMesse(hour: number): boolean {
  return (MESSE_HOURS as readonly number[]).includes(hour);
}

export function isLiturgyHour(hour: number): boolean {
  return hour >= WAKE_START && hour <= WAKE_END;
}

/** Mots par minute, lecture à voix haute posée. Sert à borner chaque format. */
const MPM = 140;

// ——————————————————————————————————————————————————————————————
// Tirage déterministe
// ——————————————————————————————————————————————————————————————

function hash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** n éléments distincts, tirés de façon reproductible à partir d'une graine. */
function pick<T>(arr: readonly T[], seed: string, n = 1): T[] {
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

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

// ——————————————————————————————————————————————————————————————
// Le chapitre du jour
// ——————————————————————————————————————————————————————————————

const TOTAL_CHAPITRES = 130;

function dayNumber(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Math.floor(Date.UTC(y, m - 1, d) / 86_400_000);
}

/**
 * Les cinq chapitres du jour — sa checklist dit « 5 chapitres du Vaisseau ».
 * 130 chapitres à 5 par jour : le livre entier revient tous les 26 jours, soit
 * quatorze passages complets par an. Les trois messes en prennent un chacune ;
 * les heures piochent leurs paragraphes dans les cinq.
 */
export function chaptersOfDay(date: string): number[] {
  const start = (((dayNumber(date) * 5) % TOTAL_CHAPITRES) + TOTAL_CHAPITRES) % TOTAL_CHAPITRES;
  return [0, 1, 2, 3, 4].map((i) => ((start + i) % TOTAL_CHAPITRES) + 1);
}

/** Le chapitre que porte cette heure-ci. */
function chapterForHour(date: string, hour: number): number {
  const jour = chaptersOfDay(date);
  const rang = MESSE_HOURS.indexOf(hour as (typeof MESSE_HOURS)[number]);
  if (rang >= 0) return jour[rang];
  // Les heures tournent sur les cinq chapitres du jour.
  return jour[hash(`${date}:${hour}:ch`) % jour.length];
}

// ——————————————————————————————————————————————————————————————
// Les blocs longs : Carnet et Vision
// ——————————————————————————————————————————————————————————————

export interface Bloc {
  title: string;
  source: string;
  lines: string[];
}

/**
 * Le Carnet, découpé en blocs lisibles. Une note entière ferait dix minutes ;
 * on coupe aux sous-titres « ## », ce qui donne des morceaux qui tiennent
 * debout tout seuls et se lisent en une minute.
 */
const CARNET_BLOCS: Bloc[] = (() => {
  const out: Bloc[] = [];
  for (const note of NOTES) {
    let titre = note.title;
    let lignes: string[] = [];
    const fermer = () => {
      const utiles = lignes
        .map((l) => l.replace(/^[->] /, "").trim())
        .filter((l) => l.length > 25);
      if (utiles.length) out.push({ title: titre, source: note.title, lines: utiles });
      lignes = [];
    };
    for (const raw of note.lines) {
      const l = raw.trim();
      if (l.startsWith("## ")) {
        fermer();
        titre = l.slice(3);
      } else if (l) {
        lignes.push(l);
      }
    }
    fermer();
  }
  return out;
})();

/** La Vision, section par section. */
const VISION_BLOCS: Bloc[] = (() => {
  const out: Bloc[] = [];
  let courant: Bloc | null = null;
  for (const raw of DEFAULT_VISION.split("\n")) {
    const l = raw.trim();
    if (l.startsWith("# ")) {
      if (courant && courant.lines.length) out.push(courant);
      courant = { title: l.slice(2), source: "Ta Vision", lines: [] };
    } else if (courant && l && !l.startsWith("## ")) {
      courant.lines.push(l.replace(/^- /, "").replace(/\*\*/g, ""));
    }
  }
  if (courant && courant.lines.length) out.push(courant);
  return out;
})();

/** Les chantiers de l'empire — la Vision sans le pourquoi ni les échéances. */
const CHANTIERS = VISION_BLOCS.filter(
  (b) => !/pourquoi|objectif|défi ultime/i.test(b.title),
);

/** Le POURQUOI, en paragraphes déclarables. */
const POURQUOI = (
  VISION_BLOCS.find((b) => /pourquoi/i.test(b.title))?.lines ?? []
).filter((l) => l.length > 80);

// ——————————————————————————————————————————————————————————————
// Le modèle
// ——————————————————————————————————————————————————————————————

export type MovementKind =
  | "mantra"
  | "miroir"
  | "inspection"
  | "appel"
  | "fragment"
  | "repetition"
  | "bloc"
  | "lecture"
  | "retards"
  | "decision"
  | "declaration";

export interface Movement {
  kind: MovementKind;
  /** Le nom du mouvement, affiché en surtitre. */
  label: string;
  /** Sous-titre : nom du chapitre, de la note, de la section. */
  title?: string;
  /** D'où ça vient. */
  source?: string;
  /** La consigne de lecture, quand il y en a une. */
  note?: string;
  /** Nombre de fois que chaque ligne doit être dite. 1 = une seule fois. */
  times: number;
  items: string[];
  /** Sources des citations, alignées sur items quand elles existent. */
  attributions?: (string | undefined)[];
  href?: string;
  /** Vrai quand ce mouvement est la ration double de l'heure. */
  accent?: boolean;
  /** Le cadre du mantra — présent uniquement sur les mouvements « mantra ». */
  groups?: MantraGroup[];
  binary?: BinaryQuestion[];
  binaryFrame?: { en: string; fr: string };
}

export interface Liturgy {
  kind: "messe" | "heure";
  hour: number;
  /** Le nom de l'office : « La messe du matin », « Le creux ». */
  name: string;
  /** Ce que fait cet email, en une phrase. */
  intent: string;
  subject: string;
  movements: Movement[];
  /** Mots réellement prononcés, répétitions comprises. */
  words: number;
  /** Durée de lecture à voix haute, en minutes. */
  minutes: number;
  chapter: { n: number; title: string; book: string };
}

/** Les données vivantes du moment — elles rendent l'email irréfutable. */
export interface LiturgyContext {
  date: string;
  hour: number;
  daysToJan: number;
  daysTo30: number;
  retentionDays: number;
  streak: number;
  coreDone: number;
  coreTotal: number;
  restDay: boolean;
  gymLabel: string | null;
  /** Les objectifs du noyau encore non cochés, en clair. */
  missing: string[];
}

// ——————————————————————————————————————————————————————————————
// Les quatorze heures — chacune son métier
// ——————————————————————————————————————————————————————————————

type Accent =
  | "vision"
  | "livrable"
  | "chapitre"
  | "corps"
  | "forge"
  | "verdict"
  | "relance"
  | "reverie"
  | "retards"
  | "questions"
  | "fermeture"
  | "accomplissements"
  | "alliance"
  | "parole";

interface Role {
  name: string;
  intent: string;
  accent: Accent;
}

const ROLES: Record<number, Role> = {
  6: {
    name: "L'armement",
    intent: "Tu pars armé, pas en survie. Un chantier de ton empire avant le premier bloc.",
    accent: "vision",
  },
  7: {
    name: "Le lancement",
    intent: "Le bloc 1 commence. Une seule question : qu'est-ce qui existera à 11h30 ?",
    accent: "livrable",
  },
  8: {
    name: "Le mécanisme",
    intent: "Tu es dans le bloc, tu peux encaisser du fond. Deux paragraphes du Vaisseau.",
    accent: "chapitre",
  },
  9: {
    name: "Le vaisseau",
    intent: "Ouverture du jeûne. Le corps : 1m88, 90 kg, 10%. Et la rétention.",
    accent: "corps",
  },
  10: {
    name: "La forge",
    intent: "10h30, la séance. Ton programme exact, muscle par muscle. Zéro cheat.",
    accent: "forge",
  },
  11: {
    name: "Le premier verdict",
    intent: "Fin du bloc 1. Les chiffres, froidement. L'insulte, c'est pour 15h.",
    accent: "verdict",
  },
  13: {
    name: "La relance",
    intent: "Bloc 2, autre projet. Et le piège de l'après-midi, annoncé avant qu'il tombe.",
    accent: "relance",
  },
  14: {
    name: "La rêverie",
    intent: "L'heure où tu t'échappes. De quoi te rattraper quand tu te surprends à rêver.",
    accent: "reverie",
  },
  15: {
    name: "Le creux",
    intent: "L'heure la plus dangereuse de ta journée. Six choses que tu retardes.",
    accent: "retards",
  },
  16: {
    name: "L'interrogatoire",
    intent: "Que des questions. Tu réponds à voix haute, et tu entends ta réponse.",
    accent: "questions",
  },
  17: {
    name: "La fermeture",
    intent: "Le deuxième livrable. À 17h30 tu éteins. Dernier écran de travail.",
    accent: "fermeture",
  },
  18: {
    name: "Les accomplissements",
    intent: "Le seul email qui te donne raison. Sans ça, tu ne tiens pas un an.",
    accent: "accomplissements",
  },
  19: {
    name: "L'alliance",
    intent: "La montagne, les paroles reçues, la promesse. Aucun chiffre.",
    accent: "alliance",
  },
  20: {
    name: "La parole et la peau",
    intent: "La peau à 20h, le manifeste à 20h45. Le détail qui bâtit le visage.",
    accent: "parole",
  },
};

const MESSES: Record<number, Role> = {
  5: {
    name: "La messe du matin",
    intent: "L'ouverture. Tu n'as encore rien raté — c'est le moment de décréter.",
    accent: "vision",
  },
  12: {
    name: "La messe de midi",
    intent: "Le milieu. La moitié est jouée. On regarde, puis on relance.",
    accent: "verdict",
  },
  21: {
    name: "La messe du soir",
    intent: "Le jugement. La journée compte, ou elle ne compte pas.",
    accent: "alliance",
  },
};

// ——————————————————————————————————————————————————————————————
// Les mouvements
// ——————————————————————————————————————————————————————————————

/**
 * Le cadre — identique en tête et en bas de chaque email, comme en haut et en
 * bas de chaque page de l'app. Il n'est jamais tiré au sort : c'est ce qui ne
 * bouge pas quand tout le reste tourne.
 */
function mantra(place: "tete" | "bas"): Movement {
  return {
    kind: "mantra",
    label: place === "tete" ? "Loi du vaisseau — avant tout" : "Loi du vaisseau — pour finir",
    note:
      place === "tete"
        ? "Debout. À voix haute, avant de lire quoi que ce soit d'autre."
        : "À voix haute encore une fois. C'est ce qui referme l'office.",
    times: 1,
    items: [],
    groups: MANTRA_BLOC,
    binary: BINARY_CORE,
    binaryFrame: { en: BINARY_FRAME_EN, fr: BINARY_FRAME_FR },
  };
}

/** Les mots réellement prononcés dans le cadre — répétitions comprises. */
function mantraWords(): number {
  let total = 0;
  for (const g of MANTRA_BLOC) {
    const t = g.lines.reduce((s, l) => s + words(l), 0);
    total += g.triple ? t * 3 : t;
    total += (g.echo ?? []).reduce((s, l) => s + words(l), 0);
  }
  total += words(BINARY_FRAME_EN) + words(BINARY_FRAME_FR);
  total += BINARY_CORE.reduce((s, q) => s + words(q.en) + words(q.fr), 0);
  total += words("Il n'y a pas de troisième porte.");
  return total;
}

/**
 * L'inspection — dans les trois messes seulement.
 *
 * Ce n'est pas du ménage : garder sa chambre propre fait partie des consignes
 * reçues sur la montagne, au même titre que le Psaume 24 du soir. Un homme qui
 * ne tient pas les deux mètres carrés autour de lui ne tiendra pas un port.
 * Elle ne se répond pas en pensée : soit c'est rangé, soit il se lève.
 *
 * Trois fois par jour suffit, et c'est même mieux : posée toutes les heures,
 * elle deviendrait une formule qu'on lit sans se lever. Aux messes, elle tombe
 * aux trois moments où il n'est dans aucun bloc — donc où il peut réellement
 * se lever et ranger.
 */
function inspection(): Movement {
  return {
    kind: "inspection",
    label: "L'inspection — réponds avant de continuer",
    note: "Deux questions. Si la réponse est non, tu te lèves maintenant — pas après l'email.",
    times: 1,
    items: [
      "Est-ce que ton bureau est rangé ?",
      "Si non : range-le immédiatement. Maintenant, avant de lire une ligne de plus.",
      "Est-ce que ta chambre est propre et rangée, ton lit fait ?",
      "Si non : action immédiate. C'est une consigne de l'alliance, pas du ménage.",
      "Un homme qui ne tient pas les deux mètres carrés autour de lui ne tiendra pas un port en eau profonde.",
    ],
    href: "/today",
  };
}

/**
 * LE MIROIR — l'état réel, dans chaque office, avant tout le reste.
 *
 * Toute l'app décrit l'homme qu'il veut être. Sans ce bloc, chaque email
 * s'adressait à quelqu'un qui n'existe pas encore — et il pouvait le lire en
 * s'y reconnaissant par avance, ce qui est exactement le mécanisme qu'il
 * dénonce : rêver le résultat au lieu de le payer.
 *
 * Une messe prend un bloc entier ; une heure en prend quatre lignes tirées au
 * sort. Le tirage n'est pas de la décoration : lue à l'identique dix fois par
 * jour, même cette liste-là s'émousserait.
 */
function miroir(seed: string, messe: boolean): Movement {
  if (messe) {
    const b = pick(MIROIR, `${seed}:mir`)[0];
    return {
      kind: "miroir",
      label: "Le miroir — l'état réel",
      title: b.titre,
      note: MIROIR_THESE,
      times: 1,
      items: [...b.lignes, "", MIROIR_SORTIE],
    };
  }
  return {
    kind: "miroir",
    label: "Le miroir — l'état réel",
    note: MIROIR_THESE,
    times: 1,
    items: [...pick(MIROIR_LIGNES, `${seed}:mir`, 4), "", MIROIR_SORTIE],
  };
}

function appel(c: LiturgyContext, messe: boolean): Movement {
  const h = `${String(c.hour).padStart(2, "0")}h`;
  const lignes = [
    `Il est ${h}. Nous sommes à J−${c.daysToJan} du 1er janvier.`,
    `Le noyau est à ${c.coreDone} sur ${c.coreTotal}. Rétention : jour ${c.retentionDays}. Série en cours : ${c.streak} ${c.streak > 1 ? "jours" : "jour"}.`,
  ];
  if (messe) {
    lignes.push(
      `Il reste ${c.daysTo30} jours avant mes trente ans. Ce chiffre ne se négocie pas.`,
    );
  }
  if (c.missing.length && c.hour >= 11) {
    const restants = c.missing.slice(0, 4).join(", ");
    lignes.push(
      `Ce qui n'est pas encore fait : ${restants}${c.missing.length > 4 ? `, et ${c.missing.length - 4} autres` : ""}.`,
    );
  }
  return { kind: "appel", label: "L'appel", times: 1, items: lignes };
}

/**
 * Le chapitre entier — réservé aux trois messes.
 *
 * Aucune coupe, aucun « la suite dans l'app » : là où le chapitre est envoyé,
 * il l'est en entier. C'est le cœur des messes, et c'est ce qui manquait
 * complètement à l'ancien moteur, qui n'envoyait que le titre.
 */
function chapitre(n: number, label = "Le chapitre du jour — en entier"): Movement {
  const ch = getChapter(n);
  if (!ch) {
    return {
      kind: "fragment",
      label: "Le Vaisseau",
      times: 1,
      items: ["(chapitre introuvable)"],
    };
  }
  return {
    kind: "fragment",
    label,
    title: `Chapitre ${ch.n} — ${ch.title}`,
    source: ch.book,
    times: 1,
    items: ch.paragraphs,
  };
}

/**
 * Un passage — pour les heures, qui doivent rester courtes.
 *
 * Ce n'est pas un chapitre tronqué : c'est un passage qui tient debout tout
 * seul, choisi parmi les paragraphes assez longs pour dire quelque chose. Le
 * chapitre entier, lui, arrive aux messes.
 */
function passage(c: LiturgyContext, n: number, combien: number): Movement {
  const ch = getChapter(n);
  if (!ch) {
    return { kind: "fragment", label: "Le Vaisseau", times: 1, items: ["(chapitre introuvable)"] };
  }
  const utiles = ch.paragraphs.filter((p) => words(p) >= 25);
  const source = utiles.length ? utiles : ch.paragraphs;
  return {
    kind: "fragment",
    label: combien > 1 ? "Deux passages du Vaisseau" : "Un passage du Vaisseau",
    title: `Chapitre ${ch.n} — ${ch.title}`,
    source: ch.book,
    times: 1,
    items: pick(source, `${c.date}:${c.hour}:pass`, combien),
  };
}

function repetition(
  label: string,
  items: string[],
  times: number,
  source?: string,
  attributions?: (string | undefined)[],
): Movement {
  return {
    kind: "repetition",
    label,
    source,
    note: `Chaque ligne, ${times} fois à voix haute.`,
    times,
    items,
    attributions,
  };
}

/**
 * Un bloc entier — Carnet ou Vision. Comme le chapitre : rien n'est coupé.
 * Une section tronquée dirait « la suite ailleurs », et il n'y a plus
 * d'ailleurs : l'email est le lieu.
 */
function blocMovement(b: Bloc, label: string): Movement {
  return {
    kind: "bloc",
    label,
    title: b.title,
    source: b.source,
    times: 1,
    items: b.lines,
  };
}

/** Ce qu'il décide de faire, exactement à cette heure-là. */
function decision(c: LiturgyContext): Movement {
  const seance = c.restDay
    ? "repos total — et le repos aussi est un ordre"
    : (c.gymLabel ?? "la séance du programme");
  const parHeure: Record<number, string[]> = {
    5: [
      "Je me lève. De l'eau. Zéro téléphone.",
      "Je dis le serment à voix haute, puis le Psaume 24 trois fois, puis un chapitre.",
      "Je prépare le repas — six œufs, cent grammes de pâtes, le shaker. Je ne mange pas encore.",
      "Je fais mon lit et je range ma chambre : c'est une consigne de l'alliance, pas du ménage.",
      "À 5h30 je cours trente minutes.",
    ],
    6: [
      "Je brosse mes cheveux cinq minutes.",
      "J'ouvre mes images de goals et je les regarde en silence.",
      "À 6h50, le manifeste trois fois : anglais, français, créole.",
      "À 6h55, quinze minutes de vidéos discipline. Pas une de plus.",
    ],
    7: [
      "J'entre dans le bloc 1. Quatre heures trente.",
      "Le téléphone quitte la pièce. Pas sur la table, pas retourné : hors de la pièce.",
      "Je nomme mon livrable à voix haute, maintenant, et je ne le change plus jusqu'à 11h30.",
    ],
    8: [
      "Je reste sur la même tâche. Je ne change pas de chantier.",
      "Si mon esprit part, je reviens à la phrase que je viens de lire.",
    ],
    9: [
      "J'ouvre le jeûne. Ce que j'ai préparé, rien d'autre.",
      "Je mange en dix minutes et je retourne au bloc.",
      "Je ne touche pas mon visage.",
    ],
    10: [
      `À 10h30 je descends : ${seance}.`,
      "Zéro cheat. Chaque série complète, la dernière répétition comme la première.",
      "Ce corps, Il l'a formé de Ses mains. Je m'en occupe comme tel.",
    ],
    11: [
      "Trente minutes. Je termine le livrable du matin.",
      "Je n'ouvre aucun nouveau chantier avant midi.",
    ],
    12: [
      "Je regarde mes chiffres sans me mentir.",
      "Je nomme la première chose que je ferai à 13h, et je l'écris.",
      "Je mange, et je ne traîne pas.",
    ],
    13: [
      "J'entre dans le bloc 2. Un projet différent du matin.",
      "Quatre heures trente. Le téléphone quitte la pièce.",
      "Entre 14h et 16h je vais vouloir décrocher. Je le sais maintenant, donc ça ne me surprendra pas.",
    ],
    14: [
      "Si je viens de me surprendre à rêver : je nomme ma tâche à voix haute et je la reprends immédiatement.",
      "Je ne me lève pas. Je ne prends pas mon téléphone. Je reste.",
    ],
    15: [
      "C'est l'heure où je lâche d'habitude. Aujourd'hui je ne lâche pas.",
      "Je choisis la tâche la plus lourde qui reste et je l'attaque en premier.",
      "Deux heures trente encore. Elles décident de ma journée.",
    ],
    16: [
      "Je réponds à ces questions à voix haute, sans arrondir.",
      "Puis je retourne au bloc jusqu'à 17h30.",
    ],
    17: [
      "Je termine le livrable de l'après-midi.",
      "À 17h30 j'éteins tout. Téléphone en mode avion.",
      "C'est mon dernier écran de travail de la journée.",
    ],
    18: [
      "Je regarde ce que j'ai tenu aujourd'hui, et je le reconnais.",
      "Je ne rallume rien.",
    ],
    19: [
      "Je parle à Dieu. Pas une demande : une conversation.",
      "Je repense à la montagne, et à ce qu'Il m'a dit.",
    ],
    20: [
      "À 20h : nettoyant, acide salicylique, hydratant.",
      "À 20h45 : le manifeste trois fois, anglais, français, créole.",
    ],
    21: [
      "Affirmations du soir.",
      "Psaume 24, puis je parle à Dieu. C'est une consigne de l'alliance.",
      "Je me couche à 21h. Le téléphone reste en mode avion.",
      "Je valide ma journée dans FORGED. Honnêtement, case par case.",
    ],
  };
  return {
    kind: "decision",
    label: "Ce que je décide de faire — maintenant",
    note: "À dire au présent, comme un ordre déjà donné.",
    times: 1,
    items: parHeure[c.hour] ?? ["Je reviens à ce que j'avais décidé de faire."],
    href: "/today",
  };
}

function declaration(c: LiturgyContext, seed: string): Movement {
  return {
    kind: "declaration",
    label: "La déclaration",
    note: "La dernière chose que ta bouche prononce. Debout.",
    times: 1,
    items: pick(DECLARATIONS, `${seed}:decl`, 2),
  };
}

/** La ration double de l'heure. */
function accentMovement(a: Accent, c: LiturgyContext, seed: string): Movement | null {
  switch (a) {
    case "vision": {
      const b = pick(CHANTIERS, `${seed}:chantier`)[0];
      return b ? { ...blocMovement(b, "Un chantier de ton empire"), accent: true } : null;
    }
    case "livrable":
      return {
        kind: "bloc",
        label: "Le livrable du bloc",
        note: "Réponds à voix haute. Une seule chose, nommée.",
        times: 1,
        accent: true,
        items: [
          "Qu'est-ce qui existera à 11h30 et qui n'existe pas maintenant ?",
          "Est-ce que c'est quelque chose qu'on peut ouvrir, lire, ou utiliser ? Sinon ce n'est pas un livrable, c'est une intention.",
          "Si à 11h30 je ne peux pas le montrer, la matinée n'a pas eu lieu.",
        ],
      };
    case "chapitre":
      return null; // le fragment est déjà doublé pour cette heure
    case "corps": {
      const ph = retentionPhase(c.retentionDays) ?? PROTOCOL_PHASES[0];
      return {
        kind: "bloc",
        label: `Le vaisseau — phase : ${ph.title}`,
        source: `Jour ${c.retentionDays} de rétention`,
        times: 1,
        accent: true,
        href: "/vaisseau",
        items: [ph.text, ...pick(RETENTION_AFFIRMATIONS, `${seed}:aff`, 2), ...pick(CORPS_RAPPEL, `${seed}:corps`, 2)],
      };
    }
    case "forge":
      return {
        kind: "bloc",
        label: "La forge — 10h30",
        source: c.restDay ? "Jour de repos total" : (c.gymLabel ?? "Séance du jour"),
        times: 1,
        accent: true,
        href: "/muscu",
        items: c.restDay
          ? [
              "Aujourd'hui, repos total. Le repos n'est pas une pause : c'est la partie du programme où le muscle se construit.",
              "Un repos décidé n'est pas un repos volé. Ne le transforme pas en journée molle.",
              ...pick(CORPS_RAPPEL, `${seed}:corps`, 1),
            ]
          : [
              `Séance du jour : ${c.gymLabel ?? "selon programme"}.`,
              "Chaque série complète. La dernière répétition avec la même exigence que la première.",
              "Zéro cheat. Personne ne regarde — c'est exactement pour ça que ça compte.",
              ...pick(CORPS_RAPPEL, `${seed}:corps`, 2),
            ],
      };
    case "verdict":
      return {
        kind: "bloc",
        label: "Le verdict — sans commentaire",
        times: 1,
        accent: true,
        href: "/today",
        items: [
          `Noyau : ${c.coreDone} sur ${c.coreTotal}.`,
          c.missing.length
            ? `Manquent : ${c.missing.join(", ")}.`
            : "Rien ne manque. Tiens jusqu'au bout.",
          c.coreDone === c.coreTotal
            ? "La journée compte. Elle entre dans la série."
            : "En l'état, cette journée ne compte pas dans ta série. Rien n'est perdu tant que la journée n'est pas finie.",
        ],
      };
    case "relance":
      return {
        kind: "bloc",
        label: "La relance — et le piège annoncé",
        times: 1,
        accent: true,
        items: [
          "Projet différent de celui du matin. Ne recommence pas la même chose : c'est ainsi qu'on croit travailler sans avancer.",
          "Entre 14h et 16h, ton attention va chuter. Ce n'est pas un défaut de caractère, c'est de la physiologie.",
          "Ce qui est un défaut de caractère, c'est ce que tu en fais.",
          ...pick(BOUGE, `${seed}:bouge`, 2),
        ],
      };
    case "reverie":
      return {
        kind: "bloc",
        label: "Quand tu te surprends à rêver",
        times: 1,
        accent: true,
        href: "/urgence",
        items: [
          ...pick(ALL_STOPP_PHRASES, `${seed}:stopp`, 3),
          "Rêver de l'empire pendant que tu devrais le bâtir, c'est le voler.",
        ],
      };
    case "retards": {
      const six = pick(DELAYED, `${seed}:retard6`, 6).map((d) => d.t);
      return {
        kind: "retards",
        label: "Ce que tu retardes — à cette minute précise",
        note: "Une par une, lentement.",
        times: 1,
        accent: true,
        href: "/retards",
        items: six,
      };
    }
    case "questions":
      return {
        kind: "bloc",
        label: "L'interrogatoire",
        note: "Ce que tu fais là, maintenant — est-ce que ça reflète…",
        times: 1,
        accent: true,
        items: [...pick(INTERROGATION_LINES, `${seed}:q`, 5), "Ou tu vas passer ta vie à rêver ?"],
      };
    case "fermeture":
      return {
        kind: "bloc",
        label: "La fermeture",
        times: 1,
        accent: true,
        items: [
          "Qu'est-ce que je peux montrer de ces quatre heures trente ?",
          "Si la réponse est « j'ai travaillé », ce n'est pas une réponse.",
          "À 17h30 j'éteins. Ce qui n'est pas fait à 17h30 ne se fera pas ce soir — et ça, c'est le prix de la journée, pas une excuse pour la prolonger.",
        ],
      };
    case "accomplissements":
      return {
        kind: "bloc",
        label: "Ce que tu as tenu",
        note: "Le seul moment de la journée où on te donne raison. Lis-le sans le fuir.",
        times: 1,
        accent: true,
        items: [
          `${c.coreDone} objectifs du noyau tenus aujourd'hui. ${c.streak} ${c.streak > 1 ? "jours" : "jour"} de série.`,
          ...pick(ACCOMPLISSEMENTS, `${seed}:acc`, 3),
        ],
      };
    case "alliance":
      return {
        kind: "bloc",
        label: "L'alliance — la montagne",
        times: 1,
        accent: true,
        items: [...pick(ALLIANCE_RAPPEL, `${seed}:all`, 3), ...pick(PROMESSES, `${seed}:prom`, 2)],
      };
    case "parole":
      return {
        kind: "bloc",
        label: "La parole tenue",
        times: 1,
        accent: true,
        items: [
          "Le manifeste trois fois : anglais, français, créole. La même parole dans trois langues, c'est la même parole.",
          "La peau, la chambre, les cheveux : ce sont des détails, et c'est exactement pour ça qu'ils comptent. On triche toujours d'abord sur les détails.",
          ...pick(POURQUOI.length ? POURQUOI : DECLARATIONS, `${seed}:pq`, 1),
        ],
      };
  }
}

// ——————————————————————————————————————————————————————————————
// La construction
// ——————————————————————————————————————————————————————————————

function citationsMovement(
  label: string,
  qs: Quote[],
  times: number,
): Movement {
  return repetition(
    label,
    qs.map((q) => q.t),
    times,
    undefined,
    qs.map((q) => q.s),
  );
}

function buildHeure(c: LiturgyContext): Liturgy {
  const seed = `${c.date}:${c.hour}`;
  const role = ROLES[c.hour] ?? {
    name: "L'heure",
    intent: "Reviens à ce que tu avais décidé.",
    accent: "verdict" as Accent,
  };
  const n = chapterForHour(c.date, c.hour);
  const ch = getChapter(n);

  const mvts: Movement[] = [];
  mvts.push(mantra("tete"));
  mvts.push(appel(c, false));
  mvts.push(miroir(seed, false));
  // Les heures restent courtes : un passage, pas le chapitre. À 8h, la ration
  // double en donne deux — c'est l'heure où il est au fond de son bloc.
  mvts.push(passage(c, n, role.accent === "chapitre" ? 2 : 1));

  const acc = accentMovement(role.accent, c, seed);
  if (acc) mvts.push(acc);

  mvts.push(citationsMovement("Trois citations", pick(QUOTES, `${seed}:q3`, 3), 3));

  // À 15h les retards sont déjà la ration double : on ne les répète pas ici.
  if (role.accent !== "retards") {
    mvts.push(
      repetition(
        "Ce que tu retardes",
        pick(DELAYED, `${seed}:ret`, 2).map((d) => d.t),
        3,
        undefined,
      ),
    );
  }

  mvts.push(repetition("Tes phrases — celles de chaque page", pick(MANTRA_LINES, `${seed}:mant`, 2), 3));
  mvts.push(
    repetition(
      "Les deux échéances",
      [
        pick(OBJECTIFS_2027, `${seed}:o27`)[0],
        pick(OBJECTIFS_2033, `${seed}:o33`)[0],
      ],
      3,
    ),
  );

  // Carnet une heure, Vision l'heure d'après.
  const pair = c.hour % 2 === 0;
  const bloc = pair
    ? pick(CARNET_BLOCS, `${seed}:carnet`)[0]
    : pick(VISION_BLOCS, `${seed}:vision`)[0];
  if (bloc) {
    mvts.push(
      blocMovement(bloc, pair ? "Ton Carnet — ce que tu t'es écrit" : "Ta Vision"),
    );
  }

  mvts.push({
    kind: "lecture",
    label: "Trois de plus — une seule fois",
    note: "Du neuf, sans répétition. Pour que la liturgie ne s'endorme pas.",
    times: 1,
    items: pick(QUOTES, `${seed}:q1`, 3).map((q) => q.t),
    href: "/quotes",
  });

  mvts.push(decision(c));
  mvts.push(declaration(c, seed));
  mvts.push(mantra("bas"));

  const w = totalWords(mvts);
  return {
    kind: "heure",
    hour: c.hour,
    name: role.name,
    intent: role.intent,
    subject: subject(c, role.name, false),
    movements: mvts,
    words: w,
    minutes: Math.round((w / MPM) * 10) / 10,
    chapter: { n, title: ch?.title ?? "", book: ch?.book ?? "" },
  };
}

function buildMesse(c: LiturgyContext): Liturgy {
  const seed = `${c.date}:${c.hour}`;
  const role = MESSES[c.hour];
  const n = chapterForHour(c.date, c.hour);
  const ch = getChapter(n);

  const mvts: Movement[] = [];
  mvts.push(mantra("tete"));
  mvts.push(appel(c, true));
  mvts.push(miroir(seed, true));
  mvts.push(inspection());
  mvts.push(chapitre(n));

  mvts.push(citationsMovement("Trois citations", pick(QUOTES, `${seed}:q3`, 3), 7));
  mvts.push(
    repetition("Ce que tu retardes", pick(DELAYED, `${seed}:ret`, 3).map((d) => d.t), 7),
  );
  mvts.push(repetition("Tes phrases — celles de chaque page", pick(MANTRA_LINES, `${seed}:mant`, 3), 7));
  mvts.push(repetition("Avant le 1er janvier 2027", pick(OBJECTIFS_2027, `${seed}:o27`, 3), 7));
  mvts.push(repetition("Avant mes 30 ans — 16 mai 2033", pick(OBJECTIFS_2033, `${seed}:o33`, 3), 7));

  const carnet = pick(CARNET_BLOCS, `${seed}:carnet`)[0];
  if (carnet) mvts.push(blocMovement(carnet, "Ton Carnet — lu une fois"));

  mvts.push({
    kind: "lecture",
    label: "Sept citations — chacune trois fois",
    note: "Chaque ligne, trois fois à voix haute.",
    times: 3,
    items: pick(QUOTES, `${seed}:q7`, 7).map((q) => q.t),
    href: "/quotes",
  });

  const vision = pick(VISION_BLOCS, `${seed}:vision`)[0];
  if (vision) mvts.push(blocMovement(vision, "Ta Vision"));

  mvts.push({
    kind: "retards",
    label: "Douze choses que tu retardes",
    note: "Une par une, lentement. Ne saute pas celles qui piquent.",
    times: 1,
    items: pick(DELAYED, `${seed}:ret12`, 12).map((d) => d.t),
    href: "/retards",
  });

  const acc = accentMovement(role.accent, c, seed);
  if (acc) mvts.push(acc);

  mvts.push(decision(c));
  mvts.push(declaration(c, seed));
  mvts.push(mantra("bas"));

  const w = totalWords(mvts);
  return {
    kind: "messe",
    hour: c.hour,
    name: role.name,
    intent: role.intent,
    subject: subject(c, role.name, true),
    movements: mvts,
    words: w,
    minutes: Math.round((w / MPM) * 10) / 10,
    chapter: { n, title: ch?.title ?? "", book: ch?.book ?? "" },
  };
}

function totalWords(mvts: Movement[]): number {
  let total = 0;
  for (const m of mvts) {
    if (m.kind === "mantra") {
      total += mantraWords();
      continue;
    }
    const brut = m.items.reduce((s, i) => s + words(i), 0);
    total += brut * Math.max(1, m.times);
  }
  return total;
}

function subject(c: LiturgyContext, name: string, messe: boolean): string {
  const h = `${String(c.hour).padStart(2, "0")}h`;
  if (messe) return `${h} · ${name} — J−${c.daysToJan} · noyau ${c.coreDone}/${c.coreTotal}`;
  return `${h} · ${name} · noyau ${c.coreDone}/${c.coreTotal} — à voix haute`;
}

/**
 * L'office du miroir — le seul contenu, désormais.
 *
 * Tout ce que portaient les anciens emails (le chapitre, les répétitions, le
 * carnet, la vision, les citations) a été mis de côté à sa demande : il ne les
 * lisait pas, et c'était même une ligne de son propre constat. Reste ce qu'il a
 * écrit aujourd'hui sur lui-même, en entier — les dix-sept blocs, sans tirage
 * au sort, sans extrait.
 *
 * Le code des offices précédents n'est pas supprimé : il suffit de rappeler
 * buildMesse / buildHeure pour le retrouver intact.
 */
export type Langue = "en" | "fr" | "ht";

/** L'ordre de son manifeste quotidien : anglais, français, créole. */
export const LANGUES: Langue[] = ["en", "fr", "ht"];

const TEXTES: Record<
  Langue,
  {
    nom: string;
    blocs: typeof MIROIR;
    these: string;
    sortie: string;
    titre: string;
    intent: string;
    sujet: (h: string, d: number, f: number, t: number) => string;
    sortieLabel: string;
    sortieNote: string;
    lire: string;
  }
> = {
  en: {
    nom: "English",
    blocs: MIROIR_EN,
    these: MIROIR_EN_THESE,
    sortie: MIROIR_EN_SORTIE,
    titre: "The mirror — what I am right now",
    intent: "What you are, right now. Nothing else.",
    sujet: (h, d, f, t) => `${h} · The mirror — core ${f}/${t} · D−${d}`,
    sortieLabel: "The way out",
    sortieNote: "The only door this leaves open.",
    lire: "Read it all out loud. If people are around, step aside.",
  },
  fr: {
    nom: "Français",
    blocs: [...MIROIR, ...MIROIR_RETOURNE],
    these: MIROIR_THESE,
    sortie: MIROIR_SORTIE,
    titre: "Le miroir — ce que je suis maintenant",
    intent: "Ce que tu es, maintenant. Rien d'autre.",
    sujet: (h, d, f, t) => `${h} · Le miroir — noyau ${f}/${t} · J−${d}`,
    sortieLabel: "La sortie",
    sortieNote: "La seule porte que ce constat laisse ouverte.",
    lire: "Lis tout à voix haute. Si tu es entouré, mets-toi à part.",
  },
  ht: {
    nom: "Kreyòl",
    blocs: MIROIR_HT,
    these: MIROIR_HT_THESE,
    sortie: MIROIR_HT_SORTIE,
    titre: "Miwa a — sa mwen ye kounye a",
    intent: "Sa ou ye, kounye a. Anyen lòt.",
    sujet: (h, d, f, t) => `${h} · Miwa a — nwayo ${f}/${t} · J−${d}`,
    sortieLabel: "Pòt sòti a",
    sortieNote: "Sèl pòt konsta sa a kite louvri.",
    lire: "Li tout bagay awotvwa. Si gen moun bò kote w, met ou apa.",
  },
};

/**
 * L'office du miroir — le seul contenu, désormais, et dans les trois langues.
 *
 * Tout ce que portaient les anciens emails (le chapitre, les répétitions, le
 * carnet, la vision, les citations) a été mis de côté à sa demande : il ne les
 * lisait pas, et c'était même une ligne de son propre constat. Reste ce qu'il a
 * écrit sur lui-même, en entier — sans tirage au sort, sans extrait.
 *
 * Trois envois par créneau, dans l'ordre de son manifeste quotidien : anglais,
 * français, créole. La même chose trois fois, dans trois langues : c'est déjà
 * son rituel du matin et du soir, appliqué au constat.
 *
 * Le code des offices précédents reste intact — buildLiturgyComplete().
 */
function buildMiroirOffice(c: LiturgyContext, langue: Langue = "fr"): Liturgy {
  const messe = isMesse(c.hour);
  const role = messe ? MESSES[c.hour] : (ROLES[c.hour] ?? { name: "L'heure", intent: "", accent: "verdict" as Accent });
  const T = TEXTES[langue];
  const h = `${String(c.hour).padStart(2, "0")}h`;

  const mvts: Movement[] = [
    appel(c, messe),
    {
      kind: "miroir",
      label: T.titre,
      note: T.these,
      times: 1,
      items: [],
    },
    // Un mouvement par bloc, dans l'ordre où il les a dictés.
    ...T.blocs.map(
      (b): Movement => ({
        kind: "miroir",
        label: b.titre,
        times: 1,
        items: b.lignes,
      }),
    ),
    {
      kind: "declaration",
      label: T.sortieLabel,
      note: T.sortieNote,
      times: 1,
      items: [T.sortie],
    },
  ];

  const w = totalWords(mvts);
  return {
    kind: messe ? "messe" : "heure",
    hour: c.hour,
    name: `${role.name} · ${T.nom}`,
    intent: T.intent,
    subject: T.sujet(h, c.daysToJan, c.coreDone, c.coreTotal),
    movements: mvts,
    words: w,
    minutes: Math.round((w / MPM) * 10) / 10,
    chapter: { n: 0, title: "", book: "" },
  };
}

/** L'office de cette heure-là, dans la langue demandée. */
export function buildLiturgy(c: LiturgyContext, langue: Langue = "fr"): Liturgy {
  return buildMiroirOffice(c, langue);
}

/** Les anciens offices, gardés intacts si un jour il les redemande. */
export function buildLiturgyComplete(c: LiturgyContext): Liturgy {
  return isMesse(c.hour) ? buildMesse(c) : buildHeure(c);
}

/** Les échéances, calculées depuis la date du jour. */
export function deadlines(date: string): { toJan: number; to30: number } {
  return {
    toJan: daysUntil(date, DATE_JANVIER),
    to30: daysUntil(date, DATE_TRENTE_ANS),
  };
}

/** Exposé pour les tests et l'aperçu. */
export const LITURGY_SOURCES = {
  carnetBlocs: CARNET_BLOCS.length,
  visionBlocs: VISION_BLOCS.length,
  chantiers: CHANTIERS.length,
  pourquoi: POURQUOI.length,
  citations: QUOTES.length,
  retards: DELAYED.length,
  mantra: MANTRA_LINES.length,
  objectifs2027: OBJECTIFS_2027.length,
  objectifs2033: OBJECTIFS_2033.length,
  interrogatoire: INTERROGATION_LINES.length,
  siTuCedes: SI_TU_CEDES.length,
  objectifsRappel: OBJECTIFS_RAPPEL.length,
};
