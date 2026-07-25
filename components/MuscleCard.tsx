"use client";

import { Minus, Plus } from "lucide-react";

export default function MuscleCard({
  name,
  sets,
  target,
  onChange,
}: {
  name: string;
  sets: number;
  target: number;
  onChange: (next: number) => void;
}) {
  const met = sets >= target;
  const empty = sets === 0;
  const pct = Math.min(100, Math.round((sets / target) * 100));

  const bg = empty
    ? "var(--surface)"
    : met
      ? "var(--green-soft)"
      : "var(--red-soft)";
  const borderColor = empty
    ? "var(--border)"
    : met
      ? "rgba(22,163,74,0.35)"
      : "rgba(220,38,38,0.25)";
  const barColor = met ? "var(--green)" : "var(--orange)";

  return (
    <div
      className="flex flex-col gap-2 rounded-xl border p-3"
      style={{ background: bg, borderColor }}
    >
      <div className="flex items-start justify-between gap-1">
        <span className="text-[13px] font-bold leading-tight text-text-primary">
          {name}
        </span>
        <span className="tnum flex-shrink-0 text-[12px] font-semibold text-text-secondary">
          {sets} / {target}
        </span>
      </div>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-raised">
        <div
          className="h-full rounded-full transition-[width] duration-300"
          style={{ width: `${pct}%`, background: barColor }}
        />
      </div>

      <div className="mt-1 flex items-center justify-between">
        <button
          type="button"
          aria-label={`Retirer une série de ${name}`}
          onClick={() => onChange(Math.max(0, sets - 1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary transition active:scale-95 disabled:opacity-40"
          disabled={sets === 0}
        >
          <Minus size={16} />
        </button>
        <span className="tnum text-lg font-bold text-text-primary">{sets}</span>
        <button
          type="button"
          aria-label={`Ajouter une série de ${name}`}
          onClick={() => onChange(sets + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-white transition active:scale-95"
          style={{ background: "var(--navy)" }}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}
