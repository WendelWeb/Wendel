import { requireUserId } from "@/lib/auth";
import { getLogsInRange, getGlobalStats, getStreak } from "@/lib/daily";
import { getProgram } from "@/lib/programs";
import { isRestDay } from "@/lib/program";
import { coreStatus } from "@/lib/core";
import { todayHaiti, addDays, lastNDates, formatShort, weekday } from "@/lib/dates";
import { computeScore } from "@/lib/scoring";
import ProgressChart, { type DayPoint } from "@/components/ProgressChart";
import GlobalStatsPanel from "@/components/GlobalStatsPanel";

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
    </main>
  );
}
