import { requireUserId } from "@/lib/auth";
import { exigerDebloqueOuPC } from "@/lib/verrou";
import { getOrCreateTodayLog, getStreak } from "@/lib/daily";
import { getProgram } from "@/lib/programs";
import { getPlan } from "@/lib/plans";
import { isRestDay, gymSessionLabel } from "@/lib/program";
import { todayHaiti, daysBetween, weekdayHaiti } from "@/lib/dates";
import TodayView from "@/components/TodayView";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const userId = await requireUserId();
  await exigerDebloqueOuPC(userId);
  const [log, streak, program, plan] = await Promise.all([
    getOrCreateTodayLog(userId),
    getStreak(userId),
    getProgram(userId),
    getPlan(userId),
  ]);

  const wd = weekdayHaiti();
  const rest = isRestDay(program, wd);

  return (
    <TodayView
      initialCompleted={log.completedItems ?? {}}
      initialFailed={log.failedItems ?? {}}
      initialStopps={log.daydreamStopps ?? 0}
      streak={streak.currentStreak ?? 0}
      readChapters={log.readChapters ?? {}}
      lectureRead={log.lectureRead ?? {}}
      todayDate={todayHaiti()}
      initialValidated={log.validated ?? false}
      initialCounters={log.counters ?? {}}
      restDay={rest}
      gymLabel={gymSessionLabel(program, wd)}
      daysToJan={daysBetween(todayHaiti(), "2027-01-01")}
      plan={plan}
    />
  );
}
