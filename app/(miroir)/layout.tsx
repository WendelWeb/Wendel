import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import { requireUserId } from "@/lib/auth";
import { verrouille } from "@/lib/verrou";
import SideNav from "@/components/SideNav";
import BackBar from "@/components/BackBar";
import Depassement from "@/components/Depassement";
import Homme from "@/components/Homme";
import Loi from "@/components/Loi";
import { visitSeed, shuffled, branch } from "@/lib/rotate";

/**
 * Les trois bandeaux du miroir, dans un ordre tire au sort a chaque visite.
 * Meme raison que dans le groupe (app) : il ne lit presque jamais une page
 * entiere, donc c est l ordre qui doit bouger, pas seulement le contenu.
 */
function bandeaux(graine: number, placement: "top" | "bottom") {
  const cartes = shuffled(
    [
      <Homme key="homme" placement={placement} seed={graine} />,
      <Depassement key="depassement" placement={placement} seed={graine} />,
      <Loi key="loi" placement={placement} seed={graine} />,
    ],
    branch(graine, `ordre-${placement}`),
  );

  return (
    <div
      className={`colonnes-xl px-4 md:px-6 ${
        placement === "top" ? "mb-6 mt-3" : "mb-6 mt-8"
      }`}
    >
      {cartes}
    </div>
  );
}

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
        <BackBar />
        {bandeaux(graineHaut, "top")}
        {children}
        {bandeaux(graineBas, "bottom")}
      </div>
      <BottomNav verrouille={ferme} />
    </div>
  );
}
