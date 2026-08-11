"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { ALL_STOPP_PHRASES } from "@/lib/stopp";
import { shuffled, visitSeed } from "@/lib/rotate";

export default function StoppList({ onClose }: { onClose: () => void }) {
  // Cette liste n'apparaît qu'après un clic, jamais au rendu serveur : tirer au
  // sort dans l'initialiseur ne risque donc aucun décalage d'hydratation.
  const [phrases] = useState(() => shuffled(ALL_STOPP_PHRASES, visitSeed()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="animate-overlay-in fixed inset-0 z-[90] flex items-end justify-center bg-black/60 md:items-center md:p-6"
      role="dialog"
      aria-label="Toutes les phrases STOPP"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-surface md:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-navy">
              Phrases STOPP
            </h2>
            <p className="mt-0.5 text-[11px] text-text-secondary">
              Une de ces {ALL_STOPP_PHRASES.length} apparaît au hasard à chaque
              STOPP.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition hover:bg-surface-raised hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <ol className="flex flex-col gap-2 overflow-y-auto p-4">
          {phrases.map((phrase, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-xl border border-border bg-background p-3"
            >
              <span className="tnum flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-red-soft text-[12px] font-bold text-red">
                {i + 1}
              </span>
              <span className="text-[14px] leading-snug text-text-primary">
                {phrase}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
