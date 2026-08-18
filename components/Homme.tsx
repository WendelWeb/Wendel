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
  // Le conteneur porte l'espacement : dans une grille, une marge de
  // carte double la gouttière au lieu de l'ajuster.
  const spacing = "";

  return (
    <section
      className={`${spacing} h-full rounded-2xl px-5 py-5`}
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
    </section>
  );
}
