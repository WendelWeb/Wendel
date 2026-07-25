import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import BottomNav from "@/components/BottomNav";
import SideNav from "@/components/SideNav";
import Mantra from "@/components/Mantra";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/auth/login");

  return (
    <div className="min-h-[100dvh] bg-background md:flex">
      <SideNav />
      <div className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-md pb-24 md:max-w-none md:pb-12">
          <Mantra placement="top" />
          {children}
          <Mantra placement="bottom" />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
