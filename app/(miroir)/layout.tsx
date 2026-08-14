import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import { requireUserId } from "@/lib/auth";
import { verrouille } from "@/lib/verrou";
import SideNav from "@/components/SideNav";
import Depassement from "@/components/Depassement";
import Homme from "@/components/Homme";
import { visitSeed } from "@/lib/rotate";

/**
 * Le groupe du miroir — son propre layout, volontairement nu.
 *
 * Pas de mantra en haut ni en bas, contrairement au groupe (app) : il a demandé
 * que ce soit la SEULE chose qu'il voie en ouvrant l'app. La navigation reste,
 * parce qu'il doit pouvoir aller cocher ses cases — c'est le seul geste qui
 * puisse changer une ligne de ce qu'il lit ici.
 */
export const dynamic = "force-dynamic";

export default async function MiroirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  const userId = await requireUserId();
  const ferme = await verrouille(userId);

  // Le mantra reste dehors — mais le dépassement entre, parce qu'il l'a
  // demandé « même dans le miroir ». Et c'est la seule chose qui ait sa place
  // ici : tout cet écran dit ce qu'il est, celui-là seul dit ce qui vient
  // au-dessus de ce qui est écrit.
  const graineHaut = visitSeed();
  const graineBas = visitSeed();

  return (
    <div className="min-h-[100dvh] bg-background md:flex">
      <SideNav verrouille={ferme} />
      <div className="min-w-0 flex-1">
        <Homme placement="top" seed={graineHaut} />
        <Depassement placement="top" seed={graineHaut} />
        {children}
        <Depassement placement="bottom" seed={graineBas} />
        <Homme placement="bottom" seed={graineBas} />
      </div>
      <BottomNav verrouille={ferme} />
    </div>
  );
}
