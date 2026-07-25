"use server";

import { requireUserId } from "@/lib/auth";
import { askCoach, type CoachMessage } from "@/lib/coach";

/** Ask FORGE COACH (localhost only — uses the Claude subscription). */
export async function askCoachAction(
  message: string,
  history: CoachMessage[],
): Promise<{ reply: string; error?: boolean }> {
  const userId = await requireUserId();
  const clean = String(message ?? "")
    .slice(0, 2000)
    .trim();
  if (!clean) return { reply: "Dis quelque chose." };
  const safeHistory: CoachMessage[] = Array.isArray(history)
    ? history
        .slice(-10)
        .filter(
          (m) =>
            m &&
            (m.role === "user" || m.role === "coach") &&
            typeof m.text === "string",
        )
    : [];

  try {
    const reply = await askCoach(userId, clean, safeHistory);
    return { reply };
  } catch (e) {
    console.error("[coach] error:", e);
    return {
      reply:
        "Le Coach est indisponible. Il ne fonctionne qu'en local (npm run dev sur ta machine), avec Claude Code connecté à ton abonnement.",
      error: true,
    };
  }
}
