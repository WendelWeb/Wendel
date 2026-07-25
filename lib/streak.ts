import { addDays, yesterday } from "./dates";

export interface DayStatus {
  date: string; // YYYY-MM-DD
  passed: boolean; // score >= PASS_THRESHOLD
}

export interface StreakSummary {
  currentStreak: number;
  longestStreak: number;
  lastLoggedDate: string | null;
  totalDaysLogged: number;
}

/**
 * Longest run of consecutive calendar days that all passed, over all history.
 */
function longestRun(passedDatesAsc: string[]): number {
  if (passedDatesAsc.length === 0) return 0;
  let longest = 1;
  let run = 1;
  for (let i = 1; i < passedDatesAsc.length; i++) {
    if (passedDatesAsc[i] === addDays(passedDatesAsc[i - 1], 1)) {
      run++;
    } else {
      run = 1;
    }
    if (run > longest) longest = run;
  }
  return longest;
}

/**
 * The live current streak: consecutive passed days ending at `today` (if today
 * passed) or at `yesterday` (if today hasn't passed yet but yesterday did — the
 * streak stays alive through the day). If the most recent pass is older than
 * yesterday, the streak is broken (0). A missed/failed day breaks the chain.
 */
function currentRun(passedSet: Set<string>, today: string): number {
  let anchor: string | null = null;
  if (passedSet.has(today)) anchor = today;
  else if (passedSet.has(yesterday(today))) anchor = yesterday(today);
  if (anchor === null) return 0;

  let count = 0;
  let cursor: string = anchor;
  while (passedSet.has(cursor)) {
    count++;
    cursor = yesterday(cursor);
  }
  return count;
}

/**
 * Pure streak computation from full day history. Order-independent input.
 * `today` is the Haiti-local current date.
 */
export function computeStreak(
  history: DayStatus[],
  today: string,
): { currentStreak: number; longestStreak: number } {
  const passedDatesAsc = history
    .filter((d) => d.passed)
    .map((d) => d.date)
    .sort();
  const passedSet = new Set(passedDatesAsc);

  return {
    currentStreak: currentRun(passedSet, today),
    longestStreak: longestRun(passedDatesAsc),
  };
}

/**
 * Full summary written to the streaks table, given all logged days and today.
 * `prevLongest` is passed so a stored record can never regress if history is
 * ever trimmed.
 */
export function summarizeStreak(
  history: DayStatus[],
  today: string,
  prevLongest = 0,
): StreakSummary {
  const { currentStreak, longestStreak } = computeStreak(history, today);
  const dates = history.map((d) => d.date).sort();
  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, prevLongest),
    lastLoggedDate: dates.length ? dates[dates.length - 1] : null,
    totalDaysLogged: history.length,
  };
}
