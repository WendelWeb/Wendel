import "server-only";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { mountain } from "./schema";
import { todayHaiti, daysBetween } from "./dates";

/** Nudge him back up the mountain once this many days have passed. */
export const MOUNTAIN_INTERVAL_DAYS = 30;

export interface MountainStatus {
  lastVisit: string | null;
  daysSince: number | null; // null = never recorded
  due: boolean;
}

export async function getMountain(userId: string): Promise<MountainStatus> {
  const rows = await db
    .select()
    .from(mountain)
    .where(eq(mountain.userId, userId))
    .limit(1);
  const last = rows[0]?.lastVisit ?? null;
  if (!last) return { lastVisit: null, daysSince: null, due: true };
  const daysSince = daysBetween(last, todayHaiti());
  return {
    lastVisit: last,
    daysSince,
    due: daysSince >= MOUNTAIN_INTERVAL_DAYS,
  };
}

/** Record an ascent (defaults to today, Haiti time). */
export async function markMountainVisit(
  userId: string,
  date: string = todayHaiti(),
): Promise<void> {
  await db
    .insert(mountain)
    .values({ userId, lastVisit: date })
    .onConflictDoUpdate({
      target: mountain.userId,
      set: { lastVisit: date, updatedAt: new Date() },
    });
}
