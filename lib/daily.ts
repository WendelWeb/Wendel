import "server-only";
import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "./db";
import { dailyLogs, gymSessions, streaks, type DailyLog } from "./schema";
import { computeScore, dayPassed, TOTAL_ITEMS, type ItemState } from "./scoring";
import { summarizeStreak, type DayStatus } from "./streak";
import { todayHaiti, weekdayHaiti, weekday } from "./dates";
import { lectureProgress, LECTURE_ITEM_ID } from "./lecture";
import { videoTarget } from "./video-counters";
import { CHECKLIST_IDS } from "./checklist";
import { RULE_IDS } from "./rules";
import { getProgram } from "./programs";
import { getPlan } from "./plans";
import { isRestDay } from "./program";
import { orderedObjectives, planRules, planCoreStatus } from "./plan";

const ALL_ITEM_IDS = [...CHECKLIST_IDS, ...RULE_IDS];

/**
 * Les objectifs qui comptent aujourd'hui, d'après SON plan — un jour de repos
 * total retire course et muscu pour que la journée puisse encore atteindre
 * 100%. Le plan étant éditable dans les réglages, tout ce qui dépend du score
 * ou de la série doit passer par ici, jamais par la liste écrite en dur.
 */
async function activeChecklistIdsToday(userId: string): Promise<string[]> {
  const [program, plan] = await Promise.all([
    getProgram(userId),
    getPlan(userId),
  ]);
  const wd = weekdayHaiti();
  const rest = isRestDay(program, wd);
  return orderedObjectives(plan, rest, wd).map((i) => i.id);
}

/** Les règles de son plan — le second terme du dénominateur du score. */
async function ruleIdsToday(userId: string): Promise<string[]> {
  const plan = await getPlan(userId);
  return planRules(plan).map((r) => r.id);
}

/** Fetch a single day's log (or null). */
export async function getLogByDate(
  userId: string,
  date: string,
): Promise<DailyLog | null> {
  const rows = await db
    .select()
    .from(dailyLogs)
    .where(and(eq(dailyLogs.userId, userId), eq(dailyLogs.date, date)))
    .limit(1);
  return rows[0] ?? null;
}

/** Fetch today's (Haiti) log, creating an empty one if it doesn't exist yet. */
export async function getOrCreateTodayLog(userId: string): Promise<DailyLog> {
  const date = todayHaiti();
  const existing = await getLogByDate(userId, date);
  if (existing) return existing;

  const inserted = await db
    .insert(dailyLogs)
    .values({
      userId,
      date,
      completedItems: {},
      score: 0,
      totalItems: TOTAL_ITEMS,
    })
    .onConflictDoNothing()
    .returning();

  if (inserted[0]) return inserted[0];
  // Lost a race — fetch the row the other request created.
  const again = await getLogByDate(userId, date);
  if (again) return again;
  throw new Error("Failed to create daily log");
}

/** Recent logs, newest first. Used by journal + progression. */
export async function getRecentLogs(
  userId: string,
  limit: number,
): Promise<DailyLog[]> {
  return db
    .select()
    .from(dailyLogs)
    .where(eq(dailyLogs.userId, userId))
    .orderBy(desc(dailyLogs.date))
    .limit(limit);
}

/** Logs within [startDate, endDate] inclusive, oldest first. */
export async function getLogsInRange(
  userId: string,
  startDate: string,
  endDate: string,
): Promise<DailyLog[]> {
  return db
    .select()
    .from(dailyLogs)
    .where(
      and(
        eq(dailyLogs.userId, userId),
        gte(dailyLogs.date, startDate),
        lte(dailyLogs.date, endDate),
      ),
    )
    .orderBy(dailyLogs.date);
}

/**
 * All day pass/fail statuses for streak computation. A day "passes" (counts for
 * the streak) only if its NOYAU was complete — retention + the non-negotiable
 * core — not merely if it hit a % of all tasks. Rest days drop course + muscu
 * from the required core.
 */
async function getDayStatuses(userId: string): Promise<DayStatus[]> {
  const [rows, program, plan] = await Promise.all([
    db
      .select({
        date: dailyLogs.date,
        completedItems: dailyLogs.completedItems,
      })
      .from(dailyLogs)
      .where(eq(dailyLogs.userId, userId)),
    getProgram(userId),
    getPlan(userId),
  ]);
  return rows.map((r) => {
    // Le jour de la semaine du jour concerné, pas celui d'aujourd'hui : sans
    // ça, un lundi relu un dimanche exigerait la montagne rétroactivement.
    const wd = weekday(r.date);
    return {
      date: r.date,
      passed: planCoreStatus(
        plan,
        r.completedItems,
        isRestDay(program, wd),
        wd,
      ).complete,
    };
  });
}

