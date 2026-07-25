"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { scoreColor } from "@/lib/scoring";

export interface DayPoint {
  date: string;
  label: string;
  percent: number;
  completed: number;
  hasLog: boolean;
}

const BAND: Record<string, string> = {
  red: "#DC2626",
  orange: "#EA580C",
  green: "#16A34A",
};

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload as DayPoint;
  return (
    <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-sm">
      <p className="text-[11px] font-semibold text-text-primary">{p.label}</p>
      <p className="text-[11px] text-text-secondary">
        {p.hasLog ? `${p.percent}% — ${p.completed}/32 items` : "Non enregistré"}
      </p>
    </div>
  );
}

export default function ProgressChart({ days }: { days: DayPoint[] }) {
  const [range, setRange] = useState<"week" | "month">("week");

  const data = useMemo(
    () => (range === "week" ? days.slice(-7) : days),
    [range, days],
  );

  const stats = useMemo(() => {
    const logged = data.filter((d) => d.hasLog);
    const avg = logged.length
      ? Math.round(logged.reduce((a, d) => a + d.percent, 0) / logged.length)
      : 0;
    const best = logged.length
      ? Math.max(...logged.map((d) => d.percent))
      : 0;
    const passed = logged.filter((d) => d.percent >= 80).length;
    return { avg, best, passedLabel: `${passed}/${logged.length}` };
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-2">
        <ToggleBtn
          active={range === "week"}
          onClick={() => setRange("week")}
          label="Cette semaine"
        />
        <ToggleBtn
          active={range === "month"}
          onClick={() => setRange("month")}
          label="Ce mois"
        />
      </div>

      <div className="rounded-2xl border border-border bg-surface p-3">
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 8, right: 4, bottom: 0, left: -24 }}
            >
              <XAxis
                dataKey="label"
                tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
                interval={range === "week" ? 0 : "preserveStartEnd"}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 50, 80, 100]}
                tick={{ fontSize: 10, fill: "var(--text-muted)" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.03)" }}
              />
              <ReferenceLine
                y={80}
                stroke="#16A34A"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <Bar dataKey="percent" radius={[3, 3, 0, 0]} maxBarSize={40}>
                {data.map((d) => (
                  <Cell
                    key={d.date}
                    fill={d.hasLog ? BAND[scoreColor(d.percent)] : "#E4E4E7"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <StatCard label="Moyenne" value={`${stats.avg}%`} />
        <StatCard label="Meilleur jour" value={`${stats.best}%`} />
        <StatCard label="Jours ≥ 80%" value={stats.passedLabel} />
      </div>
    </div>
  );
}

function ToggleBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-10 rounded-lg text-[13px] font-semibold uppercase tracking-wide transition"
      style={{
        background: active ? "var(--navy)" : "var(--surface)",
        color: active ? "#fff" : "var(--text-secondary)",
        border: active ? "none" : "1px solid var(--border)",
      }}
    >
      {label}
    </button>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border bg-surface px-2 py-3">
      <span className="tnum font-display text-2xl font-bold text-text-primary">
        {value}
      </span>
      <span className="mt-0.5 text-center text-[10px] uppercase tracking-wide text-text-muted">
        {label}
      </span>
    </div>
  );
}
