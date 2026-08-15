"use client";

import { Target, X } from "lucide-react";
import { POURQUOI_SIEN, POURQUOI_VINGT } from "@/lib/pourquoi";
import { DECLARATION_FINALE, DECLARATION_SCEAU } from "@/lib/declaration";
import DecisionsPanel from "./DecisionsPanel";

/**
 * Le POURQUOI, ouvert à tout moment.
 *
 * La Vision reste fermée pendant les trente jours : elle décrit ce qu'il veut
 * obtenir, et il a décidé de ne plus la regarder avant de l'avoir mérité. Le
 * POURQUOI est autre chose — c'est ce qui le fait tenir à la minute où il n'a
 * plus envie. Le fermer serait retirer le carburant en pleine côte.
 */
export default function PourquoiOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-black">
      <div className="mx-auto max-w-2xl px-5 py-8">
        <div className="mb-7 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Target size={19} style={{ color: "var(--gold-border)" }} />
            <h1
              className="font-display text-xl font-bold uppercase tracking-wide"
              style={{ color: "var(--gold-border)" }}
            >
              Mon pourquoi
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex-shrink-0 text-white/40"
          >
            <X size={22} />
          </button>
        </div>

        {POURQUOI_SIEN.map((b) => (
          <section key={b.id} className="mb-8">
            <h2 className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
              {b.titre}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {b.lignes.map((l) => (
                <li
                  key={l}
                  className="text-[14.5px] font-medium leading-[1.55] text-white/90"
                >
                  {l}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mb-8">
          <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
            Vingt raisons de plus
          </h2>
          <p className="mb-4 text-[12px] leading-relaxed text-white/40">
            Aucune n&apos;est une phrase de motivation : chacune s&apos;appuie sur
            quelque chose qui existe déjà — un chapitre de ton livre, une ligne
            de ta Vision, une consigne de l&apos;alliance.
          </p>
          <ol className="flex flex-col gap-3.5">
            {POURQUOI_VINGT.map((l, i) => (
              <li key={l} className="flex gap-3">
                <span className="tnum mt-[3px] flex-shrink-0 text-[11px] font-bold text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14px] leading-snug text-white/85">{l}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Ce qu'il déclare vouloir — la demande, en entier */}
        <section
          className="mb-6 rounded-2xl px-5 py-5"
          style={{ background: "#111", border: "1.5px solid var(--gold-border)" }}
        >
          <h2 className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            Et ce que je décide de réaliser
          </h2>
          <ul className="flex flex-col gap-2.5">
            {DECLARATION_FINALE.map((l) => (
              <li
                key={l}
                className="font-display text-[15px] font-bold leading-snug text-white"
              >
                {l}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2 border-t border-white/12 pt-3.5">
            {DECLARATION_SCEAU.map((l) => (
              <p
                key={l}
                className="text-[13px] font-semibold leading-relaxed"
                style={{ color: "var(--gold-border)" }}
              >
                {l}
              </p>
            ))}
          </div>

          <div className="mt-4 border-t border-white/12 pt-4">
            <DecisionsPanel />
          </div>
        </section>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl px-4 py-3.5 text-[14px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
          style={{ background: "#1a1a1a" }}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
