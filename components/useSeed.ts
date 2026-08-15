"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * UNE GRAINE NEUVE À CHAQUE NAVIGATION.
 *
 * Le tirage n'était pas en cause : c'était le rendu. Les bandeaux vivent dans
 * le layout, et le App Router ne re-rend PAS un layout partagé quand on passe
 * d'une de ses pages à une autre — c'est le rendu partiel, et c'est voulu côté
 * Next. Résultat : les bandeaux gardaient le contenu du tout premier
 * chargement pendant toute la session, quel que soit le nombre de pages
 * visitées. Vu de l'écran, ça ressemble exactement à un tirage cassé.
 *
 * Le serveur fournit toujours la première graine, donc le premier rendu du
 * client est identique au sien : pas de décalage d'hydratation, pas de
 * clignotement. Ce n'est qu'à partir du premier changement de page que la
 * graine est retirée au sort, ici, dans le navigateur.
 */
export function useSeed(initial: number): number {
  const pathname = usePathname();
  const premier = useRef(true);
  const [seed, setSeed] = useState(initial);

  useEffect(() => {
    // Le premier passage est celui du serveur : on ne le rejoue pas, sinon le
    // contenu changerait sous les yeux juste après l'hydratation.
    if (premier.current) {
      premier.current = false;
      return;
    }
    setSeed((Math.random() * 0x7fffffff) >>> 0);
  }, [pathname]);

  return seed;
}
