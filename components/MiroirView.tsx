"use client";

import { useEffect, useRef, useState } from "react";
import type { MiroirBloc } from "@/lib/miroir";
import type { EtatSerment } from "@/lib/serment";
import SermentPanel from "./SermentPanel";
import RepetitionPanel from "./RepetitionPanel";
import EnvieOverlay from "./EnvieOverlay";
import PourquoiOverlay from "./PourquoiOverlay";
import SerieuxOverlay from "./SerieuxOverlay";
import GrandeurOverlay from "./GrandeurOverlay";
import { Flame, Target, ShieldCheck, Crown } from "lucide-react";
import { LA_REPETITION } from "@/lib/inconfort";
import { ECARTS, ECART_SORTIE } from "@/lib/ecart";

export interface MiroirLangue {
  code: "en" | "fr" | "ht";
  nom: string;
  these: string;
  sortie: string;
  sortieLabel: string;
  blocs: MiroirBloc[];
}

/**
 * L'écran du miroir — la première chose qu'il voit en ouvrant l'app.
 *
 * Rien d'autre : pas de mantra, pas de citations, pas de chapitre. Il l'a
 * demandé après avoir écrit lui-même que les outils qu'il fabrique lui servent
 * à ne pas s'en servir. Il ne reste que le constat, dans les trois langues de
 * son manifeste quotidien.
 *
 * Pas d'ornement : fond noir, texte blanc, une ligne par affirmation. Ce qui
 * est écrit n'a besoin d'aucune mise en scène pour porter.
 */
