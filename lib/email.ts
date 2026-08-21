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
  isMesse,
  type Liturgy,
  type LiturgyContext,
  LANGUES,
  type Langue,
} from "./liturgy";
import { getSerment } from "./serments";
import { citationsDu, estHeureDeRappel, rendreRappel } from "./rappel";
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

/**
 * Le rappel de deux heures, prêt à partir.
 *
 * Il tire son contexte du même endroit que l'office : les mêmes chiffres,
 * lus une seule fois. Ce qui change est ce qu'on en fait — l'office les
 * développe, le rappel les met en pied de page.
 */
export async function buildRappel(
  userId: string,
  hour: number,
): Promise<Brief> {
  const [ctx, serment] = await Promise.all([
    liturgyContext(userId, hour),
    getSerment(userId),
  ]);
  const cs = citationsDu(todayHaiti(), hour);
  return rendreRappel(
    cs,
    {
      jour: serment.jourActuel,
      retention: ctx.retentionDays,
      noyauFait: ctx.coreDone,
      noyauTotal: ctx.coreTotal,
      joursAvant2027: ctx.daysToJan,
    },
    hour,
    appUrl(),
  );
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
  skipped?: string;
  error?: string;
  /** Le détail par destinataire : c'est ce qui permet de voir lequel échoue. */
  detail?: { to: string; ok: boolean; id?: string; error?: string }[];
}

/**
 * LE RAPPEL DE DEUX HEURES. Un seul format, un seul envoi possible.
 *
 * Tout le reste est parti : l'office complet, les trois langues, les trois
 * messes, le coup court WhatsApp. Il a tranché — il ne veut que ça, et il a
 * raison : il n'ouvrait aucun des autres.
 *
 * Un envoi PAR DESTINATAIRE, jamais un envoi groupé. Deux raisons, et la
 * seconde est celle qui compte pour lui. La première : si une adresse est
 * refusée, l'autre part quand même. La seconde : deux messages distincts
 * déclenchent deux notifications sur deux appareils, alors qu'un seul message
 * à deux destinataires n'en déclenche qu'une par boîte — et son problème est
 * précisément qu'il ne remarque pas les mails.
 *
 * Le détail par adresse est renvoyé pour qu'un échec soit visible et nommé,
 * au lieu de se perdre dans un total.
 */
export async function sendHourlyBrief(opts?: {
  force?: boolean;
  hour?: number;
}): Promise<SendResult> {
  const hour = opts?.hour ?? haitiHour();
  const to = recipients();

  if (!opts?.force && !isLiturgyHour(hour)) {
    return { ok: true, sent: 0, to: [], hour, skipped: "hors heures de réveil" };
  }
  // Une heure sur deux : 5, 7, 9 … 21. Neuf par jour.
  if (!opts?.force && !estHeureDeRappel(hour)) {
    return { ok: true, sent: 0, to: [], hour, skipped: "heure creuse" };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key)
    return { ok: false, sent: 0, to, hour, error: "RESEND_API_KEY manquante" };
  if (to.length === 0)
    return { ok: false, sent: 0, to, hour, error: "MORNING_EMAIL_TO manquante" };

  const from =
    process.env.MORNING_EMAIL_FROM ??
    process.env.RESEND_FROM ??
    "FORGED <onboarding@resend.dev>";

  const rows = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, process.env.SEED_EMAIL ?? ""))
    .limit(1);
  const userId = rows[0]?.id;
  if (!userId)
    return { ok: false, sent: 0, to, hour, error: "utilisateur introuvable" };

  const brief = await buildRappel(userId, hour);
  const resend = new Resend(key);

  const detail: NonNullable<SendResult["detail"]> = [];
  for (const adresse of to) {
    try {
      const { data, error } = await resend.emails.send({
        from,
        to: [adresse],
        subject: brief.subject,
        html: brief.html,
        text: brief.text,
      });
      detail.push(
        error
          ? { to: adresse, ok: false, error: String(error.message ?? error) }
          : { to: adresse, ok: true, id: data?.id },
      );
    } catch (e) {
      detail.push({ to: adresse, ok: false, error: String(e) });
    }
    // Resend limite le débit à deux requêtes par seconde.
    if (adresse !== to[to.length - 1])
      await new Promise((r) => setTimeout(r, 600));
  }

  const envoyes = detail.filter((d) => d.ok).length;
  const erreurs = detail.filter((d) => !d.ok);

  return {
    // Un seul destinataire servi suffit à considérer le créneau tenu : le but
    // est qu'il voie le rappel, pas que les deux boîtes l'aient.
    ok: envoyes > 0,
    sent: envoyes,
    to,
    hour,
    error: erreurs.length
      ? erreurs.map((e) => `${e.to} : ${e.error}`).join(" ; ")
      : undefined,
    detail,
  };
}
