import { LOI_TITRE, LA_LOI, LES_PREUVES, LE_CONTRAT } from "@/lib/loi";
import { sampled, picked, branch, visitSeed } from "@/lib/rotate";

/**
 * LA LOI — sur chaque page, comme les deux autres bandeaux.
 *
 * Il a demandé ce rappel « à chaque fois », et c'est le plus dur des trois :
 * il lui retire son dernier abri. Tant que la promesse reçue sur la montagne
 * reste au centre, il peut attendre — une promesse, ça s'attend. Une loi
 * physique, non.
 *
 * Volontairement plus court que les autres bandeaux : quatre lignes. Trois
 * blocs longs empilés en haut de chaque page deviendraient un décor, et un
 * décor ne se lit plus.
 *
 * Composant serveur : le tirage a lieu à chaque requête.
 */
export default function Loi({
  placement = "bottom",
  seed,
}: {
  placement?: "top" | "bottom";
  seed?: number;
}) {
  const s = seed ?? visitSeed();
  const loi = picked(LA_LOI, branch(s, "loi"));
  const preuves = sampled(LES_PREUVES, branch(s, "preuves"), 2);
  const contrat = picked(LE_CONTRAT, branch(s, "contrat"));
  const spacing = placement === "top" ? "mb-6 mt-3" : "mt-8 mb-4";

  return (
    <section
      className={`${spacing} mx-4 rounded-2xl px-5 py-5 md:mx-6`}
      style={{ background: "#08090c", border: "1.5px solid #1e3a5f" }}
    >
      <p className="mb-3 text-[9.5px] font-bold uppercase tracking-[0.24em] text-white/35">
        {LOI_TITRE}
      </p>

      <p className="font-display text-[14.5px] font-bold leading-snug text-white">
        {loi}
      </p>

      <ul className="mt-3.5 flex flex-col gap-2 border-t border-white/10 pt-3.5">
        {preuves.map((l) => (
          <li key={l} className="text-[13px] leading-snug text-white/70">
            {l}
          </li>
        ))}
      </ul>

      <p
        className="mt-3.5 border-t border-white/10 pt-3.5 text-[12.5px] font-semibold leading-relaxed"
        style={{ color: "var(--gold-border)" }}
      >
        {contrat}
      </p>
    </section>
  );
}
