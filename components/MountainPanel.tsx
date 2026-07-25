"use client";

import { useState, useTransition } from "react";
import { Mountain, Check } from "lucide-react";
import { markMountainAction } from "@/app/retention-actions";

// "Monter à la montagne de temps en temps" — instruction from the 2021 covenant.
export default function MountainPanel({
  daysSince,
  lastVisit,
  due,
}: {
  daysSince: number | null;
  lastVisit: string | null;
  due: boolean;
}) {
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();

  function mark() {
    setDone(true);
    start(async () => {
      try {
        await markMountainAction();
      } catch {
        setDone(false);
      }
    });
  }

  const climbedToday = done || daysSince === 0;

  return (
    <section
      className="mb-6 rounded-2xl border p-4"
      style={
        climbedToday
          ? {
              borderColor: "rgba(22,163,74,0.4)",
              background: "var(--green-soft)",
            }
          : due
            ? { borderColor: "var(--gold-border)", background: "var(--gold-soft)" }
            : { borderColor: "var(--border)", background: "var(--surface)" }
      }
    >
      <div className="flex items-center gap-3">
        <Mountain
          size={22}
          className="flex-shrink-0"
          style={{
            color: climbedToday
              ? "var(--green)"
              : due
                ? "var(--gold)"
                : "var(--text-muted)",
          }}
        />
        <div className="min-w-0 flex-1">
          <h3
            className="font-display text-[15px] font-bold uppercase tracking-wide"
            style={{
              color: climbedToday
                ? "var(--green)"
                : due
                  ? "var(--gold)"
                  : "var(--text-primary)",
            }}
          >
            La montagne
          </h3>
          <p className="mt-0.5 text-[12px] leading-snug text-text-secondary">
            {climbedToday
              ? "Tu y es monté aujourd'hui. Le lieu de l'alliance est honoré."
              : daysSince === null
                ? "Aucune montée enregistrée. « Monte à la montagne de temps en temps » — consigne de 2021."
                : `Dernière montée il y a ${daysSince} jour${daysSince > 1 ? "s" : ""}${lastVisit ? ` (${lastVisit})` : ""}.${due ? " Il est temps d'y retourner." : ""}`}
          </p>
        </div>
      </div>

      {!climbedToday && (
        <button
          type="button"
          onClick={mark}
          disabled={pending}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99] disabled:opacity-60"
          style={{ background: due ? "var(--gold)" : "var(--navy)" }}
        >
          <Check size={15} /> Je suis monté aujourd&apos;hui
        </button>
      )}
    </section>
  );
}
