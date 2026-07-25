export interface AbsoluteRule {
  id: string;
  label: string;
}

/**
 * The non-negotiable rules. Checkable each day — checking one means
 * "Je confirme avoir respecté cette règle aujourd'hui." They count toward
 * the daily score, and several belong to the daily NOYAU (see lib/core.ts).
 */
export const ABSOLUTE_RULES: AbsoluteRule[] = [
  { id: "rule_retention", label: "Rétention tenue — 0 masturbation / 0 éjaculation" },
  { id: "rule_porn", label: "0 porn — toute la journée" },
  { id: "rule_tiktok", label: "0 TikTok / réseaux sociaux (scroll)" },
  { id: "rule_sugar", label: "0 sucre / gazeux / jus en bouteille" },
  { id: "rule_music", label: "0 musique (maison + gym)" },
  { id: "rule_youtube", label: "0 YouTube surf (upload uniquement)" },
  { id: "rule_cheat", label: "0 cheat programme (gym, nutrition, horaires)" },
  { id: "rule_apps", label: "0 installation d'app interdite (X, TikTok, porn)" },
  { id: "rule_pretexte", label: "0 prétexte / exception / négociation" },
  {
    id: "rule_daydream",
    label: "Daydream détecté = STOPP + affirmation immédiate",
  },
];

export const RULE_IDS: string[] = ABSOLUTE_RULES.map((r) => r.id);

export const RULES_COUNT = RULE_IDS.length;
