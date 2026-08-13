import { requireUserId } from "@/lib/auth";
import { exigerDebloque } from "@/lib/verrou";
import { getLogsInRange } from "@/lib/daily";
import { todayHaiti, addDays } from "@/lib/dates";
import JournalView from "@/components/JournalView";

export const dynamic = "force-dynamic";

export default async function JournalPage() {
  const userId = await requireUserId();
  await exigerDebloque(userId);
  const today = todayHaiti();
  const minDate = addDays(today, -30);

  const logs = await getLogsInRange(userId, minDate, today);
  const textByDate: Record<string, string> = {};
  for (const log of logs) {
    if (log.journal) textByDate[log.date] = log.journal;
  }

  return (
    <JournalView today={today} minDate={minDate} textByDate={textByDate} />
  );
}