/** Recompute the streak record from full history and persist it. */
export async function recomputeStreak(userId: string): Promise<void> {
  const history = await getDayStatuses(userId);
  const prev = await db
    .select()
    .from(streaks)
    .where(eq(streaks.userId, userId))
    .limit(1);
  const prevLongest = prev[0]?.longestStreak ?? 0;

  const summary = summarizeStreak(history, todayHaiti(), prevLongest);

  if (prev[0]) {
    await db
      .update(streaks)
      .set({
        currentStreak: summary.currentStreak,
        longestStreak: summary.longestStreak,
        lastLoggedDate: summary.lastLoggedDate,
        totalDaysLogged: summary.totalDaysLogged,
        updatedAt: new Date(),
      })
      .where(eq(streaks.userId, userId));
  } else {
    await db.insert(streaks).values({
      userId,
      currentStreak: summary.currentStreak,
      longestStreak: summary.longestStreak,
      lastLoggedDate: summary.lastLoggedDate,
      totalDaysLogged: summary.totalDaysLogged,
    });
  }
}

export interface GlobalStats {
  totalDays: number;
  avgPercent: number;
  bestPercent: number;
  daysPassed: number;
  perfectDays: number;
  totalStopps: number;
}

/** All-time aggregate analytics across every logged day. */
export async function getGlobalStats(userId: string): Promise<GlobalStats> {
  const rows = await db
    .select({
      totalDays: sql<number>`count(*)`,
      avgPercent: sql<number>`coalesce(round(avg(${dailyLogs.score})), 0)`,
      bestPercent: sql<number>`coalesce(max(${dailyLogs.score}), 0)`,
      daysPassed: sql<number>`count(*) filter (where ${dailyLogs.score} >= 80)`,
      perfectDays: sql<number>`count(*) filter (where ${dailyLogs.score} = 100)`,
      totalStopps: sql<number>`coalesce(sum(${dailyLogs.daydreamStopps}), 0)`,
    })
    .from(dailyLogs)
    .where(eq(dailyLogs.userId, userId));

  const r = rows[0];
  return {
    totalDays: Number(r?.totalDays ?? 0),
    avgPercent: Number(r?.avgPercent ?? 0),
    bestPercent: Number(r?.bestPercent ?? 0),
    daysPassed: Number(r?.daysPassed ?? 0),
    perfectDays: Number(r?.perfectDays ?? 0),
    totalStopps: Number(r?.totalStopps ?? 0),
  };
}

export async function getStreak(userId: string) {
  const rows = await db
    .select()
    .from(streaks)
    .where(eq(streaks.userId, userId))
    .limit(1);
  return (
    rows[0] ?? {
      currentStreak: 0,
      longestStreak: 0,
      lastLoggedDate: null,
      totalDaysLogged: 0,
    }
  );
}

export type { ItemState };

/**
 * Set one item's tri-state for today (neutral / done ✓ / failed ✕), recompute
 * the score, and refresh the streak. `done` and `failed` are mutually exclusive.
 * Returns the fresh score for optimistic reconciliation.
 */
export async function setItemState(
  userId: string,
  itemId: string,
  state: ItemState,
) {
  const log = await getOrCreateTodayLog(userId);
  const completed = { ...(log.completedItems ?? {}) };
  const failed = { ...(log.failedItems ?? {}) };

  delete completed[itemId];
  delete failed[itemId];
  if (state === "done") completed[itemId] = true;
  else if (state === "failed") failed[itemId] = true;

  const score = computeScore(completed, await activeChecklistIdsToday(userId), await ruleIdsToday(userId));

  await db
    .update(dailyLogs)
    .set({
      completedItems: completed,
      failedItems: failed,
      score: score.percent,
      totalItems: score.total,
      updatedAt: new Date(),
    })
    .where(eq(dailyLogs.id, log.id));

  await recomputeStreak(userId);
  return score;
}

export type ReadContext = "verdict" | "lecture";

/**
 * Mark a Vaisseau chapter read today. Two separate contexts that never mix:
 * - "verdict": obligation reading after failing a goal → readChapters.
 * - "lecture": one of the 5 daily chapters → lectureRead; when all 5 are read,
 *   the `lecture` objective auto-completes and the score/streak refresh.
 */
export async function markChapterRead(
  userId: string,
  chapterN: number,
  ctx: ReadContext,
): Promise<void> {
  const log = await getOrCreateTodayLog(userId);

  if (ctx === "verdict") {
    const read = { ...(log.readChapters ?? {}) };
    read[String(chapterN)] = true;
    await db
      .update(dailyLogs)
      .set({ readChapters: read, updatedAt: new Date() })
      .where(eq(dailyLogs.id, log.id));
    return;
  }

  // Lecture du jour.
  const lectureRead = { ...(log.lectureRead ?? {}) };
  lectureRead[String(chapterN)] = true;

  const { done } = lectureProgress(lectureRead, todayHaiti());
  const completed = { ...(log.completedItems ?? {}) };
  let score = log.score ?? 0;
  let totalItems = log.totalItems ?? TOTAL_ITEMS;
  const justCompleted = done && !completed[LECTURE_ITEM_ID];
  if (justCompleted) {
    completed[LECTURE_ITEM_ID] = true;
    const s = computeScore(completed, await activeChecklistIdsToday(userId), await ruleIdsToday(userId));
    score = s.percent;
    totalItems = s.total;
  }

  await db
    .update(dailyLogs)
    .set({
      lectureRead,
      completedItems: completed,
      score,
      totalItems,
      updatedAt: new Date(),
    })
    .where(eq(dailyLogs.id, log.id));

  if (justCompleted) await recomputeStreak(userId);
}

