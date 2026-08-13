import { requireUserId } from "@/lib/auth";
import { exigerDebloque } from "@/lib/verrou";
import CoachChat from "@/components/CoachChat";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export default async function CoachPage() {
  const userId = await requireUserId();
  await exigerDebloque(userId);
  return <CoachChat />;
}
