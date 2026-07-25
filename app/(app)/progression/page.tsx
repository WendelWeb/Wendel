import { requireUserId } from "@/lib/auth";
import { getLogsInRange, getGlobalStats, getStreak } from "@/lib/daily";
import { getProgram } from "@/lib/programs";
import { isRestDay } from "@/lib/program";
import { coreStatus } from "@/lib/core";
import { todayHaiti, addDays, lastNDates, formatShort, weekday } from "@/lib/dates";
import { computeScore } from "@/lib/scoring";
import { ITEM_LABEL } from "@/lib/verdict";
import { isCore } from "@/lib/core";
import ProgressChart, { type DayPoint } from "@/components/ProgressChart";
import GlobalStatsPanel from "@/components/GlobalStatsPanel";
import AnalyticsPanel, {
  type FailureStat,
  type WeekdayStat,
} from "@/components/AnalyticsPanel";

const DAY_SHORT = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];

export const dynamic = "force-dynamic";

export default async function ProgressionPage() {
  const userId = await requireUserId();
  const today = todayHaiti();
  const start = addDays(today, -29);

  const [logs, global, streak, program] = await Promise.all([
    getLogsInRange(userId, start, today),
    getGlobalStats(userId),
    getStreak(userId),
    getProgram(userId),
  ]);
  const byDate = new Map(logs.map((l) => [l.date, l]));

  // Core-based "serious" days in the window.
  const coreDays = logs.filter(
    (l) =>
      coreStatus(l.completedItems, isRestDay(program, weekday(l.date))).complete,
  ).length;

  // Which objectives fail most often.
  const failCounts = new Map<string, number>();
  for (const l of logs)
    for (const [id, v] of Object.entries(l.failedItems ?? {}))
      if (v) failCounts.set(id, (failCounts.get(id) ?? 0) + 1);
  const failures: FailureStat[] = [...failCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([id, count]) => ({
      label: ITEM_LABEL[id] ?? id,
      count,
      core: isCore(id),
    }));

  // Which weekday he cracks on.
  const buckets = DAY_SHORT.map(() => ({ logged: 0, coreHeld: 0, sum: 0 }));
  for (const l of logs) {
    const b = buckets[weekday(l.date)];
    b.logged++;
    b.sum += l.score ?? 0;
    if (coreStatus(l.completedItems, isRestDay(program, weekday(l.date))).complete)
      b.coreHeld++;
  }
  // Display Monday-first, Sunday last.
  const weekdays: WeekdayStat[] = [1, 2, 3, 4, 5, 6, 0].map((i) => ({
    day: DAY_SHORT[i],
    logged: buckets[i].logged,
    coreHeld: buckets[i].coreHeld,
    avgScore: buckets[i].logged
      ? Math.round(buckets[i].sum / buckets[i].logged)
      : 0,
  }));

  const days: DayPoint[] = lastNDates(today, 30).map((date) => {
    const log = byDate.get(date);
    const completed = log ? computeScore(log.completedItems).completed : 0;
    return {
      date,
      label: formatShort(date),
      percent: log?.score ?? 0,
      completed,
      hasLog: !!log,
    };
  });

  return (
    <main className="px-4 pt-6 md:mx-auto md:max-w-3xl">
      <h1 className="mb-5 text-2xl font-bold text-text-primary">Progression</h1>

      <div
        className="mb-5 flex items-center justify-between rounded-xl border p-4"
        style={{ borderColor: "var(--red)", background: "var(--red-soft)" }}
      >
        <div>
          <p className="flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-red">
            🔑 Noyau tenu
          </p>
          <p className="mt-0.5 text-[11px] text-text-secondary">
            Jours où le non-négociable était complet — le vrai chiffre du
            sérieux. Le streak est basé là-dessus.
          </p>
        </div>
        <span className="tnum font-display text-2xl font-bold text-red">
          {coreDays}
          <span className="text-sm text-text-muted"> / {logs.length} j</span>
        </span>
      </div>

      <ProgressChart days={days} />
      <GlobalStatsPanel
        stats={global}
        currentStreak={streak.currentStreak ?? 0}
        longestStreak={streak.longestStreak ?? 0}
      />

      <AnalyticsPanel
        failures={failures}
        weekdays={weekdays}
        totalLogged={logs.length}
      />
    </main>
  );
}
