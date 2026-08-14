import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";
import Mantra from "@/components/Mantra";
import Depassement from "@/components/Depassement";
import Homme from "@/components/Homme";
import { visitSeed } from "@/lib/rotate";
import { requireUserId } from "@/lib/auth";
import { verrouille } from "@/lib/verrou";

// Rendu à chaque requête : `auth()` lit les cookies, donc rien n'est mis en
// cache statiquement et le tirage au sort donne bien du neuf à chaque visite.
export const dynamic = "force-dynamic";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  // Pendant les 30 jours, la navigation ne propose plus que ce qui est ouvert.
  // Laisser les onglets visibles reviendrait à lui tendre chaque jour ce qu'il
  // s'est lui-même interdit.
  const userId = await requireUserId();
  const ferme = await verrouille(userId);

  // Deux graines distinctes : le mantra du haut et celui du bas ne doivent
  // jamais afficher les mêmes phrases sur une même page.
  const graineHaut = visitSeed();
  const graineBas = visitSeed();

  return (
    <div className="min-h-[100dvh] bg-background md:flex">
      <SideNav verrouille={ferme} />
      <div className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-md pb-24 md:max-w-none md:pb-12">
          <Mantra placement="top" seed={graineHaut} />
          <Homme placement="top" seed={graineHaut} />
          <Depassement placement="top" seed={graineHaut} />
          {children}
          <Depassement placement="bottom" seed={graineBas} />
          <Homme placement="bottom" seed={graineBas} />
          <Mantra placement="bottom" seed={graineBas} />
        </div>
      </div>
      <BottomNav verrouille={ferme} />
    </div>
  );
}
