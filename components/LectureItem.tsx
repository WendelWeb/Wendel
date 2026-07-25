"use client";

import Link from "next/link";
import { Check, X, BookOpen } from "lucide-react";
import type { ItemState } from "@/lib/scoring";

export default function LectureItem({
  readCount,
  target,
  state,
  core = false,
  onSetState,
}: {
  readCount: number;
  target: number;
  state: ItemState;
  core?: boolean;
  onSetState: (next: ItemState) => void;
}) {
  const done = state === "done";
  const failed = state === "failed";

  const cardStyle: React.CSSProperties = failed
    ? { background: "var(--red-soft)", borderColor: "var(--red)" }
    : done
      ? { background: "var(--green-soft)", borderColor: "rgba(22,163,74,0.4)" }
      : core
        ? { background: "var(--gold-soft)", borderColor: "var(--gold-border)" }
        : { background: "var(--surface)", borderColor: "var(--border)" };

  const boxStyle: React.CSSProperties = done
    ? { background: "var(--green)", borderColor: "var(--green)" }
    : failed
      ? { background: "var(--red)", borderColor: "var(--red)" }
      : { background: "var(--surface)", borderColor: "var(--border)" };

  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border px-4 py-3"
      style={{
        ...cardStyle,
        borderWidth: failed || done || core ? 1.5 : 1,
      }}
    >
      <Link href="/vaisseau" className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2"
          style={boxStyle}
        >
          {done ? (
            <Check size={15} strokeWidth={3.5} color="#fff" />
          ) : failed ? (
            <X size={15} strokeWidth={3.5} color="#fff" />
          ) : (
            <span className="tnum text-[10px] font-bold text-text-muted">
              {readCount}
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={`block text-[13.5px] leading-snug ${
              core ? "font-bold" : "font-medium"
            }`}
            style={{
              color: done
                ? "var(--text-muted)"
                : failed
                  ? "var(--red)"
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
            Lecture du jour
          </span>
          <span className="block text-[11px] text-text-muted">
            {readCount} / {target} chapitres · appuie pour lire
          </span>
        </span>
        <BookOpen size={16} className="flex-shrink-0 text-text-muted" />
      </Link>

      <button
        type="button"
        aria-label="Lecture du jour — échouée"
        aria-pressed={failed}
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
