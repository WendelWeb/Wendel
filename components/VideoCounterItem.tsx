"use client";

import { Check, X, Minus, Plus, Video } from "lucide-react";
import type { ItemState } from "@/lib/scoring";

// A counter objective (videos published). Tap the card body = +1 published.
// The small − fixes a mistake; the ✕ marks the whole objective as failed.
export default function VideoCounterItem({
  label,
  count,
  target,
  state,
  onIncrement,
  onDecrement,
  onSetFailed,
}: {
  label: string;
  count: number;
  target: number;
  state: ItemState;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetFailed: (failed: boolean) => void;
}) {
  const done = state === "done";
  const failed = state === "failed";

  const cardStyle: React.CSSProperties = failed
    ? { background: "var(--red-soft)", borderColor: "var(--red)" }
    : done
      ? { background: "var(--green-soft)", borderColor: "rgba(22,163,74,0.4)" }
      : { background: "var(--surface)", borderColor: "var(--border)" };

  const boxStyle: React.CSSProperties = done
    ? { background: "var(--green)", borderColor: "var(--green)" }
    : failed
      ? { background: "var(--red)", borderColor: "var(--red)" }
      : { background: "var(--surface)", borderColor: "var(--border)" };

  return (
    <div
      className="flex w-full items-center gap-2 rounded-xl border px-4 py-3"
      style={{ ...cardStyle, borderWidth: failed || done ? 1.5 : 1 }}
    >
      {/* Tap body = +1 published */}
      <button
        type="button"
        onClick={onIncrement}
        disabled={done}
        aria-label={`${label} — +1 publiée`}
        className="flex min-w-0 flex-1 items-center gap-3 text-left transition active:scale-[0.99] disabled:active:scale-100"
      >
        <span
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border-2"
          style={boxStyle}
        >
          {done ? (
            <Check size={15} strokeWidth={3.5} color="#fff" />
          ) : failed ? (
            <X size={15} strokeWidth={3.5} color="#fff" />
          ) : (
            <span className="tnum text-[12px] font-bold text-text-primary">
              {count}
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className="block text-[13.5px] font-medium leading-snug"
            style={{
              color: done
                ? "var(--text-muted)"
                : failed
                  ? "var(--red)"
                  : "var(--text-primary)",
              textDecoration: done || failed ? "line-through" : "none",
            }}
          >
            {label}
          </span>
          <span className="block text-[11px] text-text-muted">
            {count} / {target} publiées ·{" "}
            {done ? "objectif atteint ✓" : "appuie : +1 publiée"}
          </span>
        </span>
        {!done && !failed && (
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-navy/10 text-navy">
            <Plus size={16} strokeWidth={3} />
          </span>
        )}
        {(done || failed) && (
          <Video size={16} className="flex-shrink-0 text-text-muted" />
        )}
      </button>

      {/* − fix a mistake */}
      <button
        type="button"
        aria-label="Retirer une vidéo"
        onClick={onDecrement}
        disabled={count === 0}
        title="Retirer une"
        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border transition active:scale-95 disabled:opacity-40"
        style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
      >
        <Minus size={15} strokeWidth={2.75} />
      </button>

      {/* ✕ mark objective failed */}
      <button
        type="button"
        aria-label={`${label} — échouée`}
        aria-pressed={failed}
        onClick={() => onSetFailed(!failed)}
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
