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
import {
  AXIOMES,
  AXIOMES_TITRE,
  AXIOMES_MARTEAU,
  MARTEAU_TITRE,
} from "@/lib/axiomes";
import { COMPTES } from "@/lib/comptes";
import {
  INSTRUMENT,
  INSTRUMENT_TITRE,
  INSTRUMENT_ANCRE,
  INSTRUMENT_SORTIE,
} from "@/lib/instrument";

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
  const [nietzsche] = useState(() => melange(NIETZSCHE_TOUT));
  const [axiomes] = useState(() => melange(AXIOMES));
  const [marteau] = useState(() => melange(AXIOMES_MARTEAU));
  const [comptes] = useState(() => melange(COMPTES));
  const [instrument] = useState(() => melange(INSTRUMENT));
  // L ordre des sections change aussi. Il ne lit jamais jusqu au bout : si
  // l ordre est fixe, il relit toujours les memes deux premieres et ne voit
  // jamais Nietzsche ni le prix.
  const [ordre] = useState(() =>
    melange([
      "serieux",
      "dieu",
      "refus",
      "demain",
      "inconfort",
      "prix",
      "nietzsche",
      "axiomes",
      "comptes",
      "instrument",
    ]),
  );

  const sections: Record<string, React.ReactNode> = {
    serieux: (
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
    ),

    /* Le premier homme. Ce n'est pas un idéal qu'il s'est choisi — c'est
            une commande reçue, et c'est ce qui retire la négociation. */
    dieu: (
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
    ),

    /* Le second. Le refus est daté sept fois, parce que sa fuite
            habituelle n'est pas « non » mais « plus tard ». */
    refus: (
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
    ),

    demain: (
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
    ),

    /* L'inconfort — parce que la réponse à « je suis sérieux ? » se paie
            toujours dans la même monnaie, et qu'il vaut mieux la nommer avant
            qu'il la découvre. */
    inconfort: (
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

          {/* La fuite — sa propre correction, et la plus exacte : ce n'est
              pas l'inconfort qui a coûté dix ans, c'est la fuite devant lui. */}
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
    ),

    /* Le prix accepté — et l'argument qui retire au report son dernier
            avantage : les heures passeront de toute façon. */
    prix: (
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
    ),

    /* Nietzsche, avec les sources. Une citation sans source est une
            phrase de motivation déguisée, et il en a déjà trop lu. */
    nietzsche: (
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
            {nietzsche.map((c) => (
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
    ),

    /* Le retournement : non pas ce qu'il perd, mais ce que Dieu ne peut pas
       faire parce qu'Il ne trouve pas l'instrument disponible. */
    instrument: (
      <section className="mb-8">
        <h2 className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          {INSTRUMENT_TITRE}
        </h2>

        <div className="mb-5 flex flex-col gap-3">
          {INSTRUMENT_ANCRE.map((a) => (
            <div key={a.source}>
              <p className="text-[13px] italic leading-snug text-white/70">
                « {a.t} »
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-white/30">
                {a.source}
              </p>
            </div>
          ))}
        </div>

        <ul className="flex flex-col gap-5">
          {instrument.map((e) => (
            <li key={e.mission} className="border-l-2 border-white/12 pl-4">
              <p className="font-display text-[14.5px] font-bold leading-snug text-white">
                {e.mission}
              </p>
              <p className="mt-1.5 text-[13.5px] font-semibold leading-snug text-red">
                {e.mais}
              </p>
            </li>
          ))}
        </ul>

        <div
          className="mt-6 rounded-2xl px-5 py-4"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          {INSTRUMENT_SORTIE.map((l) => (
            <p
              key={l}
              className="mb-2 text-[13.5px] font-semibold leading-relaxed last:mb-0"
              style={{ color: "var(--gold-border)" }}
            >
              {l}
            </p>
          ))}
        </div>
      </section>
    ),

    /* Tout le reste de l'écran lui parle de lui. Celle-ci rappelle les cinq
       créanciers qui attendent quelque chose de cette énergie-là. */
    comptes: (
      <section className="mb-8">
        <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          À qui je dois des comptes
        </h2>
        <p className="mb-5 text-[12px] leading-relaxed text-white/40">
          Chaque question est au présent. Pas « qu&apos;est-ce que je ferai » :
          qu&apos;est-ce que je fais. Le futur est exactement l&apos;endroit où
          tu te caches depuis huit ans.
        </p>
        {comptes.map((b) => (
          <div key={b.id} className="mb-6">
            <h3
              className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: "var(--gold-border)" }}
            >
              {b.titre}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {b.lignes.map((l) => (
                <li
                  key={l}
                  className="border-l-2 border-white/12 pl-3.5 text-[14px] leading-snug text-white/85"
                >
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ),

    /* Les miennes. Séparées des vraies citations, et dites comme telles :
       une fausse attribution détruirait la valeur de toutes les autres. */
    axiomes: (
      <section className="mb-8">
        <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          {AXIOMES_TITRE}
        </h2>
        <p className="mb-5 text-[12px] leading-relaxed text-white/40">
          Aucune n&apos;est de Nietzsche et aucune ne le prétend. Elles
          s&apos;appuient sur ce qui existe dans ta vie : les 587 pages, le
          samedi soir avant la montagne, la seconde où ta main bouge avant toi.
        </p>
        <ul className="flex flex-col gap-3.5">
          {axiomes.map((l) => (
            <li
              key={l}
              className="border-l-2 border-white/12 pl-4 font-display text-[14.5px] font-bold leading-snug text-white/90"
            >
              {l}
            </li>
          ))}
        </ul>

        {/* Le pastiche est assumé ; l'attribution, jamais. */}
        <h2 className="mb-1 mt-8 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          {MARTEAU_TITRE}
        </h2>
        <p className="mb-5 text-[12px] leading-relaxed text-white/40">
          Sa forme à lui — la question qui démasque, le « et moi je te dis »,
          la table nouvelle — appliquée à ta vie. La forme n&apos;est pas un
          ornement : elle oblige à nommer d&apos;où vient un geste au lieu de
          le déplorer.
        </p>
        <ul className="flex flex-col gap-4">
          {marteau.map((l) => (
            <li
              key={l}
              className="border-l-2 pl-4 text-[14.5px] font-medium italic leading-snug text-white/85"
              style={{ borderColor: "var(--gold-border)" }}
            >
              {l}
            </li>
          ))}
        </ul>
      </section>
    ),

  };

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-black">
      <div
        className="mx-auto max-w-2xl px-5 pb-8"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 2rem)" }}
      >
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

        {ordre.map((k) => (
          <div key={k}>{sections[k]}</div>
        ))}

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
