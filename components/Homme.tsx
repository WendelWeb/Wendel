"use client";

import {
  LA_QUESTION,
  LE_MOT_DEMAIN,
  SI_SERIEUX,
  HOMME_DIEU,
  HOMME_REFUS,
} from "@/lib/homme";
import { LE_TEMPS_PASSERA } from "@/lib/inconfort";
import { QUESTIONS_COMPTES } from "@/lib/comptes";
import {
  SIX_MOIS_TITRE,
  SIX_MOIS_UN_POURCENT,
  SIX_MOIS_CALCUL,
  SIX_MOIS_REEL,
  SIX_MOIS_ABONDANCE,
  SIX_MOIS_HOMME,
  SIX_MOIS_QUESTION,
} from "@/lib/six-mois";
import { RAPPEL_COURT } from "@/lib/pas-le-bonheur";
import { sampled, picked, branch, visitSeed } from "@/lib/rotate";
import { useSeed } from "./useSeed";

/**
 * LA QUESTION — sur chaque page, en haut et en bas.
 *
 * Il l'a demandée partout, et il a donné la raison lui-même : c'est de cette
 * manière-là qu'il a gaspillé dix ans. Pas d'un coup — en repoussant, chaque
 * jour, la même petite chose.
 *
 * La question ne tourne pas. Les réponses tournent : trois « si je suis
 * vraiment sérieux » et trois « cet homme que je décris dans l'app », tirées à
 * chaque requête. Un bloc figé cesse d'être lu au bout d'une semaine — c'est
 * la même raison qui fait tourner le mantra.
 *
 * Composant serveur.
 */
export default function Homme({
  placement = "bottom",
  seed,
}: {
  placement?: "top" | "bottom";
  seed?: number;
}) {
  const s = useSeed(seed ?? visitSeed());
  const serieux = sampled(SI_SERIEUX, branch(s, "serieux"), 3);
  const dieu = sampled(HOMME_DIEU, branch(s, "dieu"), 2);
  const refus = sampled(HOMME_REFUS, branch(s, "refus"), 2);
  // Le mot « demain » et l'échelle du temps disent la même chose par deux
  // bouts : ce qu'il perd en reportant, et ce qui passe pendant qu'il
  // reporte. Le pied du bandeau tire dans les deux.
  const demain = picked(
    [...LE_MOT_DEMAIN, ...LE_TEMPS_PASSERA],
    branch(s, "demain"),
  );
  const compte = picked(QUESTIONS_COMPTES, branch(s, "compte"));
  // Six mois — le seul endroit de l'app qui lui dise ce qu'il ACHÈTE, et non
  // ce qu'il perd. La ligne du un pour cent ouvre toujours : c'est la seule
  // qui n'ait besoin d'aucune promesse extérieure pour tenir.
  const unPourCent = picked(SIX_MOIS_UN_POURCENT, branch(s, "unpourcent"));
  const sixMois = sampled(
    [
      ...SIX_MOIS_CALCUL,
      ...SIX_MOIS_REEL,
      ...SIX_MOIS_ABONDANCE,
      ...SIX_MOIS_HOMME,
    ],
    branch(s, "sixmois"),
    2,
  );
  const question = picked(SIX_MOIS_QUESTION, branch(s, "sixquestion"));
  const rappelCourt = picked(RAPPEL_COURT, branch(s, "rappelcourt"));
  // Le conteneur porte l'espacement : dans une grille, une marge de
  // carte double la gouttière au lieu de l'ajuster.
  const spacing = "";

  return (
    <section
      className={`${spacing} rounded-2xl px-5 py-5`}
      style={{ background: "#0f0a0a", border: "1.5px solid #7f1d1d" }}
    >
      <p className="mb-4 font-display text-[15px] font-bold leading-snug text-white">
        {LA_QUESTION}
      </p>

      <ul className="flex flex-col gap-2.5">
        {serieux.map((l) => (
          <li
            key={l}
            className="text-[13.5px] font-semibold leading-snug text-white/90"
          >
            {l}
          </li>
        ))}
      </ul>

      {/* Les deux hommes, l'un sous l'autre : celui que Dieu veut, en or ;
          celui qu'il refuse d'être — à sept échéances — en rouge. */}
      <ul className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-3.5">
        {dieu.map((l) => (
          <li
            key={l}
            className="text-[13.5px] font-semibold leading-snug"
            style={{ color: "var(--gold-border)" }}
          >
            {l}
          </li>
        ))}
      </ul>

      <ul className="mt-3.5 flex flex-col gap-2.5">
        {refus.map((l) => (
          <li key={l} className="text-[13.5px] leading-snug text-white/60">
            {l}
          </li>
        ))}
      </ul>

      {/* SIX MOIS — ce qu'il achète, pas ce qu'il perd. Tout le reste du
          bandeau lui montre la facture ; ce bloc-ci lui montre le prix de
          l'autre côté, et il est ridicule. */}
      <div className="mt-4 border-t border-white/10 pt-3.5">
        <p className="mb-2.5 text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">
          {SIX_MOIS_TITRE}
        </p>
        <p className="font-display text-[14px] font-bold leading-snug text-white">
          {unPourCent}
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {sixMois.map((l) => (
            <li key={l} className="text-[12.5px] leading-snug text-white/70">
              {l}
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-[12.5px] font-semibold leading-snug text-red">
          {question}
        </p>
      </div>

      {/* Une question de créancier par chargement. Le reste du bandeau parle
          de lui ; celle-ci rappelle qu'il n'est pas seul dans l'équation. */}
      <p
        className="mt-4 border-t border-white/10 pt-3.5 font-display text-[13.5px] font-bold leading-snug"
        style={{ color: "var(--gold-border)" }}
      >
        {compte}
      </p>

      <p className="mt-3 text-[12.5px] font-semibold leading-relaxed text-red">
        {demain}
      </p>

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
