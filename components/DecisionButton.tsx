"use client";

import { useCallback, useEffect, useState } from "react";
import { Flame, X, RotateCw } from "lucide-react";
import {
  PHRASES,
  PROMESSES,
  CORPS_RAPPEL,
  ACCOMPLISSEMENTS,
  ALLIANCE_RAPPEL,
  REGISTERS,
  registerMeta,
  type Register,
} from "@/lib/decision";

const ORDER: Register[] = ["stop", "bouge", "continue"];

const rnd = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];

export interface EtatReel {
  retentionDays: number;
  coreDone: number;
  coreTotal: number;
  daysToJan: number;
  streak: number;
}

interface Draw {
  reg: Register;
  ordre: string;
  promesse: string;
  corps: string;
  accomplissement: string;
  alliance: string;
}

function block(
  eyebrow: string,
  body: string,
  accent = "rgba(255,255,255,.5)",
) {
  return { eyebrow, body, accent };
}

export default function DecisionButton({ etat }: { etat: EtatReel }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [d, setD] = useState<Draw | null>(null);

  const draw = useCallback((reg: Register) => {
    setD({
      reg,
      ordre: rnd(PHRASES[reg]),
      promesse: rnd(PROMESSES),
      corps: rnd(CORPS_RAPPEL),
      accomplissement: rnd(ACCOMPLISSEMENTS),
      alliance: rnd(ALLIANCE_RAPPEL),
    });
  }, []);

  function start() {
    setStep(0);
    draw(ORDER[0]);
    setOpen(true);
  }

  function next() {
    const n = step + 1;
    setStep(n);
    draw(n < ORDER.length ? ORDER[n] : rnd(ORDER));
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const m = d ? registerMeta(d.reg) : registerMeta("stop");
  const noyauTenu = etat.coreDone >= etat.coreTotal;

  const couches = d
    ? [
        block("Ce que tu t'es promis", d.promesse),
        block("Le corps que tu as décrété", d.corps),
        block("Ce que tu es censé bâtir", d.accomplissement),
        block("Ce qu'Il t'a promis", d.alliance),
      ]
    : [];

  return (
    <>
      <button
        type="button"
        onClick={start}
        className="mb-5 flex w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-4 text-white shadow-lg transition active:scale-[0.99]"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #7F1D1D 100%)",
        }}
      >
        <Flame size={20} style={{ color: "var(--gold-border)" }} />
        <span className="font-display text-[16px] font-bold uppercase tracking-wide">
          Je décide de faire tout cela
        </span>
      </button>

      {open && d && (
        <div
          className="animate-overlay-in fixed inset-0 z-[100] overflow-y-auto"
          style={{ background: m.color }}
          role="dialog"
          aria-modal="true"
          aria-label="Bascule"
        >
          <div
            className="mx-auto flex min-h-full max-w-lg flex-col px-6"
            style={{
              paddingTop: "max(1.25rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
          >
            {/* En-tête */}
            <div className="mb-6 flex items-start justify-between gap-3">
              <span className="text-[10px] font-bold uppercase leading-snug tracking-[0.22em] text-white/55">
                {m.emoji} {m.question}
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="-mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white/50 transition active:scale-95"
              >
                <X size={19} />
              </button>
            </div>

            {/* L'ordre, en grand */}
            <span className="mb-3 font-display text-[13px] font-bold uppercase tracking-[0.3em] text-white/50">
              {m.label}
            </span>
            <p className="mb-7 font-display text-[29px] font-bold uppercase leading-[1.12] text-white">
              {d.ordre}
            </p>

            {/* Le serment fondateur — jamais tiré au sort, toujours affiché.
                C'est lui qui rend toutes les autres couches obligatoires. */}
            <div
              className="mb-5 rounded-2xl px-5 py-4"
              style={{
                background: "rgba(0,0,0,0.45)",
                border: "1.5px solid var(--gold-border)",
              }}
            >
              <p
                className="mb-2 text-[9px] font-bold uppercase tracking-[0.24em]"
                style={{ color: "var(--gold-border)" }}
              >
                Ton serment fondateur
              </p>
              <p
                className="font-display text-[19px] font-bold uppercase leading-tight"
                style={{ color: "var(--gold-border)" }}
              >
                Tu t&apos;es juré d&apos;être un homme de dominion absolue.
              </p>
              <p className="mt-2.5 text-[13px] leading-snug text-white/80">
                La parole tenue à toi-même est le fondement de toute autre
                parole (ch. 113). Tout le reste — l&apos;empire, le corps,
                l&apos;alliance — repose sur elle seule.
              </p>
              <p className="mt-2 text-[13px] font-bold leading-snug text-white">
                Ce que tu fais dans les dix prochaines secondes dit si
                c&apos;était vrai.
              </p>
            </div>

            {/* Ton état réel — les chiffres, sans commentaire */}
            <div className="mb-5 rounded-2xl bg-black/25 p-4">
              <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">
                Ton état réel, à cette seconde
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { v: `J−${etat.daysToJan}`, l: "1er janvier" },
                  { v: String(etat.retentionDays), l: "Rétention" },
                  {
                    v: `${etat.coreDone}/${etat.coreTotal}`,
                    l: "Noyau",
                    bad: !noyauTenu,
                  },
                ].map((x) => (
                  <div key={x.l} className="rounded-xl bg-white/10 py-2.5">
                    <div
                      className="tnum font-display text-[19px] font-bold leading-none"
                      style={{
                        color: x.bad ? "var(--gold-border)" : "#fff",
                      }}
                    >
                      {x.v}
                    </div>
                    <div className="mt-1 text-[8.5px] font-semibold uppercase tracking-wider text-white/50">
                      {x.l}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-snug text-white/70">
                {noyauTenu
                  ? "Ton noyau est tenu aujourd'hui. Ne le brise pas dans les dix prochaines minutes."
                  : `Il te manque ${etat.coreTotal - etat.coreDone} objectifs du noyau. Ta série n'est pas encore sécurisée.`}
              </p>
            </div>

            {/* Les couches : promesse, corps, empire, alliance */}
            <div className="flex flex-col gap-2.5">
              {couches.map((c) => (
                <div key={c.eyebrow} className="rounded-2xl bg-black/20 p-4">
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45">
                    {c.eyebrow}
                  </p>
                  <p className="text-[14px] font-semibold leading-snug text-white">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            {/* La bascule finale */}
            <div className="mt-6 rounded-2xl bg-black/40 p-5 text-center">
              <p className="font-display text-[17px] font-bold uppercase leading-tight text-white">
                Tu as deux options, là, maintenant.
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                Rester l&apos;homme d&apos;hier — ou basculer. Il n&apos;y a
                pas de troisième porte, et personne ne choisira à ta place.
              </p>
              <p
                className="mt-3 font-display text-[22px] font-bold uppercase leading-none tracking-[0.12em]"
                style={{ color: "var(--gold-border)" }}
              >
                Je bascule. Maintenant.
              </p>
            </div>

            {/* Commandes */}
            <div className="mt-auto pt-6">
              <div className="mb-3 grid grid-cols-3 gap-2">
                {REGISTERS.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => draw(r.id)}
                    className="rounded-xl py-2.5 text-[11px] font-bold uppercase tracking-wide transition active:scale-[0.97]"
                    style={{
                      background:
                        r.id === d.reg
                          ? "rgba(255,255,255,.22)"
                          : "rgba(255,255,255,.08)",
                      color: "#fff",
                    }}
                  >
                    {r.emoji} {r.label}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={next}
                className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-white text-[15px] font-bold uppercase tracking-wide transition active:scale-[0.99]"
                style={{ color: m.color }}
              >
                <RotateCw size={17} /> Encore
              </button>
              <p className="mt-3 text-center text-[11px] text-white/45">
                Lis tout à voix haute, puis exécute.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
