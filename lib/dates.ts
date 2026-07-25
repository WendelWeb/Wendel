/**
 * Single source of truth for "what day is it" in FORGED.
 * Everything is pinned to Haiti time (America/Port-au-Prince) so the day never
 * rolls over at the wrong local moment, regardless of where the server (Vercel,
 * UTC) or the device sits. Never call `new Date()` for "today" outside this file.
 */

const TZ = "America/Port-au-Prince";

/** Returns the current Haiti-local calendar date as "YYYY-MM-DD". */
export function todayHaiti(now: Date = new Date()): string {
  // en-CA formats as YYYY-MM-DD.
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Adds `days` (can be negative) to a "YYYY-MM-DD" string, returns "YYYY-MM-DD". */
export function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  // Use UTC math on a date-only value so no timezone shifts the calendar day.
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

/** The calendar day before `dateStr`. */
export function yesterday(dateStr: string): string {
  return addDays(dateStr, -1);
}

/** Whole calendar days from `a` to `b` (b - a). Negative if b is before a. */
export function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round(
    (Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86400000,
  );
}

/** Yesterday relative to Haiti "today". */
export function yesterdayHaiti(now: Date = new Date()): string {
  return yesterday(todayHaiti(now));
}

/**
 * A list of the last `n` calendar dates ending at (and including) `endDate`,
 * oldest first. e.g. lastNDates("2026-07-05", 7) -> ["2026-06-29", ... "2026-07-05"].
 */
export function lastNDates(endDate: string, n: number): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    out.push(addDays(endDate, -i));
  }
  return out;
}

/** Day of week for a YYYY-MM-DD string: 0=Sunday … 6=Saturday. */
export function weekday(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** Current Haiti-local day of week (0=Sunday … 6=Saturday). */
export function weekdayHaiti(now: Date = new Date()): number {
  return weekday(todayHaiti(now));
}

/** Short human label for a date, e.g. "5 juil." (French, Haiti-relevant). */
export function formatShort(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    day: "numeric",
    month: "short",
  }).format(dt);
}

/** Longer label, e.g. "dimanche 5 juillet". */
export function formatLong(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "UTC",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(dt);
}
