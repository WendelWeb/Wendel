import { requireUserId } from "@/lib/auth";
import { todayHaiti } from "@/lib/dates";
import QuotesView from "@/components/QuotesView";

export const dynamic = "force-dynamic";

export default async function QuotesPage() {
  await requireUserId();
  // Seed déterministe par jour (AAAAMMJJ) → la citation du jour change chaque jour.
  const seed = parseInt(todayHaiti().replace(/-/g, ""), 10);
  return <QuotesView seed={seed} />;
}
