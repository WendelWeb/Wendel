// LE RENDU DE LA LITURGIE — HTML pour la boîte mail, texte brut pour tout le
// reste. Écrit pour être LU À VOIX HAUTE : rien qui se scanne, pas de tableau
// dans le corps, une seule idée par bloc, et la déclaration en dernier.
//
// Les répétitions ne sont pas imprimées sept fois — la ligne est affichée une
// fois, en grand, avec une rangée de cases numérotées dessous. Il compte en
// disant. C'est plus lisible qu'un mur de doublons, et ça ne triche pas sur le
// nombre : la durée annoncée compte bien les sept passages.

import "server-only";
import type { Liturgy, LiturgyContext, Movement } from "./liturgy";

const GOLD = "#f59e0b";
const RED = "#dc2626";
const GREEN = "#16a34a";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function card(inner: string, bg = "#18181b"): string {
  return `<tr><td style="padding:0 22px 12px"><div style="background:${bg};border-radius:12px;padding:16px 17px">${inner}</div></td></tr>`;
}

function eyebrow(text: string, color = "rgba(255,255,255,.45)"): string {
  return `<div style="color:${color};font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:2.2px;margin-bottom:8px">${esc(text)}</div>`;
}

/** La rangée de cases à cocher en disant. */
function tally(times: number): string {
  if (times <= 1) return "";
  const cases = Array.from({ length: times }, (_, i) => i + 1)
    .map(
      (n) =>
        `<td style="padding-right:5px"><div style="width:20px;height:20px;border:1.5px solid rgba(255,255,255,.22);border-radius:5px;color:rgba(255,255,255,.38);font-size:10px;font-weight:700;text-align:center;line-height:20px">${n}</div></td>`,
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:9px"><tr>${cases}</tr></table>`;
}

// ——————————————————————————————————————————————————————————————
// Les mouvements, un par un
// ——————————————————————————————————————————————————————————————

function movementHtml(m: Movement, base: string | null): string {
  const lien =
    base && m.href
      ? `<a href="${esc(base)}${esc(m.href)}" style="display:inline-block;color:${GOLD};text-decoration:none;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin-top:12px">Ouvrir dans l'app →</a>`
      : "";
  const consigne = m.note
    ? `<div style="color:#71717a;font-size:11px;font-style:italic;margin-bottom:10px;line-height:1.45">${esc(m.note)}</div>`
    : "";
  const titre = m.title
    ? `<div style="color:#fff;font-size:15.5px;font-weight:800;line-height:1.3;margin-bottom:4px">${esc(m.title)}</div>`
    : "";
  const source = m.source
    ? `<div style="color:#52525b;font-size:10.5px;margin-bottom:10px">${esc(m.source)}</div>`
    : "";

  switch (m.kind) {
    case "mantra": {
      const groupes = (m.groups ?? [])
        .map((g) => {
          // « Every action has consequences » monte en trois échos : la
          // conséquence ne s'efface pas, elle grossit.
          const tetes = g.triple
            ? g.lines
                .flatMap((l) => [l, l, l])
                .map(
                  (l, i) =>
                    `<div style="color:${["rgba(255,255,255,.4)", "rgba(255,255,255,.7)", "#f97316"][i] ?? "#fff"};font-size:${[12, 15, 18][i] ?? 15}px;font-weight:800;text-transform:uppercase;line-height:1.25;margin-top:${i ? 3 : 0}px">${esc(l)}</div>`,
                )
                .join("")
            : g.lines
                .map(
                  (l) =>
                    `<div style="color:#fff;font-size:14.5px;font-weight:800;text-transform:uppercase;line-height:1.3;margin-bottom:3px">${esc(l)}</div>`,
                )
                .join("");
          const echos = (g.echo ?? [])
            .map(
              (l) =>
                `<div style="color:rgba(255,255,255,.7);font-size:12.5px;line-height:1.45;margin-top:5px">→ ${esc(l)}</div>`,
            )
            .join("");
          return `<div style="margin-bottom:15px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.09)">
            <div style="color:rgba(255,255,255,.35);font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:6px">${esc(g.label)}</div>
            ${tetes}${echos}
          </div>`;
        })
        .join("");

      const bin = m.binary?.length
        ? `<div style="margin-bottom:4px">
             <div style="color:rgba(255,255,255,.55);font-size:11.5px;font-style:italic;line-height:1.45;margin-bottom:9px">${esc(m.binaryFrame?.en ?? "")}</div>
             ${m.binary
               .map(
                 (q) =>
                   `<div style="border-left:2px solid rgba(255,255,255,.22);padding-left:11px;margin-bottom:9px">
                      <div style="color:#fff;font-size:13px;font-weight:700;line-height:1.35">${esc(q.en)}</div>
                      <div style="color:rgba(255,255,255,.55);font-size:12px;line-height:1.35;margin-top:2px">${esc(q.fr)}</div>
                    </div>`,
               )
               .join("")}
             <div style="color:${GOLD};font-size:13.5px;font-weight:800;text-transform:uppercase;text-align:center;margin-top:11px">Il n'y a pas de troisième porte.</div>
           </div>`
        : "";

      return card(
        `${eyebrow(m.label, GOLD)}
         ${m.note ? `<div style="color:#71717a;font-size:11px;font-style:italic;margin-bottom:13px;line-height:1.45">${esc(m.note)}</div>` : ""}
         ${groupes}${bin}`,
        "#0a0a0a",
      );
    }

    case "inspection":
      return card(
        `${eyebrow(m.label, "#fff")}${consigne}
         ${m.items
           .map((l) =>
             l.endsWith("?")
               ? `<div style="color:#fff;font-size:16px;font-weight:800;line-height:1.35;margin-bottom:5px">${esc(l)}</div>`
               : `<div style="color:rgba(255,255,255,.75);font-size:13px;line-height:1.5;margin-bottom:11px">${esc(l)}</div>`,
           )
           .join("")}
         ${lien}`,
        "#7f1d1d",
      );

    case "appel":
      return card(
        `${eyebrow(m.label, GOLD)}
         ${m.items.map((l) => `<div style="color:#e4e4e7;font-size:14px;font-weight:600;line-height:1.5;margin-bottom:4px">${esc(l)}</div>`).join("")}`,
        "#0f172a",
      );

    case "fragment":
      return card(
        `${eyebrow(m.label, GOLD)}${titre}${source}
         ${m.items.map((p) => `<p style="color:#d4d4d8;font-size:13.5px;line-height:1.65;margin:0 0 12px">${esc(p)}</p>`).join("")}
         ${lien}`,
        "#1a1a1d",
      );

    case "repetition":
      return card(
        `${eyebrow(m.label, m.accent ? GOLD : "rgba(255,255,255,.45)")}${consigne}
         ${m.items
           .map(
             (l, i) => `
           <div style="${i ? "margin-top:16px;padding-top:16px;border-top:1px solid rgba(255,255,255,.08)" : ""}">
             <div style="color:#fff;font-size:14.5px;font-weight:600;line-height:1.5">${esc(l)}</div>
             ${m.attributions?.[i] ? `<div style="color:#52525b;font-size:10px;margin-top:4px">${esc(m.attributions[i]!)}</div>` : ""}
             ${tally(m.times)}
           </div>`,
           )
           .join("")}`,
        m.accent ? "#1c1917" : "#18181b",
      );

    case "bloc":
      return card(
        `${eyebrow(m.label, m.accent ? GOLD : "rgba(255,255,255,.45)")}${titre}${source}${consigne}
         ${m.items.map((l) => `<p style="color:#d4d4d8;font-size:13.5px;line-height:1.6;margin:0 0 10px">${esc(l)}</p>`).join("")}
         ${lien}`,
        m.accent ? "#1c1917" : "#18181b",
      );

    case "lecture":
      return card(
        `${eyebrow(m.label)}${consigne}
         ${m.items
           .map(
             (l, i) => `
           <div style="border-left:3px solid ${GOLD};padding:2px 0 2px 12px;margin-bottom:${i === m.items.length - 1 ? 0 : 12}px">
             <div style="color:#e4e4e7;font-size:13.5px;font-style:italic;line-height:1.5">« ${esc(l)} »</div>
             ${tally(m.times)}
           </div>`,
           )
           .join("")}
         ${lien}`,
      );

    case "retards":
      return card(
        `${eyebrow(m.label, RED)}${consigne}
         ${m.items
           .map(
             (l, i) => `
           <div style="display:block;margin-bottom:${i === m.items.length - 1 ? 0 : 9}px">
             <span style="color:${RED};font-size:11px;font-weight:800">${String(i + 1).padStart(2, "0")}</span>
             <span style="color:#e4e4e7;font-size:13.5px;line-height:1.5"> &nbsp;${esc(l)}</span>
           </div>`,
           )
           .join("")}
         ${lien}`,
        "#1a0f0f",
      );

    case "decision":
      return card(
        `${eyebrow(m.label, GOLD)}${consigne}
         ${m.items.map((l) => `<div style="color:#fff;font-size:14.5px;font-weight:600;line-height:1.5;margin-bottom:7px">${esc(l)}</div>`).join("")}
         ${lien}`,
        "#78350f",
      );

    case "declaration":
      return card(
        `<div style="text-align:center">
           ${eyebrow(m.label, "rgba(255,255,255,.4)")}
           ${m.note ? `<div style="color:#71717a;font-size:11px;font-style:italic;margin-bottom:11px">${esc(m.note)}</div>` : ""}
           ${m.items.map((l) => `<div style="color:${GOLD};font-size:16px;font-weight:800;text-transform:uppercase;line-height:1.3;margin-bottom:9px">${esc(l)}</div>`).join("")}
         </div>`,
        "#000000",
      );
  }
}

function movementText(m: Movement): string[] {
  const out: string[] = [];

  if (m.kind === "mantra") {
    out.push(m.label.toUpperCase());
    if (m.note) out.push(`(${m.note})`);
    out.push("");
    for (const g of m.groups ?? []) {
      out.push(`— ${g.label} —`);
      for (const l of g.lines) {
        if (g.triple) {
          out.push(l);
          out.push(l);
          out.push(l);
        } else {
          out.push(l);
        }
      }
      for (const e of g.echo ?? []) out.push(`   → ${e}`);
      out.push("");
    }
    if (m.binary?.length) {
      out.push(`— La seule question qui reste —`);
      out.push(m.binaryFrame?.en ?? "");
      out.push("");
      for (const q of m.binary) {
        out.push(q.en);
        out.push(`   ${q.fr}`);
      }
      out.push("");
      out.push("IL N'Y A PAS DE TROISIÈME PORTE.");
      out.push("");
    }
    return out;
  }

  out.push(m.label.toUpperCase() + (m.times > 1 ? `  (chaque ligne ×${m.times})` : ""));
  if (m.title) out.push(m.title);
  if (m.source) out.push(`— ${m.source}`);
  if (m.note) out.push(`(${m.note})`);
  out.push("");
  m.items.forEach((l, i) => {
    if (m.kind === "retards") out.push(`${String(i + 1).padStart(2, "0")}. ${l}`);
    else if (m.kind === "lecture") out.push(`« ${l} »${m.times > 1 ? `   ×${m.times}` : ""}`);
    else out.push(`${l}${m.times > 1 ? `   ×${m.times}` : ""}`);
    if (m.attributions?.[i]) out.push(`     ${m.attributions[i]}`);
  });
  out.push("");
  return out;
}

// ——————————————————————————————————————————————————————————————
// L'email complet
// ——————————————————————————————————————————————————————————————

export interface Rendered {
  subject: string;
  html: string;
  text: string;
}

export function renderLiturgy(
  lit: Liturgy,
  c: LiturgyContext,
  base: string | null,
): Rendered {
  const h = String(lit.hour).padStart(2, "0");
  const complet = c.coreDone === c.coreTotal;
  const messe = lit.kind === "messe";

  const html = `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(lit.subject)}</title></head>
<body style="margin:0;padding:0;background:#09090b;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#09090b;padding:20px 10px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#111113;border-radius:16px;overflow:hidden">

  <tr><td style="background:${messe ? `linear-gradient(135deg,#78350f,#111113)` : `linear-gradient(135deg,#0f172a,#1e293b)`};padding:22px 22px 20px">
    <table role="presentation" width="100%"><tr>
      <td><div style="color:${GOLD};font-size:25px;font-weight:800;letter-spacing:-1px;line-height:1">FORGED</div></td>
      <td align="right"><div style="color:rgba(255,255,255,.9);font-size:20px;font-weight:800">${h}h</div>
      <div style="color:rgba(255,255,255,.4);font-size:9px;text-transform:uppercase;letter-spacing:1.6px">${messe ? "La messe" : "L'heure"} · ${lit.minutes} min</div></td>
    </tr></table>
    <div style="color:#fff;font-size:19px;font-weight:800;margin-top:14px;line-height:1.2">${esc(lit.name)}</div>
    <div style="color:rgba(255,255,255,.62);font-size:12.5px;margin-top:6px;line-height:1.45">${esc(lit.intent)}</div>
    <div style="color:${GOLD};font-size:11.5px;font-weight:700;margin-top:12px;line-height:1.4">
      Lis tout <strong>à voix haute</strong>. Si tu es entouré, mets-toi à part.
    </div>
  </td></tr>

  <tr><td style="padding:16px 22px 12px">
    <table role="presentation" width="100%"><tr>
      <td width="32%" style="text-align:center;padding:11px 4px;background:#18181b;border-radius:10px">
        <div style="color:${RED};font-size:19px;font-weight:800;line-height:1">J−${c.daysToJan}</div>
        <div style="color:#71717a;font-size:8px;text-transform:uppercase;letter-spacing:1.3px;margin-top:4px">1er janvier</div></td>
      <td width="2%"></td>
      <td width="32%" style="text-align:center;padding:11px 4px;background:#18181b;border-radius:10px">
        <div style="color:${GOLD};font-size:19px;font-weight:800;line-height:1">${c.retentionDays}</div>
        <div style="color:#71717a;font-size:8px;text-transform:uppercase;letter-spacing:1.3px;margin-top:4px">Rétention</div></td>
      <td width="2%"></td>
      <td width="32%" style="text-align:center;padding:11px 4px;background:#18181b;border-radius:10px">
        <div style="color:${complet ? GREEN : RED};font-size:19px;font-weight:800;line-height:1">${c.coreDone}/${c.coreTotal}</div>
        <div style="color:#71717a;font-size:8px;text-transform:uppercase;letter-spacing:1.3px;margin-top:4px">Noyau</div></td>
    </tr></table>
  </td></tr>

  ${lit.movements.map((m) => movementHtml(m, base)).join("\n")}

  <tr><td style="padding:6px 22px 24px">
    ${
      base
        ? `<a href="${esc(base)}/today" style="display:block;background:${GOLD};color:#111;text-decoration:none;font-size:15px;font-weight:800;text-transform:uppercase;letter-spacing:.6px;padding:16px;border-radius:12px;text-align:center">Ouvre FORGED et coche</a>`
        : ""
    }
    <div style="color:#52525b;font-size:10.5px;text-align:center;margin-top:16px;line-height:1.6">
      Prier sans cesse — cette victoire entrera par la main de Dieu.
    </div>
  </td></tr>

</table>
</td></tr></table>
</body></html>`;

  const barre = "─".repeat(58);
  const lignes: string[] = [
    `FORGED — ${h}h · ${lit.name.toUpperCase()}`,
    lit.intent,
    `${messe ? "La messe" : "L'heure"} · environ ${lit.minutes} min à voix haute`,
    ``,
    `J−${c.daysToJan} au 1er janvier · J−${c.daysTo30} avant tes 30 ans`,
    `Rétention jour ${c.retentionDays} · Noyau ${c.coreDone}/${c.coreTotal} · Série ${c.streak}`,
    ``,
    `Lis tout à voix haute. Si tu es entouré, mets-toi à part.`,
    ``,
  ];
  for (const m of lit.movements) {
    lignes.push(barre);
    lignes.push(...movementText(m));
  }
  lignes.push(barre);
  if (base) lignes.push(`Ouvre FORGED : ${base}/today`);
  lignes.push(`Prier sans cesse — cette victoire entrera par la main de Dieu.`);

  return { subject: lit.subject, html, text: lignes.join("\n") };
}
