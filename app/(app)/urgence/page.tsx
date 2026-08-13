import { requireUserId } from "@/lib/auth";
import { getRetention } from "@/lib/retention";
import UrgenceView from "@/components/UrgenceView";
import { exigerDebloque } from "@/lib/verrou";
import { visitSeed } from "@/lib/rotate";

export const dynamic = "force-dynamic";

export default async function UrgencePage() {
  const userId = await requireUserId();
  await exigerDebloque(userId);
  const ret = await getRetention(userId);
  return <UrgenceView retentionDays={ret.days} seed={visitSeed()} />;
}
