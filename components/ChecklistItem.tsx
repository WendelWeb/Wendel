"use client";

import { Check, X } from "lucide-react";
import type { ItemState } from "@/lib/scoring";

export default function ChecklistItem({
  label,
  time,
  state,
  disabled = false,
  variant = "item",
  core = false,
  onSetState,
}: {
  label: string;
  time?: string;
  state: ItemState;
  disabled?: boolean;
  variant?: "item" | "rule";
  core?: boolean;
  onSetState: (next: ItemState) => void;
}) {
  const isRule = variant === "rule";
  const done = state === "done";
  const failed = state === "failed";

  const doneColor = isRule ? "var(--red)" : "var(--green)";

  // Left checkbox styling.
  const boxStyle: React.CSSProperties = done
    ? { background: doneColor, borderColor: doneColor }
    : failed
      ? { background: "var(--red)", borderColor: "var(--red)" }
      : {
          background: "var(--surface)",
          borderColor: isRule ? "var(--red)" : "var(--border)",
        };

  // Card styling: failed dominates; then core (gold) stands out from the rest.
  const cardStyle: React.CSSProperties = failed
    ? { background: "var(--red-soft)", borderColor: "var(--red)" }
    : core && !done
      ? { background: "var(--gold-soft)", borderColor: "var(--gold-border)" }
      : {
          background: isRule ? "var(--red-soft)" : "var(--surface)",
          borderColor: isRule ? "rgba(220,38,38,0.25)" : "var(--border)",
        };

  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border px-4 py-3"
      style={{
        ...cardStyle,
        borderWidth: failed || (core && !done) ? 1.5 : 1,
      }}
    >
      {/* Left: check / uncheck done */}
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={`${label} — fait`}
        disabled={disabled}
        onClick={() => onSetState(done ? "neutral" : "done")}
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition active:scale-95 disabled:opacity-60"
        style={boxStyle}
      >
        {done && <Check size={15} strokeWidth={3.5} color="#fff" />}
        {failed && <X size={15} strokeWidth={3.5} color="#fff" />}
      </button>

      {/* Label */}
      <span className="min-w-0 flex-1">
        <span
          className={`block text-[13.5px] leading-snug transition ${
            core ? "font-bold" : ""
          }`}
          style={{
            color: failed
              ? "var(--red)"
              : done
                ? "var(--text-muted)"
                : core
                  ? "var(--gold)"
                  : "var(--text-primary)",
            textDecoration: done || failed ? "line-through" : "none",
          }}
        >
          {core && (
            <span title="Noyau non-négociable" className="mr-1">
              🔑
            </span>
          )}
          {label}
        </span>
      </span>

      {time && (
        <span
          className="hidden flex-shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold tabular-nums sm:block"
          style={{
            background: "var(--surface-raised)",
            color: "var(--text-secondary)",
          }}
        >
          {time}
        </span>
      )}

      {/* Right: mark / unmark failed */}
      <button
        type="button"
        aria-label={`${label} — échoué`}
        aria-pressed={failed}
        disabled={disabled}
        onClick={() => onSetState(failed ? "neutral" : "failed")}
        title="Marquer comme échoué"
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border transition active:scale-95"
        style={{
          borderColor: failed ? "var(--red)" : "var(--border)",
          background: failed ? "var(--red)" : "var(--surface)",
          color: failed ? "#fff" : "var(--text-muted)",
        }}
      >
        <X size={15} strokeWidth={2.75} />
      </button>
    </div>
  );
}
