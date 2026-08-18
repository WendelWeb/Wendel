"use client";

import { useState, useTransition } from "react";
import { ChevronRight, Check, X } from "lucide-react";
import { OATH_STEPS, OATH_ITEM_ID } from "@/lib/oath";
import { setItemStateAction } from "@/app/actions";

// Fullscreen daily ritual. He advances one law at a time — reading in diagonal
// isn't possible when only one line is on screen and a tap is required to move
// on. Completing it checks the `serment` objective, which sits in the noyau,
// so skipping it costs him the streak.
export default function DailyOath({
  done,
  onDone,
}: {
  done: boolean;
  onDone: () => void;
}) {
  const [open, setOpen] = useState(!done);
  const [i, setI] = useState(0);
  const [, start] = useTransition();

  if (!open) return null;

  const step = OATH_STEPS[i];
  const last = i === OATH_STEPS.length - 1;

  function next() {
    if (!last) {
      setI((n) => n + 1);
      return;
    }
    onDone();
    setOpen(false);
    start(async () => {
      try {
        await setItemStateAction(OATH_ITEM_ID, "done");
      } catch {
        /* l'état local reste coché ; le serveur se resynchronise au refresh */
      }
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col"
      style={{ background: step.accent }}
      role="dialog"
      aria-modal="true"
      aria-label="Serment du jour"
    >
      {/* Progression + sortie */}
      <div
        className="flex items-center gap-3 px-5 pt-5"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        <div className="flex flex-1 gap-1">
          {OATH_STEPS.map((s, n) => (
            <span
              key={s.id}
              className="h-[3px] flex-1 rounded-full transition-opacity"
              style={{
                background: "#fff",
                opacity: n <= i ? 0.9 : 0.22,
              }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer sans déclarer"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/40 transition active:scale-95"
        >
          <X size={17} />
        </button>
      </div>

      {/* La ligne du moment */}
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-7">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
          {step.label}
        </p>
        <p
          className="font-display text-[26px] font-bold uppercase leading-[1.15]"
          style={{ color: step.gold ? "var(--gold-border)" : "#fff" }}
        >
          {step.main}
        </p>
        {step.sub && (
          <p className="mt-4 text-[14px] leading-relaxed text-white/70">
            {step.sub}
          </p>
        )}
      </div>

      {/* Avancer */}
      <div
        className="mx-auto w-full max-w-2xl px-5 pb-5"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <p className="mb-3 text-center text-[11px] text-white/40">
          Lis-le à voix haute · {i + 1} / {OATH_STEPS.length}
        </p>
        <button
          type="button"
          onClick={next}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-[15px] font-bold uppercase tracking-wide transition active:scale-[0.99]"
          style={{ color: step.accent }}
        >
          {last ? (
            <>
              <Check size={19} /> Je le déclare
            </>
          ) : (
            <>
              Suivant <ChevronRight size={19} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
