import Link from "next/link";
import { LifeBuoy, ChevronRight } from "lucide-react";
import { STATES, stateChapterTitle } from "@/lib/states";

export default function EtatsPanel() {
  return (
    <section className="mb-7 rounded-2xl border p-4" style={{ borderColor: "var(--red)", background: "var(--red-soft)" }}>
      <div className="mb-1 flex items-center gap-2">
        <LifeBuoy size={18} className="text-red" />
        <h2 className="font-display text-base font-bold uppercase tracking-wide text-red">
          Quand je pense à…
        </h2>
      </div>
      <p className="mb-3 text-[12px] text-text-secondary">
        Une tentation, un coup de mou ? Ouvre le chapitre qui la tue — tout de
        suite.
      </p>
      <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
        {STATES.map((s) => (
          <Link
            key={s.id}
            href={`/vaisseau/${s.chapter}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-surface px-3 py-2.5 transition hover:border-red"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium leading-tight text-text-primary">
                {s.label}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-text-muted">
                ch. {s.chapter} — {stateChapterTitle(s)}
              </span>
            </span>
            <ChevronRight size={16} className="flex-shrink-0 text-text-muted" />
          </Link>
        ))}
      </div>
    </section>
  );
}
