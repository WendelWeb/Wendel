"use client";

import { useState, useTransition } from "react";
import { Check, X } from "lucide-react";
import { OATH_ITEM_ID } from "@/lib/oath";
import { VOIX_HAUTE, VOIX_HAUTE_TOTAL } from "@/lib/voix";
import { picked, visitSeed } from "@/lib/rotate";
import { setItemStateAction } from "@/app/actions";

// UNE phrase, pas un diaporama.
//
// C'était une suite d'écrans à faire défiler avant d'atteindre sa journée. Il
// l'a supprimée lui-même, et il a raison : un rituel qu'on traverse en tapant
// six fois devient un péage, et un péage se paie sans lire. Ce qui reste est la
// seule chose qui comptait — une phrase, tirée au sort dans tout ce que l'app
// contient, à dire à voix haute.
//
// À voix haute, et c'est le point. Lue en silence, une phrase se survole ;
// prononcée, elle se parcourt en entier au rythme de la parole, et il s'entend
// la dire. Rien d'autre ne distingue relire un texte de le déclarer.
//
// Le tirage se fait sur le client au premier rendu et ne rejoue pas : la
// phrase du jour ne doit pas changer sous ses yeux pendant qu'il la lit.
//
// Déclarer coche l'objectif `serment`, qui est dans le noyau — passer outre
// lui coûte la série, exactement comme avant.
export default function DailyOath({
  done,
  onDone,
}: {
  done: boolean;
  onDone: () => void;
}) {
  const [open, setOpen] = useState(!done);
  const [phrase] = useState(() => picked(VOIX_HAUTE, visitSeed()));
  const [, start] = useTransition();

  if (!open) return null;

  function declarer() {
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

  // Une phrase courte tient en grand ; une longue doit rétrécir, sinon elle
  // déborde de l'écran sur un téléphone.
  const taille =
    phrase.length > 190
      ? "text-[19px] leading-[1.35]"
      : phrase.length > 110
        ? "text-[23px] leading-[1.25]"
        : "text-[29px] leading-[1.15]";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-label="La phrase du jour, à lire à voix haute"
    >
      <div
        className="flex items-center justify-end px-5 pt-5"
        style={{ paddingTop: "max(1.25rem, env(safe-area-inset-top))" }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer sans déclarer"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/40 transition active:scale-95"
        >
          <X size={17} />
        </button>
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-7">
        <p
          className="mb-5 text-[10px] font-bold uppercase tracking-[0.28em]"
          style={{ color: "var(--gold-border)" }}
        >
          À voix haute
        </p>
        <p className={`font-display font-bold text-white ${taille}`}>
          {phrase}
        </p>
      </div>

      <div
        className="mx-auto w-full max-w-3xl px-5 pb-5"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <p className="mb-3 text-center text-[11px] text-white/35">
          Une sur {VOIX_HAUTE_TOTAL.toLocaleString("fr-FR")} — tirée au sort
        </p>
        <button
          type="button"
          onClick={declarer}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-[15px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99]"
        >
          <Check size={19} /> Je l&apos;ai dite
        </button>
      </div>
    </div>
  );
}
