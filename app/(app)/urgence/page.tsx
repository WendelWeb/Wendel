import { requireUserId } from "@/lib/auth";
import { getRetention } from "@/lib/retention";
import UrgenceView from "@/components/UrgenceView";

export const dynamic = "force-dynamic";

export default async function UrgencePage() {
  const userId = await requireUserId();
  const ret = await getRetention(userId);
  return <UrgenceView retentionDays={ret.days} />;
}
