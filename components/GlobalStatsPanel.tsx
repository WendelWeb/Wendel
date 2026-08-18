import { Flame, Trophy, CalendarCheck, Target, Star, Brain } from "lucide-react";
import type { GlobalStats } from "@/lib/daily";

function Tile({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent?: string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-3">
      <span style={{ color: accent ?? "var(--text-muted)" }}>{icon}</span>
      <span className="tnum font-display text-2xl font-bold leading-none text-text-primary">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-text-muted">
        {label}
      </span>
    </div>
  );
}

export default function GlobalStatsPanel({
  stats,
  currentStreak,
  longestStreak,
}: {
  stats: GlobalStats;
  currentStreak: number;
  longestStreak: number;
}) {
  const passRate = stats.totalDays
    ? Math.round((stats.daysPassed / stats.totalDays) * 100)
    : 0;

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.15em] text-text-secondary">
        Global — depuis le début
      </h2>
      <div className="grid grid-cols-2 items-start gap-2 sm:grid-cols-3 lg:grid-cols-4">
        <Tile
          icon={<Flame size={18} fill="var(--red)" />}
          accent="var(--red)"
          value={String(currentStreak)}
          label="Série actuelle"
        />
        <Tile
          icon={<Trophy size={18} />}
          accent="var(--orange)"
          value={String(longestStreak)}
          label="Record de série"
        />
        <Tile
          icon={<CalendarCheck size={18} />}
          value={String(stats.totalDays)}
          label="Jours suivis"
        />
        <Tile
          icon={<Target size={18} />}
          accent="var(--navy)"
          value={`${stats.avgPercent}%`}
          label="Moyenne globale"
        />
        <Tile
          icon={<Star size={18} />}
          accent="var(--green)"
          value={`${stats.bestPercent}%`}
          label="Meilleur jour"
        />
        <Tile
          icon={<Target size={18} />}
          accent="var(--green)"
          value={`${stats.daysPassed} · ${passRate}%`}
          label="Jours ≥ 80%"
        />
        <Tile
          icon={<Star size={18} fill="var(--green)" />}
          accent="var(--green)"
          value={String(stats.perfectDays)}
          label="Jours parfaits 32/32"
        />
        <Tile
          icon={<Brain size={18} />}
          accent="var(--red)"
          value={String(stats.totalStopps)}
          label="STOPP au total"
        />
      </div>
    </section>
  );
}