/**
 * Close the day. If `failNeutrals`, every objective still undecided (neither
 * done nor failed) is marked as failed — undecided = not done = a failure.
 * Sets the `validated` flag and refreshes score/streak.
 */
export async function validateDay(
  userId: string,
  failNeutrals: boolean,
): Promise<void> {
  const log = await getOrCreateTodayLog(userId);
  const completed = { ...(log.completedItems ?? {}) };
  const failed = { ...(log.failedItems ?? {}) };

  const active = await activeChecklistIdsToday(userId);
  if (failNeutrals) {
    for (const id of [...active, ...RULE_IDS]) {
      if (!completed[id] && !failed[id]) failed[id] = true;
    }
  }

  const score = computeScore(completed, active, await ruleIdsToday(userId));
  await db
    .update(dailyLogs)
    .set({
      failedItems: failed,
      validated: true,
      score: score.percent,
      totalItems: score.total,
      updatedAt: new Date(),
    })
    .where(eq(dailyLogs.id, log.id));

  await recomputeStreak(userId);
}

/**
 * Set a counter objective's value for today (e.g. videos published). Clamped to
 * [0, target]. Reaching the target auto-completes the objective (and clears any
 * prior FAILED mark); dropping below un-completes it. Recomputes score + streak.
 */
export async function setCounter(
  userId: string,
  itemId: string,
  value: number,
): Promise<{ value: number; percent: number }> {
  const log = await getOrCreateTodayLog(userId);
  const target = videoTarget(itemId);
  const v = Math.max(0, Math.min(target, Math.floor(value)));

  const counters = { ...(log.counters ?? {}) };
  counters[itemId] = v;

  const completed = { ...(log.completedItems ?? {}) };
  const failed = { ...(log.failedItems ?? {}) };
  if (target > 0 && v >= target) {
    completed[itemId] = true;
    delete failed[itemId];
  } else {
    delete completed[itemId];
  }

  const score = computeScore(completed, await activeChecklistIdsToday(userId), await ruleIdsToday(userId));
  await db
    .update(dailyLogs)
    .set({
      counters,
      completedItems: completed,
      failedItems: failed,
      score: score.percent,
      totalItems: score.total,
      updatedAt: new Date(),
    })
    .where(eq(dailyLogs.id, log.id));

  await recomputeStreak(userId);
  return { value: v, percent: score.percent };
}

/** Increment the STOPP counter for today. */
export async function incrementStopp(userId: string): Promise<number> {
  const log = await getOrCreateTodayLog(userId);
  const next = (log.daydreamStopps ?? 0) + 1;
  await db
    .update(dailyLogs)
    .set({ daydreamStopps: next, updatedAt: new Date() })
    .where(eq(dailyLogs.id, log.id));
  return next;
}

/** Save/replace the journal text for a specific date (creates the row if needed). */
export async function saveJournal(
  userId: string,
  date: string,
  text: string,
): Promise<void> {
  const existing = await getLogByDate(userId, date);
  if (existing) {
    await db
      .update(dailyLogs)
      .set({ journal: text, updatedAt: new Date() })
      .where(eq(dailyLogs.id, existing.id));
    return;
  }
  await db
    .insert(dailyLogs)
    .values({
      userId,
      date,
      completedItems: {},
      score: 0,
      totalItems: TOTAL_ITEMS,
      journal: text,
    })
    .onConflictDoUpdate({
      target: [dailyLogs.userId, dailyLogs.date],
      set: { journal: text, updatedAt: new Date() },
    });
}

/** Fetch a gym session for a date (or null). */
export async function getGymSession(userId: string, date: string) {
  const rows = await db
    .select()
    .from(gymSessions)
    .where(and(eq(gymSessions.userId, userId), eq(gymSessions.date, date)))
    .limit(1);
  return rows[0] ?? null;
}

/** Upsert the day's gym session (one per day). */
export async function saveGymSession(
  userId: string,
  date: string,
  setsCompleted: Record<string, number>,
  notes: string,
): Promise<void> {
  await db
    .insert(gymSessions)
    .values({ userId, date, setsCompleted, notes })
    .onConflictDoUpdate({
      target: [gymSessions.userId, gymSessions.date],
      set: { setsCompleted, notes },
    });
}
