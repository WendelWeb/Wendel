"use client";

import { useEffect, useState } from "react";
import { Repeat, Check } from "lucide-react";
import {
  BLOCS_REPETITION,
  SACRIFICE_OUVERTURE,
  SACRIFICE_POUR,
  REPS_PAR_SEANCE_TOTAL,
  REPS_PAR_JOUR,
  PROTOCOLE,
  CE_QUE_DIT_LA_SCIENCE,
  cleRepetition,
} from "@/lib/repetition";
import { CRENEAUX, type Creneau } from "@/lib/serment";

interface Seance {
  /** Les répétitions faites, bloc par bloc. */
  reps: number[];
  acte: string;
}

const VIDE: Seance = { reps: BLOCS_REPETITION.map(() => 0), acte: "" };

function lire(brut: string | null): Seance {
  if (!brut) return { ...VIDE, reps: [...VIDE.reps] };
  try {
    const s = JSON.parse(brut) as Partial<Seance>;
    const reps = BLOCS_REPETITION.map((_, i) => s.reps?.[i] ?? 0);
    return { reps, acte: s.acte ?? "" };
  } catch {
    return { ...VIDE, reps: [...VIDE.reps] };
  }
}

/**
 * LES RÉPÉTITIONS — 21 + 7, trois fois par jour.
 *
 * Le premier bloc énumère : l'ouverture ne bouge pas, la destination change à
 * chaque passage. C'est la seule forme qui tienne pour vingt et une
 * répétitions — redire le même paragraphe vingt et une fois ferait quatorze
 * minutes, et surtout la bouche finirait par le produire sans que l'oreille
 * l'écoute. C'est exactement ce qui a tué les feuilles collées au mur.
 *
 * Le second ne bouge pas du tout : sept fois à l'identique. C'est le seul
 * contenu fixe de toute l'app, et c'est délibéré — tout le reste tourne pour
 * qu'il ne s'habitue pas, celui-ci reste identique parce que la répétition
 * exige l'identique.
 *
 * Et la séance ne se valide pas sans acte nommé dans les cinq minutes.
 * Répéter sans agir, c'est ce qu'il fait déjà en rejouant l'interview dans sa
 * tête : la récompense sans la facture.
 */
