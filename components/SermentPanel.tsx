"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Lock, AlertTriangle, X } from "lucide-react";
import {
  CRENEAUX,
  CASES,
  casesPour,
  RECHUTES,
  CIBLE_JOURS,
  prochainCreneau,
  type Confirmations,
  type EtatSerment,
  type Rechute,
} from "@/lib/serment";
import ConsequencePanel from "./ConsequencePanel";
import ConfirmRechute from "./ConfirmRechute";
import { DESCENTE } from "@/lib/consequence";
import { DECLARATION_FINALE, DECLARATION_SCEAU } from "@/lib/declaration";
import {
  declarerAction,
  declarerRechuteAction,
  ouvrirVisionAction,
} from "@/app/serment-actions";

const VIDE: Confirmations = {
  pasTiktok: false,
  pasGazeuse: false,
  pasPorn: false,
  fichiers: false,
  lecture: false,
  reverie: false,
  meditation: false,
  bible: false,
};

/**
 * Le mécanisme des 30 jours, en tête de l'écran du miroir.
 *
 * Deux chemins, et un seul est facile. « Je perpétue » est un clic — il n'a
 * jamais rien coûté, et c'est justement le constat qu'il a écrit. « Je choisis
 * différemment » demande de cocher quatre cases, dont une qui oblige à se lever
 * et à aller ouvrir ses fichiers.
 *
 * S'il ne peut pas cocher les quatre, il n'y a pas de troisième porte : il
 * déclare la rechute et le compteur retombe à zéro.
 */
