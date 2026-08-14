import "server-only";
import { Resend } from "resend";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";
import { getLogByDate, getStreak } from "./daily";
import { getRetention } from "./retention";
import { getProgram } from "./programs";
import { getPlan } from "./plans";
import { isRestDay, gymSessionLabel } from "./program";
import { planCoreStatus, planLabels } from "./plan";
import { ITEM_LABEL } from "./verdict";
import { todayHaiti, weekday, haitiHour } from "./dates";
import {
  buildLiturgy,
  deadlines,
  isLiturgyHour,
  type Liturgy,
  type LiturgyContext,
  LANGUES,
  type Langue,
} from "./liturgy";
import { renderLiturgy, type Rendered } from "./email-render";
import { sendWhatsAppTwo } from "./whatsapp";

export function recipients(): string[] {
  return (process.env.MORNING_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * L'adresse publique de l'app, pour les liens des emails.
 *
 * APP_URL d'abord, mais en local il vaut souvent `localhost` ou une IP de LAN
 * (192.168.x.x) : depuis une boîte mail ces liens ne mènent nulle part. Dans ce
 * cas on retombe sur le domaine que Vercel fournit tout seul, pour que les
 * boutons marchent même si la variable a été oubliée ou mal réglée.
 */
export function appUrl(): string | null {
  const prive =
    /^https?:\/\/(localhost|127\.|0\.0\.0\.0|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/i;
  for (const brut of [process.env.APP_URL, process.env.NEXTAUTH_URL]) {
    const v = brut?.trim().replace(/\/+$/, "");
    if (v && /^https?:\/\//i.test(v) && !prive.test(v)) return v;
  }
  // Fournis automatiquement par Vercel. Le premier est le domaine stable de
  // production ; le second change à chaque déploiement mais dépanne toujours.
  for (const hote of [
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]) {
    const v = hote?.trim().replace(/\/+$/, "");
    if (v) return v.startsWith("http") ? v : `https://${v}`;
  }
  return null;
}

export interface Brief {
  subject: string;
  html: string;
  text: string;
}

/**
 * Rassemble les données vivantes du moment. C'est ce qui rend l'email
 * irréfutable : il ne récite pas des généralités, il lui dit où il en est.
 */
export async function liturgyContext(
  userId: string,
  hour: number,
): Promise<LiturgyContext> {
  const today = todayHaiti();
  const [log, streak, ret, program, plan] = await Promise.all([
    getLogByDate(userId, today),
    getStreak(userId),
    getRetention(userId),
    getProgram(userId),
    getPlan(userId),
  ]);

  const jour = weekday(today);
  const rest = isRestDay(program, jour);
  // Le noyau vient de SON plan : s'il l'a modifié dans les réglages, l'email
  // lui parle de la journée qu'il s'est réellement fixée, pas d'une autre.
  const core = planCoreStatus(plan, log?.completedItems, rest, jour);
  const libelles = planLabels(plan);
  const { toJan, to30 } = deadlines(today);

  const label = (id: string) =>
    id === "gym"
      ? gymSessionLabel(program, jour)
      : (libelles[id] ?? ITEM_LABEL[id] ?? id);

  return {
    date: today,
    hour,
    daysToJan: toJan,
    daysTo30: to30,
    retentionDays: ret.days,
    streak: streak.currentStreak ?? 0,
    coreDone: core.done,
    coreTotal: core.total,
    restDay: rest,
    gymLabel: rest ? null : gymSessionLabel(program, jour),
    missing: core.missing.map(label),
  };
}

/** L'office de cette heure-là, dans une langue, prêt à partir. */
export async function buildHourlyBrief(
  userId: string,
  hour: number,
  langue: Langue = "fr",
): Promise<Brief & { liturgy: Liturgy }> {
  const ctx = await liturgyContext(userId, hour);
  const lit = buildLiturgy(ctx, langue);
  const rendu: Rendered = renderLiturgy(lit, ctx, appUrl());
  return { ...rendu, liturgy: lit };
}

export interface SendResult {
  ok: boolean;
  sent: number;
  to: string[];
  hour?: number;
  kind?: "messe" | "heure";
  name?: string;
  minutes?: number;
  skipped?: string;
  error?: string;
  /** Le coup court parti sur WhatsApp, quand Twilio est configuré. */
  whatsapp?: { sent: number; to: string[]; skipped?: string; error?: string };
}

/**
 * Envoie l'office de l'heure. Hors des heures de réveil, ne fait rien — le
 * planificateur peut donc taper toutes les heures sans risque.
 */
export async function sendHourlyBrief(opts?: {
  force?: boolean;
  hour?: number;
  /** Par défaut les deux : l'office par email, le coup court sur WhatsApp. */
  channel?: "email" | "whatsapp" | "both";
  /** Les langues a envoyer. Par defaut les trois. */
  langues?: Langue[];
}): Promise<SendResult> {
  const hour = opts?.hour ?? haitiHour();
  const to = recipients();
  const canal = opts?.channel ?? "both";

  if (!opts?.force && !isLiturgyHour(hour)) {
    return { ok: true, sent: 0, to: [], hour, skipped: "hors heures de réveil" };
  }

  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.MORNING_EMAIL_FROM ??
    process.env.RESEND_FROM ??
    "FORGED <onboarding@resend.dev>";

  const veutEmail = canal !== "whatsapp";
  if (veutEmail && !key)
    return { ok: false, sent: 0, to, hour, error: "RESEND_API_KEY manquante" };
  if (veutEmail && to.length === 0)
    return { ok: false, sent: 0, to, hour, error: "MORNING_EMAIL_TO manquante" };

  const rows = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, process.env.SEED_EMAIL ?? ""))
    .limit(1);
  const userId = rows[0]?.id;
  if (!userId)
    return { ok: false, sent: 0, to, hour, error: "utilisateur introuvable" };

  const ctx = await liturgyContext(userId, hour);

  // Trois offices par créneau, dans l'ordre de son manifeste quotidien :
  // anglais, français, créole. La même chose trois fois, dans trois langues.
  const langues = opts?.langues ?? LANGUES;
  const briefs = await Promise.all(
    langues.map((l) => buildHourlyBrief(userId, hour, l)),
  );

  // Le français part sur WhatsApp — deux messages, jamais plus. Trois langues
  // en messages téléphone feraient six notifications par créneau.
  let wa: SendResult["whatsapp"];
  if (canal !== "email") {
    const fr = briefs.find((b) => /Français/.test(b.liturgy.name)) ?? briefs[0];
    const r = await sendWhatsAppTwo(fr.liturgy, ctx);
    wa = { sent: r.sent, to: r.to, skipped: r.skipped, error: r.error };
  }

  const premier = briefs[0];
  if (!veutEmail) {
    return {
      ok: true,
      sent: 0,
      to: [],
      hour,
      kind: premier.liturgy.kind,
      name: premier.liturgy.name,
      minutes: premier.liturgy.minutes,
      skipped: "email non demandé",
      whatsapp: wa,
    };
  }

  const resend = new Resend(key!);
  const erreurs: string[] = [];
  let envoyes = 0;

  for (const brief of briefs) {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: brief.subject,
      html: brief.html,
      text: brief.text,
    });
    if (error) erreurs.push(String(error.message ?? error));
    else envoyes++;
    // Resend limite le débit : on espace un peu les trois envois.
    if (brief !== briefs[briefs.length - 1])
      await new Promise((r) => setTimeout(r, 700));
  }

  if (erreurs.length && envoyes === 0)
    return {
      ok: false,
      sent: 0,
      to,
      hour,
      error: erreurs.join(" ; "),
      whatsapp: wa,
    };
  return {
    ok: true,
    sent: envoyes,
    to,
    hour,
    kind: premier.liturgy.kind,
    name: `${envoyes} langues`,
    minutes: premier.liturgy.minutes,
    error: erreurs.length ? erreurs.join(" ; ") : undefined,
    whatsapp: wa,
  };
}
