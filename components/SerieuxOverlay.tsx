"use client";

import { useState } from "react";
import { ShieldCheck, X } from "lucide-react";
import {
  LA_QUESTION,
  LE_MOT_DEMAIN,
  SI_SERIEUX,
  HOMME_DIEU,
  HOMME_REFUS,
  HOMME_DIEU_TITRE,
  HOMME_REFUS_TITRE,
  ECHEANCES,
} from "@/lib/homme";
import {
  INCONFORT_TITRE,
  L_INCONFORT,
  LA_FUITE,
  L_ACCEPTATION,
  LA_REPETITION,
  J_ACCEPTE_LE_PRIX,
  LE_TEMPS_PASSERA,
  LA_PORTE,
} from "@/lib/inconfort";
import { NIETZSCHE_TOUT } from "@/lib/nietzsche";

/** Mélange une liste. Rendu client uniquement : l'overlay n'existe qu'après un clic. */
function melange<T>(arr: readonly T[]): T[] {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

/**
 * « JE SUIS SÉRIEUX » — la liste entière, pas un extrait.
 *
 * Les bandeaux des pages n'en montrent que six à la fois, parce qu'un mur
 * qu'on croise cinquante fois par jour cesse d'être lu. Ce bouton fait
 * l'inverse : il ouvre tout, d'un coup, quand c'est lui qui le demande.
 *
 * L'ordre change à chaque ouverture — sinon il apprend la liste par cœur et
 * son œil descend sans lire. C'est déjà ce qui est arrivé aux feuilles
 * imprimées qu'il a collées au mur.
 */
export default function SerieuxOverlay({ onClose }: { onClose: () => void }) {
  const [serieux] = useState(() => melange(SI_SERIEUX));
  const [dieu] = useState(() => melange(HOMME_DIEU));
  const [refus] = useState(() => melange(HOMME_REFUS));

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-black">
      <div className="mx-auto max-w-2xl px-5 py-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={19} className="text-red" />
            <h1 className="font-display text-xl font-bold uppercase tracking-wide text-white">
              Je suis sérieux ?
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

        <p className="mb-8 border-l-[3px] border-red pl-4 font-display text-[16px] font-bold leading-snug text-white">
          {LA_QUESTION}
        </p>

        <section className="mb-9">
          <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
            Si je suis vraiment sérieux
          </h2>
          <p className="mb-4 text-[12px] leading-relaxed text-white/40">
            Chaque ligne se termine par ce que tu as devant toi maintenant.
            Aucune ne parle de demain.
          </p>
          <ul className="flex flex-col gap-3">
            {serieux.map((l) => (
              <li
                key={l}
                className="border-l-2 border-white/10 pl-3.5 text-[14px] font-semibold leading-snug text-white/90"
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* Le premier homme. Ce n'est pas un idéal qu'il s'est choisi — c'est
            une commande reçue, et c'est ce qui retire la négociation. */}
        <section className="mb-9">
          <h2
            className="mb-1 text-[11px] font-bold uppercase leading-snug tracking-[0.16em]"
            style={{ color: "var(--gold-border)" }}
          >
            {HOMME_DIEU_TITRE}
          </h2>
          <p className="mb-4 text-[12px] leading-relaxed text-white/40">
            Lis-les à la troisième personne, exprès. Tu te pardonnes à toi —
            tu ne pardonnes pas à un homme que tu regardes de l&apos;extérieur.
          </p>
          <ul className="flex flex-col gap-3">
            {dieu.map((l) => (
              <li
                key={l}
                className="border-l-2 pl-3.5 text-[14px] font-semibold leading-snug text-white/90"
                style={{ borderColor: "var(--gold-border)" }}
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* Le second. Le refus est daté sept fois, parce que sa fuite
            habituelle n'est pas « non » mais « plus tard ». */}
        <section className="mb-9">
          <h2 className="mb-3 text-[11px] font-bold uppercase leading-snug tracking-[0.16em] text-red">
            {HOMME_REFUS_TITRE}
          </h2>
          <div className="mb-4 flex flex-wrap gap-1.5">
            {ECHEANCES.map((e) => (
              <span
                key={e}
                className="rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-white/70"
                style={{ background: "#1a0f0f", border: "1px solid #7f1d1d" }}
              >
                {e}
              </span>
            ))}
          </div>
          <ul className="flex flex-col gap-3">
            {refus.map((l) => (
              <li
                key={l}
                className="border-l-2 border-[#7f1d1d] pl-3.5 text-[14px] leading-snug text-white/80"
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="mb-7 rounded-2xl px-5 py-5"
          style={{ background: "#0f0a0a", border: "1.5px solid #7f1d1d" }}
        >
          <h2 className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            Le mot qui a coûté dix ans
          </h2>
          <div className="flex flex-col gap-2.5">
            {LE_MOT_DEMAIN.map((l) => (
              <p
                key={l}
                className="text-[13.5px] font-semibold leading-relaxed text-red"
              >
                {l}
              </p>
            ))}
          </div>
        </section>

        {/* L'inconfort — parce que la réponse à « je suis sérieux ? » se paie
            toujours dans la même monnaie, et qu'il vaut mieux la nommer avant
            qu'il la découvre. */}
        <section
          className="mb-7 rounded-2xl px-5 py-5"
          style={{ background: "#08090c", border: "1.5px solid #1e3a5f" }}
        >
          <h2 className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            {INCONFORT_TITRE}
          </h2>
          <ul className="flex flex-col gap-2.5">
            {L_INCONFORT.map((l) => (
              <li key={l} className="text-[13.5px] leading-snug text-white/85">
                {l}
              </li>
            ))}
          </ul>

          {/* La fuite — sa propre correction, et la plus exacte : ce n'est pas
              l'inconfort qui a coûté dix ans, c'est la fuite devant lui. */}
          <p className="mb-3 mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-red">
            Ce que je fuis vraiment
          </p>
          <ul className="flex flex-col gap-2.5">
            {LA_FUITE.map((l) => (
              <li
                key={l}
                className="text-[13.5px] font-semibold leading-snug text-white/90"
              >
                {l}
              </li>
            ))}
          </ul>

          <p className="mb-3 mt-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            Ce que j&apos;accepte — physique et psychologique
          </p>
          <ul className="flex flex-col gap-2.5">
            {L_ACCEPTATION.map((l) => (
              <li key={l} className="text-[13.5px] leading-snug text-white/80">
                {l}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-3.5">
            {LA_REPETITION.map((l) => (
              <p
                key={l}
                className="text-[12.5px] font-semibold leading-relaxed"
                style={{ color: "var(--gold-border)" }}
              >
                {l}
              </p>
            ))}
          </div>
        </section>

        {/* Le prix accepté — et l'argument qui retire au report son dernier
            avantage : les heures passeront de toute façon. */}
        <section
          className="mb-8 rounded-2xl px-5 py-5"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          <h2 className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            J&apos;accepte le prix
          </h2>
          <ul className="flex flex-col gap-2.5">
            {J_ACCEPTE_LE_PRIX.map((l) => (
              <li
                key={l}
                className="text-[13.5px] font-semibold leading-snug text-white/90"
              >
                {l}
              </li>
            ))}
          </ul>

          {/* L'échelle : chaque échelon plus irrécupérable que le précédent. */}
          <ul className="mt-4 flex flex-col gap-2.5 border-t border-white/12 pt-3.5">
            {LE_TEMPS_PASSERA.map((l, n) => (
              <li
                key={l}
                className="font-display text-[14px] leading-snug"
                style={{
                  color:
                    n >= LE_TEMPS_PASSERA.length - 3
                      ? "rgba(255,255,255,.95)"
                      : "rgba(255,255,255,.75)",
                  fontWeight: n >= LE_TEMPS_PASSERA.length - 3 ? 700 : 500,
                }}
              >
                {l}
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/12 pt-3.5">
            {LA_PORTE.map((l) => (
              <p
                key={l}
                className="text-[13px] font-semibold leading-relaxed text-red"
              >
                {l}
              </p>
            ))}
          </div>
        </section>

        {/* Nietzsche, avec les sources. Une citation sans source est une
            phrase de motivation déguisée, et il en a déjà trop lu. */}
        <section className="mb-8">
          <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
            Ce que Nietzsche a écrit là-dessus
          </h2>
          <p className="mb-5 text-[12px] leading-relaxed text-white/40">
            L&apos;arbre dont les racines descendent en enfer n&apos;est pas de
            lui sous cette forme : c&apos;est une contraction de deux passages
            réels. Les deux ouvrent la liste, et ils sont plus durs que la
            version qui circule.
          </p>
          <ul className="flex flex-col gap-5">
            {NIETZSCHE_TOUT.map((c) => (
              <li key={c.t} className="border-l-2 border-white/12 pl-4">
                <p className="font-display text-[14.5px] font-bold leading-snug text-white">
                  « {c.t} »
                </p>
                <p
                  className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide"
                  style={{ color: "var(--gold-border)" }}
                >
                  {c.source}
                </p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/50">
                  {c.pour}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="mb-4 text-center text-[13px] leading-relaxed text-white/55">
          Il n&apos;y a rien à cocher ici. La seule réponse à cette question,
          c&apos;est ce que tu fais dans les cinq prochaines minutes.
        </p>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
          style={{ background: "#15803d" }}
        >
          Je ferme, et je le fais maintenant
        </button>
      </div>
    </div>
  );
}
