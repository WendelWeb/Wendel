import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";

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

  return (
    <div className="min-h-[100dvh] bg-black md:flex">
      <SideNav />
      <div className="min-w-0 flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}
