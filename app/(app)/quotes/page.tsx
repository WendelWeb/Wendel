import { requireUserId } from "@/lib/auth";
import QuotesView from "@/components/QuotesView";
import { visitSeed } from "@/lib/rotate";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  await requireUserId();
  // Une graine neuve à chaque visite : la citation mise en avant et l'ordre de
  // la liste changent à chaque fois qu'il ouvre la page. Elle est tirée ici,
  // côté serveur, puis passée au composant client — qui s'en sert de façon
  // déterministe, sinon l'hydratation ne correspondrait pas au rendu serveur.
  return <QuotesView seed={visitSeed()} />;
}
