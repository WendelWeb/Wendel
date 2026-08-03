import "server-only";
import { Resend } from "resend";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./schema";
import { getLogByDate, getStreak } from "./daily";
import { getRetention } from "./retention";
import { getProgram } from "./programs";
import { isRestDay, gymSessionLabel } from "./program";
import { activeCoreIds, coreStatus } from "./core";
import { ITEM_LABEL } from "./verdict";
import { CHECKLIST_ORDERED, timeToMinutes } from "./checklist";
import { hourlyPayload, hourlySubject, isWakingHour } from "./email-content";
import { todayHaiti, daysBetween, weekday, haitiHour } from "./dates";
import { THRESHOLD_21 } from "./affirmations";

const GOLD = "#f59e0b";
const RED = "#dc2626";
const GREEN = "#16a34a";

export function recipients(): string[] {
  return (process.env.MORNING_EMAIL_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface Brief {
  subject: string;
  html: string;
  text: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function card(inner: string, bg = "#18181b"): string {
  return `<tr><td style="padding:0 24px 14px"><div style="background:${bg};border-radius:12px;padding:16px">${inner}</div></td></tr>`;
}

function eyebrow(text: string, color = "rgba(255,255,255,.45)"): string {
  return `<div style="color:${color};font-size:9px;text-transform:uppercase;letter-spacing:2.4px;margin-bottom:7px">${esc(text)}</div>`;
}

/** Compose l'email de l'heure à partir de ses vraies données. */
export async function buildHourlyBrief(
  userId: string,
  hour: number,
): Promise<Brief> {
  const today = todayHaiti();
  const [log, streak, ret, program] = await Promise.all([
    getLogByDate(userId, today),
    getStreak(userId),
    getRetention(userId),
    getProgram(userId),
  ]);

  const rest = isRestDay(program, weekday(today));
  const core = coreStatus(log?.completedItems, rest);
  const coreIds = activeCoreIds(rest);
  const daysToJan = daysBetween(today, "2027-01-01");
  const p = hourlyPayload(today, hour, ret.days);
  const stair = Math.min(100, Math.round((ret.days / THRESHOLD_21) * 100));
  const held = core.complete;

  const label = (id: string) =>
    id === "gym" ? gymSessionLabel(program, weekday(today)) : (ITEM_LABEL[id] ?? id);

  // Ce qui est dû à cette heure précise, d'après la ligne du temps.
  const timed = CHECKLIST_ORDERED.map((i) => ({ i, at: timeToMinutes(i.time) }))
    .filter((x) => x.at < 100000 && (!rest || !["run", "gym"].includes(x.i.id)))
    .sort((a, b) => a.at - b.at);
  const nowMin = hour * 60 + 59;
  const started = timed.filter((x) => x.at <= nowMin);
  const current = started.length ? started[started.length - 1].i : null;
  const next = timed.find((x) => x.at > nowMin)?.i ?? null;

  const missing = core.missing.map(label);
  const subject = hourlySubject(hour, daysToJan, ret.days, core.done, core.total);

  const quotesHtml = p.quotes
    .map(
      (q, n) =>
        `<div style="border-left:3px solid ${p.quoteColors[n]};padding:2px 0 2px 12px;margin-bottom:${n === p.quotes.length - 1 ? 0 : 12}px">
           <div style="color:#e4e4e7;font-size:13.5px;font-style:italic;line-height:1.5">« ${esc(q.t)} »</div>
           ${q.s ? `<div style="color:#52525b;font-size:10px;margin-top:3px">${esc(q.s)}</div>` : ""}
         </div>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:20px 10px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111113;border-radius:16px;overflow:hidden">

  <tr><td style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:22px 24px">
    <table role="presentation" width="100%"><tr>
      <td><div style="color:${GOLD};font-size:26px;font-weight:800;letter-spacing:-1px;line-height:1">FORGED</div></td>
      <td align="right"><div style="color:rgba(255,255,255,.85);font-size:20px;font-weight:800">${String(hour).padStart(2, "0")}h</div>
      <div style="color:rgba(255,255,255,.4);font-size:9px;text-transform:uppercase;letter-spacing:1.6px">${p.index} / ${p.total}</div></td>
    </tr></table>
    <div style="color:rgba(255,255,255,.6);font-size:11.5px;margin-top:9px;line-height:1.4">
      Lis chaque ligne <strong style="color:${GOLD}">à voix haute</strong>. C'est la répétition qui ancre.
    </div>
  </td></tr>

  <!-- Compteurs -->
  <tr><td style="padding:18px 24px 14px">
    <table role="presentation" width="100%"><tr>
      <td width="32%" style="text-align:center;padding:11px 4px;background:#18181b;border-radius:10px">
        <div style="color:${RED};font-size:20px;font-weight:800;line-height:1">J−${daysToJan}</div>
        <div style="color:#71717a;font-size:8.5px;text-transform:uppercase;letter-spacing:1.4px;margin-top:4px">1er janvier</div></td>
      <td width="2%"></td>
      <td width="32%" style="text-align:center;padding:11px 4px;background:#18181b;border-radius:10px">
        <div style="color:${GOLD};font-size:20px;font-weight:800;line-height:1">${ret.days}</div>
        <div style="color:#71717a;font-size:8.5px;text-transform:uppercase;letter-spacing:1.4px;margin-top:4px">Rétention</div></td>
      <td width="2%"></td>
      <td width="32%" style="text-align:center;padding:11px 4px;background:#18181b;border-radius:10px">
        <div style="color:${held ? GREEN : RED};font-size:20px;font-weight:800;line-height:1">${core.done}/${core.total}</div>
        <div style="color:#71717a;font-size:8.5px;text-transform:uppercase;letter-spacing:1.4px;margin-top:4px">Noyau</div></td>
    </tr></table>
  </td></tr>

  <!-- Maintenant / ensuite -->
  ${card(
    `${eyebrow("Cette heure")}
     <div style="color:#fff;font-size:15px;font-weight:700;line-height:1.3">${esc(current ? label(current.id) : "La journée commence.")}${current ? `<span style="color:#71717a;font-weight:400;font-size:12px"> · ${esc(current.time)}</span>` : ""}</div>
     ${next ? `<div style="color:#a1a1aa;font-size:12.5px;margin-top:7px;line-height:1.4">Ensuite : <strong style="color:#d4d4d8">${esc(label(next.id))}</strong> à ${esc(next.time)}</div>` : ""}`,
  )}

  <!-- Statut noyau, ton adapté -->
  ${card(
    held
      ? `${eyebrow("Le noyau", "rgba(255,255,255,.5)")}
         <div style="color:${GREEN};font-size:15px;font-weight:800;text-transform:uppercase;line-height:1.3">Tenu — ${core.total}/${core.total}</div>
         <div style="color:#a1a1aa;font-size:12.5px;margin-top:6px;line-height:1.45">Ta série est sécurisée pour aujourd'hui. Le reste est du bonus. Ne relâche pas le vaisseau ce soir.</div>`
      : `${eyebrow("Il te manque", "rgba(255,255,255,.5)")}
         <div style="color:#fff;font-size:13.5px;line-height:1.5">${missing
           .slice(0, 6)
           .map((m) => `<span style="color:${GOLD}">🔑</span> ${esc(m)}`)
           .join("<br>")}${missing.length > 6 ? `<br><span style="color:#71717a">+ ${missing.length - 6} autres</span>` : ""}</div>
         <div style="color:#71717a;font-size:11.5px;margin-top:9px;line-height:1.45">La série ne tient que si tout le noyau est coché.</div>`,
    held ? "#0d1f14" : "#18181b",
  )}

  <!-- Escalier -->
  ${card(
    `${eyebrow("L'escalier blanc")}
     <div style="background:#27272a;border-radius:999px;height:7px;overflow:hidden"><div style="background:${GOLD};height:7px;width:${stair}%"></div></div>
     <div style="color:#a1a1aa;font-size:12px;margin-top:7px;line-height:1.4">Jour ${ret.days} — ${stair}% du seuil des 21 jours. Chaque jour retenu te monte d'une marche ; une chute te fige.</div>`,
  )}

  <!-- La loi de l'heure -->
  ${card(
    `${eyebrow(p.law.label)}
     <div style="color:${p.law.gold ? GOLD : "#fff"};font-size:17px;font-weight:800;text-transform:uppercase;line-height:1.2">${esc(p.law.main)}</div>
     ${p.law.sub ? `<div style="color:rgba(255,255,255,.7);font-size:13px;line-height:1.45;margin-top:8px">${esc(p.law.sub)}</div>` : ""}`,
    p.law.accent === "#000000" ? "#0a0a0a" : p.law.accent,
  )}

  <!-- L'interrogatoire -->
  ${card(
    `${eyebrow("Ce que tu fais là — est-ce que ça reflète…", "rgba(255,255,255,.5)")}
     <div style="color:#fff;font-size:14px;font-weight:600;line-height:1.4">${esc(p.question)}</div>
     <div style="color:${RED};font-size:12.5px;font-weight:700;margin-top:9px;line-height:1.4">Ou tu vas passer ta vie à rêver ?</div>`,
    "#1c1917",
  )}

  <!-- La piqûre -->
  ${card(
    `${eyebrow("Si tu cèdes, voilà ce que tu es à cet instant", "rgba(255,255,255,.5)")}
     <div style="color:#fff;font-size:13.5px;font-weight:600;line-height:1.45">${esc(p.sting)}</div>`,
    "#7f1d1d",
  )}

  <!-- Le bloc profond — tourne entre Vaisseau, Vision/POURQUOI, Carnet,
       rétention, urgence, chantiers et effet domino -->
  ${card(
    `${eyebrow(p.deep.eyebrow, GOLD)}
     ${p.deep.title ? `<div style="color:#fff;font-size:15px;font-weight:800;line-height:1.3;margin-bottom:7px">${esc(p.deep.title)}</div>` : ""}
     <div style="color:#d4d4d8;font-size:13.5px;line-height:1.55">${esc(p.deep.body)}</div>
     ${p.deep.meta ? `<div style="color:#71717a;font-size:11.5px;margin-top:8px;line-height:1.45">${esc(p.deep.meta)}</div>` : ""}
     ${
       process.env.APP_URL && p.deep.href
         ? `<a href="${esc(process.env.APP_URL)}${esc(p.deep.href)}" style="display:inline-block;color:${GOLD};text-decoration:none;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-top:11px">Ouvrir dans l'app →</a>`
         : ""
     }`,
    "#1a1a1d",
  )}

  <!-- Ce que tu retardes -->
  ${card(
    `${eyebrow("Ce que tu retardes")}
     <div style="color:#d4d4d8;font-size:13.5px;line-height:1.5">${esc(p.objectif)}</div>`,
  )}

  <!-- Citations -->
  ${card(`${eyebrow("À déclarer")}${quotesHtml}`)}

  <!-- La déclaration -->
  ${card(
    `<div style="text-align:center">
       ${eyebrow("Dis-le à voix haute, maintenant", "rgba(255,255,255,.45)")}
       <div style="color:${GOLD};font-size:16px;font-weight:800;text-transform:uppercase;line-height:1.3">${esc(p.declaration)}</div>
     </div>`,
    "#000000",
  )}

  <!-- CTA -->
  <tr><td style="padding:6px 24px 24px">
    ${
      process.env.APP_URL
        ? `<a href="${esc(process.env.APP_URL)}/today" style="display:block;background:${GOLD};color:#111;text-decoration:none;font-size:15px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;padding:16px;border-radius:12px;text-align:center">Ouvre FORGED et lis</a>
           <div style="color:#71717a;font-size:11.5px;text-align:center;margin-top:10px;line-height:1.5">
             Relis ta <a href="${esc(process.env.APP_URL)}/vision" style="color:${GOLD};text-decoration:none">Vision</a> et ton POURQUOI ·
             ton <a href="${esc(process.env.APP_URL)}/carnet" style="color:${GOLD};text-decoration:none">Carnet</a> ·
             tes <a href="${esc(process.env.APP_URL)}/quotes" style="color:${GOLD};text-decoration:none">Citations</a>
           </div>`
        : ""
    }
    <div style="color:#52525b;font-size:10.5px;text-align:center;margin-top:16px;line-height:1.6">
      Prier sans cesse — cette victoire entrera par la main de Dieu.
    </div>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  const text = [
    `FORGED — ${String(hour).padStart(2, "0")}h (${p.index}/${p.total})`,
    `Lis chaque ligne à voix haute. C'est la répétition qui ancre.`,
    ``,
    `J−${daysToJan} · Rétention jour ${ret.days} · Noyau ${core.done}/${core.total} · Série ${streak.currentStreak ?? 0}`,
    ``,
    current ? `CETTE HEURE : ${label(current.id)} (${current.time})` : `La journée commence.`,
    next ? `ENSUITE : ${label(next.id)} à ${next.time}` : ``,
    ``,
    held
      ? `NOYAU TENU ${core.total}/${core.total} — série sécurisée. Ne relâche pas le vaisseau ce soir.`
      : `IL TE MANQUE :\n${missing.map((m) => `  - ${m}`).join("\n")}`,
    ``,
    `${p.law.label.toUpperCase()}`,
    p.law.main,
    p.law.sub ?? "",
    ``,
    `CE QUE TU FAIS LÀ — EST-CE QUE ÇA REFLÈTE ${p.question}`,
    `Ou tu vas passer ta vie à rêver ?`,
    ``,
    `SI TU CÈDES : ${p.sting}`,
    ``,
    `CE QUE TU RETARDES : ${p.objectif}`,
    ``,
    ...p.quotes.map((q) => `« ${q.t} »`),
    ``,
    `À DÉCLARER : ${p.declaration}`,
    ``,
    process.env.APP_URL ? `Ouvre FORGED : ${process.env.APP_URL}/today` : ``,
    `Prier sans cesse — cette victoire entrera par la main de Dieu.`,
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  return { subject, html, text };
}

export interface SendResult {
  ok: boolean;
  sent: number;
  to: string[];
  hour?: number;
  skipped?: string;
  error?: string;
}

/**
 * Envoie l'email de l'heure. Hors des heures de réveil, ne fait rien —
 * le planificateur peut donc taper toutes les heures sans risque.
 */
export async function sendHourlyBrief(opts?: {
  force?: boolean;
  hour?: number;
}): Promise<SendResult> {
  const hour = opts?.hour ?? haitiHour();
  const to = recipients();

  if (!opts?.force && !isWakingHour(hour)) {
    return { ok: true, sent: 0, to: [], hour, skipped: "hors heures de réveil" };
  }

  const key = process.env.RESEND_API_KEY;
  const from =
    process.env.MORNING_EMAIL_FROM ??
    process.env.RESEND_FROM ??
    "FORGED <onboarding@resend.dev>";

  if (!key) return { ok: false, sent: 0, to, hour, error: "RESEND_API_KEY manquante" };
  if (to.length === 0)
    return { ok: false, sent: 0, to, hour, error: "MORNING_EMAIL_TO manquante" };

  const rows = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, process.env.SEED_EMAIL ?? ""))
    .limit(1);
  const userId = rows[0]?.id;
  if (!userId) return { ok: false, sent: 0, to, hour, error: "utilisateur introuvable" };

  const brief = await buildHourlyBrief(userId, hour);
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from,
    to,
    subject: brief.subject,
    html: brief.html,
    text: brief.text,
  });

  if (error)
    return { ok: false, sent: 0, to, hour, error: String(error.message ?? error) };
  return { ok: true, sent: to.length, to, hour };
}