export default function SermentPanel({
  etat,
  heure,
  luJusquAuBout,
}: {
  etat: EtatSerment;
  heure: number;
  /** Vrai une fois qu'il a réellement atteint le bas du miroir. */
  luJusquAuBout: boolean;
}) {
  const [conf, setConf] = useState<Confirmations>(VIDE);
  const [ouvert, setOuvert] = useState(false);
  const [rechuteOuverte, setRechuteOuverte] = useState(false);
  // Le type choisi, en attente de confirmation. Rien n'est écrit tant qu'il
  // n'a pas confirmé sur le deuxième écran.
  const [aConfirmer, setAConfirmer] = useState<Rechute | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const router = useRouter();

  const creneau = CRENEAUX.find((c) => c.id === etat.ouvert);
  const dejaFait = etat.ouvert ? etat.aujourdhui[etat.ouvert] : undefined;
  // Les cases dependent du creneau : ni meditation ni Bible a midi.
  const mesCases = etat.ouvert ? casesPour(etat.ouvert) : CASES;
  const complet = mesCases.every((c) => conf[c.id]);
  const pct = Math.min(100, Math.round((etat.jourActuel / CIBLE_JOURS) * 100));

  function declarer(choix: "vouloir" | "perpetuer") {
    setErreur(null);
    start(async () => {
      const r = await declarerAction(choix, choix === "vouloir" ? conf : VIDE);
      if (!r.ok) setErreur(r.raison ?? "Refusé.");
      else {
        setConf(VIDE);
        setOuvert(false);
      }
    });
  }

  function rechute(kind: Rechute) {
    start(async () => {
      await declarerRechuteAction(kind);
      setAConfirmer(null);
      setRechuteOuverte(false);
      setConf(VIDE);
      setOuvert(false);
    });
  }

  return (
    <section
      className="mb-7 overflow-hidden rounded-2xl"
      style={{ background: "#0c0c0c", border: "1.5px solid #292524" }}
    >
      {/* Le compteur */}
      <div className="px-5 pt-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">
              Ce que je prouve
            </p>
            <p className="mt-1.5 flex items-baseline gap-2">
              <span className="tnum font-display text-[38px] font-bold leading-none text-white">
                {etat.jourActuel}
              </span>
              <span className="text-[15px] font-semibold text-white/40">
                / {CIBLE_JOURS} jours
              </span>
            </p>
            <p className="mt-1 text-[11px] font-semibold text-white/40">
              {etat.rechuteAujourdhui
                ? "Aujourd'hui ne compte pas."
                : etat.faitAujourdhui === CRENEAUX.length
                  ? "Journée tenue."
                  : `Aujourd'hui — ${etat.faitAujourdhui}/${CRENEAUX.length} déclarations`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-white/30">
              Record
            </p>
            <p className="tnum text-[17px] font-bold text-white/60">
              {etat.record}
            </p>
          </div>
        </div>

        <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${pct}%`, background: "var(--gold-border)" }}
          />
        </div>

        <p className="mt-2.5 text-[11.5px] leading-relaxed text-white/45">
          {etat.debloque ? (
            <>Trente jours tenus. Ta Vision est rouverte — tu l&apos;as prouvé.</>
          ) : (
            <>
              Trois déclarations par jour. Trente jours d&apos;affilée. Une seule
              manquée, une seule rechute, et tout recommence à zéro. Ouverture
              prévue le {etat.dateOuverture}.
            </>
          )}
        </p>

        {/* Les trois créneaux du jour */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {CRENEAUX.map((c) => {
            const v = etat.aujourdhui[c.id];
            const actif = etat.ouvert === c.id;
            return (
              <div
                key={c.id}
                className="rounded-lg px-2 py-2 text-center"
                style={{
                  background:
                    v === "vouloir"
                      ? "rgba(22,163,74,.18)"
                      : v === "perpetuer"
                        ? "rgba(220,38,38,.18)"
                        : actif
                          ? "rgba(245,158,11,.14)"
                          : "#161616",
                  border: actif ? "1px solid var(--gold-border)" : "1px solid transparent",
                }}
              >
                <p className="text-[9px] font-bold uppercase tracking-wide text-white/45">
                  {c.label}
                </p>
                <p className="mt-1 text-[11px] font-bold text-white/80">
                  {v === "vouloir" ? "✓" : v === "perpetuer" ? "✕" : actif ? "maintenant" : "—"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* L'action du moment */}
      <div className="mt-4 border-t border-white/10 px-5 py-4">
        {etat.rechuteAujourdhui ? (
          <div>
            <p className="mb-4 text-[13px] font-semibold leading-relaxed text-red">
              Rechute déclarée aujourd&apos;hui. Le compteur est à zéro. Demain
              recommence — et ce sera le jour 1, pas la suite.
            </p>
            <ConsequencePanel c={DESCENTE} sens="descente" />
          </div>
        ) : !creneau ? (
          <p className="text-[13px] leading-relaxed text-white/50">
            Aucun créneau ouvert. Le prochain :{" "}
            <strong className="text-white/80">
              {prochainCreneau(heure).label.toLowerCase()},{" "}
              {prochainCreneau(heure).quand}
            </strong>
            .
          </p>
        ) : dejaFait ? (
          <div>
            <p className="text-[13px] leading-relaxed text-white/60">
              {dejaFait === "vouloir" ? (
                <>
                  Déclaré pour ce créneau :{" "}
                  <strong className="text-white">je le veux vraiment</strong>.
                  Prochain rendez-vous :{" "}
                  {prochainCreneau(heure).label.toLowerCase()}.
                </>
              ) : (
                <>
                  Déclaré pour ce créneau :{" "}
                  <strong className="text-red">je perpétue</strong>. La journée
                  ne comptera pas.
                </>
              )}
            </p>

            {/* Perpétuer n'est pas un bouton indolore : il doit voir ce qu'il
                vient de choisir, aussi nettement que l'autre chemin. */}
            {dejaFait === "perpetuer" && (
              <div className="mt-4">
                <ConsequencePanel c={DESCENTE} sens="descente" />
              </div>
            )}

            {/* Ce qu'il déclare vouloir, après avoir prouvé ce qu'il n'a pas
                fait. L'audit est une abstention ; ceci est la demande — et
                aucune abstention n'a jamais bâti quoi que ce soit. */}
            {dejaFait === "vouloir" && (
              <div
                className="mt-4 rounded-2xl px-5 py-5"
                style={{ background: "#111", border: "1.5px solid var(--gold-border)" }}
              >
                <p className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                  Maintenant, dis ça à voix haute
                </p>
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
            )}

            {/* La fenêtre gagnée : quelques minutes sur sa Vision, pour voir
                ce qu'il vient de choisir. Elle se referme quand il dit « j'ai
                fini » ou qu'il quitte l'app. */}
            {dejaFait === "vouloir" && (
              <button
                type="button"
                disabled={pending}
                onClick={() =>
                  start(async () => {
                    const r = await ouvrirVisionAction();
                    if (r.ok) router.push("/vision");
                  })
                }
                className="mt-3.5 w-full rounded-xl px-4 py-3.5 text-[14px] font-bold uppercase tracking-wide text-black transition active:scale-[0.99] disabled:opacity-50"
                style={{ background: "var(--gold-border)" }}
              >
                Voir ce que je viens de choisir
              </button>
            )}
          </div>
        ) : !ouvert ? (
          <div className="flex flex-col gap-2.5">
            <p className="mb-0.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/40">
              {creneau.label} — {creneau.quand}
            </p>
            <button
              type="button"
              onClick={() => setOuvert(true)}
              disabled={pending}
              className="rounded-xl px-4 py-3.5 text-left text-[14px] font-bold leading-snug text-white transition active:scale-[0.99]"
              style={{ background: "#15803d" }}
            >
              Je décide de vraiment le vouloir
              <span className="mt-0.5 block text-[11.5px] font-medium text-white/70">
                et de le prouver par tous mes choix
              </span>
            </button>
            <button
              type="button"
              onClick={() => declarer("perpetuer")}
              disabled={pending}
              className="rounded-xl px-4 py-3 text-left text-[13px] font-semibold leading-snug transition active:scale-[0.99]"
              style={{ background: "#1a1a1a", color: "rgba(255,255,255,.55)" }}
            >
              Aujourd&apos;hui je choisis de continuer à perpétuer tout ce que
              j&apos;ai écrit
            </button>
          </div>
        ) : (
          /* L'audit — quatre cases, et elles doivent toutes tomber */
          <div>
            <p className="mb-3 text-[12px] font-semibold leading-relaxed text-white/70">
              Coche ce qui est vrai. Toutes, ou rien.
            </p>
            <ul className="flex flex-col gap-2">
              {mesCases.map((c) => {
                const on = conf[c.id];
                // La case de lecture reste fermée tant qu'il n'est pas
                // descendu jusqu'au bas du miroir.
                const bloquee = c.verifiee && !luJusquAuBout;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      disabled={bloquee}
                      onClick={() => setConf((x) => ({ ...x, [c.id]: !x[c.id] }))}
                      className="flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition active:scale-[0.99] disabled:cursor-not-allowed"
                      style={{
                        background: on ? "rgba(22,163,74,.16)" : "#161616",
                        border: `1px solid ${on ? "#15803d" : "transparent"}`,
                        opacity: bloquee ? 0.45 : 1,
                      }}
                    >
                      <span
                        className="mt-[1px] flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md"
                        style={{
                          background: on ? "#15803d" : "transparent",
                          border: on ? "none" : "1.5px solid rgba(255,255,255,.25)",
                        }}
                      >
                        {on && <Check size={13} color="#fff" strokeWidth={3} />}
                      </span>
                      <span className="text-[13.5px] font-medium leading-snug text-white/90">
                        {c.label}
                        {bloquee && (
                          <span className="mt-1 block text-[11.5px] font-semibold text-white/40">
                            Descends jusqu&apos;au bas de cette page pour pouvoir
                            cocher.
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {erreur && (
              <p className="mt-3 flex items-start gap-2 text-[12.5px] font-semibold leading-snug text-red">
                <AlertTriangle size={15} className="mt-[1px] flex-shrink-0" />
                {erreur}
              </p>
            )}

            <button
              type="button"
              onClick={() => declarer("vouloir")}
              disabled={!complet || pending}
              className="mt-4 w-full rounded-xl px-4 py-3.5 text-[14.5px] font-bold uppercase tracking-wide transition active:scale-[0.99] disabled:opacity-35"
              style={{ background: "#15803d", color: "#fff" }}
            >
              {pending ? "…" : "Je le déclare"}
            </button>

            <button
              type="button"
              onClick={() => setRechuteOuverte(true)}
              className="mt-2 w-full rounded-xl px-4 py-2.5 text-[12.5px] font-semibold text-white/45 transition"
              style={{ background: "#1a1a1a" }}
            >
              Je ne peux pas tout cocher
            </button>

            <button
              type="button"
              onClick={() => {
                setOuvert(false);
                setConf(VIDE);
                setErreur(null);
              }}
              className="mt-2 w-full py-1.5 text-[12px] text-white/30"
            >
              Annuler
            </button>
          </div>
        )}
      </div>

      {/* La rechute — irréversible, et l'écran le dit avant */}
      {rechuteOuverte && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 p-4"
          onClick={() => {
            setAConfirmer(null);
            setRechuteOuverte(false);
          }}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl p-5"
            style={{ background: "#141414", border: "1.5px solid #7f1d1d" }}
          >
            <div className="mb-1 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red">
                {aConfirmer ? "Un instant" : "Ce qui s'est passé"}
              </p>
              <button
                type="button"
                onClick={() => {
                  setAConfirmer(null);
                  setRechuteOuverte(false);
                }}
                aria-label="Fermer"
                className="text-white/40"
              >
                <X size={18} />
              </button>
            </div>
            {aConfirmer ? (
              <ConfirmRechute
                kind={aConfirmer}
                jourActuel={etat.jourActuel}
                record={etat.record}
                pending={pending}
                onAnnuler={() => setAConfirmer(null)}
                onConfirmer={() => rechute(aConfirmer)}
              />
            ) : (
              <>
                <p className="mb-4 text-[12.5px] leading-relaxed text-white/60">
                  Le compteur retombe à zéro immédiatement, et ça ne
                  s&apos;annule pas. C&apos;est le seul aveu qui vaut quelque
                  chose.
                </p>
                <div className="flex flex-col gap-2">
                  {RECHUTES.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setAConfirmer(r.id)}
                      disabled={pending}
                      className="rounded-xl px-4 py-3 text-left text-[13.5px] font-semibold text-white transition active:scale-[0.99]"
                      style={{ background: "#7f1d1d" }}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {!etat.debloque && (
        <p className="flex items-center gap-2 border-t border-white/10 px-5 py-3 text-[11.5px] text-white/35">
          <Lock size={13} className="flex-shrink-0" />
          Ma Vision et mes objectifs restent fermés jusqu&apos;au jour 30.
        </p>
      )}
    </section>
  );
}
