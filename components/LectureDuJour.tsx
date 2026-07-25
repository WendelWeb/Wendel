import Link from "next/link";
import { Check, BookOpen } from "lucide-react";
import { CHAPTER_TITLES } from "@/lib/vaisseau-meta";

export default function LectureDuJour({
  chapters,
  readMap,
  readCount,
}: {
  chapters: number[];
  readMap: Record<string, boolean>;
  readCount: number;
}) {
  const done = readCount >= chapters.length;

  return (
    <section
      className="mb-7 rounded-2xl border p-4"
      style={{
        borderColor: done ? "rgba(22,163,74,0.4)" : "var(--border)",
        background: done ? "var(--green-soft)" : "var(--surface-raised)",
      }}
    >
      <div className="mb-1 flex items-center justify-between">
        <h2 className="font-display text-base font-bold uppercase tracking-wide text-navy">
          Lecture du jour
        </h2>
        <span
          className="tnum text-sm font-bold"
          style={{ color: done ? "var(--green)" : "var(--text-secondary)" }}
        >
          {readCount} / {chapters.length}
        </span>
      </div>
      <p className="mb-3 text-[12px] text-text-secondary">
        5 chapitres tirés au sort pour aujourd&apos;hui. Lis-les → l&apos;objectif
        se coche tout seul dans Aujourd&apos;hui.
      </p>

      <div className="flex flex-col gap-2">
        {chapters.map((n) => {
          const read = !!readMap[String(n)];
          return (
            <Link
              key={n}
              href={`/vaisseau/${n}?ctx=lecture`}
              className="flex items-center gap-3 rounded-xl border px-3 py-2.5 transition hover:border-navy"
              style={{
                borderColor: read ? "rgba(22,163,74,0.4)" : "var(--border)",
                background: read ? "var(--green-soft)" : "var(--surface)",
              }}
            >
              <span
                className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2"
                style={{
                  borderColor: read ? "var(--green)" : "var(--border)",
                  background: read ? "var(--green)" : "transparent",
                }}
              >
                {read ? (
                  <Check size={14} strokeWidth={3} color="#fff" />
                ) : (
                  <span className="tnum text-[10px] font-bold text-text-muted">
                    {n}
                  </span>
                )}
              </span>
              <span
                className="min-w-0 flex-1 text-[13px] leading-snug"
                style={{
                  color: read ? "var(--text-muted)" : "var(--text-primary)",
                  textDecoration: read ? "line-through" : "none",
                }}
              >
                {CHAPTER_TITLES[n]}
              </span>
              <BookOpen size={15} className="flex-shrink-0 text-text-muted" />
            </Link>
          );
        })}
      </div>

      {done && (
        <p className="mt-3 flex items-center gap-1.5 text-[12px] font-semibold text-green">
          <Check size={14} /> Lecture du jour accomplie — objectif coché.
        </p>
      )}
    </section>
  );
}
