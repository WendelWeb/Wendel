import {
  LA_QUESTION,
  LE_MOT_DEMAIN,
  SI_SERIEUX,
  CET_HOMME,
} from "@/lib/homme";
import { sampled, picked, branch, visitSeed } from "@/lib/rotate";

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
  const s = seed ?? visitSeed();
  const serieux = sampled(SI_SERIEUX, branch(s, "serieux"), 3);
  const homme = sampled(CET_HOMME, branch(s, "homme"), 3);
  const demain = picked(LE_MOT_DEMAIN, branch(s, "demain"));
  const spacing = placement === "top" ? "mb-6 mt-3" : "mt-8 mb-4";

  return (
    <section
      className={`${spacing} mx-4 rounded-2xl px-5 py-5 md:mx-6`}
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

      <ul className="mt-4 flex flex-col gap-2.5 border-t border-white/10 pt-3.5">
        {homme.map((l) => (
          <li key={l} className="text-[13.5px] leading-snug text-white/75">
            {l}
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-white/10 pt-3.5 text-[12.5px] font-semibold leading-relaxed text-red">
        {demain}
      </p>
    </section>
  );
}
