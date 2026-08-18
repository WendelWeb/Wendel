import { requireUserId } from "@/lib/auth";
import EmpireView from "@/components/EmpireView";

/**
 * La page de l'empire — NOVA-AXE.
 *
 * Aucun verrou : elle est née le jour où il a levé les verrous, et elle n'a
 * rien à mériter. Elle ne demande rien et ne rappelle rien — elle expose le
 * projet, ce qu'il fera, dominera, contrôlera et changera, puis les trente
 * secteurs de dominance et leur impact mondial.
 *
 * Statique dans son contenu, mais rendue à la requête comme le reste de l'app :
 * la session est lue à chaque fois.
 */
export const dynamic = "force-dynamic";

export default async function EmpirePage() {
  await requireUserId();
  return <EmpireView />;
}
