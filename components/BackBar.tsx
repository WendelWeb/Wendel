"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft, Eye } from "lucide-react";

/**
 * LA BARRE DU HAUT — le retour, et le décalage sous l'encoche.
 *
 * Deux corrections en une, parce qu'elles occupent le même endroit.
 *
 * Le layout racine déclare `viewportFit: "cover"` : la page peint donc sous
 * l'encoche et sous l'îlot dynamique. Le bas était déjà protégé par la barre
 * de navigation ; le haut ne l'était nulle part, et le premier bandeau passait
 * dessous. C'est cette barre qui porte maintenant `safe-area-inset-top`.
 *
 * Et il n'y avait aucun retour : la navigation du bas donne quatre
 * destinations, mais rien pour revenir. `router.back()` d'abord — c'est ce
 * qu'attend la main — avec le miroir en second, toujours visible, parce que
 * pendant les trente jours c'est la seule page qui compte.
 *
 * Sur le miroir lui-même il n'y a nulle part où revenir : la barre se réduit
 * alors au seul décalage, sans boutons.
 */
export default function BackBar() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/miroir") {
    return <div style={{ height: "env(safe-area-inset-top)" }} aria-hidden />;
  }

  return (
    <div
      className="sticky top-0 z-40 mb-1 flex items-center justify-between gap-3 border-b border-white/10 bg-black/85 px-3 backdrop-blur"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)",
        paddingBottom: "0.5rem",
      }}
    >
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-1 rounded-lg py-1.5 pl-1 pr-3 text-[13px] font-semibold text-white/70 transition active:scale-95"
      >
        <ChevronLeft size={20} />
        Retour
      </button>

      <Link
        href="/miroir"
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-white/60 transition active:scale-95"
      >
        <Eye size={15} />
        Le miroir
      </Link>
    </div>
  );
}
