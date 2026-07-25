import "server-only";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { retention, dailyLogs } from "./schema";
import { todayHaiti, daysBetween } from "./dates";

export interface Retention {
  days: number; // day count, today included (start day = day 1)
  startDate: string;
}

/** Current retention run. Uses the stored start date the user controls. */
export async function getRetention(userId: string): Promise<Retention> {
  const rows = await db
    .select()
    .from(retention)
    .where(eq(retention.userId, userId))
    .limit(1);
  const today = todayHaiti();
  let start = rows[0]?.startDate ?? null;
  if (!start) {
    const logs = await db
      .select({ date: dailyLogs.date })
      .from(dailyLogs)
      .where(eq(dailyLogs.userId, userId));
    start = logs.length ? logs.map((l) => l.date).sort()[0] : today;
  }
  const diff = daysBetween(start, today); // today - start
  return { days: diff < 0 ? 0 : diff + 1, startDate: start };
}

/** "J'ai chuté" — restart the counter at today (day 1). */
export async function resetRetention(userId: string): Promise<void> {
  const today = todayHaiti();
  await db
    .insert(retention)
    .values({ userId, startDate: today })
    .onConflictDoUpdate({
      target: retention.userId,
      set: { startDate: today, updatedAt: new Date() },
    });
}

/** Set an explicit start date (e.g. "j'ai commencé hier"). */
export async function setRetentionStart(
  userId: string,
  date: string,
): Promise<void> {
  await db
    .insert(retention)
    .values({ userId, startDate: date })
    .onConflictDoUpdate({
      target: retention.userId,
      set: { startDate: date, updatedAt: new Date() },
    });
}
