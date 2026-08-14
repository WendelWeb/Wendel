"use client";

import { useState, useTransition } from "react";
import { Flame, ChevronRight, X, Brain, GitBranch, Crown } from "lucide-react";
import {
  ETAT_ACTUEL,
  SYSTEMES,
  CE_QUE_LA_DECISION_FAIT,
  ARBRE,
  LE_PRIX,
  NB_PHRASES,
  SORTIES,
  tirerPhrases,
} from "@/lib/envie";
import { DECLARATION_FINALE, DECLARATION_SCEAU } from "@/lib/declaration";
import { RECHUTES, type Rechute } from "@/lib/serment";
import { DESCENTE, MONTEE } from "@/lib/consequence";
import ConsequencePanel from "./ConsequencePanel";
import { declarerRechuteAction } from "@/app/serment-actions";
import { logStoppAction } from "@/app/actions";

type Etape =
  | "etat"
  | "cerveau"
  | "phrases"
  | "prix"
  | "arbre"
  | "decision"
  | "tiens"
  | "cede";

/**
 * L'écran de l'envie.
 *
 * Trois temps, et aucun raccourci : l'état réel, puis vingt lignes tapées une
 * par une, puis une décision. On ne peut pas fermer avant d'avoir décidé — la
 * croix n'apparaît qu'au dernier écran. C'est le seul endroit de l'app où je
 * retire la sortie, et c'est voulu : à cet instant précis, fermer sans décider
 * EST la rechute.
 *
 * Vingt taps prennent deux à trois minutes. C'est la durée d'une vague : elle
 * passe pendant qu'il lit.
 */
