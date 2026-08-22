import { requireUserId } from "@/lib/auth";
import { exigerDebloqueOuPC } from "@/lib/verrou";
import GalerieView from "@/components/GalerieView";
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

  return (
    <GalerieView
      titre="The Inevitable"
      sousTitre="L'homme que je deviens. Ce n'est pas une envie — c'est une échéance."
      dossier="inevitable"
      images={GALERIE_INEVITABLE}
      accent="var(--gold-border)"
    />
  );
}