export default function MiroirView({
  langues,
  serment,
  heure,
  today,
  etat,
}: {
  langues: MiroirLangue[];
  serment: EtatSerment;
  heure: number;
  /** La date du jour a Haiti, pour le compteur local des repetitions. */
  today: string;
  etat: {
    daysToJan: number;
    daysTo30: number;
    retentionDays: number;
    coreDone: number;
    coreTotal: number;
    streak: number;
  };
}) {
  const [code, setCode] = useState<"en" | "fr" | "ht">("fr");
  const L = langues.find((l) => l.code === code) ?? langues[0];

  // La cinquième obligation : avoir relu tout ce qu'il a écrit. Une case à
  // cocher ne prouverait rien, alors l'écran vérifie lui-même — la case ne
  // s'ouvre qu'une fois ce repère atteint, tout en bas. Changer de langue
  // remet le compteur à zéro : on ne lit pas l'anglais en ayant scrollé le
  // français.
  const [envie, setEnvie] = useState(false);
  const [pourquoi, setPourquoi] = useState(false);
  const [serieux, setSerieux] = useState(false);
  const [grandeur, setGrandeur] = useState(false);
  // L ordre des ecarts change a chaque ouverture, comme le reste.
  const [ecarts] = useState(() => {
    const c = [...ECARTS];
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    return c;
  });
  const [luJusquAuBout, setLu] = useState(false);
  const finRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setLu(false), [code]);

  useEffect(() => {
    const cible = finRef.current;
    if (!cible) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setLu(true);
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    obs.observe(cible);
    return () => obs.disconnect();
  }, [code]);

  return (
    <main className="min-h-[100dvh] bg-black px-4 pb-28 pt-6">
      <div className="mx-auto max-w-3xl xl:max-w-7xl">
        {/* Ses chiffres — le seul contexte, et il est factuel */}
        <div className="mb-5 grid grid-cols-4 gap-2">
          {[
            { v: `J−${etat.daysToJan}`, l: "1er janvier" },
            { v: String(etat.retentionDays), l: "Rétention" },
            { v: `${etat.coreDone}/${etat.coreTotal}`, l: "Noyau" },
            { v: String(etat.streak), l: "Série" },
          ].map((x) => (
            <div
              key={x.l}
              className="rounded-xl px-2 py-3 text-center"
              style={{ background: "#141414" }}
            >
              <div className="tnum text-[17px] font-bold leading-none text-white">
                {x.v}
              </div>
              <div className="mt-1.5 text-[8.5px] font-semibold uppercase tracking-[0.14em] text-white/35">
                {x.l}
              </div>
            </div>
          ))}
        </div>

        {/* Le bouton de l'envie — en premier, avant tout le reste. Quand ça
            monte, il ne doit pas avoir à chercher. Il remplace la page Urgence
            qu'il a fermée avec les autres. */}
        <div className="mb-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <button
            type="button"
            onClick={() => setEnvie(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
            style={{ background: "var(--red)" }}
          >
            <Flame size={18} />
            Je ressens l&apos;envie
          </button>

          {/* Le POURQUOI reste ouvert pendant les 30 jours, contrairement à la
              Vision. La Vision dit ce qu'il veut obtenir — elle se mérite. Le
              POURQUOI est ce qui le fait tenir quand il n'a plus envie : le
              fermer serait retirer le carburant en pleine côte. */}
          <button
            type="button"
            onClick={() => setPourquoi(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-[14px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99]"
            style={{ background: "var(--gold-border)" }}
          >
            <Target size={17} />
            Pourquoi je fais tout ça
          </button>

          {/* La liste entière, quand c'est lui qui la demande. Les bandeaux des
              pages n'en montrent que six à la fois — ici, tout, d'un coup. */}
          <button
            type="button"
            onClick={() => setSerieux(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-[14px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
            style={{ background: "#0f0a0a", border: "1.5px solid #7f1d1d" }}
          >
            <ShieldCheck size={17} className="text-red" />
            Je suis sérieux
          </button>

          {/* La lecture — le seul ecran long de l app, et le seul dont l ordre
              ne tourne pas : il monte du sol jusqu a la memoire. */}
          <button
            type="button"
            onClick={() => setGrandeur(true)}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-[14px] font-bold uppercase tracking-wide transition active:scale-[0.99]"
            style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)", color: "var(--gold-border)" }}
          >
            <Crown size={17} />
            La grandeur — la lecture
          </button>
        </div>

        {grandeur && <GrandeurOverlay onClose={() => setGrandeur(false)} />}

        {envie && (
          <EnvieOverlay
            onClose={() => setEnvie(false)}
            jourActuel={serment.jourActuel}
            record={serment.record}
          />
        )}
        {pourquoi && <PourquoiOverlay onClose={() => setPourquoi(false)} />}
        {serieux && (
          <SerieuxOverlay
            onClose={() => setSerieux(false)}
            daysToJan={etat.daysToJan}
          />
        )}

        {/* L'ÉCART — le seul endroit de l'app où la cible et le réel sont sur
            la même ligne. Séparés, il peut croire aux deux ; collés, ils ne se
            supportent plus. */}
        <section
          className="mb-7 rounded-2xl px-4 py-5"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          <div className="mb-4 flex items-baseline justify-between gap-3 px-1">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
              L&apos;écart, ce matin
            </h2>
            <span className="tnum flex-shrink-0 text-[13px] font-bold text-white/70">
              J−{etat.daysToJan}
            </span>
          </div>

          <ul className="grid items-start gap-3 xl:grid-cols-2 xl:gap-x-10">
            {ecarts.map((e) => (
              <li key={e.cible} className="grid grid-cols-2 gap-3 px-1">
                <span
                  className="text-[12.5px] font-bold leading-snug"
                  style={{ color: "var(--gold-border)" }}
                >
                  {e.cible}
                </span>
                <span className="text-[12.5px] leading-snug text-white/55">
                  {e.aujourdhui}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2 border-t border-white/12 px-1 pt-3.5">
            {ECART_SORTIE.map((l) => (
              <p key={l} className="mesure text-[12px] leading-relaxed text-white/45">
                {l}
              </p>
            ))}
          </div>
        </section>

        {/* Les sept repetitions, juste avant le serment : la phrase se dit
            avant de cocher, pas apres. */}
        <RepetitionPanel creneau={serment.ouvert} today={today} />

        {/* Le mécanisme des 30 jours — avant le constat, parce que c'est la
            seule chose sur cet écran qui puisse changer une ligne du constat. */}
        <SermentPanel
          etat={serment}
          heure={heure}
          luJusquAuBout={luJusquAuBout}
        />

        {/* Les trois langues de son manifeste : EN → FR → Kreyòl */}
        <div className="mb-6 flex gap-2">
          {langues.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setCode(l.code)}
              className="flex-1 rounded-lg py-2 text-[12.5px] font-bold uppercase tracking-wide transition"
              style={
                l.code === code
                  ? { background: "#dc2626", color: "#fff" }
                  : { background: "#141414", color: "rgba(255,255,255,.45)" }
              }
            >
              {l.nom}
            </button>
          ))}
        </div>

        <p className="mesure mb-8 border-l-[3px] border-red pl-4 text-[15px] font-bold leading-relaxed text-white">
          {L.these}
        </p>

        <div className="mosaique mb-[26px] xl:mb-9">
        {L.blocs.map((b) => (
          <section key={b.id} className="pb-[38px] xl:pb-0">
            <h2 className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
              {b.titre}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {b.lignes.map((ligne, i) => (
                <li
                  key={i}
                  className="text-[14.5px] font-medium leading-[1.55] text-white/90"
                >
                  {ligne}
                </li>
              ))}
            </ul>
          </section>
        ))}
        </div>

        <div
          className="mesure mt-10 rounded-2xl px-5 py-6"
          style={{ background: "#141414", border: "1.5px solid #3f3f46" }}
        >
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
            {L.sortieLabel}
          </p>
          <p
            className="text-[15px] font-bold leading-relaxed"
            style={{ color: "var(--gold-border)" }}
          >
            {L.sortie}
          </p>
        </div>

        {/* Le repère de fin. L'atteindre débloque la cinquième case. */}
        <div ref={finRef} className="pt-8 text-center">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.2em] text-white/25">
            Tu as tout relu
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/35">
            Remonte en haut : la cinquième case est maintenant ouverte.
          </p>
          {/* Sa consigne sur l'app elle-même : revenir, relire, répéter.
              Elle a sa place ici, à l'endroit exact où il est tenté de se
              dire qu'il a fini. */}
          <p
            className="mx-auto mt-6 max-w-md text-[12.5px] font-semibold leading-relaxed"
            style={{ color: "var(--gold-border)" }}
          >
            {LA_REPETITION[0]}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[12px] leading-relaxed text-white/40">
            {LA_REPETITION[1]} {LA_REPETITION[5]}
          </p>
        </div>
      </div>
    </main>
  );
}
