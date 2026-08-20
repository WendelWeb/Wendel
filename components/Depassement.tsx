"use client";

import {
  DECLARATION_FINALE,
  DECLARATION_SCEAU,
  DEPASSEMENT,
} from "@/lib/declaration";
import { INSTRUMENT } from "@/lib/instrument";
import {
  SEPT_ANS_TITRE,
  SEPT_ANS_SERMENT,
  SEPT_ANS_RENONCE,
  SEPT_ANS_GARDE,
  SEPT_ANS_DECOUPE,
  SEPT_ANS_PRIX,
  SEPT_ANS_2033,
} from "@/lib/sept-ans";
import { RAPPEL_COURT } from "@/lib/pas-le-bonheur";
import { sampled, picked, branch, visitSeed } from "@/lib/rotate";
import { useSeed } from "./useSeed";

/**
 * LE DÉPASSEMENT — sur chaque page, le miroir compris.
 *
 * Il a voulu que ça soit partout, et il a raison de le vouloir là plutôt
 * qu'ailleurs : c'est la seule chose de l'app qui dise que l'app n'est pas la
 * limite. Tout le reste — la Vision, le livre, le miroir — décrit un plafond
 * écrit. Ces trois lignes-là disent que le plafond écrit est un plancher.
 *
 * Les trois lignes ne tournent pas : elles sont le point. Ce qui tourne, ce
 * sont les deux lignes tirées de sa déclaration en dessous — sinon l'œil
 * reconnaît le bloc en une semaine et saute par-dessus, exactement comme pour
 * le mantra.
 *
 * Composant serveur : le tirage a lieu à chaque requête.
 */
export default function Depassement({
  placement = "bottom",
  seed,
}: {
  placement?: "top" | "bottom";
  seed?: number;
}) {
  const s = useSeed(seed ?? visitSeed());
  // Le reste de la déclaration, moins les trois lignes déjà affichées
  // au-dessus — sinon le tirage se répète à lui-même.
  const echos = sampled(
    [...DECLARATION_FINALE, ...DECLARATION_SCEAU].filter(
      (l) => !DEPASSEMENT.includes(l),
    ),
    branch(s, "depassement"),
    2,
  );
  const emploi = picked(INSTRUMENT, branch(s, "instrument"));
  // LES SEPT ANS — leur place est ici, et c'est la seule qui tienne.
  //
  // Ce bandeau dit que le plafond écrit est un plancher. Les sept ans en sont
  // la facture : ce que ce dépassement coûte, en jours, à partir d'aujourd'hui.
  // Une portée sans son prix n'est qu'une rêverie de plus.
  //
  // Le serment ouvre, le découpage ferme. Cet ordre n'est pas décoratif : sans
  // le découpage en dessous, l'app lui offrirait la même chose que janvier
  // 2026 — une promesse large qui dispense du geste étroit.
  const serment = picked(SEPT_ANS_SERMENT, branch(s, "serment7"));
  const sacrifice = sampled(
    [...SEPT_ANS_RENONCE, ...SEPT_ANS_GARDE, ...SEPT_ANS_PRIX, ...SEPT_ANS_2033],
    branch(s, "sacrifice7"),
    2,
  );
  const decoupe = picked(SEPT_ANS_DECOUPE, branch(s, "decoupe7"));
  const rappelCourt = picked(RAPPEL_COURT, branch(s, "rappelcourt"));
  // Le conteneur porte l'espacement : dans une grille, une marge de
  // carte double la gouttière au lieu de l'ajuster.
  const spacing = "";

  return (
    <section
      className={`${spacing} rounded-2xl px-5 py-5`}
      style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
    >
      <p className="mb-3.5 text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">
        Ceci n&apos;est pas le plafond
      </p>

      <ul className="flex flex-col gap-2.5">
        {DEPASSEMENT.map((l) => (
          <li
            key={l}
            className="font-display text-[14.5px] font-bold leading-snug"
            style={{ color: "var(--gold-border)" }}
          >
            {l}
          </li>
        ))}
      </ul>

      {/* LES SEPT ANS — la facture du dépassement, en jours.
          Le serment ouvre, le découpage ferme, et le découpage n'est pas une
          nuance : sans lui ce bloc offrirait exactement ce qu'a offert janvier
          2026, une promesse large qui dispense du geste étroit. */}
      <div
        className="mt-4 rounded-xl px-3.5 py-3"
        style={{ background: "#0a0906", border: "1px solid #57430f" }}
      >
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
          {SEPT_ANS_TITRE}
        </p>
        <p className="font-display text-[13.5px] font-bold leading-snug text-white">
          {serment}
        </p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {sacrifice.map((l) => (
            <li key={l} className="text-[12px] leading-snug text-white/60">
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-[12px] font-semibold leading-snug text-red">
          {decoupe}
        </p>
      </div>

      {/* Ce que Dieu pourrait faire de lui, et ce qu Il trouve. */}
      <div className="mt-4 border-t border-white/12 pt-3.5">
        <p className="font-display text-[13.5px] font-bold leading-snug text-white">
          {emploi.mission}
        </p>
        <p className="mt-1.5 text-[12.5px] font-semibold leading-snug text-red">
          {emploi.mais}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2 border-t border-white/12 pt-3.5">
        {echos.map((l) => (
          <p key={l} className="text-[12.5px] leading-relaxed text-white/70">
            {l}
          </p>
        ))}
      </div>

      {/* LE PIED — la meme ligne au bas des quatre bandeaux, tiree au sort.
          Il a demande qu'on le lui rappelle tellement de fois qu'il ne puisse
          pas ne pas s'en souvenir : quatre bandeaux en haut et en bas font
          jusqu'a huit passages par ecran, c'est la surface la plus frequente
          de l'app. Courte exprès — longue, elle deviendrait un decor. */}
      <p className="mt-4 border-t border-white/10 pt-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-white/30">
        {rappelCourt}
      </p>
    </section>
  );
}
