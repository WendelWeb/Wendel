"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Gavel, BookOpen, Check, X, ChevronRight } from "lucide-react";
import type { Verdict as VerdictData } from "@/lib/verdict";

function ObligationButton({
  verdict,
  chapterRead,
}: {
  verdict: VerdictData;
  chapterRead: boolean;
}) {
  if (chapterRead) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-2 text-[13px] font-semibold text-white">
        <Check size={15} /> Chapitre {verdict.assignedChapter} lu
      </span>
    );
  }
  return (
    <Link
      href={`/vaisseau/${verdict.assignedChapter}?ctx=verdict`}
      className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-red transition active:scale-95"
    >
      <BookOpen size={15} /> Lire le chapitre
    </Link>
  );
}

export default function Verdict({
  verdict,
  chapterRead,
}: {
  verdict: VerdictData;
  chapterRead: boolean;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Slim strip — one glance, one tap for the rest. Keeps the checklist high. */}
      <section
        className="rounded-xl px-3 py-2"
        style={{ background: "var(--black)" }}
      >
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-2 text-left"
          >
            <Gavel size={16} color="var(--red)" className="flex-shrink-0" />
            <span
              className="tnum flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
              style={{ background: "var(--red)" }}
            >
              {verdict.count}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12px] font-semibold text-zinc-300">
              {verdict.obligation}
            </span>
            <ChevronRight
              size={15}
              className="flex-shrink-0 text-white/50"
            />
          </button>
          <div className="flex-shrink-0">
            {chapterRead ? (
              <span className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-[12px] font-semibold text-white">
                <Check size={13} /> Lu
              </span>
            ) : (
              <Link
                href={`/vaisseau/${verdict.assignedChapter}?ctx=verdict`}
                className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[12px] font-bold uppercase tracking-wide text-red transition active:scale-95"
              >
                <BookOpen size={13} /> Lire
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Full brutal detail — only mounts when opened. */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="animate-overlay-in fixed inset-0 z-[95] flex items-end justify-center bg-black/70 md:items-center md:p-6"
          role="dialog"
          aria-label="Le Verdict — détail"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl md:rounded-2xl"
            style={{ background: "var(--black)" }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Gavel size={18} color="var(--red)" />
                <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
                  Le Verdict
                </span>
                <span
                  className="tnum rounded-full px-2 py-0.5 text-[11px] font-bold text-white"
                  style={{ background: "var(--red)" }}
                >
                  {verdict.count}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-5 py-4">
              <p className="mb-4 font-display text-lg font-bold uppercase leading-tight tracking-tight text-red">
                {verdict.headline}
              </p>

              <div className="flex flex-col gap-3">
                {verdict.failures.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-xl border-l-2 pl-3"
                    style={{ borderColor: "var(--red)" }}
                  >
                    <p className="mb-1 text-[13px] font-bold text-white">
                      {f.label}
                    </p>
                    <ol className="flex flex-col gap-1">
                      {f.domino.map((line, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-[12.5px] leading-snug text-zinc-300"
                        >
                          <span className="text-red">{i === 0 ? "" : "↳"}</span>
                          <span>{line}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              <div
                className="mt-5 rounded-xl p-3"
                style={{ background: "var(--red)" }}
              >
                <p className="text-[13px] font-semibold leading-snug text-white">
                  {verdict.obligation}
                </p>
                <div className="mt-3">
                  <ObligationButton verdict={verdict} chapterRead={chapterRead} />
                </div>
              </div>

              <p className="mt-4 text-[12px] italic leading-snug text-zinc-400">
                {verdict.closing}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
