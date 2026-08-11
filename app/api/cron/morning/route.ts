import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { sendHourlyBrief, recipients, buildHourlyBrief } from "@/lib/email";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { haitiHour } from "@/lib/dates";
import { isLiturgyHour } from "@/lib/liturgy";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Le rappel horaire. Appelé toutes les heures ; l'endpoint décide lui-même
 * s'il envoie (uniquement pendant les heures de réveil, 5h–21h à Port-au-Prince).
 * Vercel Cron signe ses appels avec CRON_SECRET en bearer ; `?secret=` permet
 * de déclencher à la main. `?force=1` ignore la garde horaire (tests) et
 * `?hour=14` permet de prévisualiser l'email d'un créneau précis.
 */
function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  if (req.headers.get("authorization") === `Bearer ${secret}`) return true;
  return new URL(req.url).searchParams.get("secret") === secret;
}

async function handle(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const force = url.searchParams.get("force") === "1";
  const hourParam = url.searchParams.get("hour");
  const hour = hourParam !== null ? Number(hourParam) : undefined;

  if (hour !== undefined && (!Number.isInteger(hour) || hour < 0 || hour > 23)) {
    return NextResponse.json({ error: "hour invalide" }, { status: 400 });
  }

  // `?preview=1` compose l'office et le rend, sans rien envoyer. `&html=1` pour
  // voir la mise en page ; par défaut c'est le texte, qui se lit à voix haute.
  if (url.searchParams.get("preview") === "1") {
    const rows = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, process.env.SEED_EMAIL ?? ""))
      .limit(1);
    const userId = rows[0]?.id;
    if (!userId)
      return NextResponse.json({ error: "utilisateur introuvable" }, { status: 500 });

    const brief = await buildHourlyBrief(userId, hour ?? haitiHour());
    const html = url.searchParams.get("html") === "1";
    return new Response(html ? brief.html : brief.text, {
      status: 200,
      headers: {
        "content-type": html
          ? "text/html; charset=utf-8"
          : "text/plain; charset=utf-8",
        "x-liturgy-kind": brief.liturgy.kind,
        "x-liturgy-words": String(brief.liturgy.words),
        "x-liturgy-minutes": String(brief.liturgy.minutes),
      },
    });
  }

  const result = await sendHourlyBrief({ force, hour });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}

export async function GET(req: Request) {
  return handle(req);
}

export async function POST(req: Request) {
  return handle(req);
}

/** Vérification de config, sans rien envoyer. */
export async function HEAD() {
  const ready =
    !!process.env.RESEND_API_KEY &&
    !!process.env.CRON_SECRET &&
    recipients().length > 0 &&
    isLiturgyHour(haitiHour());
  return new Response(null, { status: ready ? 200 : 503 });
}
