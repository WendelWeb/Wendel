import { requireUserId } from "@/lib/auth";
import { exigerDebloqueOuPC } from "@/lib/verrou";
import GalerieView from "@/components/GalerieView";
import { QUOTES } from "@/lib/quotes";
import { sampled, visitSeed } from "@/lib/rotate";
import { GALERIE_INEVITABLE } from "@/lib/galerie-manifeste";

export const dynamic = "force-dynamic";

/**
 * THE INEVITABLE — l'homme qu'il devient, en images.
 *
 * Il les avait sur son disque, dans un dossier qu'il n'ouvrait jamais. Ses
 * mots : « aucun prétexte pour ne pas les regarder ». Elles entrent donc dans
 * l'app, à un tap de tout le reste.
 */
export default async function InevitablePage() {
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
      titre="The Inevitable"
      sousTitre="L'homme que je deviens. Ce n'est pas une envie — c'est une échéance."
      dossier="inevitable"
      citations={citations}
      images={GALERIE_INEVITABLE}
      accent="var(--gold-border)"
    />
  );
}
