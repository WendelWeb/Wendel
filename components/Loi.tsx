"use client";

import { LOI_TITRE, LA_LOI, LES_PREUVES, LE_CONTRAT } from "@/lib/loi";
import { NIETZSCHE_TOUT } from "@/lib/nietzsche";
import {
  PROMESSES_TITRE,
  PRECEDENT,
  HELICOPTERE,
  LA_DATE_NE_TRAVAILLE_PAS,
  PREMIER_JANVIER,
  PREMIER_GESTE,
} from "@/lib/promesses-mortes";
import { RAPPEL_COURT } from "@/lib/pas-le-bonheur";
import { sampled, picked, branch, visitSeed } from "@/lib/rotate";
import { useSeed } from "./useSeed";

/**
 * LA LOI — sur chaque page, comme les deux autres bandeaux.
 *
 * Il a demandé ce rappel « à chaque fois », et c'est le plus dur des trois :
 * il lui retire son dernier abri. Tant que la promesse reçue sur la montagne
 * reste au centre, il peut attendre — une promesse, ça s'attend. Une loi
 * physique, non.
 *
 * Volontairement plus court que les autres bandeaux : quatre lignes. Trois
 * blocs longs empilés en haut de chaque page deviendraient un décor, et un
 * décor ne se lit plus.
 *
 * Composant serveur : le tirage a lieu à chaque requête.
 */
export default function Loi({
  placement = "bottom",
  seed,
}: {
  placement?: "top" | "bottom";
  seed?: number;
}) {
  const s = useSeed(seed ?? visitSeed());
  const loi = picked(LA_LOI, branch(s, "loi"));
  const preuves = sampled(LES_PREUVES, branch(s, "preuves"), 2);
  const contrat = picked(LE_CONTRAT, branch(s, "contrat"));
  const n = picked(NIETZSCHE_TOUT, branch(s, "nietzsche"));
  // LE PRÉCÉDENT — il a sa place ici et nulle part ailleurs.
  //
  // La loi de ce bandeau dit : ce n'est pas la promesse qui décide, c'est la
  // maîtrise. Janvier 2026 en est la preuve écrite de sa main — une promesse
  // datée, jurée, et arrivée à échéance sans lui. Le reste de l'app prédit ce
  // qui arrivera s'il ne change pas ; ceci le mesure sur un cas déjà clos.
  const precedent = picked(PRECEDENT, branch(s, "precedent"));
  const constat = picked(
    [...HELICOPTERE, ...LA_DATE_NE_TRAVAILLE_PAS, ...PREMIER_JANVIER],
    branch(s, "constat"),
  );
  const geste = picked(PREMIER_GESTE, branch(s, "geste"));
  const rappelCourt = picked(RAPPEL_COURT, branch(s, "rappelcourt"));
  // Le conteneur porte l'espacement : dans une grille, une marge de
  // carte double la gouttière au lieu de l'ajuster.
  const spacing = "";

  return (
    <section
      className={`${spacing} rounded-2xl px-5 py-5`}
      style={{ background: "#08090c", border: "1.5px solid #1e3a5f" }}
    >
      <p className="mb-3 text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">
        {LOI_TITRE}
      </p>

      <p className="font-display text-[14.5px] font-bold leading-snug text-white">
        {loi}
      </p>

      <ul className="mt-3.5 flex flex-col gap-2 border-t border-white/10 pt-3.5">
        {preuves.map((l) => (
          <li key={l} className="text-[13px] leading-snug text-white/70">
            {l}
          </li>
        ))}
      </ul>

      {/* LE PRÉCÉDENT — le seul bloc de l'app qui ne prédit rien. Il relève un
          fait déjà clos : une échéance qu'il s'était fixée, arrivée, repartie
          sans lui. Un reproche se discute, un relevé ne se discute pas. */}
      <div
        className="mt-3.5 rounded-xl px-3.5 py-3"
        style={{ background: "#0d0b12", border: "1px solid #4C1D95" }}
      >
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
          {PROMESSES_TITRE}
        </p>
        <p className="font-display text-[13.5px] font-bold leading-snug text-white">
          {precedent}
        </p>
        <p className="mt-2 text-[12px] leading-snug text-white/60">{constat}</p>
        <p
          className="mt-2.5 text-[12px] font-semibold leading-snug"
          style={{ color: "var(--gold-border)" }}
        >
          {geste}
        </p>
      </div>

      <p
        className="mt-3.5 border-t border-white/10 pt-3.5 text-[12.5px] font-semibold leading-relaxed"
        style={{ color: "var(--gold-border)" }}
      >
        {contrat}
      </p>

      {/* Une citation par chargement, avec sa source. Sans source, ce serait
          une phrase de motivation de plus — il en a déjà trop lu. */}
      <div className="mt-3.5 border-t border-white/10 pt-3.5">
        <p className="text-[12.5px] font-medium italic leading-snug text-white/75">
          « {n.t} »
        </p>
        <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/30">
          {n.source}
        </p>
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
