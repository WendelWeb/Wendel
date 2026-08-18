"use client";

import { useState } from "react";
import { Crown, X } from "lucide-react";
import {
  GRANDEUR_TITRE,
  GRANDEUR_OUVERTURE,
  GRANDEUR_SECTIONS,
  GRANDEUR_CLOTURE,
} from "@/lib/grandeur";

/**
 * LA LECTURE — la grandeur, la puissance et la gloire, secteur par secteur.
 *
 * C'est le seul écran de l'app qui ne se lit pas en trente secondes, et c'est
 * voulu : il l'a demandé comme une lecture, pas comme un bandeau. Elle se lit
 * en entier, une fois, quand il en a besoin — pas en passant.
 *
 * Trois choix de forme, et aucun n'est décoratif.
 *
 * L'ordre ne tourne pas, contrairement à tout le reste de l'app. Il monte du
 * plus physique — le sol, les ressources — au plus durable — le droit, la
 * langue, la mémoire. Mélanger cet ordre détruirait l'argument : chaque étage
 * ne tient que parce que celui du dessous a été posé.
 *
 * Chaque section se ferme sur son impact mondial. Il a écarté le cadrage
 * disciplinaire — « pas dans notre contexte de discipline dans l'app, je veux
 * qu'on parle de la merveille du projet » — et il avait raison : une première
 * version ramenait chaque secteur à son réveil de 4 h 30, ce qui était de la
 * discipline déguisée en géopolitique. Ce texte-ci parle du monde.
 *
 * Et les sections s'ouvrent une par une. Un mur de vingt sections se scrolle
 * sans se lire ; un accordéon oblige à choisir d'ouvrir, donc à lire.
 */
export default function GrandeurOverlay({ onClose }: { onClose: () => void }) {
  const [ouverte, setOuverte] = useState<string | null>(
    GRANDEUR_SECTIONS[0]?.id ?? null,
  );

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-black">
      <div
        className="mx-auto max-w-2xl px-5 pb-8 xl:max-w-6xl"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 2rem)" }}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2">
            <Crown size={19} style={{ color: "var(--gold-border)" }} />
            <h1
              className="font-display text-xl font-bold uppercase leading-snug tracking-wide"
              style={{ color: "var(--gold-border)" }}
            >
              {GRANDEUR_TITRE}
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

        <section className="mb-8">
          {GRANDEUR_OUVERTURE.map((l) => (
            <p
              key={l}
              className="mb-3 border-l-[3px] pl-4 text-[14.5px] font-medium leading-[1.6] text-white/90"
              style={{ borderColor: "var(--gold-border)" }}
            >
              {l}
            </p>
          ))}
        </section>

        <div className="colonnes-xl mb-8">
          {GRANDEUR_SECTIONS.map((s, i) => {
            const on = ouverte === s.id;
            return (
              <section
                key={s.id}
                className="overflow-hidden rounded-2xl"
                style={{
                  background: "#0c0c0c",
                  border: on ? "1.5px solid var(--gold-border)" : "1.5px solid #292524",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOuverte(on ? null : s.id)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="tnum flex-shrink-0 text-[11px] font-bold text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display text-[14.5px] font-bold uppercase leading-snug tracking-wide"
                    style={{ color: on ? "var(--gold-border)" : "rgba(255,255,255,.85)" }}
                  >
                    {s.titre}
                  </span>
                </button>

                {on && (
                  <div className="border-t border-white/10 px-4 py-4">
                    <ul className="flex flex-col gap-3">
                      {s.lignes.map((l) => (
                        <li
                          key={l}
                          className="text-[14px] leading-[1.55] text-white/85"
                        >
                          {l}
                        </li>
                      ))}
                    </ul>
                    {/* L'impact mondial ferme chaque secteur. Il a écarté
                        le cadrage disciplinaire : ce texte parle du monde, pas
                        de lui. Trois temps — ce qui change pour tous, qui perd
                        sa position, ce que ça ouvre pour les nations pauvres. */}
                    <div className="mt-4 border-t border-white/10 pt-3.5">
                      <p className="mb-2.5 text-[9.5px] font-bold uppercase tracking-[0.22em] text-red">
                        Ce que le monde devient
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {s.impact.map((l) => (
                          <li
                            key={l}
                            className="text-[13.5px] leading-[1.55] text-white/75"
                          >
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        <section
          className="mb-6 rounded-2xl px-5 py-5"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          {GRANDEUR_CLOTURE.map((l, i) => (
            <p
              key={l}
              className="mb-3 leading-[1.6] last:mb-0"
              style={{
                // La dernière ligne est la seule qu'il retiendra : elle est
                // traitée comme telle.
                fontSize: i === GRANDEUR_CLOTURE.length - 1 ? "16px" : "14px",
                fontWeight: i === GRANDEUR_CLOTURE.length - 1 ? 700 : 500,
                color:
                  i === GRANDEUR_CLOTURE.length - 1
                    ? "var(--gold-border)"
                    : "rgba(255,255,255,.85)",
              }}
            >
              {l}
            </p>
          ))}
        </section>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
          style={{ background: "#15803d" }}
        >
          Je ferme, et je vais le mériter
        </button>
      </div>
    </div>
  );
}