export default function RepetitionPanel({
  creneau,
  today,
}: {
  creneau: Creneau | null;
  today: string;
}) {
  const [seance, setSeance] = useState<Seance>(VIDE);
  const [total, setTotal] = useState(0);
  const [ouvert, setOuvert] = useState(false);
  const [science, setScience] = useState(false);

  function recompterJour() {
    let t = 0;
    for (const c of CRENEAUX) {
      const s = lire(localStorage.getItem(cleRepetition(today, c.id)));
      t += s.reps.reduce((a, b) => a + b, 0);
    }
    setTotal(t);
  }

  useEffect(() => {
    if (!creneau) return;
    try {
      setSeance(lire(localStorage.getItem(cleRepetition(today, creneau))));
      recompterJour();
    } catch {
      /* un stockage illisible ne doit pas casser l'écran */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creneau, today]);

  function enregistrer(s: Seance) {
    setSeance(s);
    if (!creneau) return;
    try {
      localStorage.setItem(cleRepetition(today, creneau), JSON.stringify(s));
      recompterJour();
    } catch {
      /* idem */
    }
  }

  const meta = CRENEAUX.find((c) => c.id === creneau);
  const faitesSeance = seance.reps.reduce((a, b) => a + b, 0);
  // Le bloc en cours : le premier qui n'est pas terminé.
  const iBloc = BLOCS_REPETITION.findIndex((b, i) => seance.reps[i] < b.fois);
  const bloc = iBloc >= 0 ? BLOCS_REPETITION[iBloc] : null;
  const fini = iBloc < 0;
  const valide = fini && seance.acte.trim().length > 0;

  return (
    <section
      className="mb-7 overflow-hidden rounded-2xl"
      style={{ background: "#0c0c0c", border: "1.5px solid #292524" }}
    >
      <button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2.5">
          <Repeat size={17} style={{ color: "var(--gold-border)" }} />
          <span className="font-display text-[15px] font-bold uppercase tracking-wide text-white">
            Les répétitions
          </span>
        </span>
        <span className="tnum flex-shrink-0 text-[13px] font-bold text-white/50">
          {total}/{REPS_PAR_JOUR}
        </span>
      </button>

      {ouvert && (
        <div className="border-t border-white/10 px-5 py-4">
          {!creneau ? (
            <p className="text-[13px] leading-relaxed text-white/50">
              Aucun créneau ouvert. Les séances se font au réveil, à midi et
              avant de dormir — c&apos;est l&apos;espacement qui travaille, pas
              le volume.
            </p>
          ) : (
            <>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                {meta?.label} — {faitesSeance}/{REPS_PAR_SEANCE_TOTAL}
              </p>

              {bloc ? (
                <>
                  <p className="mb-1 text-[9.5px] font-bold uppercase tracking-[0.2em] text-red">
                    {bloc.titre} — {seance.reps[iBloc] + 1}/{bloc.fois}
                  </p>
                  <p className="mb-3 text-[11.5px] leading-relaxed text-white/40">
                    {bloc.role}
                  </p>

                  <div
                    className="mesure mx-auto mb-4 rounded-xl px-4 py-4"
                    style={{ background: "#111", border: "1px solid var(--gold-border)" }}
                  >
                    {bloc.enumere ? (
                      <>
                        <p className="font-display text-[15px] font-bold leading-snug text-white">
                          {SACRIFICE_OUVERTURE}
                        </p>
                        <p
                          className="mt-1.5 font-display text-[16px] font-bold leading-snug"
                          style={{ color: "var(--gold-border)" }}
                        >
                          {SACRIFICE_POUR[seance.reps[iBloc]]}
                        </p>
                      </>
                    ) : (
                      bloc.lignes.map((l) => (
                        <p
                          key={l}
                          className="font-display text-[15px] font-bold leading-snug text-white"
                        >
                          {l}
                        </p>
                      ))
                    )}
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1">
                    {Array.from({ length: bloc.fois }, (_, i) => (
                      <div
                        key={i}
                        className="h-[5px] min-w-[8px] flex-1 rounded-full transition-all"
                        style={{
                          background:
                            i < seance.reps[iBloc]
                              ? "var(--gold-border)"
                              : "rgba(255,255,255,.1)",
                        }}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const reps = [...seance.reps];
                      reps[iBloc] += 1;
                      enregistrer({ ...seance, reps });
                    }}
                    className="w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99]"
                    style={{ background: "var(--gold-border)" }}
                  >
                    Je viens de la dire à voix haute
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-2 text-[12.5px] font-semibold leading-relaxed text-white/70">
                    {REPS_PAR_SEANCE_TOTAL} répétitions, c&apos;est fait.
                    Maintenant la seule partie qui compte : qu&apos;as-tu fait
                    dans les cinq minutes ?
                  </p>
                  <input
                    type="text"
                    value={seance.acte}
                    onChange={(e) =>
                      enregistrer({ ...seance, acte: e.target.value })
                    }
                    placeholder="L'acte, pas l'intention. En trois mots."
                    className="mb-3 w-full rounded-xl px-4 py-3 text-[14px] text-white outline-none"
                    style={{ background: "#161616", border: "1px solid #3f3f46" }}
                  />
                  <div
                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-[13px] font-semibold"
                    style={{
                      background: valide ? "rgba(22,163,74,.16)" : "#161616",
                      color: valide ? "#4ade80" : "rgba(255,255,255,.4)",
                    }}
                  >
                    <Check size={15} className="flex-shrink-0" />
                    {valide
                      ? "Séance validée. Elle compte."
                      : "Sans acte nommé, la séance ne compte pas."}
                  </div>
                </>
              )}

              <ul className="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-3.5">
                {PROTOCOLE.map((l) => (
                  <li key={l} className="text-[12px] leading-snug text-white/45">
                    {l}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => setScience((s) => !s)}
                className="mt-3 text-[11.5px] font-semibold text-white/35 underline"
              >
                {science ? "Masquer" : "Ce que dit vraiment la science"}
              </button>

              {science && (
                <ul className="mt-2.5 grid items-start gap-2 xl:grid-cols-2 xl:gap-x-10">
                  {CE_QUE_DIT_LA_SCIENCE.map((l) => (
                    <li key={l} className="text-[12px] leading-relaxed text-white/50">
                      {l}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
