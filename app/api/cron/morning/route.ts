import { NextResponse } from "next/server";
import { sendHourlyBrief, recipients } from "@/lib/email";
import { haitiHour } from "@/lib/dates";
import { isWakingHour } from "@/lib/email-content";

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
    isWakingHour(haitiHour());
  return new Response(null, { status: ready ? 200 : 503 });
}
