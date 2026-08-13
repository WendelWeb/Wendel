import { requireUserId } from "@/lib/auth";
import { exigerDebloque } from "@/lib/verrou";
import { getProgram } from "@/lib/programs";
import ProgramEditor from "@/components/ProgramEditor";

export const dynamic = "force-dynamic";

export default async function ProgrammePage() {
  const userId = await requireUserId();
  await exigerDebloque(userId);
  const program = await getProgram(userId);
  return <ProgramEditor initial={program} />;
}
