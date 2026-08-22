import { requireUserId } from "@/lib/auth";
import { exigerDebloqueOuPC } from "@/lib/verrou";
import GalerieView from "@/components/GalerieView";
import { QUOTES } from "@/lib/quotes";
import { sampled, visitSeed } from "@/lib/rotate";
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

  // Deux cents citations tirées à chaque visite, jamais les deux mille.
  // Envoyer le corpus entier au navigateur coûterait des centaines de
  // kilo-octets pour une ligne affichée à la fois ; deux cents suffisent à ce
  // qu'il ne reconnaisse jamais la phrase d'une image, et le tirage change à
  // chaque chargement de page.
  const citations = sampled(QUOTES, visitSeed(), 200).map((q) => q.t);

  return (
    <GalerieView
      titre="Plan Afrique"
      sousTitre="NOVA-AXE avant la première pierre. Ce que le corridor sera."
      dossier="afrique"
      citations={citations}
      images={GALERIE_AFRIQUE}
      accent="#22c55e"
    />
  );
}
