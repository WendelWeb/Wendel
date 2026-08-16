"use client";

import { useEffect, useState } from "react";
import { Repeat, Check } from "lucide-react";
import {
  REPS_PAR_SEANCE,
  REPS_PAR_JOUR,
  BLOCS_REPETITION,
  PROTOCOLE,
  CE_QUE_DIT_LA_SCIENCE,
  cleRepetition,
} from "@/lib/repetition";
import { CRENEAUX, type Creneau } from "@/lib/serment";

interface Seance {
  reps: number;
  acte: string;
}

const VIDE: Seance = { reps: 0, acte: "" };

/**
 * LES SEPT RÉPÉTITIONS.
 *
 * Deux choses le structurent, et aucune n'est décorative.
 *
 * La phrase-noyau ne tourne pas. C'est le seul bloc de l'app dont le contenu
 * est fixe, et c'est délibéré : tout le reste change à chaque visite pour
 * qu'il ne s'habitue pas, celui-ci reste identique parce que la répétition
 * exige l'identique.
 *
 * Et la séance ne se valide pas sans acte. Répéter sans agir dans les cinq
 * minutes, c'est exactement ce qu'il fait déjà en rejouant l'interview dans sa
 * tête : la récompense sans la facture. Le champ est court exprès — on n'y
 * écrit pas une intention, on y écrit ce qu'on vient de faire.
 *
 * Stockage local, par jour et par créneau : rien à migrer, et ça survit à la
 * fermeture de l'app. Ce n'est pas une preuve — c'est un compteur.
 */
export default function RepetitionPanel({
  creneau,
  today,
}: {
  /** Le créneau ouvert, ou null hors créneau. */
  creneau: Creneau | null;
  today: string;
}) {
  const [seance, setSeance] = useState<Seance>(VIDE);
  const [total, setTotal] = useState(0);
  const [ouvert, setOuvert] = useState(false);
  const [science, setScience] = useState(false);

  // Relecture au montage : le localStorage n'existe pas côté serveur, donc
  // tout se fait ici, après l'hydratation.
  useEffect(() => {
    if (!creneau) return;
    try {
      const brut = localStorage.getItem(cleRepetition(today, creneau));
      setSeance(brut ? (JSON.parse(brut) as Seance) : VIDE);
      let t = 0;
      for (const c of CRENEAUX) {
        const b = localStorage.getItem(cleRepetition(today, c.id));
        if (b) t += (JSON.parse(b) as Seance).reps;
      }
      setTotal(t);
    } catch {
      /* un stockage illisible ne doit pas casser l'écran */
    }
  }, [creneau, today]);

  function enregistrer(s: Seance) {
    setSeance(s);
    if (!creneau) return;
    try {
      localStorage.setItem(cleRepetition(today, creneau), JSON.stringify(s));
      let t = 0;
      for (const c of CRENEAUX) {
        const b = localStorage.getItem(cleRepetition(today, c.id));
        if (b) t += (JSON.parse(b) as Seance).reps;
      }
      setTotal(t);
    } catch {
      /* idem */
    }
  }

  const meta = CRENEAUX.find((c) => c.id === creneau);
  const fini = seance.reps >= REPS_PAR_SEANCE;
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
            Les {REPS_PAR_SEANCE} répétitions
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
                {meta?.label} — séance {seance.reps}/{REPS_PAR_SEANCE}
              </p>

              {/* Les trois blocs. Fixes, et c'est voulu : la répétition exige
                  l'identique quand tout le reste de l'app tourne. */}
              <div
                className="mb-4 rounded-xl px-4 py-4"
                style={{ background: "#111", border: "1px solid var(--gold-border)" }}
              >
                {BLOCS_REPETITION.map((b, n) => (
                  <div
                    key={b.id}
                    className={n > 0 ? "mt-4 border-t border-white/10 pt-3.5" : ""}
                  >
                    <p className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.2em] text-white/35">
                      {b.titre}
                    </p>
                    {b.lignes.map((l) => (
                      <p
                        key={l}
                        className="font-display text-[15px] font-bold leading-snug text-white"
                      >
                        {l}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mb-4 flex gap-1.5">
                {Array.from({ length: REPS_PAR_SEANCE }, (_, i) => (
                  <div
                    key={i}
                    className="h-[6px] flex-1 rounded-full transition-all"
                    style={{
                      background:
                        i < seance.reps ? "var(--gold-border)" : "rgba(255,255,255,.1)",
                    }}
                  />
                ))}
              </div>

              {!fini ? (
                <button
                  type="button"
                  onClick={() =>
                    enregistrer({ ...seance, reps: seance.reps + 1 })
                  }
                  className="w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99]"
                  style={{ background: "var(--gold-border)" }}
                >
                  Je viens de la dire à voix haute
                </button>
              ) : (
                <>
                  <p className="mb-2 text-[12.5px] font-semibold leading-relaxed text-white/70">
                    Sept fois, c&apos;est fait. Maintenant la seule partie qui
                    compte : qu&apos;as-tu fait dans les cinq minutes ?
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
                <ul className="mt-2.5 flex flex-col gap-2">
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
