// WHATSAPP — le coup court, via Twilio.
//
// L'email porte l'office entier : le chapitre, les répétitions, les blocs. Il
// se lit posé, à voix haute, dix à trente minutes. WhatsApp fait l'inverse et
// c'est très bien : une notification qui se lit en trente secondes, au moment
// où il ne peut pas ouvrir sa boîte mail — en pleine séance, dans la rue, entre
// deux blocs. Dupliquer l'email ici n'aurait aucun intérêt et serait de toute
// façon impossible : WhatsApp coupe à 1 600 caractères.
//
// Pas de SDK : un POST authentifié en Basic suffit, et ça évite d'embarquer une
// dépendance de plus dans la fonction serverless.

import "server-only";
import type { Liturgy, LiturgyContext } from "./liturgy";

/** WhatsApp refuse au-delà ; on garde une marge pour ne jamais être tronqué. */
const LIMITE = 1500;

export interface WhatsAppResult {
  ok: boolean;
  sent: number;
  to: string[];
  skipped?: string;
  error?: string;
}

export function whatsappRecipients(): string[] {
  return (process.env.WHATSAPP_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((n) => (n.startsWith("whatsapp:") ? n : `whatsapp:${n}`));
}

export function whatsappConfigured(): boolean {
  return (
    !!process.env.TWILIO_ACCOUNT_SID &&
    !!process.env.TWILIO_AUTH_TOKEN &&
    !!process.env.TWILIO_WHATSAPP_FROM &&
    whatsappRecipients().length > 0
  );
}

/**
 * Le coup court : où il en est, une chose qu'il retarde, une ligne à déclarer,
 * et l'acte de l'heure. Rien d'autre — c'est un rappel, pas une liturgie.
 */
export function buildPunch(lit: Liturgy, c: LiturgyContext): string {
  const h = String(lit.hour).padStart(2, "0");
  const noyau = `${c.coreDone}/${c.coreTotal}`;

  const premier = (kind: string): string | null => {
    const m = lit.movements.find((x) => x.kind === kind && x.items.length);
    return m ? m.items[0] : null;
  };

  const retard =
    lit.movements.find((m) => m.kind === "retards" && m.items.length)?.items[0] ??
    lit.movements.find((m) => m.label.startsWith("Ce que tu retardes"))?.items[0] ??
    null;

  const citation = lit.movements.find(
    (m) => m.kind === "repetition" && m.label.includes("citation"),
  )?.items[0];

  const decision = lit.movements.find((m) => m.kind === "decision");
  const declaration = premier("declaration");

  const morceaux: string[] = [
    `*FORGED · ${h}h — ${lit.name}*`,
    `J−${c.daysToJan} · noyau ${noyau} · rétention jour ${c.retentionDays}`,
    "",
  ];

  if (c.missing.length && c.hour >= 11) {
    morceaux.push(`_Il te manque :_ ${c.missing.slice(0, 3).join(", ")}`, "");
  }

  if (citation) morceaux.push(`« ${citation} »`, "");
  if (retard) morceaux.push(`*Tu retardes :* ${retard}`, "");

  if (decision?.items.length) {
    morceaux.push("*Maintenant :*");
    for (const l of decision.items.slice(0, 3)) morceaux.push(`• ${l}`);
    morceaux.push("");
  }

  if (declaration) morceaux.push(`*${declaration}*`);
  morceaux.push("", "_À voix haute. Si tu es entouré, mets-toi à part._");

  let texte = morceaux.join("\n");
  if (texte.length > LIMITE) {
    // On coupe à la ligne, jamais au milieu d'un mot : un message tronqué en
    // plein élan perd exactement ce qu'il devait transmettre.
    const lignes = texte.split("\n");
    texte = "";
    for (const l of lignes) {
      if (texte.length + l.length + 1 > LIMITE) break;
      texte += (texte ? "\n" : "") + l;
    }
  }
  return texte;
}

/** Envoie un message à chaque destinataire. */
export async function sendWhatsApp(body: string): Promise<WhatsAppResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  const to = whatsappRecipients();

  if (!sid || !token || !from)
    return { ok: true, sent: 0, to, skipped: "Twilio non configuré" };
  if (to.length === 0)
    return { ok: true, sent: 0, to, skipped: "WHATSAPP_TO manquant" };

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const envoyes: string[] = [];
  const erreurs: string[] = [];

  for (const numero of to) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        authorization: `Basic ${auth}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
        To: numero,
        Body: body,
      }),
    });
    if (res.ok) {
      envoyes.push(numero);
    } else {
      // Twilio renvoie un JSON avec `message` et `code` — bien plus parlant
      // que le statut HTTP seul quand le bac à sable n'a pas été rejoint.
      let detail = `HTTP ${res.status}`;
      try {
        const j = (await res.json()) as { message?: string; code?: number };
        if (j.message) detail = `${j.message}${j.code ? ` (code ${j.code})` : ""}`;
      } catch {
        /* réponse non-JSON : on garde le statut */
      }
      erreurs.push(`${numero} → ${detail}`);
    }
  }

  return erreurs.length
    ? {
        ok: envoyes.length > 0,
        sent: envoyes.length,
        to: envoyes,
        error: erreurs.join(" ; "),
      }
    : { ok: true, sent: envoyes.length, to: envoyes };
}
