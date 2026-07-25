import { requireUserId } from "@/lib/auth";
import { getProgram } from "@/lib/programs";
import ProgramEditor from "@/components/ProgramEditor";

export const dynamic = "force-dynamic";

export default async function ProgrammePage() {
  const userId = await requireUserId();
  const program = await getProgram(userId);
  return <ProgramEditor initial={program} />;
}