export default function EnvieOverlay({ onClose }: { onClose: () => void }) {
  const [etape, setEtape] = useState<Etape>("etat");
  const [phrases] = useState(() => tirerPhrases());
  const [i, setI] = useState(0);
  const [pending, start] = useTransition();

  function avancer() {
    if (i + 1 >= phrases.length) setEtape("prix");
    else setI((n) => n + 1);
  }

  function tenir() {
    start(async () => {
      try {
        await logStoppAction();
      } catch {
        /* le compteur n'est pas critique */
      }
      onClose();
    });
  }

  function rechute(kind: Rechute) {
    start(async () => {
      await declarerRechuteAction(kind);
      onClose();
    });
  }

  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-black">
      <div className="mx-auto max-w-lg px-5 py-8">
        {etape === "etat" && (
          <>
            <div className="mb-6 flex items-center gap-2">
              <Flame size={18} className="text-red" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-red">
                Avant tout, regarde où tu en es
              </h2>
            </div>

            {ETAT_ACTUEL.map((e) => (
              <section key={e.categorie} className="mb-6">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                  {e.categorie}
                </p>
                <ul className="flex flex-col gap-2">
                  {e.lignes.map((l) => (
                    <li
                      key={l}
                      className="text-[14px] font-medium leading-snug text-white/90"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <p className="mb-6 border-l-[3px] border-red pl-4 text-[13.5px] leading-relaxed text-white/60">
              Voilà l&apos;homme qui ressent cette envie. Ce n&apos;est pas un
              homme qui peut se le permettre.
            </p>

            <button
              type="button"
              onClick={() => setEtape("cerveau")}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
              style={{ background: "#7f1d1d" }}
            >
              Ce qui se passe dans ma tête, là
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {etape === "cerveau" && (
          <>
            <div className="mb-2 flex items-center gap-2">
              <Brain size={18} className="text-white/50" />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Deux systèmes, une seule tête
              </h2>
            </div>
            <p className="mb-6 text-[13px] leading-relaxed text-white/55">
              Ce n&apos;est pas toi contre une envie. C&apos;est un circuit contre un
              autre — et tant que tu crois te battre contre toi-même, tu perds.
            </p>

            {SYSTEMES.map((s) => (
              <section
                key={s.nom}
                className="mb-4 rounded-2xl px-4 py-4"
                style={{ background: "#111", borderLeft: `3px solid ${s.couleur}` }}
              >
                <p className="font-display text-[15px] font-bold uppercase tracking-wide text-white">
                  {s.nom}
                </p>
                <p className="mb-2.5 text-[11.5px] font-semibold text-white/40">
                  {s.age}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {s.lignes.map((l) => (
                    <li
                      key={l}
                      className="text-[13.5px] leading-snug text-white/85"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <div className="mb-6 rounded-2xl px-4 py-4" style={{ background: "#1c1917" }}>
              <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                Ce que ta décision fait, physiquement
              </p>
              <ul className="flex flex-col gap-2.5">
                {CE_QUE_LA_DECISION_FAIT.map((l) => (
                  <li key={l} className="text-[13.5px] leading-snug text-white/85">
                    {l}
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => setEtape("phrases")}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
              style={{ background: "#7f1d1d" }}
            >
              Lire les {NB_PHRASES} phrases à voix haute
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {/* LE PRIX — entre les phrases et l'arbre. Les vingt phrases lui ont
            rappelé ce qu'il est ; celui-ci lui rappelle ce qu'il exige. C'est
            l'écart entre les deux qui mord, pas la médiocrité toute seule. */}
        {etape === "prix" && (
          <>
            <div className="mb-2 flex items-center gap-2">
              <Crown size={18} style={{ color: "var(--gold-border)" }} />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                Et voilà ce que tu exiges
              </h2>
            </div>
            <p className="mb-6 text-[13px] leading-relaxed text-white/55">
              Tu viens de relire ce que tu es. Maintenant relis ce que tu
              demandes — et regarde l&apos;écart.
            </p>

            <ul className="mb-7 flex flex-col gap-3.5">
              {LE_PRIX.map((l, n) => (
                <li key={l} className="flex gap-3">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{
                      background:
                        n >= LE_PRIX.length - 3
                          ? "var(--gold-border)"
                          : "#3f3f46",
                    }}
                  />
                  <span
                    className="text-[14px] leading-snug"
                    style={{
                      color:
                        n >= LE_PRIX.length - 3
                          ? "rgba(255,255,255,.95)"
                          : "rgba(255,255,255,.8)",
                      fontWeight: n >= LE_PRIX.length - 3 ? 600 : 400,
                    }}
                  >
                    {l}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setEtape("arbre")}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
              style={{ background: "#7f1d1d" }}
            >
              Ce qui se joue maintenant
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {etape === "arbre" && (
          <>
            <div className="mb-2 flex items-center gap-2">
              <GitBranch size={18} style={{ color: "var(--gold-border)" }} />
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                L&apos;arbre des réalités
              </h2>
            </div>
            <p className="mb-6 text-[13px] leading-relaxed text-white/55">
              Deux branches partent de toi à cet instant. Dans dix secondes,
              il n&apos;en restera qu&apos;une.
            </p>

            <ul className="mb-7 flex flex-col gap-3.5">
              {ARBRE.map((l, n) => (
                <li key={l} className="flex gap-3">
                  <span
                    className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{
                      background:
                        n >= ARBRE.length - 2 ? "var(--gold-border)" : "#3f3f46",
                    }}
                  />
                  <span
                    className="text-[14px] leading-snug"
                    style={{
                      color:
                        n >= ARBRE.length - 2
                          ? "rgba(255,255,255,.95)"
                          : "rgba(255,255,255,.8)",
                      fontWeight: n >= ARBRE.length - 2 ? 600 : 400,
                    }}
                  >
                    {l}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setEtape("decision")}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99]"
              style={{ background: "var(--gold-border)" }}
            >
              Choisir ma branche
              <ChevronRight size={17} />
            </button>
          </>
        )}

        {etape === "phrases" && (
          <>
            <div className="mb-8 flex items-center gap-3">
              <span className="tnum text-[12px] font-bold text-white/40">
                {i + 1} / {phrases.length}
              </span>
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${((i + 1) / phrases.length) * 100}%`,
                    background: "var(--gold-border)",
                  }}
                />
              </div>
            </div>

            <p className="mb-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-white/30">
              À voix haute
            </p>
            <p className="mb-10 min-h-[40dvh] font-display text-[22px] font-bold leading-snug text-white">
              {phrases[i]}
            </p>

            <button
              type="button"
              onClick={avancer}
              className="w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99]"
              style={{ background: "var(--gold-border)" }}
            >
              {i + 1 >= phrases.length ? "Terminé — décider" : "Je l'ai dite"}
            </button>
          </>
        )}

        {etape === "decision" && (
          <>
            <h2 className="mb-2 font-display text-xl font-bold uppercase leading-snug tracking-wide text-white">
              Maintenant, décide
            </h2>
            <p className="mb-7 text-[13.5px] leading-relaxed text-white/55">
              Tu as tout relu. Il n&apos;y a pas de troisième porte, et fermer
              cet écran sans choisir, c&apos;est déjà avoir choisi.
            </p>

            <button
              type="button"
              onClick={() => setEtape("tiens")}
              disabled={pending}
              className="mb-3 w-full rounded-xl px-5 py-4 text-left transition active:scale-[0.99] disabled:opacity-60"
              style={{ background: "#15803d" }}
            >
              <span className="block text-[15.5px] font-bold text-white">
                {SORTIES.tiens.titre}
              </span>
              <span className="mt-1 block text-[12.5px] leading-snug text-white/75">
                {SORTIES.tiens.detail}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setEtape("cede")}
              disabled={pending}
              className="w-full rounded-xl px-5 py-4 text-left transition active:scale-[0.99] disabled:opacity-60"
              style={{ background: "#1a1a1a", border: "1px solid #7f1d1d" }}
            >
              <span className="block text-[15.5px] font-bold text-red">
                {SORTIES.cede.titre}
              </span>
              <span className="mt-1 block text-[12.5px] leading-snug text-white/55">
                {SORTIES.cede.detail}
              </span>
            </button>
          </>
        )}

        {/* Le bon choix ne doit pas sortir en silence. Il avait demandé que
            les phrases s'affichent et qu'il ait à les répéter quand il décide
            de faire le bon choix — c'est ici, et pas ailleurs, parce que
            c'est la seule seconde où il vient de payer pour le droit de les
            dire. Symétrique de l'écran de la rechute : même poids. */}
        {etape === "tiens" && (
          <>
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold uppercase leading-snug tracking-wide text-white">
                Alors dis-le à voix haute
              </h2>
              <button
                type="button"
                onClick={() => setEtape("decision")}
                aria-label="Revenir"
                className="flex-shrink-0 text-white/40"
              >
                <X size={19} />
              </button>
            </div>

            <div
              className="mb-6 rounded-2xl px-5 py-5"
              style={{
                background: "#0d1a0f",
                border: "1.5px solid var(--gold-border)",
              }}
            >
              <ul className="flex flex-col gap-2.5">
                {DECLARATION_FINALE.map((l) => (
                  <li
                    key={l}
                    className="font-display text-[15px] font-bold leading-snug text-white"
                  >
                    {l}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-col gap-2 border-t border-white/12 pt-3.5">
                {DECLARATION_SCEAU.map((l) => (
                  <p
                    key={l}
                    className="text-[13px] font-semibold leading-relaxed"
                    style={{ color: "var(--gold-border)" }}
                  >
                    {l}
                  </p>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <ConsequencePanel c={MONTEE} sens="montee" />
            </div>

            <button
              type="button"
              onClick={tenir}
              disabled={pending}
              className="w-full rounded-xl px-4 py-4 text-[15px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99] disabled:opacity-60"
              style={{ background: "#15803d" }}
            >
              C&apos;est dit — je me lève maintenant
            </button>
          </>
        )}

        {etape === "cede" && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-red">
                Ce que tu viens de choisir
              </h2>
              <button
                type="button"
                onClick={() => setEtape("decision")}
                aria-label="Revenir"
                className="text-white/40"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mb-6">
              <ConsequencePanel c={DESCENTE} sens="descente" />
            </div>

            <p className="mb-3 text-[12.5px] font-semibold text-white/60">
              Déclare-le. Le compteur retombe à zéro, et ça ne s&apos;annule pas.
            </p>
            <div className="flex flex-col gap-2">
              {RECHUTES.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => rechute(r.id)}
                  disabled={pending}
                  className="rounded-xl px-4 py-3.5 text-left text-[14px] font-semibold text-white transition active:scale-[0.99] disabled:opacity-60"
                  style={{ background: "#7f1d1d" }}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setEtape("decision")}
              className="mt-4 w-full py-2 text-[12.5px] font-semibold text-white/40"
            >
              Finalement, je ne cède pas
            </button>
          </>
        )}
      </div>
    </div>
  );
}
