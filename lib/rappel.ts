// LE RAPPEL DE DEUX HEURES — un mail, trois citations, dix minutes.
//
// Ce qui partait avant : l'office complet, dans les trois langues, toutes les
// heures de 5h à 21h. Cinquante et un mails par jour. Il l'a dit lui-même dans
// le miroir — « j'ai mis un système de mails automatiques, je ne les ouvre
// pas ». Cinquante et un mails qu'on n'ouvre pas valent moins que neuf qu'on
// ouvre : ce n'est pas le volume qui manquait.
//
// Donc un seul mail, en français, toutes les deux heures. Trois citations tirées
// au sort dans la page des citations, et une seule consigne : dix minutes dans
// l'app, maintenant.
//
// Dix minutes est un chiffre choisi, pas arrondi au hasard. C'est assez court
// pour qu'aucune excuse ne tienne, et c'est la seule durée qu'il n'a jamais
// refusée à quoi que ce soit.
//
// L'office reste dans le code : c'est la messe de 5h, 12h et 21h qui le porte
// encore. Ce module ne remplace que les heures ordinaires.

import { QUOTES, categoryMeta } from "./quotes";
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
 * Exactement le corpus de la page /quotes, et rien d'autre.
 *
 * Le tirage puisait aussi dans Nietzsche et dans ses propres phrases. Il a
 * tranché : les citations viennent de la page des citations. C'est la bonne
 * règle — un mail qui cite une ligne qu'il ne retrouve nulle part dans l'app
 * arrive de nulle part, alors qu'une citation de la page renvoie à un endroit
 * qu'il peut ouvrir.
 *
 * La source affichée est la catégorie de la citation quand elle n'a pas de
 * source propre : c'est le libellé du filtre sous lequel il la retrouvera.
 */
export const CITATIONS: Citation[] = QUOTES.map((q) => ({
  texte: q.t,
  source: q.s ?? categoryMeta(q.c).label,
}));

export const CITATIONS_TOTAL = CITATIONS.length;

/**
 * Combien de citations par mail.
 *
 * Trois : assez pour qu'un mail n'ait pas l'air d'un fortune cookie, assez peu
 * pour que les trois soient lues. À dix, il en lit une et ferme.
 */
export const CITATIONS_PAR_MAIL = 3;

/**
 * Les citations de ce créneau-là.
 *
 * Le tirage est déterministe sur (jour, heure) : si le planificateur double un
 * appel — GitHub Actions le fait — il reçoit deux fois les mêmes, pas trois
 * citations différentes. Deux mails identiques se voient et s'ignorent ; deux
 * mails différents donnent l'impression que le système déraille.
 *
 * Les trois sont distinctes : on retire jusqu'à en trouver une nouvelle, avec
 * une borne d'essais pour ne jamais boucler si le corpus était minuscule.
 */
export function citationsDu(
  date: string,
  hour: number,
  combien: number = CITATIONS_PAR_MAIL,
): Citation[] {
  const graine = (Number(date.replace(/-/g, "")) * 31 + hour) >>> 0;
  const r = rng(graine);
  const vues = new Set<string>();
  const out: Citation[] = [];
  const max = Math.min(combien, CITATIONS.length);
  for (let essais = 0; out.length < max && essais < max * 40; essais++) {
    const c = CITATIONS[Math.floor(r() * CITATIONS.length)];
    if (!c || vues.has(c.texte)) continue;
    vues.add(c.texte);
    out.push(c);
  }
  return out;
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
 * Le mail. Trois citations, une consigne, un bouton, et ses chiffres en pied.
 *
 * Les chiffres sont en dernier et en petit : ils ne sont pas le message, ils
 * sont la preuve que le mail sait de qui il parle. C'est ce qui distingue un
 * rappel d'une carte de motivation.
 */
export function rendreRappel(
  cs: Citation[],
  ctx: RappelContexte,
  hour: number,
  url: string | null,
): RappelRendu {
  // Le bouton mène à la page des citations, puisque c'est de là qu'elles
  // viennent : il retrouve les trois qu'il vient de lire, et les 2 000 autres.
  const lien = url ? `${url.replace(/\/$/, "")}/quotes` : null;
  const heure = `${String(hour).padStart(2, "0")} h`;

  // La première citation sert de sujet, tronquée. C'est la seule ligne qu'il
  // voit sans ouvrir : autant qu'elle porte quelque chose plutôt qu'une heure.
  const tete = cs[0]?.texte ?? "";
  const court = tete.length > 62 ? `${tete.slice(0, 60).trimEnd()}…` : tete;
  const subject = court ? `${court} · 10 min` : `${heure} · 10 minutes`;

  // La première en pleine taille, les deux autres en retrait : elles se lisent
  // dans l'ordre au lieu de se concurrencer.
  const cartes = cs
    .map((c, i) => {
      const taille = i === 0 ? 19 : 16;
      const teinte = i === 0 ? "#fff" : "rgba(255,255,255,.82)";
      const src = c.source
        ? `<div style="margin-top:12px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.28)">${esc(c.source)}</div>`
        : "";
      return `<tr><td style="background:#141414;border:1px solid #3f3520;border-radius:16px;padding:24px">
  <div style="font-size:${taille}px;line-height:1.5;font-weight:600;color:${teinte}">« ${esc(c.texte)} »</div>
  ${src}
</td></tr>
<tr><td style="height:10px;line-height:10px;font-size:10px">&nbsp;</td></tr>`;
    })
    .join("\n");

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

<tr><td style="padding-bottom:20px">
  <span style="font-size:10px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:rgba(255,255,255,.3)">FORGED · ${esc(heure)}</span>
</td></tr>

${cartes}

<tr><td style="padding:16px 2px 22px">
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
    ...cs.flatMap((c) => [
      `« ${c.texte} »${c.source ? ` — ${c.source}` : ""}`,
      "",
    ]),
    "Dix minutes dans l'app, maintenant. Pas ce soir.",
    lien ? `\n${lien}` : "",
    "",
    `Jour ${ctx.jour}/30 · Rétention ${ctx.retention} j · Noyau ${ctx.noyauFait}/${ctx.noyauTotal} · J−${ctx.joursAvant2027} avant 2027`,
  ].join("\n");

  return { subject, html, text };
}
