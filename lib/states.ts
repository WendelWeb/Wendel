import { CHAPTER_TITLES } from "./vaisseau-meta";

export interface StateEntry {
  id: string;
  label: string; // what he's feeling / tempted by
  chapter: number; // the chapter that kills it
}

/**
 * "Quand je pense à…" → the chapter to open right now. Curated from Le Vaisseau
 * so that a temptation or a low state gets answered in seconds.
 */
export const STATES: StateEntry[] = [
  { id: "paresse", label: "Je suis paresseux, pas envie", chapter: 4 },
  { id: "porn", label: "Envie de porn / de regarder", chapter: 20 },
  { id: "skip_gym", label: "Envie de sauter la muscu", chapter: 119 },
  { id: "bed", label: "Envie de dormir au lieu de m'entraîner", chapter: 121 },
  { id: "distract", label: "Envie de sortir / me distraire au lieu de bosser", chapter: 80 },
  { id: "sugar", label: "Envie de sucre / dopamine facile", chapter: 118 },
  { id: "scroll", label: "Envie de scroller (TikTok/YouTube)", chapter: 117 },
  { id: "daydream", label: "Je rumine / je pars dans ma tête", chapter: 33 },
  { id: "no_results", label: "Je vois aucun résultat", chapter: 62 },
  { id: "discouraged", label: "Je suis découragé", chapter: 129 },
  { id: "negotiate", label: "Je me cherche une excuse", chapter: 76 },
  { id: "shame", label: "J'ai honte, j'ai chuté", chapter: 21 },
];

export function stateChapterTitle(s: StateEntry): string {
  return CHAPTER_TITLES[s.chapter] ?? "";
}
