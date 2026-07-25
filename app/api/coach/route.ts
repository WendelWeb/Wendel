import { requireUserId } from "@/lib/auth";
import { askCoachStream, type CoachMessage } from "@/lib/coach";

export const runtime = "nodejs";
export const maxDuration = 120;

export async function POST(req: Request) {
  let userId: string;
  try {
    userId = await requireUserId();
  } catch {
    return new Response("Unauthenticated", { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const message = String(body?.message ?? "")
    .slice(0, 2000)
    .trim();
  const history: CoachMessage[] = Array.isArray(body?.history)
    ? body.history
        .slice(-10)
        .filter(
          (m: unknown): m is CoachMessage =>
            !!m &&
            typeof (m as CoachMessage).text === "string" &&
            ((m as CoachMessage).role === "user" ||
              (m as CoachMessage).role === "coach"),
        )
    : [];

  if (!message) return new Response("", { status: 400 });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of askCoachStream(userId, message, history)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (e) {
        console.error("[coach] stream error:", e);
        controller.enqueue(
          encoder.encode(
            "\n\n[Le Coach est indisponible. Il ne marche qu'en local, avec Claude Code connecté à ton abonnement.]",
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
