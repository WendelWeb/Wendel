// THE NOYAU — the non-negotiable daily core. A "serious streak" day counts ONLY
// if every active core item is done. Retention broken → streak breaks, always.
// A missed secondary ritual (hair, cacao, exact minute) does NOT break it.
// Client-safe: no server-only imports.

/** Every id in the daily core, across objectives AND absolute rules. */
export const CORE_IDS: string[] = [
  // 🔴 Le vaisseau — le moteur de tout
  "rule_retention",
  "rule_porn",
  "rule_tiktok",
  "rule_apps",
  "rule_daydream",
  // 💪 Le corps
  "run", // jours d'entraînement seulement
  "gym", // jours d'entraînement seulement
  "fasting",
  "rule_sugar",
  "no_screen",
  // 🏗️ L'œuvre
  "dw1",
  // 🙏 L'esprit
  "bible",
  "bible_pm",
  "meditation",
  "meditation_pm",
  "lecture",
  "manifesto_am",
  "ps24_pm",
  // 🏔️ Consignes de l'alliance (environnement)
  "room_clean",
  // 📜 Le serment — la répétition qui ancre
  "serment",
];

const CORE_SET = new Set(CORE_IDS);

/** Core items that only apply on training days (dropped on total-rest days). */
const TRAINING_ONLY_CORE = new Set(["run", "gym"]);

export function isCore(id: string): boolean {
  return CORE_SET.has(id);
}

/** The core ids that count today (rest days drop course + muscu). */
export function activeCoreIds(rest: boolean): string[] {
  return rest ? CORE_IDS.filter((id) => !TRAINING_ONLY_CORE.has(id)) : CORE_IDS;
}

export interface CoreStatus {
  done: number;
  total: number;
  complete: boolean;
  missing: string[]; // core ids not yet done
}

/** How much of today's core is done, given the completed map + rest flag. */
export function coreStatus(
  completed: Record<string, boolean> | null | undefined,
  rest: boolean,
): CoreStatus {
  const ids = activeCoreIds(rest);
  const c = completed ?? {};
  const missing = ids.filter((id) => c[id] !== true);
  return {
    done: ids.length - missing.length,
    total: ids.length,
    complete: missing.length === 0,
    missing,
  };
}
