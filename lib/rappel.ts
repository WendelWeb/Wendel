// LE RAPPEL DE DEUX HEURES — un mail, une citation, dix minutes.
//
// Ce qui partait avant : l'office complet, dans les trois langues, toutes les
// heures de 5h à 21h. Cinquante et un mails par jour. Il l'a dit lui-même dans
// le miroir — « j'ai mis un système de mails automatiques, je ne les ouvre
// pas ». Cinquante et un mails qu'on n'ouvre pas valent moins que neuf qu'on
// ouvre : ce n'est pas le volume qui manquait.
//
// Donc un seul mail, en français, toutes les deux heures. Une citation tirée
// au sort, et une seule consigne : dix minutes dans l'app, maintenant.
//
// Dix minutes est un chiffre choisi, pas arrondi au hasard. C'est assez court
// pour qu'aucune excuse ne tienne, et c'est la seule durée qu'il n'a jamais
// refusée à quoi que ce soit.
//
// L'office reste dans le code : c'est la messe de 5h, 12h et 21h qui le porte
// encore. Ce module ne remplace que les heures ordinaires.

import { QUOTES } from "./quotes";
import { NIETZSCHE_TOUT } from "./nietzsche";
import { VOIX_HAUTE } from "./voix";
import { rng } from "./rotate";

/** L'heure de lever et l'heure de coucher, à Port-au-Prince. */
export const RAPPEL_DEBUT = 5;
export const RAPPEL_FIN = 21;

/** Une heure sur deux à partir du lever : 5, 7, 9 … 21. Neuf par jour. */
export function estHeureDeRappel(hour: number): boolean {
  if (hour < RAPPEL_DEBUT || hour > RAPPEL_FIN) return false;
  return (hour - RAPPEL_DEBUT) % 2 === 0;
}

export interface Citation {
  texte: string;
  source: string | null;
}

/**
 * Tout ce qui peut être cité : les citations de l'app, Nietzsche avec sa
 * source, et ses propres phrases. Les siennes comptent — c'est souvent la
 * ligne qu'il a écrite lui-même qui porte le plus dur.
 */
export const CITATIONS: Citation[] = [
  ...QUOTES.map((q) => ({ texte: q.t, source: q.s ?? null })),
  ...NIETZSCHE_TOUT.map((n) => ({ texte: n.t, source: n.source })),
  ...VOIX_HAUTE.map((l) => ({ texte: l, source: null })),
];

export const CITATIONS_TOTAL = CITATIONS.length;

/**
 * La citation de ce créneau-là.
 *
 * Le tirage est déterministe sur (jour, heure) : si le planificateur double un
 * appel — GitHub Actions le fait — il reçoit deux fois la même, pas deux
 * citations différentes. Deux mails identiques se voient et s'ignorent ; deux
 * mails différents donnent l'impression que le système déraille.
 */
export function citationDu(date: string, hour: number): Citation {
  const graine = Number(date.replace(/-/g, "")) * 31 + hour;
  const i = Math.floor(rng(graine >>> 0)() * CITATIONS.length);
  return CITATIONS[i] ?? { texte: "", source: null };
}

export interface RappelContexte {
  /** Le jour du serment, sur trente. */
  jour: number;
  /** Jours de rétention. */
  retention: number;
  /** Objectifs du noyau tenus aujourd'hui. */
  noyauFait: number;
  noyauTotal: number;
  /** Jours restants avant le 1er janvier 2027. */
  joursAvant2027: number;
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export interface RappelRendu {
  subject: string;
  html: string;
  text: string;
}

/**
 * Le mail. Une citation, une consigne, un bouton, et ses chiffres en pied.
 *
 * Les chiffres sont en dernier et en petit : ils ne sont pas le message, ils
 * sont la preuve que le mail sait de qui il parle. C'est ce qui distingue un
 * rappel d'une carte de motivation.
 */
export function rendreRappel(
  c: Citation,
  ctx: RappelContexte,
  hour: number,
  url: string | null,
): RappelRendu {
  const lien = url ? `${url.replace(/\/$/, "")}/miroir` : null;
  const heure = `${String(hour).padStart(2, "0")} h`;
  const source = c.source ? ` — ${c.source}` : "";

  const subject = `${heure} · 10 minutes`;

  const bouton = lien
    ? `<a href="${lien}" style="display:inline-block;background:#f59e0b;color:#000;font-weight:700;font-size:15px;text-decoration:none;padding:14px 28px;border-radius:12px;letter-spacing:.04em;text-transform:uppercase">Ouvrir · 10 minutes</a>`
    : `<span style="color:rgba(255,255,255,.4);font-size:13px">L'app n'est pas déployée : APP_URL manquant.</span>`;

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(subject)}</title></head>
<body style="margin:0;padding:0;background:#0a0a0a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a">
<tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

<tr><td style="padding-bottom:22px">
  <span style="font-size:10px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.3)">FORGED · ${esc(heure)}</span>
</td></tr>

<tr><td style="background:#141414;border:1px solid #3f3520;border-radius:16px;padding:28px 26px">
  <div style="font-size:19px;line-height:1.5;font-weight:600;color:#fff">« ${esc(c.texte)} »</div>
  ${c.source ? `<div style="margin-top:14px;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3)">${esc(c.source)}</div>` : ""}
</td></tr>

<tr><td style="padding:26px 2px 22px">
  <div style="font-size:15px;line-height:1.6;color:rgba(255,255,255,.8)">
    Dix minutes dans l'app, maintenant. Pas ce soir.
  </div>
</td></tr>

<tr><td style="padding-bottom:26px">${bouton}</td></tr>

<tr><td style="border-top:1px solid rgba(255,255,255,.1);padding-top:16px">
  <div style="font-size:11px;line-height:1.7;color:rgba(255,255,255,.35)">
    Jour ${ctx.jour} / 30 &nbsp;·&nbsp; Rétention ${ctx.retention} j &nbsp;·&nbsp;
    Noyau ${ctx.noyauFait}/${ctx.noyauTotal} &nbsp;·&nbsp; J−${ctx.joursAvant2027} avant 2027
  </div>
</td></tr>

</table></td></tr></table></body></html>`;

  const text = [
    `FORGED · ${heure}`,
    "",
    `« ${c.texte} »${source}`,
    "",
    "Dix minutes dans l'app, maintenant. Pas ce soir.",
    lien ? `\n${lien}` : "",
    "",
    `Jour ${ctx.jour}/30 · Rétention ${ctx.retention} j · Noyau ${ctx.noyauFait}/${ctx.noyauTotal} · J−${ctx.joursAvant2027} avant 2027`,
  ].join("\n");

  return { subject, html, text };
}
