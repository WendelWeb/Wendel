import { CHECKLIST_IDS, CHECKLIST_COUNT } from "./checklist";
import { RULE_IDS, RULES_COUNT } from "./rules";

export const TOTAL_ITEMS = CHECKLIST_COUNT + RULES_COUNT; // 32

/** Tri-state of a single objective for a day. */
export type ItemState = "neutral" | "done" | "failed";

/** A day "passes" (counts toward the streak) at this percentage or above. */
export const PASS_THRESHOLD = 80;

export interface ScoreResult {
  checklistCompleted: number;
  rulesCompleted: number;
  completed: number;
  total: number; // 32
  percent: number; // 0–100
}

function countTrue(
  ids: string[],
  completed: Record<string, boolean> | null | undefined,
): number {
  if (!completed) return 0;
  let n = 0;
  for (const id of ids) {
    if (completed[id] === true) n++;
  }
  return n;
}

/**
 * Computes the daily score from the flat completedItems map.
 * Only known ids count — stray keys are ignored so the denominator is always
 * trustworthy. `checklistIds` defaults to the full list, but rest days pass a
 * reduced set (no course/muscu) so the day can still reach 100%. Never trust a
 * client-supplied score; always recompute.
 */
export function computeScore(
  completedItems: Record<string, boolean> | null | undefined,
  checklistIds: string[] = CHECKLIST_IDS,
): ScoreResult {
  const checklistCompleted = countTrue(checklistIds, completedItems);
  const rulesCompleted = countTrue(RULE_IDS, completedItems);
  const completed = checklistCompleted + rulesCompleted;
  const total = checklistIds.length + RULE_IDS.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return {
    checklistCompleted,
    rulesCompleted,
    completed,
    total,
    percent,
  };
}

export function dayPassed(percent: number): boolean {
  return percent >= PASS_THRESHOLD;
}

export type ScoreColor = "red" | "orange" | "green";

/** Score band color: <60 red, 60–79 orange, >=80 green. */
export function scoreColor(percent: number): ScoreColor {
  if (percent >= 80) return "green";
  if (percent >= 60) return "orange";
  return "red";
}

/** The CSS variable holding that band color. */
export function scoreColorVar(percent: number): string {
  return `var(--${scoreColor(percent)})`;
}
