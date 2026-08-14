"use client";

import { AlertTriangle } from "lucide-react";
import { CIBLE_JOURS } from "@/lib/serment";
import { DESCENTE } from "@/lib/consequence";
import ConsequencePanel from "./ConsequencePanel";

/**
 * LA CONFIRMATION AVANT UN GESTE QUI CASSE LA JOURNÉE.
 *
 * Sa main a cliqué par erreur sur « je perpétue », et la journée est tombée —
 * un geste irréversible tenait sur un seul tap. C'était un défaut de
 * conception de ma part : j'ai rendu ces choix impossibles à retirer sans
 * rendre le clic difficile à faire. L'irréversibilité doit protéger l'aveu
 * sincère, pas punir un doigt qui glisse.
 *
 * Deux règles ici :
 *
 *   • le bouton qui annule est le grand, le gris, celui que la main trouve en
 *     premier — parce que l'erreur est plus probable que le choix réel ;
 *   • celui qui confirme dit exactement ce qu'il coûte, en jours.
 *
 * Et puisqu'il faut de toute façon s'arrêter ici, l'écran sert à quelque
 * chose : il montre la descente avant, pas après.
 */
export default function ConfirmIrreversible({
  titre,
  detail,
  labelConfirmer,
  jourActuel,
  record,
  pending,
  onAnnuler,
  onConfirmer,
}: {
  /** Ce qu'il est sur le point de déclarer, entre guillemets. */
  titre: string;
  detail: string;
  labelConfirmer: string;
  jourActuel: number;
  record: number;
  pending: boolean;
  onAnnuler: () => void;
  onConfirmer: () => void;
}) {
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
        « {titre} »
      </p>
      <p className="mb-4 text-[12.5px] leading-relaxed text-white/55">
        {detail} Tu recommenceras au jour 1 sur {CIBLE_JOURS}.
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
          probable que le choix réel. */}
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
        {pending ? "…" : labelConfirmer}
      </button>
    </div>
  );
}
