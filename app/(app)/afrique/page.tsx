import { requireUserId } from "@/lib/auth";
import { exigerDebloqueOuPC } from "@/lib/verrou";
import GalerieView from "@/components/GalerieView";
import { GALERIE_AFRIQUE } from "@/lib/galerie-manifeste";

export const dynamic = "force-dynamic";

/**
 * PLAN AFRIQUE — le corridor, avant qu'il existe.
 *
 * Le pendant visuel de la page Empire : celle-là décrit NOVA-AXE en mots et en
 * chiffres, celle-ci le montre. Un homme construit ce qu'il a vu.
 */
export default async function AfriquePage() {
  const userId = await requireUserId();
  await exigerDebloqueOuPC(userId);

  return (
    <GalerieView
      titre="Plan Afrique"
      sousTitre="NOVA-AXE avant la première pierre. Ce que le corridor sera."
      dossier="afrique"
      images={GALERIE_AFRIQUE}
      accent="#22c55e"
    />
  );
}
