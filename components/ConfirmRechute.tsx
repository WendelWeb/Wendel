"use client";

import { AlertTriangle } from "lucide-react";
import { RECHUTES, CIBLE_JOURS, type Rechute } from "@/lib/serment";
import { DESCENTE } from "@/lib/consequence";
import ConsequencePanel from "./ConsequencePanel";

/**
 * LA CONFIRMATION AVANT LA RECHUTE.
 *
 * Sa main a cliqué par erreur, et le compteur est tombé — un geste
 * irréversible tenait sur un seul tap. C'était un défaut de conception de ma
 * part : j'ai rendu l'aveu impossible à retirer sans rendre le clic difficile
 * à faire. L'irréversibilité doit protéger l'aveu sincère, pas punir un doigt
 * qui glisse.
 *
 * Deux règles ici :
 *
 *   • le bouton qui annule est le grand, le gris, celui que la main trouve en
 *     premier — parce que l'erreur est plus probable que la rechute ;
 *   • le bouton qui confirme dit exactement ce qu'il coûte, en jours.
 *
 * Et puisqu'il faut de toute façon s'arrêter ici, l'écran sert à quelque
 * chose : il montre la descente avant, pas après.
 */
export default function ConfirmRechute({
  kind,
  jourActuel,
  record,
  pending,
  onAnnuler,
  onConfirmer,
}: {
  kind: Rechute;
  jourActuel: number;
  record: number;
  pending: boolean;
  onAnnuler: () => void;
  onConfirmer: () => void;
}) {
  const label = RECHUTES.find((r) => r.id === kind)?.label ?? "";
  const perdus = Math.max(0, jourActuel - 1);

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <AlertTriangle size={17} className="flex-shrink-0 text-red" />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red">
          Confirme — ça ne s&apos;annule pas
        </p>
      </div>

      <p className="mb-1 font-display text-[16px] font-bold leading-snug text-white">
        « {label} »
      </p>
      <p className="mb-4 text-[12.5px] leading-relaxed text-white/55">
        Si tu confirmes, ta série retombe à zéro tout de suite, la Vision se
        referme, et tu recommences le jour 1 sur {CIBLE_JOURS}.
      </p>

      {/* Le prix, en chiffres. Une phrase se lit sans être comprise ; un
          nombre à côté d'un autre, non. */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {[
          { v: String(jourActuel), l: "Jour actuel" },
          { v: `−${perdus}`, l: "Jours perdus" },
          { v: String(record), l: "Ton record" },
        ].map((x) => (
          <div
            key={x.l}
            className="rounded-xl px-2 py-2.5 text-center"
            style={{ background: "#1a0f0f", border: "1px solid #7f1d1d" }}
          >
            <div className="tnum text-[17px] font-bold leading-none text-white">
              {x.v}
            </div>
            <div className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/40">
              {x.l}
            </div>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <ConsequencePanel c={DESCENTE} sens="descente" />
      </div>

      {/* L'annulation d'abord, et en plus gros : l'erreur de doigt est plus
          probable que la rechute réelle. */}
      <button
        type="button"
        onClick={onAnnuler}
        disabled={pending}
        className="mb-2.5 w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99] disabled:opacity-60"
        style={{ background: "#1f2937" }}
      >
        Non — j&apos;ai cliqué par erreur
      </button>

      <button
        type="button"
        onClick={onConfirmer}
        disabled={pending}
        className="w-full rounded-xl px-4 py-3 text-[13.5px] font-semibold text-white/90 transition active:scale-[0.99] disabled:opacity-60"
        style={{ background: "#7f1d1d" }}
      >
        {pending ? "…" : "Oui, j'ai vraiment cédé — remets à zéro"}
      </button>
    </div>
  );
}
