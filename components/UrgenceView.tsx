"use client";

import Link from "next/link";
import { useState } from "react";
import { Siren, Flame, ChevronRight, RefreshCw } from "lucide-react";
import { STATES, stateChapterTitle } from "@/lib/states";
import { RETENTION_AFFIRMATIONS } from "@/lib/affirmations";
import { ALL_STOPP_PHRASES } from "@/lib/stopp";
import WhiteStaircase from "./WhiteStaircase";
import { shuffled, branch } from "@/lib/rotate";

const LINES = [...ALL_STOPP_PHRASES, ...RETENTION_AFFIRMATIONS];

export default function UrgenceView({
  retentionDays,
  seed,
}: {
  retentionDays: number;
  seed: number;
}) {
  // La graine vient du serveur et change à chaque visite : la première phrase
  // n'est jamais la même. Sur cette page en particulier, tomber toujours sur la
  // même ligne serait le pire des défauts — c'est l'écran qu'il ouvre au moment
  // exact où il est sur le point de céder.
  const lignes = shuffled(LINES, branch(seed, "urgence"));
  const [i, setI] = useState(0);

  return (
    <main className="px-4 pb-12 pt-6">
      <div className="mb-1 flex items-center gap-2">
        <Siren size={22} className="text-red" />
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-red">
          Urgence
        </h1>
      </div>
      <p className="mesure mb-5 text-[13.5px] leading-relaxed text-text-secondary">
        Tu es tenté. Respire. C&apos;est exactement l&apos;instant du «&nbsp;presque&nbsp;»
        qui t&apos;a coûté 10 ans. Pas cette fois. Choisis la vérité, pas le
        mensonge de «&nbsp;juste une fois&nbsp;».
      </p>

      <div className="colonnes-xl">
        <WhiteStaircase days={retentionDays} />

        {/* Affirmation / phrase choc */}
        <button
          type="button"
          onClick={() => setI((x) => (x + 1) % lignes.length)}
          className="mb-5 flex w-full items-center gap-3 rounded-2xl p-5 text-left transition active:scale-[0.99]"
          style={{ background: "var(--black)" }}
        >
          <Flame size={20} className="flex-shrink-0 text-red" fill="var(--red)" />
          <span className="flex-1 font-display text-lg font-bold uppercase leading-tight tracking-tight text-white">
            {lignes[i]}
          </span>
          <RefreshCw size={16} className="flex-shrink-0 text-white/40" />
        </button>

        {/* Coach CTA */}
        <Link
          href="/coach"
          className="mb-6 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition active:scale-[0.99]"
          style={{ background: "var(--navy)" }}
        >
          <Flame size={16} /> Parle au Coach maintenant
        </Link>
      </div>

      {/* Quand je pense à… */}
      <h2 className="mb-2 font-display text-base font-bold uppercase tracking-wide text-text-primary">
        Quand je pense à…
      </h2>
      <p className="mb-3 text-[12px] text-text-secondary">
        Ouvre le chapitre qui tue cette tentation — tout de suite.
      </p>
      <div className="grid-objectives">
        {STATES.map((s) => (
          <Link
            key={s.id}
            href={`/vaisseau/${s.chapter}`}
            className="flex items-center gap-3 rounded-xl border px-4 py-3 transition hover:border-red"
            style={{ borderColor: "var(--border)", background: "var(--surface)" }}
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-medium leading-tight text-text-primary">
                {s.label}
              </span>
              <span className="mt-0.5 block truncate text-[11px] text-text-muted">
                ch. {s.chapter} — {stateChapterTitle(s)}
              </span>
            </span>
            <ChevronRight size={16} className="flex-shrink-0 text-text-muted" />
          </Link>
        ))}
      </div>
    </main>
  );
}
