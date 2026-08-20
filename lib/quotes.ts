import w1 from "@/content/quotes/wave1.json";
import w2 from "@/content/quotes/wave2.json";
import w3 from "@/content/quotes/wave3.json";
import w4 from "@/content/quotes/wave4.json";
import w5 from "@/content/quotes/wave5.json";
import w6 from "@/content/quotes/wave6.json";
import w7 from "@/content/quotes/wave7.json";
import w8 from "@/content/quotes/wave8.json";
import w9 from "@/content/quotes/wave9.json";
import w10 from "@/content/quotes/wave10.json";
import w11 from "@/content/quotes/wave11.json";
import w12 from "@/content/quotes/wave12.json";
import w13 from "@/content/quotes/wave13.json";
import w14 from "@/content/quotes/wave14.json";
import w15 from "@/content/quotes/wave15.json";
import w16 from "@/content/quotes/wave16.json";
import w17 from "@/content/quotes/wave17.json";
import w18 from "@/content/quotes/wave18.json";
import w19 from "@/content/quotes/wave19.json";
import w20 from "@/content/quotes/wave20.json";
import w21 from "@/content/quotes/wave21.json";
import w22 from "@/content/quotes/wave22.json";
import w23 from "@/content/quotes/wave23.json";
import w24 from "@/content/quotes/wave24.json";
import w25 from "@/content/quotes/wave25.json";
import w26 from "@/content/quotes/wave26.json";
import w27 from "@/content/quotes/wave27.json";
import w28 from "@/content/quotes/wave28.json";
import w29 from "@/content/quotes/wave29.json";
import w30 from "@/content/quotes/wave30.json";
import w31 from "@/content/quotes/wave31.json";
import w32 from "@/content/quotes/wave32.json";
import w33 from "@/content/quotes/wave33.json";
import w34 from "@/content/quotes/wave34.json";
import w35 from "@/content/quotes/wave35.json";
import w36 from "@/content/quotes/wave36.json";
import w37 from "@/content/quotes/wave37.json";
import w38 from "@/content/quotes/wave38.json";
import w39 from "@/content/quotes/wave39.json";
import w40 from "@/content/quotes/wave40.json";
import w41 from "@/content/quotes/wave41.json";
import w42 from "@/content/quotes/wave42.json";
import w43 from "@/content/quotes/wave43.json";
import w44 from "@/content/quotes/wave44.json";
import w45 from "@/content/quotes/wave45.json";
import w46 from "@/content/quotes/wave46.json";
import w47 from "@/content/quotes/wave47.json";
import { SIX_MOIS } from "./six-mois";
import { PROMESSES_MORTES } from "./promesses-mortes";
import { SEPT_ANS } from "./sept-ans";
import { RETENTION_AFFIRMATIONS } from "./affirmations";

export type CategoryId =
  | "mantra"
  | "retention"
  | "reverie"
  | "presque"
  | "action"
  | "vaisseau"
  | "foi"
  | "grace"
  | "dominion"
  | "temps"
  | "ego"
  | "loi"
  | "quantum"
  | "nation"
  | "corps"
  | "liturgie"
  | "reveil"
  | "consequence"
  | "echange"
  | "pacte"
  | "cout"
  | "responsabilite"
  | "fire"
  | "hypocrisie"
  | "puissance"
  | "nietzsche"
  | "pouvoirnu"
  | "machiavel"
  | "sixmois"
  | "precedent"
  | "septans";

export interface Quote {
  t: string; // le texte de la citation
  c: CategoryId; // catégorie
  s?: string; // source (ex. "ch. 24")
}

export interface CategoryMeta {
  id: CategoryId;
  label: string;
  color: string;
}

