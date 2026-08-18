import { AlertTriangle, CalendarDays } from "lucide-react";

export interface FailureStat {
  label: string;
  count: number;
  core: boolean;
}

export interface WeekdayStat {
  day: string; // "lun"
  logged: number;
  coreHeld: number;
  avgScore: number;
}

// Where the plan actually leaks: which objectives fail most, and which weekday
// he cracks on. Both are honest about an empty sample.
export default function AnalyticsPanel({
  failures,
  weekdays,
  totalLogged,
}: {
  failures: FailureStat[];
  weekdays: WeekdayStat[];
  totalLogged: number;
}) {
  const worstDay =
    weekdays.filter((w) => w.logged > 0).sort((a, b) => a.avgScore - b.avgScore)[0] ??
    null;
  const maxFail = failures.length ? failures[0].count : 0;

  return (
    <div className="mt-6 flex flex-col gap-4 xl:mt-0">
      {/* ——— Ce qu'il rate le plus ——— */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="mb-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red" />
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-text-primary">
            Ce que tu rates le plus
          </h2>
        </div>

        {failures.length === 0 ? (
          <p className="text-[12.5px] leading-snug text-text-secondary">
            Aucun échec assumé sur {totalLogged} jour
            {totalLogged > 1 ? "s" : ""} suivi{totalLogged > 1 ? "s" : ""}. Soit
            tu es parfait, soit tu n&apos;es pas encore assez honnête avec le ✕.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {failures.map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-text-secondary">
                  {f.core && "🔑 "}
                  {f.label}
                </span>
                <div className="h-2 w-24 flex-shrink-0 overflow-hidden rounded-full bg-surface-raised">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${maxFail ? (f.count / maxFail) * 100 : 0}%`,
                      background: f.core ? "var(--red)" : "var(--orange)",
                    }}
                  />
                </div>
                <span className="tnum w-8 flex-shrink-0 text-right text-[12px] font-bold text-red">
                  {f.count}×
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ——— Par jour de la semaine ——— */}
      <section className="rounded-2xl border border-border bg-surface p-4">
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays size={16} className="text-navy" />
          <h2 className="font-display text-sm font-bold uppercase tracking-wide text-text-primary">
            Où tu craques dans la semaine
          </h2>
        </div>

        <div className="flex items-end justify-between gap-1.5">
          {weekdays.map((w) => (
            <div key={w.day} className="flex flex-1 flex-col items-center gap-1">
              <span className="tnum text-[10px] font-bold text-text-muted">
                {w.logged ? `${w.avgScore}%` : "—"}
              </span>
              <div className="flex h-20 w-full items-end">
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${Math.max(4, w.avgScore)}%`,
                    background:
                      w.logged === 0
                        ? "var(--surface-raised)"
                        : w.avgScore >= 80
                          ? "var(--green)"
                          : w.avgScore >= 60
                            ? "var(--orange)"
                            : "var(--red)",
                  }}
                />
              </div>
              <span className="text-[10px] font-semibold uppercase text-text-muted">
                {w.day}
              </span>
              <span className="tnum text-[9px] text-text-muted">
                {w.coreHeld}/{w.logged || 0} 🔑
              </span>
            </div>
          ))}
        </div>

        <p className="mt-3 text-[11.5px] leading-snug text-text-secondary">
          {worstDay && worstDay.logged > 0 ? (
            <>
              Ton jour le plus faible :{" "}
              <strong className="text-red">{worstDay.day}</strong> (
              {worstDay.avgScore}% en moyenne). C&apos;est là qu&apos;il faut
              blinder le noyau.
            </>
          ) : (
            <>
              Pas encore assez de jours enregistrés pour voir un motif. Coche tes
              journées — c&apos;est la donnée qui révèle où tu casses.
            </>
          )}
        </p>
      </section>
    </div>
  );
}
