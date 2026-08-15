import { DECISIONS_SIENNES, DECISIONS_AJOUTEES } from "@/lib/decisions";

/**
 * « JE DÉCIDE » — la moitié physique de la déclaration.
 *
 * Affiché juste après DECLARATION_FINALE partout où elle apparaît. L'une dit
 * ce qu'il veut obtenir, l'autre ce qu'il fait de son corps cette semaine —
 * et sans la seconde, la première est exactement ce qu'il se reproche : du
 * vouloir sans prix payé.
 *
 * Aucune rotation ici, contrairement aux bandeaux : ces lignes se disent à
 * voix haute, en entier. On ne prête pas un serment par échantillon.
 */
export default function DecisionsPanel() {
  return (
    <div>
      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
        Et concrètement, dans le monde réel
      </p>
      <p className="mb-3.5 text-[11.5px] leading-relaxed text-white/35">
        Chaque ligne peut être filmée. C&apos;est le critère : si personne ne
        pourrait la voir se produire, elle n&apos;a rien à faire ici.
      </p>

      <ul className="flex flex-col gap-2.5">
        {DECISIONS_SIENNES.map((l) => (
          <li
            key={l}
            className="font-display text-[14.5px] font-bold leading-snug text-white"
          >
            {l}
          </li>
        ))}
      </ul>

      <ul className="mt-3.5 flex flex-col gap-2.5 border-t border-white/12 pt-3.5">
        {DECISIONS_AJOUTEES.map((l) => (
          <li
            key={l}
            className="text-[13.5px] font-semibold leading-snug text-white/80"
          >
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}