// Ordre = ordre d'affichage des filtres. Les plus critiques d'abord.
export const CATEGORIES: CategoryMeta[] = [
  { id: "mantra", label: "Le mantra", color: "#0F172A" },
  { id: "retention", label: "Rétention", color: "#DC2626" },
  { id: "reverie", label: "Rêverie", color: "#7C3AED" },
  { id: "presque", label: "Le presque", color: "#B45309" },
  { id: "action", label: "Agir", color: "#EA580C" },
  { id: "vaisseau", label: "Le vaisseau", color: "#0F766E" },
  { id: "foi", label: "Foi & décret", color: "#1E3A5F" },
  { id: "grace", label: "Grâce", color: "#2563EB" },
  { id: "dominion", label: "Dominion", color: "#111827" },
  { id: "temps", label: "Le temps", color: "#0891B2" },
  { id: "ego", label: "L'ego", color: "#6D28D9" },
  { id: "loi", label: "La loi", color: "#4B5563" },
  { id: "quantum", label: "Les carrefours", color: "#0D9488" },
  { id: "nation", label: "La nation", color: "#15803D" },
  { id: "corps", label: "Le corps", color: "#BE123C" },
  { id: "liturgie", label: "Liturgie", color: "#334155" },
  { id: "reveil", label: "Réveil brutal", color: "#DC2626" },
  { id: "consequence", label: "Conséquences", color: "#EA580C" },
  { id: "echange", label: "L'échange", color: "#0F766E" },
  { id: "pacte", label: "Le pacte", color: "#4C1D95" },
  { id: "cout", label: "Le coût", color: "#9D174D" },
  { id: "responsabilite", label: "Aucun alibi", color: "#78350F" },
  { id: "fire", label: "Fire (EN)", color: "#C2410C" },
  { id: "hypocrisie", label: "Le test de la foi", color: "#450A0A" },
  { id: "puissance", label: "Power (EN)", color: "#1F2937" },
  { id: "pouvoirnu", label: "Le pouvoir nu", color: "#0C0A09" },
  { id: "nietzsche", label: "Nietzsche", color: "#581C87" },
  { id: "machiavel", label: "Machiavel", color: "#7F1D1D" },
  { id: "sixmois", label: "Six mois", color: "#9333EA" },
  { id: "precedent", label: "Le précédent", color: "#4C1D95" },
  { id: "septans", label: "Les sept ans", color: "#57430F" },
];

const CAT_MAP = new Map(CATEGORIES.map((c) => [c.id, c]));

export function categoryMeta(id: CategoryId): CategoryMeta {
  return CAT_MAP.get(id) ?? CATEGORIES[0];
}

// Le mantra (5 lignes, gravé à chaque coin de l'app).
const MANTRA: Quote[] = [
  {
    t: "Dieu ne t'a pas créé pour te répandre et te vider — mais pour te contenir, bâtir, et régner.",
    c: "mantra",
  },
  {
    t: "Une main qui se masturbe ne pourra pas bâtir ces choses, ni les contenir.",
    c: "mantra",
  },
  { t: "Si tu veux vraiment les bâtir, respecte ta main.", c: "mantra" },
  {
    t: "Des yeux qui regardent du porno ne verront jamais un tel accomplissement.",
    c: "mantra",
  },
  { t: "Si tu veux vraiment les voir, respecte tes yeux.", c: "mantra" },
];

// Six mois : le calcul qu'il n'avait jamais posé. Le seul angle de l'app qui
// lui dise ce qu'il ACHÈTE plutôt que ce qu'il perd.
const SIX: Quote[] = SIX_MOIS.map((t) => ({ t, c: "sixmois" as const }));

// Le précédent : janvier 2026, fixé en 2025, arrivé et reparti sans lui. Le
// seul bloc de l'app qui ne prédit rien — il relève un cas déjà clos.
const PRECED: Quote[] = PROMESSES_MORTES.map((t) => ({
  t,
  c: "precedent" as const,
}));

// Les sept ans : le sacrifice qu'il a décidé jusqu'en 2033, et son prix exact.
const SEPT: Quote[] = SEPT_ANS.map((t) => ({ t, c: "septans" as const }));

// Les affirmations de rétention existantes (page Vaisseau / Urgence).
const AFFIRMATIONS: Quote[] = RETENTION_AFFIRMATIONS.map((t) => ({
  t,
  c: "retention" as const,
}));

const WAVES = [
  w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11, w12,
  w13, w14, w15, w16, w17, w18, w19, w20,
  w21, w22, w23, w24, w25, w26, w27, w28, w29, w30, w31, w32, w33, w34, w35, w36, w37, w38, w39, w40, w41, w42,
  w43, w44, w45, w46, w47,
] as unknown as Quote[][];

// Concatène tout et dédoublonne par texte.
export const QUOTES: Quote[] = (() => {
  const all = [
    ...MANTRA,
    ...SIX,
    ...PRECED,
    ...SEPT,
    ...AFFIRMATIONS,
    ...WAVES.flat(),
  ];
  const seen = new Set<string>();
  const out: Quote[] = [];
  for (const q of all) {
    const key = q.t.trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(q);
  }
  return out;
})();

export const QUOTE_COUNT = QUOTES.length;

// Citation déterministe par jour (seed = AAAAMMJJ).
export function quoteOfDay(seed: number): Quote {
  if (QUOTES.length === 0) return { t: "", c: "mantra" };
  return QUOTES[Math.abs(seed) % QUOTES.length];
}
