"use client";

import { THRESHOLD_21 } from "@/lib/affirmations";

// The vision a servant of God received about him: he was climbing a white
// staircase, and masturbation/porn stopped him dead on the steps. Rendered at
// the moment of temptation — his real retention count sets where he stands.
const STEPS = 9;

export default function WhiteStaircase({ days }: { days: number }) {
  // How far up the staircase he currently stands (toward the 21-day threshold).
  const ratio = Math.min(1, days / THRESHOLD_21);
  const standing = Math.max(0, Math.min(STEPS - 1, Math.round(ratio * (STEPS - 1))));

  return (
    <section
      className="mesure mb-5 overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--gold-border)", background: "var(--gold-soft)" }}
    >
      <div className="px-5 pt-4">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "var(--gold)" }}
        >
          Vision reçue par un serviteur de Dieu
        </p>
        <h2
          className="mt-0.5 font-display text-xl font-bold uppercase tracking-tight"
          style={{ color: "var(--gold)" }}
        >
          🪜 L&apos;escalier blanc
        </h2>
      </div>

      {/* The staircase — each step a day held, rising to the threshold. */}
      <div className="flex items-end justify-center gap-[3px] px-5 py-4">
        {Array.from({ length: STEPS }, (_, i) => {
          const climbed = i <= standing;
          const isHere = i === standing;
          return (
            <div
              key={i}
              className="relative flex-1"
              style={{ maxWidth: 34 }}
              aria-hidden
            >
              {isHere && (
                <span
                  className="absolute -top-6 left-1/2 -translate-x-1/2 text-[15px]"
                  title="Tu es ici"
                >
                  🧍
                </span>
              )}
              <div
                className="w-full rounded-t-[3px]"
                style={{
                  height: 16 + i * 9,
                  background: climbed ? "#ffffff" : "rgba(180,83,9,0.15)",
                  border: climbed
                    ? "1.5px solid var(--gold-border)"
                    : "1.5px solid rgba(180,83,9,0.2)",
                  borderBottom: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="px-5 pb-4">
        <p className="text-[13.5px] font-semibold leading-snug text-text-primary">
          Tu es en train de monter. Chaque jour retenu te fait monter une marche
          — <span style={{ color: "var(--gold)" }}>tu es au jour {days}</span>.
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-text-secondary">
          Cette main te <strong className="text-red">fige sur la marche</strong>.
          Tu ne redescends même pas : tu <em>arrêtes de monter</em>, et le sommet
          s&apos;éloigne pendant que tu piétines.
        </p>
        <p
          className="mt-2.5 font-display text-[13px] font-bold uppercase leading-snug tracking-wide"
          style={{ color: "var(--gold)" }}
        >
          Ne t&apos;arrête pas sur l&apos;escalier. Monte.
        </p>
      </div>
    </section>
  );
}
