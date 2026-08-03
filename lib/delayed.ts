// TOUT CE QUE TU RETARDES.
// Chaque ligne est générée à partir du contenu RÉEL de l'app — les chantiers de
// sa Vision, les 130 chapitres du Vaisseau, les objectifs de son noyau, son
// corps, ses voitures, l'alliance — croisés avec des cadres qui piquent.
// Rien d'inventé : tout nomme une chose concrète qu'il repousse. Client-safe.

import { DEFAULT_VISION } from "./vision-content";
import { CHAPTER_META } from "./vaisseau-meta";
import { CHECKLIST } from "./checklist";
import { ABSOLUTE_RULES } from "./rules";

export type DelayedCategory =
  | "empire"
  | "livre"
  | "corps"
  | "discipline"
  | "temps"
  | "alliance";

export interface DelayedItem {
  t: string;
  c: DelayedCategory;
}

export const DELAYED_CATEGORIES: {
  id: DelayedCategory;
  label: string;
  color: string;
}[] = [
  { id: "empire", label: "L'empire", color: "#15803D" },
  { id: "livre", label: "Le Vaisseau", color: "#0F766E" },
  { id: "corps", label: "Le corps", color: "#BE123C" },
  { id: "discipline", label: "La discipline", color: "#B45309" },
  { id: "temps", label: "Le temps", color: "#DC2626" },
  { id: "alliance", label: "L'alliance", color: "#4C1D95" },
];

// ——— Extraction du contenu réel ———

function clean(s: string): string {
  return s
    .replace(/\*\*/g, "")
    .replace(/^[-•]\s*/, "")
    .trim();
}

/** Forme courte d'un chantier : on coupe avant les chiffres de coût. */
function shortForm(line: string): string {
  const c = clean(line);
  const cut = c.split(/\s+[—–]\s+|\s+:\s+/)[0].trim();
  return (cut.length >= 18 ? cut : c).replace(/\.$/, "");
}

/** Les chantiers de l'empire, tirés des sections de la Vision. */
const CHANTIERS: string[] = (() => {
  const out: string[] = [];
  let title = "";
  for (const raw of DEFAULT_VISION.split("\n")) {
    const l = raw.trim();
    if (l.startsWith("# ")) {
      title = l.slice(2).replace(/^[^\p{L}]*/u, "");
      continue;
    }
    if (/pourquoi/i.test(title)) continue;
    if (!l.startsWith("- ")) continue;
    const s = shortForm(l);
    if (s.length > 14 && s.length < 130) out.push(s);
  }
  return [...new Set(out)];
})();

/** Les objectifs quotidiens et les règles absolues. */
const OBJECTIFS: string[] = [
  ...CHECKLIST.flatMap((s) => s.items.map((i) => i.label)),
  ...ABSOLUTE_RULES.map((r) => r.label),
].map((l) => l.replace(/\s*\([^)]*\)\s*$/, "").trim());

// ——— Les cadres qui piquent ———

const F_EMPIRE = [
  (x: string) => `Tu retardes : ${x}.`,
  (x: string) => `Pendant que tu scrolles, ${x} attend toujours.`,
  (x: string) => `${x} — repoussé d'un jour de plus. Par toi.`,
  (x: string) => `Chaque heure gaspillée éloigne ${x}.`,
  (x: string) => `Tu n'as pas avancé d'un centimètre sur ${x}.`,
  (x: string) => `Si tu cèdes ce soir, tu repousses ${x}.`,
  (x: string) => `Un homme sérieux aurait déjà commencé ${x}.`,
  (x: string) => `${x}. Et toi, tu regardes un écran.`,
  (x: string) => `Ton peuple attend ${x}. Toi, tu attends d'avoir envie.`,
  (x: string) => `Tu parles de ${x}. Tu n'as encore rien posé.`,
  (x: string) => `${x} ne se bâtira pas pendant que tu dors à 7h.`,
  (x: string) => `Le prix de ta faiblesse d'aujourd'hui : ${x}.`,
  (x: string) => `Dix ans de plus comme ça, et ${x} n'existera jamais.`,
  (x: string) => `Quelqu'un d'autre construira ${x} pendant que tu hésites.`,
  (x: string) => `${x} — tu appelles ça un rêve. C'était censé être un décret.`,
  (x: string) => `Tu veux ${x} et tu ne contrôles même pas ta main.`,
  (x: string) => `À ce rythme, ${x} restera une phrase dans une app.`,
  (x: string) => `Ce que tu as sacrifié aujourd'hui pour du vide : ${x}.`,
  (x: string) => `${x} : combien de jours encore tu vas le repousser ?`,
  (x: string) => `Le 1er janvier arrivera. ${x} sera-t-il commencé ?`,
  (x: string) => `Tu as échangé ${x} contre dix minutes de plaisir.`,
  (x: string) => `${x} attend un homme. Pas un rêveur.`,
  (x: string) => `Dieu t'a promis ${x}. Toi, tu Lui réponds dans un mouchoir.`,
  (x: string) => `Chaque « juste cette fois » repousse ${x} d'une semaine.`,
  (x: string) => `${x} — c'est ça que tu enterres quand tu cèdes.`,
];

