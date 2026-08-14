import {
  DECLARATION_FINALE,
  DECLARATION_SCEAU,
  DEPASSEMENT,
} from "@/lib/declaration";
import { sampled, branch, visitSeed } from "@/lib/rotate";

/**
 * LE DÉPASSEMENT — sur chaque page, le miroir compris.
 *
 * Il a voulu que ça soit partout, et il a raison de le vouloir là plutôt
 * qu'ailleurs : c'est la seule chose de l'app qui dise que l'app n'est pas la
 * limite. Tout le reste — la Vision, le livre, le miroir — décrit un plafond
 * écrit. Ces trois lignes-là disent que le plafond écrit est un plancher.
 *
 * Les trois lignes ne tournent pas : elles sont le point. Ce qui tourne, ce
 * sont les deux lignes tirées de sa déclaration en dessous — sinon l'œil
 * reconnaît le bloc en une semaine et saute par-dessus, exactement comme pour
 * le mantra.
 *
 * Composant serveur : le tirage a lieu à chaque requête.
 */
export default function Depassement({
  placement = "bottom",
  seed,
}: {
  placement?: "top" | "bottom";
  seed?: number;
}) {
  const s = seed ?? visitSeed();
  // Le reste de la déclaration, moins les trois lignes déjà affichées
  // au-dessus — sinon le tirage se répète à lui-même.
  const echos = sampled(
    [...DECLARATION_FINALE, ...DECLARATION_SCEAU].filter(
      (l) => !DEPASSEMENT.includes(l),
    ),
    branch(s, "depassement"),
    2,
  );
  const spacing = placement === "top" ? "mb-6 mt-3" : "mt-8 mb-4";

  return (
    <section
      className={`${spacing} mx-4 rounded-2xl px-5 py-5 md:mx-6`}
      style={{ background: "#0c0a06", border: "1.5px solid var(--gold-border)" }}
    >
      <p className="mb-3.5 text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">
        Ceci n&apos;est pas le plafond
      </p>

      <ul className="flex flex-col gap-2.5">
        {DEPASSEMENT.map((l) => (
          <li
            key={l}
            className="font-display text-[14.5px] font-bold leading-snug"
            style={{ color: "var(--gold-border)" }}
          >
            {l}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2 border-t border-white/12 pt-3.5">
        {echos.map((l) => (
          <p key={l} className="text-[12.5px] leading-relaxed text-white/70">
            {l}
          </p>
        ))}
      </div>
    </section>
  );
}
