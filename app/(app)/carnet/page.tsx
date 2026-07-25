import { requireUserId } from "@/lib/auth";
import CarnetView from "@/components/CarnetView";

export const dynamic = "force-dynamic";

export default async function CarnetPage() {
  await requireUserId();
  return <CarnetView />;
}