const F_LIVRE = [
  (n: number, t: string) => `Chapitre ${n} — « ${t} » : toujours pas ouvert.`,
  (n: number, t: string) =>
    `Tu veux l'empire, et le chapitre ${n} (« ${t} ») dort encore.`,
  (n: number, t: string) =>
    `« ${t} » — ch. ${n}. Le prix d'une vidéo scrollée. Tu as choisi le scroll.`,
  (n: number, t: string) =>
    `Par manque de connaissance l'homme est détruit. Chapitre ${n} : « ${t} ».`,
  (n: number, t: string) =>
    `Tu retardes ta propre compréhension : chapitre ${n}, « ${t} ».`,
  (n: number, t: string) =>
    `Le chapitre ${n} (« ${t} ») répond à ce que tu n'arrives pas à résoudre seul.`,
];

const F_OBJECTIF = [
  (x: string) => `${x} : pas fait. Encore.`,
  (x: string) => `Tu repousses « ${x} » comme tu repousses ta vie.`,
  (x: string) => `« ${x} » — un objectif de vingt minutes que tu fuis depuis des mois.`,
  (x: string) => `Tu veux régner sur des nations, et « ${x} » te résiste.`,
  (x: string) => `Chaque jour sans « ${x} » est un vote contre l'homme du 1er janvier.`,
  (x: string) => `« ${x} » : ce n'est pas dur. C'est juste que tu ne le fais pas.`,
  (x: string) => `Un homme de parole aurait déjà coché « ${x} ».`,
  (x: string) => `« ${x} » — la preuve quotidienne que tu es sérieux, ou pas.`,
];

const CORPS = [
  "1m88",
  "90 kg de muscle utile",
  "10% de masse grasse",
  "une peau éclatante",
  "un visage au sommet",
  "une mâchoire dessinée",
  "une posture de conquérant",
  "un corps sec et dense",
  "l'énergie d'un homme plein",
  "un regard reposé et perçant",
  "la force qui porte l'esprit ferme",
  "un physique que personne ne peut ignorer",
];

const F_CORPS = [
  (x: string) => `${x} : repoussé encore d'un jour.`,
  (x: string) => `Tu retardes ${x} à chaque séance sautée.`,
  (x: string) => `${x} ne viendra pas d'un homme qui se couche à 1h.`,
  (x: string) => `Chaque gazeuse repousse ${x} d'une semaine.`,
  (x: string) => `Le miroir du 1er janvier te demandera : où est ${x} ?`,
  (x: string) => `${x} se gagne dans l'assiette et sous la barre. Pas dans ta tête.`,
  (x: string) => `Tu veux ${x} et tu négocies avec ton réveil.`,
  (x: string) => `${x} — décrété en juillet, toujours pas payé.`,
];

const VOITURES = [
  "la Mercedes-AMG GLE 63 Coupé",
  "la Cadillac Escalade",
  "le Range Rover Sport",
  "la BMW X6 M",
  "le Range Rover SV Serenity",
];

const F_VOITURE = [
  (x: string) => `${x} : elle s'achète en jours tenus. Tu n'en as pas tenu un.`,
  (x: string) => `Tu retardes ${x} à chaque heure gaspillée.`,
  (x: string) => `${x} fin 2026 — à ce rythme, ce sera fin jamais.`,
  (x: string) => `Chaque clé est une facture de discipline. Tu n'as pas payé ${x}.`,
];

