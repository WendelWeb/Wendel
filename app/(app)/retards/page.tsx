import { requireUserId } from "@/lib/auth";
import { getOrCreateTodayLog, getStreak } from "@/lib/daily";
import { getRetention } from "@/lib/retention";
import { getProgram } from "@/lib/programs";
import { isRestDay } from "@/lib/program";
import { coreStatus } from "@/lib/core";
import { todayHaiti, daysBetween, weekdayHaiti } from "@/lib/dates";
import DelayedView from "@/components/DelayedView";

export const dynamic = "force-dynamic";

export default async function RetardsPage() {
  const userId = await requireUserId();
  const [log, streak, ret, program] = await Promise.all([
    getOrCreateTodayLog(userId),
    getStreak(userId),
    getRetention(userId),
    getProgram(userId),
  ]);

  const core = coreStatus(
    log.completedItems,
    isRestDay(program, weekdayHaiti()),
  );

  return (
    <DelayedView
      daysToJan={daysBetween(todayHaiti(), "2027-01-01")}
      etat={{
        retentionDays: ret.days,
        coreDone: core.done,
        coreTotal: core.total,
        daysToJan: daysBetween(todayHaiti(), "2027-01-01"),
        streak: streak.currentStreak ?? 0,
      }}
    />
  );
}
