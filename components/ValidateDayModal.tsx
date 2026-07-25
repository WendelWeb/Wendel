"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ValidateDayModal({
  neutralLabels,
  onFailAll,
  onValidateAnyway,
  onClose,
}: {
  neutralLabels: string[];
  onFailAll: () => void;
  onValidateAnyway: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const n = neutralLabels.length;

  return (
    <div
      onClick={onClose}
      className="animate-overlay-in fixed inset-0 z-[95] flex items-end justify-center bg-black/60 md:items-center md:p-6"
      role="alertdialog"
      aria-label="Valider la journée"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-surface md:rounded-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={20} className="text-orange" />
            <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text-primary">
              Journée pas complète
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-text-muted transition hover:bg-surface-raised"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4">
          <p className="text-[13px] leading-relaxed text-text-secondary">
            <span className="font-bold text-orange">
              {n} objectif{n > 1 ? "s" : ""}
            </span>{" "}
            {n > 1 ? "ne sont" : "n'est"} ni fait{n > 1 ? "s" : ""} (✓) ni
            échoué{n > 1 ? "s" : ""} (✕). Tu n&apos;as rien précisé. Un homme
            sait exactement où il en est.
          </p>

          <ul className="mt-3 flex max-h-40 flex-col gap-1 overflow-y-auto rounded-lg bg-surface-raised p-2">
            {neutralLabels.map((label, i) => (
              <li
                key={i}
                className="truncate text-[12px] text-text-secondary"
                title={label}
              >
                • {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 border-t border-border px-5 py-4">
          <button
            type="button"
            onClick={onFailAll}
            className="flex h-11 items-center justify-center gap-2 rounded-xl text-[14px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
            style={{ background: "var(--red)" }}
          >
            Marquer les {n} en échec ✕ et valider
          </button>
          <button
            type="button"
            onClick={onValidateAnyway}
            className="flex h-11 items-center justify-center rounded-xl border border-border text-[13px] font-semibold text-text-secondary transition active:scale-[0.99]"
          >
            Valider quand même (laisser non décidés)
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 items-center justify-center text-[12px] font-medium text-text-muted transition hover:text-navy"
          >
            Retour — les décider un par un
          </button>
        </div>
      </div>
    </div>
  );
}
