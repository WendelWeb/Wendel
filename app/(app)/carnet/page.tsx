import { requireUserId } from "@/lib/auth";
import { exigerDebloque } from "@/lib/verrou";
import CarnetView from "@/components/CarnetView";

export const dynamic = "force-dynamic";

export default async function CarnetPage() {
  const userId = await requireUserId();
  await exigerDebloque(userId);
  return <CarnetView />;
}
