"use client";

import { useState } from "react";
import { Crown } from "lucide-react";
import {
  EMPIRE_NOM,
  EMPIRE_DOCTRINE,
  EMPIRE_FAITS,
  EMPIRE_ORDRE,
  REGISTRES,
} from "@/lib/empire";
import {
  GRANDEUR_OUVERTURE,
  GRANDEUR_SECTIONS,
  GRANDEUR_CLOTURE,
} from "@/lib/grandeur";

/**
 * LA PAGE DE L'EMPIRE.
 *
 * Il l'a demandée le jour où il a levé le verrou et annoncé le changement de
 * régime : plus de rêverie, plus de pensée positive, action massive. C'est
 * cohérent, et c'est pour ça que cette page n'est pas construite comme le
 * miroir. Le miroir dit ce qu'il est ; celle-ci dit ce que la chose sera —
 * sans un mot sur lui, sans un rappel à sa journée, sans une consigne.
 *
 * Quatre registres tiennent la page, et ce sont ses quatre verbes : ce que
 * l'empire FERA, ce qu'il DOMINERA, ce qu'il CONTRÔLERA, ce qu'il CHANGERA.
 * Ils sont dans cet ordre parce qu'il est le seul qui tienne : on ne domine
 * pas ce qu'on n'a pas bâti, on ne contrôle pas ce qu'on ne domine pas, et
 * rien ne change tant qu'on ne contrôle rien.
 *
 * Puis la lecture entière, trente secteurs, en accordéon — un mur de trente
 * se scrolle sans se lire ; ouvrir demande de choisir, donc de lire.
 */
export default function EmpireView() {
  const [registre, setRegistre] = useState(REGISTRES[0].id);
  const [section, setSection] = useState<string | null>(null);

  const R = REGISTRES.find((r) => r.id === registre) ?? REGISTRES[0];

  return (
    <main className="min-h-[100dvh] bg-black px-4 pb-28 pt-6">
      <div className="mx-auto max-w-3xl">
        {/* Le fronton — la doctrine et les faits, pas un slogan */}
        <header className="mb-7">
          <div className="mb-3 flex items-center gap-2">
            <Crown size={18} style={{ color: "var(--gold-border)" }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/35">
              Après Haïti
            </span>
          </div>
          <h1
            className="font-display text-[40px] font-bold uppercase leading-none tracking-tight"
            style={{ color: "var(--gold-border)" }}
          >
            {EMPIRE_NOM}
          </h1>
          <p className="mt-3.5 border-l-[3px] border-red pl-4 text-[14px] font-semibold leading-relaxed text-white">
            {EMPIRE_DOCTRINE}
          </p>
        </header>

        <div className="mb-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {EMPIRE_FAITS.map((f) => (
            <div
              key={f.cle}
              className="rounded-xl px-3 py-2.5"
              style={{ background: "#0c0a06", border: "1px solid #3f3520" }}
            >
              <div className="text-[8.5px] font-bold uppercase tracking-[0.16em] text-white/35">
                {f.cle}
              </div>
              <div
                className="tnum mt-1 text-[13.5px] font-bold leading-tight"
                style={{ color: "var(--gold-border)" }}
              >
                {f.valeur}
              </div>
            </div>
          ))}
        </div>

        {/* Les quatre verbes */}
        <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {REGISTRES.map((r) => {
            const on = r.id === registre;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRegistre(r.id)}
                className="rounded-xl px-3 py-3 text-[12.5px] font-bold uppercase tracking-wide transition active:scale-[0.98]"
                style={
                  on
                    ? { background: "var(--gold-border)", color: "#000" }
                    : { background: "#141414", color: "rgba(255,255,255,.5)" }
                }
              >
                {r.verbe}
              </button>
            );
          })}
        </div>

        <section
          className="mb-8 rounded-2xl px-5 py-5"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          <p className="mb-4 text-[12px] leading-relaxed text-white/45">
            {R.note}
          </p>
          <ul className="flex flex-col gap-3">
            {R.lignes.map((l) => (
              <li
                key={l}
                className="border-l-2 pl-3.5 text-[14px] leading-[1.55] text-white/90"
                style={{ borderColor: "var(--gold-border)" }}
              >
                {l}
              </li>
            ))}
          </ul>
        </section>

        {/* La lecture — trente secteurs */}
        <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          La lecture — trente secteurs de dominance
        </h2>
        <p className="mb-5 text-[12px] leading-relaxed text-white/40">
          {EMPIRE_ORDRE}
        </p>

        <section className="mb-8">
          {GRANDEUR_OUVERTURE.map((l) => (
            <p
              key={l}
              className="mb-3 border-l-[3px] pl-4 text-[14px] leading-[1.6] text-white/85"
              style={{ borderColor: "#3f3520" }}
            >
              {l}
            </p>
          ))}
        </section>

        <div className="mb-8 flex flex-col gap-2.5">
          {GRANDEUR_SECTIONS.map((s, i) => {
            const on = section === s.id;
            return (
              <section
                key={s.id}
                className="overflow-hidden rounded-2xl"
                style={{
                  background: "#0c0c0c",
                  border: on
                    ? "1.5px solid var(--gold-border)"
                    : "1.5px solid #292524",
                }}
              >
                <button
                  type="button"
                  onClick={() => setSection(on ? null : s.id)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="tnum flex-shrink-0 text-[11px] font-bold text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="font-display text-[14px] font-bold uppercase leading-snug tracking-wide"
                    style={{
                      color: on ? "var(--gold-border)" : "rgba(255,255,255,.85)",
                    }}
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
          className="rounded-2xl px-5 py-5"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          {GRANDEUR_CLOTURE.map((l, i) => (
            <p
              key={l}
              className="mb-3 leading-[1.6] last:mb-0"
              style={{
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
      </div>
    </main>
  );
}
