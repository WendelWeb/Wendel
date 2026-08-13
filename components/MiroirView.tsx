"use client";

import { useEffect, useRef, useState } from "react";
import type { MiroirBloc } from "@/lib/miroir";
import type { EtatSerment } from "@/lib/serment";
import SermentPanel from "./SermentPanel";

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
  etat,
}: {
  langues: MiroirLangue[];
  serment: EtatSerment;
  heure: number;
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
      <div className="mx-auto max-w-3xl">
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

        <p className="mb-8 border-l-[3px] border-red pl-4 text-[15px] font-bold leading-relaxed text-white">
          {L.these}
        </p>

        {L.blocs.map((b) => (
          <section key={b.id} className="mb-9">
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

        <div
          className="mt-10 rounded-2xl px-5 py-6"
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
        </div>
      </div>
    </main>
  );
}