const TEMPS = [
  "Chaque seconde gaspillée prolonge la réalité que tu hais : tu n'es même pas à un cent-trillionième de ta mesure.",
  "Tu as déjà donné dix ans au « presque ». Combien tu en donnes encore aujourd'hui ?",
  "Six mois passeront comme un souffle. La seule question : plus fort, ou juste plus vieux ?",
  "Le temps ne t'attend pas. Il compte, c'est tout — et il compte contre toi en ce moment.",
  "Ce que tu remets à demain, tu le remettras demain aussi. Tu le sais depuis dix ans.",
  "Chaque heure sans acte est une heure encaissée par le temps sans rien te rendre.",
  "Le 1er janvier arrivera que tu aies travaillé ou non. Prépare ta réponse.",
  "Tu ne manques pas de temps. Tu manques de refus.",
  "L'homme que tu seras dans dix ans te supplie, à cette seconde, de te lever.",
  "Ton escalier ne descend pas quand tu cèdes : il s'arrête. Et le sommet s'éloigne.",
  "Pendant que tu hésites, quelqu'un de plus affamé prend ta place.",
  "Chaque jour non enregistré dans cette app est un jour que tu as choisi d'effacer.",
];

const ALLIANCE = [
  "Dieu t'a promis sur une montagne que tout se réaliserait. Tu retardes ta part du pacte.",
  "La rétention n'est pas de la discipline : c'est la condition de l'alliance. Tu la repousses.",
  "Tu retardes ta montée à la montagne — une consigne directe, pas une suggestion.",
  "Le Psaume 24 du soir : non récité. Tu entres dans la nuit sans sceller ta journée.",
  "Ta chambre sale retarde tout : le lieu où tu dors est le lieu où ton vaisseau se recharge.",
  "Tu réclames Sa provision et tu refuses de garder le vaisseau fermé.",
  "Il a signé Sa part. La seule variable de l'équation, c'est ta signature — et tu la retardes.",
  "Tu retardes l'homme que Dieu a formé de Ses mains et rempli de Son souffle.",
  "Chaque chute repousse l'escalier blanc d'une marche que tu devras remonter.",
  "Tu retardes le moment où tu deviens digne de ce qu'Il t'a promis.",
  "Prier sans cesse : la consigne la plus simple, et celle que tu oublies le plus.",
  "Tu retardes la seule chose qui te rendrait tout le reste inévitable : tenir le pacte.",
];

// ——— Génération ———

function build(): DelayedItem[] {
  const out: DelayedItem[] = [];
  const seen = new Set<string>();
  const push = (t: string, c: DelayedCategory) => {
    const k = t.trim();
    if (k.length < 20 || seen.has(k)) return;
    seen.add(k);
    out.push({ t: k, c });
  };

  // L'empire — chaque chantier croisé avec chaque cadre.
  for (const ch of CHANTIERS) {
    const lower = ch.charAt(0).toLowerCase() + ch.slice(1);
    for (const f of F_EMPIRE) push(f(lower), "empire");
  }

  // Le livre — les 130 chapitres.
  for (const c of CHAPTER_META) {
    for (const f of F_LIVRE) push(f(c.n, c.title), "livre");
  }

  // La discipline — objectifs et règles.
  for (const o of OBJECTIFS) {
    for (const f of F_OBJECTIF) push(f(o), "discipline");
  }

  // Le corps.
  for (const x of CORPS) for (const f of F_CORPS) push(f(x), "corps");
  for (const x of VOITURES) for (const f of F_VOITURE) push(f(x), "corps");

  // Le temps et l'alliance — écrits à la main, répétés tels quels.
  for (const t of TEMPS) push(t, "temps");
  for (const t of ALLIANCE) push(t, "alliance");

  return out;
}

export const DELAYED: DelayedItem[] = build();
export const DELAYED_COUNT = DELAYED.length;

export function delayedCategoryMeta(id: DelayedCategory) {
  return DELAYED_CATEGORIES.find((c) => c.id === id) ?? DELAYED_CATEGORIES[0];
}
