"use client";

import { useState } from "react";
import { Crown } from "lucide-react";
import {
  EMPIRE_NOM,
  EMPIRE_DOCTRINE,
  EMPIRE_AN_ZERO,
  EMPIRE_FAITS,
  EMPIRE_ORDRE,
  REGISTRES,
} from "@/lib/empire";
import {
  CHANTIERS_TITRE,
  CHANTIERS_INTRO,
  FAMILLES_CHANTIERS,
  CHANTIERS,
} from "@/lib/chantiers";
import {
  ECHELLE_TITRE,
  ECHELLE_INTRO,
  MESURES,
  NATURES,
  ECHELLE_SORTIE,
} from "@/lib/echelle";
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
  const [famille, setFamille] = useState(FAMILLES_CHANTIERS[0].id);
  const [chantier, setChantier] = useState<string | null>(null);

  const R = REGISTRES.find((r) => r.id === registre) ?? REGISTRES[0];

  return (
    <main className="min-h-[100dvh] bg-black px-4 pb-28 pt-6">
      {/* Aucun plafond au-delà de xl : sur un 27 pouces, 1280px centrés
          laissaient 640px de vide de chaque côté. Rien ne s'étire pour autant —
          chaque paragraphe de cette page porte .mesure (68 caractères) et
          chaque liste vit dans .colonnes-xl. C'est le nombre de colonnes qui
          absorbe la largeur, jamais la longueur des lignes. */}
      <div className="mx-auto max-w-3xl xl:max-w-none">
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
          <p className="mesure mt-3.5 border-l-[3px] border-red pl-4 text-[14px] font-semibold leading-relaxed text-white">
            {EMPIRE_DOCTRINE}
          </p>

          {/* L an zero. La table des faits en dessous le datait de 2033 ; il a
              corrige lui-meme. L empire ne commence pas a la premiere pierre,
              il commence la ou il prend forme — et il se nourrit de ce qu il
              ne dilapide pas. C est la jonction du pacte et du projet. */}
          <div
            className="mesure mt-4 rounded-xl px-4 py-3.5"
            style={{ background: "#0c0a06", border: "1px solid #3f3520" }}
          >
            {EMPIRE_AN_ZERO.map((l, i) => (
              <p
                key={l}
                className={
                  i === 0
                    ? "font-display text-[19px] font-bold uppercase leading-none tracking-tight"
                    : "mt-2 text-[13px] leading-relaxed text-white/70"
                }
                style={i === 0 ? { color: "var(--gold-border)" } : undefined}
              >
                {l}
              </p>
            ))}
          </div>
        </header>

        <div className="mb-7 grid grid-cols-2 items-start gap-2 sm:grid-cols-3">
          {[...EMPIRE_FAITS, { cle: "Chantiers", valeur: `${CHANTIERS.length}` }].map((f) => (
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
          <p className="mesure mb-4 text-[12px] leading-relaxed text-white/45">
            {R.note}
          </p>
          <ul className="colonnes-xl">
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

        {/* LES CHANTIERS — où va le capital.

            Quarante-deux chantiers, six familles. L'ordre des familles suit
            celui des deux domaines qu'il a nommés en premier : le vivant, puis
            le calcul, avant la matière, l'orbite, les flux et la règle.

            Une famille à la fois, un chantier à la fois : quatre cent quatorze
            lignes affichées d'un coup ne se lisent pas, elles se scrollent. */}
        <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          {CHANTIERS_TITRE}
        </h2>
        <p className="mesure mb-4 text-[12px] leading-relaxed text-white/40">
          {CHANTIERS_INTRO}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {FAMILLES_CHANTIERS.map((f) => {
            const on = f.id === famille;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFamille(f.id);
                  setChantier(null);
                }}
                className="rounded-xl px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-wide transition active:scale-[0.98]"
                style={
                  on
                    ? { background: "var(--gold-border)", color: "#000" }
                    : { background: "#141414", color: "rgba(255,255,255,.5)" }
                }
              >
                {f.titre}
                <span className="ml-2 opacity-60">{f.chantiers.length}</span>
              </button>
            );
          })}
        </div>

        {FAMILLES_CHANTIERS.filter((f) => f.id === famille).map((f) => (
          <div key={f.id} className="mb-9">
            <p className="mesure mb-3.5 text-[12px] leading-relaxed text-white/45">
              {f.note}
            </p>
            <div className="grid items-start gap-2.5">
              {f.chantiers.map((c) => {
                const on = chantier === c.id;
                return (
                  <section
                    key={c.id}
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
                      onClick={() => setChantier(on ? null : c.id)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="flex-shrink-0 text-[15px]">{c.emoji}</span>
                      <span
                        className="font-display text-[13.5px] font-bold uppercase leading-snug tracking-wide"
                        style={{
                          color: on
                            ? "var(--gold-border)"
                            : "rgba(255,255,255,.85)",
                        }}
                      >
                        {c.titre}
                      </span>
                    </button>

                    {on && (
                      <ul className="flex flex-col gap-3 border-t border-white/10 px-4 py-4">
                        {c.lignes.map((l) => (
                          <li
                            key={l}
                            className="text-[13.5px] leading-[1.55] text-white/85"
                          >
                            {l}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                );
              })}
            </div>
          </div>
        ))}

        {/* L'ÉCHELLE — Haïti posée à côté du corridor.

            Il a demandé que sa Vision pour Haïti ait l'air d'une fourmi devant
            celle-ci. C'était déjà vrai dans les chiffres, mais nulle part
            visible : les deux vivaient dans deux sections séparées, et on ne
            compare pas ce qu'on ne voit pas ensemble.

            Les rapports sont calculés entre ses propres chiffres et ses
            propres chiffres — jamais entre les siens et une estimation
            complaisante. Sinon le tableau ne prouverait rien. */}
        <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          {ECHELLE_TITRE}
        </h2>
        <p className="mesure mb-4 text-[12px] leading-relaxed text-white/40">
          {ECHELLE_INTRO}
        </p>

        <div
          className="mb-4 overflow-hidden rounded-2xl"
          style={{ border: "1.5px solid #292524" }}
        >
          <div
            className="grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 sm:grid-cols-[1.1fr_1fr_1fr_auto]"
            style={{ background: "#141414" }}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/35">
              Mesure
            </span>
            <span className="hidden text-[9px] font-bold uppercase tracking-[0.16em] text-white/35 sm:block">
              Haïti
            </span>
            <span
              className="hidden text-[9px] font-bold uppercase tracking-[0.16em] sm:block"
              style={{ color: "var(--gold-border)" }}
            >
              NOVA-AXE
            </span>
            <span className="text-right text-[9px] font-bold uppercase tracking-[0.16em] text-red">
              Rapport
            </span>
          </div>

          {MESURES.map((m) => (
            <div
              key={m.quoi}
              className="grid grid-cols-[1fr_auto] items-baseline gap-x-3 gap-y-1 border-t border-white/10 px-4 py-3 sm:grid-cols-[1.1fr_1fr_1fr_auto]"
            >
              <span className="text-[12.5px] font-semibold text-white/85">
                {m.quoi}
              </span>
              <span className="tnum order-3 text-[12px] leading-snug text-white/45 sm:order-none">
                {m.haiti}
              </span>
              <span
                className="tnum order-4 text-[12.5px] font-bold leading-snug sm:order-none"
                style={{ color: "var(--gold-border)" }}
              >
                {m.nova}
              </span>
              <span className="tnum text-right text-[12.5px] font-bold text-red">
                {m.rapport}
              </span>
            </div>
          ))}
        </div>

        {/* Les lignes où le rapport ne se calcule plus : la chose change de
            nature, et c'est là que la fourmi devient une autre espèce. */}
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
          Et là où ça cesse d&apos;être une question de taille
        </p>
        <div className="colonnes-xl mb-4">
          {NATURES.map((s: (typeof NATURES)[number]) => (
            <div
              key={s.axe}
              className="rounded-2xl px-4 py-4"
              style={{ background: "#0c0c0c", border: "1px solid #292524" }}
            >
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
                {s.axe}
              </p>
              <p className="mb-2 text-[12.5px] leading-snug text-white/45">
                {s.haiti}
              </p>
              <p
                className="border-l-2 pl-3 text-[13px] font-semibold leading-snug"
                style={{ borderColor: "var(--gold-border)", color: "var(--gold-border)" }}
              >
                {s.nova}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mb-9 rounded-2xl px-5 py-4"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          {ECHELLE_SORTIE.map((l, i) => (
            <p
              key={l}
              className={`mb-2 leading-relaxed last:mb-0${
                i === ECHELLE_SORTIE.length - 1 ? " [column-span:all]" : ""
              }`}
              style={{
                fontSize: i === ECHELLE_SORTIE.length - 1 ? "15px" : "13px",
                fontWeight: i === ECHELLE_SORTIE.length - 1 ? 700 : 500,
                color:
                  i === ECHELLE_SORTIE.length - 1
                    ? "var(--gold-border)"
                    : "rgba(255,255,255,.8)",
              }}
            >
              {l}
            </p>
          ))}
        </div>

        {/* La lecture — trente secteurs */}
        <h2 className="mb-1 text-[10.5px] font-bold uppercase tracking-[0.22em] text-red">
          La lecture — trente secteurs de dominance
        </h2>
        <p className="mesure mb-5 text-[12px] leading-relaxed text-white/40">
          {EMPIRE_ORDRE}
        </p>

        {/* Neuf paragraphes autonomes. Chacun se tenait seul sur une colonne
            de 68 caracteres dans un conteneur devenu large : la mesure de
            lecture etait juste, les mille pixels a droite etaient vides. En
            colonnes, c'est la COLONNE qui donne la mesure et non plus un
            plafond — meme longueur de ligne, ecran rempli. */}
        <section className="mb-8 columns-[26rem] gap-x-8 [&>p]:break-inside-avoid">
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

        <div className="mb-8 grid items-start gap-2.5">
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

        {/* La cloture passe en colonnes comme le reste, a une exception : sa
            derniere ligne est la chute. column-span:all interrompt le flux et
            la pose en travers de toute la largeur. Dans une colonne, la seule
            ligne qu'il retiendra se serait perdue au milieu de l'ecran. */}
        <section
          className="columns-[26rem] gap-x-8 rounded-2xl px-5 py-5 [&>p]:break-inside-avoid"
          style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
        >
          {GRANDEUR_CLOTURE.map((l, i) => (
            <p
              key={l}
              className={`mb-3 leading-[1.6] last:mb-0${
                i === GRANDEUR_CLOTURE.length - 1 ? " [column-span:all]" : ""
              }`}
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
