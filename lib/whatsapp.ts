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

/**
 * Les deux erreurs qui arriveront pour de vrai, traduites.
 *
 * WhatsApp n'autorise le texte libre que pendant 24 h après le dernier message
 * de l'utilisateur, et l'inscription au bac à sable expire au bout de trois
 * jours. Un rappel horaire sur un an tombera donc forcément dessus. Sans ce
 * décodage, la panne ressemble à un bug du code alors qu'il suffit de
 * répondre un mot au bot.
 */
function explique(code: number | undefined, brut: string): string {
  switch (code) {
    case 63015:
      return "Le bac à sable a expiré (3 jours). Renvoie « join <ton-code> » au +1 415 523 8886 depuis WhatsApp.";
    case 63016:
      return "Hors de la fenêtre de 24 h : WhatsApp interdit le texte libre tant que tu n'as pas écrit au bot. Envoie-lui n'importe quel message et ça repart.";
    case 63007:
      return "Expéditeur introuvable : vérifie TWILIO_WHATSAPP_FROM (whatsapp:+14155238886 pour le bac à sable).";
    case 20003:
      return "Twilio refuse : profil de conformité non validé (Trust Hub).";
    default:
      return brut;
  }
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
        if (j.message)
          detail = explique(j.code, `${j.message} (code ${j.code ?? "?"})`);
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

// ——————————————————————————————————————————————————————————————
// L'office en DEUX messages
// ——————————————————————————————————————————————————————————————

/** Coupe à la phrase, jamais au milieu d'un mot. */
function tailler(texte: string, max: number): string {
  if (texte.length <= max) return texte;
  const bout = texte.slice(0, max);
  const fin = Math.max(
    bout.lastIndexOf(". "),
    bout.lastIndexOf("? "),
    bout.lastIndexOf("! "),
  );
  return (fin > max * 0.5 ? bout.slice(0, fin + 1) : bout.trimEnd()) + " […]";
}

/**
 * L'office en AU PLUS `max` messages, chapitre compris.
 *
 * Tout est gardé sauf une chose : le chapitre du Vaisseau, seul morceau
 * élastique. Une messe fait ~5 600 caractères de chapitre à elle seule, quand
 * deux messages n'en offrent que 3 000 — quelque chose doit céder, et ce n'est
 * ni la loi, ni ce qu'il retarde, ni l'acte de l'heure : c'est la longueur du
 * chapitre, dont l'intégralité reste dans l'email.
 */
export function buildOffice(
  lit: Liturgy,
  c: LiturgyContext,
  max = 2,
): string[] {
  const h = String(lit.hour).padStart(2, "0");
  const items = (kind: string) =>
    lit.movements.find((m) => m.kind === kind)?.items ?? [];
  const parLabel = (re: RegExp) =>
    lit.movements.find((m) => re.test(m.label))?.items ?? [];

  const chap = lit.movements.find((m) => m.kind === "fragment");
  const chapEntier = chap ? chap.items.join("\n\n") : "";

  // Tout sauf le chapitre — c'est le socle incompressible. Le miroir vient en
  // premier, avant la loi : sans lui, le message s'adresse à l'homme qu'il veut
  // être, et il peut le lire en s'y reconnaissant par avance.
  const mir = lit.movements.find((m) => m.kind === "miroir");
  const avant: string[] = [
    `*FORGED · ${h}h — ${lit.name}*`,
    `J−${c.daysToJan} · noyau ${c.coreDone}/${c.coreTotal} · rétention jour ${c.retentionDays}`,
    "",
  ];

  if (mir) {
    avant.push("*LE MIROIR — l'état réel*");
    if (mir.note) avant.push(`_${mir.note}_`);
    avant.push("");
    for (const l of mir.items.filter((x) => x.trim()).slice(0, 5)) {
      avant.push(`• ${l}`);
    }
    avant.push("");
  }

  avant.push(
    "*Une main qui se masturbe ne bâtira pas ces choses.*",
    "*Des yeux qui regardent du porno ne les verront jamais.*",
    "_Every action has consequences. Chaque action est un échange, et un pacte._",
    "_Only God and you can stop you. Il n'y a pas de troisième porte._",
    "",
  );

  const apres: string[] = [];
  const cits = parLabel(/citation/i);
  if (cits.length) {
    apres.push("", "*À déclarer :*");
    for (const q of cits.slice(0, 3)) apres.push(`« ${q} »`);
  }
  if (c.missing.length) {
    apres.push("", `_Il te manque :_ ${c.missing.slice(0, 4).join(", ")}`);
  }
  const retards = [...items("retards"), ...parLabel(/^Ce que tu retardes/)];
  if (retards.length) {
    apres.push("", "*Ce que tu retardes :*");
    for (const r of retards.slice(0, 3)) apres.push(`• ${r}`);
  }
  const lois = parLabel(/Tes phrases/);
  if (lois.length) {
    apres.push("", "*Ta loi :*");
    for (const l of lois.slice(0, 2)) apres.push(`• ${l}`);
  }
  const ech = [...parLabel(/échéances|1er janvier/i), ...parLabel(/30 ans/i)];
  if (ech.length) {
    apres.push("");
    for (const e of ech.slice(0, 2)) apres.push(`▸ ${e}`);
  }
  const decision = items("decision");
  if (decision.length) {
    apres.push("", "*Maintenant :*");
    for (const d of decision.slice(0, 4)) apres.push(`• ${d}`);
  }
  const decl = items("declaration");
  apres.push(
    "",
    decl.length ? `*${decl[0]}*` : "",
    "*Je suis celui qui fait tout ça. Pas dans 5 minutes. MAINTENANT.*",
    "_Prier sans cesse. À voix haute — si tu es entouré, mets-toi à part._",
  );

  const socle = avant.join("\n").length + apres.join("\n").length;
  // Chaque message porte un en-tête « — i/n » : ~40 caractères à réserver.
  const budget = max * LIMITE - socle - max * 45;
  const chapitre =
    chapEntier.length > budget ? tailler(chapEntier, Math.max(0, budget)) : chapEntier;

  const complet = [
    ...avant,
    ...(chapitre
      ? [`*${chap?.title ?? "Le Vaisseau"}*`, chap?.source ?? "", "", chapitre]
      : []),
    ...apres,
  ]
    .filter((l) => l !== undefined)
    .join("\n");

  const parts = splitForWhatsApp(complet);
  return parts.slice(0, max);
}

// ——————————————————————————————————————————————————————————————
// L'office entier sur WhatsApp
// ——————————————————————————————————————————————————————————————

/**
 * Découpe l'office en messages que WhatsApp accepte.
 *
 * On coupe UNIQUEMENT sur des lignes vides, jamais au milieu d'un paragraphe :
 * un texte qu'il lit à voix haute ne doit pas se briser en plein souffle. Si un
 * seul paragraphe dépasse à lui seul la limite — ça arrive dans les chapitres du
 * Vaisseau — on le coupe alors à la phrase, et en dernier recours au mot.
 */
export function splitForWhatsApp(texte: string, limite = LIMITE): string[] {
  const blocs = texte.split(/\n\n+/);
  const parts: string[] = [];
  let courant = "";

  const pousser = () => {
    if (courant.trim()) parts.push(courant.trim());
    courant = "";
  };

  for (const bloc of blocs) {
    if (bloc.length > limite) {
      pousser();
      // Bloc géant : on le coupe aux phrases.
      let morceau = "";
      for (const phrase of bloc.split(/(?<=[.!?…])\s+/)) {
        if (morceau.length + phrase.length + 1 > limite) {
          if (morceau) parts.push(morceau.trim());
          morceau = phrase.length > limite ? phrase.slice(0, limite) : phrase;
        } else {
          morceau += (morceau ? " " : "") + phrase;
        }
      }
      if (morceau.trim()) parts.push(morceau.trim());
      continue;
    }
    if (courant.length + bloc.length + 2 > limite) pousser();
    courant += (courant ? "\n\n" : "") + bloc;
  }
  pousser();
  return parts;
}

/**
 * Envoie l'office en deux messages, jamais plus.
 *
 * Les quatorze offices horaires passent entiers : leur passage du Vaisseau ne
 * fait que ~700 caractères. Les trois messes portent un chapitre de 7 000 à
 * 10 000 caractères — il est donc coupé à la phrase, avec […]. C'est voulu :
 * la coupure dit qu'il y a une suite, et elle l'envoie vers l'email, où le
 * chapitre est entier et sans découpage. À 5h du matin il est assis, il a le
 * temps de l'ouvrir.
 */
export async function sendWhatsAppTwo(
  lit: Liturgy,
  c: LiturgyContext,
): Promise<WhatsAppResult> {
  const parts = buildOffice(lit, c, 2);
  let envoyes = 0;
  const erreurs: string[] = [];

  for (let i = 0; i < parts.length; i++) {
    const entete = parts.length > 1 ? `_${i + 1}/${parts.length}_\n\n` : "";
    const r = await sendWhatsApp(entete + parts[i]);
    if (r.skipped) return r;
    if (r.sent > 0) envoyes++;
    else if (r.error) erreurs.push(r.error);
    // Respiration entre les deux : le bac à sable jette les rafales.
    if (i < parts.length - 1) await new Promise((x) => setTimeout(x, 1200));
  }

  return {
    ok: envoyes > 0,
    sent: envoyes,
    to: whatsappRecipients(),
    error: erreurs.length ? erreurs.join(" ; ") : undefined,
  };
}
