import { Flame } from "lucide-react";

export default function StreakBadge({ streak }: { streak: number }) {
  const active = streak > 0;
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
      style={{
        background: active ? "var(--red-soft)" : "var(--surface-raised)",
      }}
      title={`Série actuelle : ${streak} jour${streak > 1 ? "s" : ""}`}
    >
      <Flame
        size={16}
        strokeWidth={2.5}
        style={{ color: active ? "var(--red)" : "var(--text-muted)" }}
        fill={active ? "var(--red)" : "none"}
      />
      <span
        className="tnum text-sm font-bold"
        style={{ color: active ? "var(--red)" : "var(--text-muted)" }}
      >
        {streak}
      </span>
    </div>
  );
}
