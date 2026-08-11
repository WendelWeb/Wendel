"use client";

import { useState, useTransition } from "react";
import { Zap, RotateCcw, Quote, Loader2 } from "lucide-react";
import {
  RETENTION_AFFIRMATIONS,
  PROTOCOL_PHASES,
  retentionPhase,
  THRESHOLD_21,
  THRESHOLD_90,
} from "@/lib/affirmations";
import { resetRetentionAction } from "@/app/retention-actions";

export default function RetentionPanel({
  days,
  startDate,
  daysUntilStart = 1,
  seed = 0,
}: {
  days: number;
  startDate: string;
  /** Jours restants avant le Jour 1, quand le départ est dans le futur. */
  daysUntilStart?: number;
  /** Graine de la visite, tirée côté serveur : l'affirmation affichée en
   *  arrivant change à chaque fois au lieu d'être toujours la première. */
  seed?: number;
}) {
  const [affIdx, setAffIdx] = useState(
    Math.abs(seed) % RETENTION_AFFIRMATIONS.length,
  );
  const [confirming, setConfirming] = useState(false);
  const [pending, start] = useTransition();

  const phase = retentionPhase(days);
  const passed21 = days >= THRESHOLD_21;
  const pctTo21 = Math.min(100, Math.round((days / THRESHOLD_21) * 100));
  const pctTo90 = Math.min(100, Math.round((days / THRESHOLD_90) * 100));

  function reset() {
    start(async () => {
      try {
        await resetRetentionAction();
        setConfirming(false);
      } catch {
        /* ignore */
      }
    });
  }

  return (
    <section
      className="mb-7 overflow-hidden rounded-2xl"
      style={{ background: "var(--black)" }}
    >
      {/* Counter */}
      <div className="px-5 pt-5 text-center">
        <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
          <Zap size={13} className="text-orange" /> Rétention
        </div>
        {days === 0 ? (
          <div className="mt-1">
            <span className="font-display text-3xl font-bold uppercase leading-none text-white">
              {daysUntilStart <= 1 ? "Démarre demain" : `Démarre dans ${daysUntilStart} jours`}
            </span>
            <p className="mt-1 text-[12px] text-white/50">
              Jour 1 le {startDate}. Tiens.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-1 flex items-end justify-center gap-2">
              <span className="tnum font-display text-6xl font-bold leading-none text-white">
                {days}
              </span>
              <span className="mb-1 text-lg font-semibold text-white/60">
                jour{days > 1 ? "s" : ""}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-white/40">depuis le {startDate}</p>
          </>
        )}
      </div>

      {/* Progress to 21 (le seuil) */}
      <div className="px-5 pt-4">
        <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-white/70">
          <span>{passed21 ? "Seuil des 3 semaines FRANCHI ✓" : "Seuil de bascule — 21 jours (ch. 20)"}</span>
          <span className="tnum">
            {days}/{passed21 ? THRESHOLD_90 : THRESHOLD_21}
          </span>
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{
              width: `${passed21 ? pctTo90 : pctTo21}%`,
              background: passed21 ? "var(--green)" : "var(--orange)",
            }}
          />
        </div>
      </div>

      {/* Phase */}
      <div className="mx-5 mt-4 rounded-xl bg-white/5 p-3">
        <p className="text-[11px] font-bold uppercase tracking-wide text-orange">
          Phase : {phase.title}
        </p>
        <p className="mt-1 text-[12.5px] leading-snug text-white/70">
          {phase.text}
        </p>
      </div>

      {/* Affirmation */}
      <button
        type="button"
        onClick={() => setAffIdx((i) => (i + 1) % RETENTION_AFFIRMATIONS.length)}
        className="mx-5 mt-3 flex w-[calc(100%-2.5rem)] items-start gap-2 rounded-xl border border-white/10 p-3 text-left transition active:scale-[0.99]"
      >
        <Quote size={15} className="mt-0.5 flex-shrink-0 text-red" />
        <span className="flex-1 text-[13px] font-medium italic leading-snug text-white">
          {RETENTION_AFFIRMATIONS[affIdx]}
        </span>
      </button>
      <p className="px-5 pt-1 text-center text-[10px] text-white/30">
        touche l&apos;affirmation pour la suivante
      </p>

      {/* Protocol phases */}
      <div className="mt-3 flex flex-col gap-1 px-5">
        {PROTOCOL_PHASES.map((p) => {
          const active = p.title === phase.title;
          const label =
            p.to === Infinity ? `${p.from}+` : `${p.from}–${p.to}`;
          return (
            <div
              key={p.title}
              className="flex items-center gap-2 rounded-lg px-2 py-1.5"
              style={{ background: active ? "rgba(234,88,12,0.15)" : "transparent" }}
            >
              <span
                className="tnum w-12 flex-shrink-0 text-[11px] font-bold"
                style={{ color: active ? "var(--orange)" : "rgba(255,255,255,0.4)" }}
              >
                j{label}
              </span>
              <span
                className="text-[12px]"
                style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
              >
                {p.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <div className="p-5 pt-4">
        {confirming ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={reset}
              disabled={pending}
              className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-lg text-[13px] font-bold uppercase tracking-wide text-white disabled:opacity-60"
              style={{ background: "var(--red)" }}
            >
              {pending && <Loader2 size={14} className="animate-spin" />}
              Confirmer — retour à zéro
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="h-10 rounded-lg px-4 text-[13px] font-semibold text-white/60"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 text-[12px] font-semibold text-white/60 transition hover:text-red"
          >
            <RotateCcw size={13} /> J&apos;ai chuté — recommencer
          </button>
        )}
      </div>
    </section>
  );
}
