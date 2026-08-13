import { TrendingUp, TrendingDown } from "lucide-react";
import type { Consequence } from "@/lib/consequence";

/**
 * Les deux futurs, présentés de la même façon.
 *
 * La montée et la descente partagent la même mise en page volontairement : ce
 * n'est pas une récompense contre une punition, ce sont deux trajectoires qui
 * partent du même instant. Seule la couleur change — et le fait qu'une seule
 * des deux sera vraie.
 */
export default function ConsequencePanel({
  c,
  sens,
}: {
  c: Consequence;
  sens: "montee" | "descente";
}) {
  const monte = sens === "montee";
  const teinte = monte ? "#15803d" : "#7f1d1d";
  const accent = monte ? "var(--gold-border)" : "#fca5a5";
  const Icone = monte ? TrendingUp : TrendingDown;

  return (
    <section
      className="overflow-hidden rounded-2xl px-5 py-5"
      style={{ background: "#0c0c0c", border: `1.5px solid ${teinte}` }}
    >
      <div className="mb-1 flex items-center gap-2">
        <Icone size={16} style={{ color: accent }} />
        <h2
          className="font-display text-[15px] font-bold uppercase leading-snug tracking-wide"
          style={{ color: accent }}
        >
          {c.titre}
        </h2>
      </div>
      <p className="mb-4 text-[12.5px] leading-relaxed text-white/55">
        {c.intro}
      </p>

      <ol className="flex flex-col">
        {c.etapes.map((e, i) => (
          <li
            key={e.quand}
            className="relative pb-4 pl-5 last:pb-0"
            style={{
              borderLeft:
                i === c.etapes.length - 1
                  ? "none"
                  : `1px solid rgba(255,255,255,.14)`,
              marginLeft: "3px",
            }}
          >
            <span
              className="absolute left-0 top-[5px] h-[7px] w-[7px] -translate-x-1/2 rounded-full"
              style={{ background: teinte }}
            />
            <p
              className="text-[11px] font-bold uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {e.quand}
            </p>
            <p className="mt-1 text-[13.5px] font-medium leading-snug text-white/85">
              {e.quoi}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-4 border-t border-white/10 pt-3.5 text-[12.5px] font-semibold leading-relaxed text-white/70">
        {c.chute}
      </p>
    </section>
  );
}
