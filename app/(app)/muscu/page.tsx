import { requireUserId } from "@/lib/auth";
import { getGymSession } from "@/lib/daily";
import { getProgram } from "@/lib/programs";
import { todayHaiti, formatLong, weekdayHaiti } from "@/lib/dates";
import { DAY_NAMES } from "@/lib/program";
import MuscuView from "@/components/MuscuView";

export const dynamic = "force-dynamic";

export default async function MuscuPage() {
  const userId = await requireUserId();
  const [program, session] = await Promise.all([
    getProgram(userId),
    getGymSession(userId, todayHaiti()),
  ]);
  const wd = weekdayHaiti();

  return (
    <MuscuView
      workout={program[String(wd)]}
      program={program}
      dayName={DAY_NAMES[wd]}
      initialSets={session?.setsCompleted ?? {}}
      initialNotes={session?.notes ?? ""}
      dateLabel={formatLong(todayHaiti())}
    />
  );
}
