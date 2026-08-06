import { requireUserId } from "@/lib/auth";
import { getVision } from "@/lib/vision";
import { todayHaiti, daysBetween } from "@/lib/dates";
import VisionEditor from "@/components/VisionEditor";

export const dynamic = "force-dynamic";

export default async function VisionPage() {
  const userId = await requireUserId();
  const v = await getVision(userId);
  const daysToJan = daysBetween(todayHaiti(), "2027-01-01");
  return (
    <VisionEditor
      initialContent={v.content}
      initialCreed={v.creed}
      daysToJan={daysToJan}
      daysTo30={daysBetween(todayHaiti(), "2033-05-16")}
    />
  );
}
