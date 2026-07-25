import { requireUserId } from "@/lib/auth";
import UrgenceView from "@/components/UrgenceView";

export const dynamic = "force-dynamic";

export default async function UrgencePage() {
  await requireUserId();
  return <UrgenceView />;
}
