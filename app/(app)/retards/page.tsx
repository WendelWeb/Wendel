import { requireUserId } from "@/lib/auth";
import { todayHaiti, daysBetween } from "@/lib/dates";
import DelayedView from "@/components/DelayedView";

export const dynamic = "force-dynamic";

export default async function RetardsPage() {
  await requireUserId();
  return <DelayedView daysToJan={daysBetween(todayHaiti(), "2027-01-01")} />;
}
