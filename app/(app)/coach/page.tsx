import { requireUserId } from "@/lib/auth";
import CoachChat from "@/components/CoachChat";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export default async function CoachPage() {
  await requireUserId();
  return <CoachChat />;
}
