import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import {
  sendHourlyBrief,
  recipients,
  buildHourlyBrief,
  buildRappel,
  liturgyContext,
} from "@/lib/email";
import { buildOffice, whatsappConfigured } from "@/lib/whatsapp";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { haitiHour } from "@/lib/dates";
import { isLiturgyHour, type Langue } from "@/lib/liturgy";

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

    const h = hour ?? haitiHour();

    // `&kind=rappel` montre le mail des heures ordinaires — une citation et dix
    // minutes — plutôt que l'office complet des trois messes.
    if (url.searchParams.get("kind") === "rappel") {
      const r = await buildRappel(userId, h);
      const enHtml = url.searchParams.get("html") === "1";
      return new Response(enHtml ? r.html : `${r.subject}

${r.text}`, {
        status: 200,
        headers: {
          "content-type": enHtml
            ? "text/html; charset=utf-8"
            : "text/plain; charset=utf-8",
        },
      });
    }

    const lg = url.searchParams.get("lang");
    const langue: Langue = lg === "en" || lg === "ht" ? lg : "fr";
    const brief = await buildHourlyBrief(userId, h, langue);

    // `&channel=whatsapp` montre les DEUX messages tels qu'ils partiront,
    // avec leur longueur — WhatsApp coupe à 1 600 caractères.
    if (url.searchParams.get("channel") === "whatsapp") {
      const ctx = await liturgyContext(userId, h);
      const max = Number(url.searchParams.get("max") ?? 2);
      const parts = buildOffice(brief.liturgy, ctx, Number.isFinite(max) ? max : 2);
      return new Response(
        parts
          .map((p, i) => `${p}\n\n${"=".repeat(46)}  ${i + 1}/${parts.length} — ${p.length} car.\n`)
          .join("\n") +
          `\nTwilio ${whatsappConfigured() ? "configure" : "PAS CONFIGURE"}`,
        { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } },
      );
    }

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

  // `?channel=whatsapp` pour ne tester que le coup court, `=email` que l'office.
  const c = url.searchParams.get("channel");
  const channel =
    c === "email" || c === "whatsapp" || c === "both" ? c : undefined;

  const result = await sendHourlyBrief({ force, hour, channel });
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
