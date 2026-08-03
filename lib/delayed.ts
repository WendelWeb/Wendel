// TOUT CE QUE TU RETARDES.
// Catalogue CURÉ — chaque entrée est une chose qu'on peut réellement retarder,
// écrite pour tomber juste grammaticalement dans les cadres. Rien n'est extrait
// à l'aveugle : les listes ci-dessous sont tirées de sa Vision, de son corps,
// de son alliance et du Vaisseau, mais reformulées à la main. Client-safe.

import { CHAPTER_META } from "./vaisseau-meta";

export type DelayedCategory =
  | "empire"
  | "livre"
  | "corps"
  | "homme"
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
  { id: "homme", label: "L'homme", color: "#B45309" },
  { id: "corps", label: "Le corps", color: "#BE123C" },
  { id: "livre", label: "Le Vaisseau", color: "#0F766E" },
  { id: "temps", label: "Le temps", color: "#DC2626" },
  { id: "alliance", label: "L'alliance", color: "#4C1D95" },
];

// ——— LES CHOSES (groupes nominaux : « tu retardes X ») ———

const CHOSES_EMPIRE = [
  "les 50 hôpitaux de rang mondial",
  "les 300 centres de santé régionaux",
  "les cliniques mobiles pour les zones rurales",
  "l'effondrement de la mortalité infantile dans ton pays",
  "les 50 000 maisons modernes données à ton peuple",
  "le réseau de marchés couverts modernes",
  "le gigawatt solaire et son stockage",
  "l'électricité stable pour 600 000 foyers",
  "les 100 écoles premium de rang mondial",
  "l'université internationale et son hôpital universitaire",
  "les 2 000 leaders formés chaque année",
  "les hôtels 5 étoiles et les gratte-ciels",
  "les 500 000 emplois formels et durables",
  "les 3 à 5 aéroports internationaux",
  "la compagnie aérienne nationale et sa flotte",
  "l'académie de pilotes et le centre de maintenance",
  "les ports en eau profonde de la Caraïbe",
  "la flotte cargo transcontinentale",
  "la logistique automatisée et ses hubs",
  "le réseau routier moderne, ses ponts et ses tunnels",
  "l'aménagement des plages et des stations balnéaires",
  "les villes futuristes et leurs smart cities",
  "l'entreprise d'IA souveraine",
  "les data centers souverains et leurs clusters GPU",
  "les modèles d'IA entraînés dans ta propre langue",
  "la production de semi-conducteurs et de terres rares",
  "la blockchain et la monnaie numérique du pays",
  "les grandes usines agroalimentaires et pharmaceutiques",
  "l'exploitation et le contrôle total des ressources naturelles",
  "la transformation locale, sans un gramme exporté brut",
  "l'empire agro-industriel et ses chaînes de valeur",
  "l'eau, la nourriture et l'énergie gratuites dans tes zones",
  "la banque nationale et le fonds souverain",
  "la bourse et le contrôle des flux financiers",
  "l'indépendance financière de toute une nation",
  "l'armée privée classée dans le top 3 mondial",
  "le réseau de satellites de défense et de surveillance",
  "la cybersécurité souveraine",
  "l'industrie de défense et ses drones autonomes",
  "l'empire médiatique et son influence mondiale",
  "la fondation humanitaire et la reconstruction des nations",
  "le poids géopolitique de ton pays dans la Caraïbe",
  "l'entreprise aérospatiale et ses lancements",
  "la base lunaire et les projets martiens",
  "le contrôle stratégique des technologies spatiales",
  "les laboratoires de bio-ingénierie humaine",
  "les thérapies géniques de nouvelle génération",
  "le rajeunissement cellulaire et l'allongement des télomères",
  "l'immortalité biologique",
  "les cliniques anti-âge 7 étoiles",
  "la médecine préventive pilotée par IA, 24 heures sur 24",
  "les interfaces cerveau-machine",
  "la fusion de l'homme et de l'IA",
  "le passage de ton pays de la pauvreté à la puissance mondiale",
  "le jour où des présidents se déplaceront pour te visiter",
  "les enveloppes de 500 milliards que tu signeras",
  "le titre d'homme le plus riche du monde",
  "l'élite que tu dois créer autour de toi",
  "le nom que tu laisseras pendant des millénaires",
  "la dynastie générationnelle que tu dois fonder",
];

const CHOSES_CORPS = [
  "ton corps à 1m88 et 90 kilos",
  "tes 10% de masse grasse",
  "ta peau éclatante",
  "ton visage au sommet",
  "ta mâchoire dessinée",
  "ta posture de conquérant",
  "l'énergie d'un homme plein",
  "ton regard reposé et perçant",
  "la Mercedes-AMG GLE 63 Coupé",
  "la Cadillac Escalade",
  "le Range Rover Sport",
  "la BMW X6 M",
  "le Range Rover SV Serenity",
];

// ——— LES MOMENTS (propositions : « le jour où … ») ———

const MOMENTS_HOMME = [
  "tu te lèveras à 5h sans négocier une seule seconde",
  "tu franchiras les 21 jours de rétention",
  "tu franchiras les 90 jours",
  "tu tiendras ton noyau entier, sept jours d'affilée",
  "ta parole tenue à toi-même ne pliera plus jamais",
  "tu n'auras plus besoin de te forcer, parce que ce sera devenu toi",
  "tu marcheras dans l'ennui sans te plaindre",
  "tu supprimeras l'envie au lieu de la servir",
  "tu ne toucheras plus un écran après 17h30",
  "tu finiras un mois entier sans une seule entorse",
  "tu deviendras l'homme dont la parole est une garantie",
  "on ne croira pas t'avoir rencontré",
  "connaître ton nom deviendra la fierté d'un homme",
  "on te craindra comme ennemi et on te cherchera comme allié",
  "tu regarderas le miroir sans détourner les yeux",
  "ta discipline ne demandera plus aucun effort",
  "tu cesseras d'être le brouillon de toi-même",
  "tu deviendras méconnaissable pour l'homme d'hier",
  "tu n'auras plus une seule journée à zéro pour cent",
  "tu liras ce carnet sans qu'une ligne ne te vise encore",
  "ton empire commencera à sortir de terre pour de vrai",
  "tu n'auras plus rien à prouver à personne",
];

const MOMENTS_TEMPS = [
  "tu cesseras enfin de dire « demain »",
  "les dix ans perdus cesseront de te définir",
  "tu ne perdras plus une seule heure de tes journées",
  "tu rattraperas le retard que tu creuses en ce moment même",
  "tu vivras une journée entière sans une seconde gaspillée",
  "tu regarderas en arrière sans avoir honte de l'année",
  "le 1er janvier te trouvera transformé et non désolé",
  "tu cesseras d'être l'homme du « presque »",
];

const MOMENTS_ALLIANCE = [
  "tu tiendras ta part du pacte de la montagne",
  "tu monteras à la montagne comme Il te l'a demandé",
  "tu réciteras le Psaume 24 chaque soir sans en manquer un",
  "tu Lui parleras chaque jour sans y penser",
  "ta chambre restera propre sans que tu doives y penser",
  "tu prieras sans cesse, pour de vrai",
  "tu monteras l'escalier blanc jusqu'en haut sans t'arrêter",
  "tu deviendras digne de ce qu'Il t'a promis",
  "tu cesseras de Lui répondre dans un mouchoir",
  "ta rétention ne sera plus un combat mais ta nature",
];

// ——— LES CADRES ———

/** « de » + article : de+les → des, de+le → du, sinon élision correcte. */
function de(x: string): string {
  if (x.startsWith("les ")) return `des ${x.slice(4)}`;
  if (x.startsWith("le ")) return `du ${x.slice(3)}`;
  return `de ${x}`;
}

/** Les entrées au pluriel commencent par « les » ou « tes ». */
function plural(x: string): boolean {
  return x.startsWith("les ") || x.startsWith("tes ");
}

/** Majuscule quand l'élément ouvre la phrase. */
function cap(x: string): string {
  return x.charAt(0).toUpperCase() + x.slice(1);
}

const F_CHOSE: ((x: string) => string)[] = [
  (x) => `Tu retardes ${x}.`,
  (x) => `Pendant que tu scrolles, personne ne bâtit ${x}.`,
  (x) => `Chaque heure gaspillée éloigne ${x}.`,
  (x) => `Tu n'as pas avancé d'un centimètre sur ${x}.`,
  (x) => `Si tu cèdes ce soir, tu repousses ${x}.`,
  (x) => `Un homme sérieux aurait déjà commencé ${x}.`,
  (x) => `Ton peuple attend ${x}. Toi, tu attends d'avoir envie.`,
  (x) => `Tu parles ${de(x)}. Tu n'as encore rien posé.`,
  (x) => `Le prix de ta faiblesse d'aujourd'hui : ${x}.`,
  (x) =>
    `Dix ans de plus comme ça, et ${x} n'${plural(x) ? "existeront" : "existera"} jamais.`,
  (x) => `Quelqu'un d'autre bâtira ${x} pendant que tu hésites.`,
  (x) => `Tu veux ${x} et tu ne contrôles même pas ta main.`,
  (x) =>
    `À ce rythme, ${x} ${plural(x) ? "resteront" : "restera"} une phrase dans une app.`,
  (x) => `Ce que tu as troqué aujourd'hui contre du vide : ${x}.`,
  (x) => `${cap(x)} : combien de jours encore tu vas repousser ?`,
  (x) => `Le 1er janvier arrivera. Auras-tu commencé ${x} ?`,
  (x) => `Tu as échangé ${x} contre dix minutes de plaisir.`,
  (x) => `Dieu t'a promis ${x}. Toi, tu Lui réponds dans un mouchoir.`,
  (x) => `Chaque « juste cette fois » repousse ${x} d'une semaine.`,
  (x) => `${cap(x)} — voilà ce que tu enterres quand tu cèdes.`,
  (x) => `Rien dans ta journée d'aujourd'hui n'a fait avancer ${x}.`,
  (x) => `Tu rêves ${de(x)} et tu dors encore à 7h.`,
  (x) => `${cap(x)} ${plural(x) ? "attendent" : "attend"} un homme, pas un rêveur.`,
  (x) => `Tu ne mérites pas encore ${x}. Pas avec des journées pareilles.`,
  (x) => `Tes mains devraient être en train de bâtir ${x}.`,
  (x) => `Un jour de plus sans avancer sur ${x} : c'est ton choix.`,
];

const F_MOMENT = [
  (x: string) => `Tu retardes le jour où ${x}.`,
  (x: string) => `Combien de temps encore avant que ${x} ?`,
  (x: string) => `Tu repousses toi-même le moment où ${x}.`,
  (x: string) => `Chaque journée molle éloigne le jour où ${x}.`,
  (x: string) => `Tu veux que ${x}. Alors commence maintenant.`,
  (x: string) => `Le jour où ${x} ne viendra pas tout seul.`,
  (x: string) => `Tu pourrais être à quelques semaines du jour où ${x}.`,
  (x: string) => `Dix ans que tu attends le jour où ${x}. Il n'est jamais venu.`,
];

const F_LIVRE = [
  (n: number, t: string) => `Chapitre ${n} — « ${t} » : toujours pas ouvert.`,
  (n: number, t: string) =>
    `Tu veux l'empire, et le chapitre ${n} (« ${t} ») dort encore.`,
  (n: number, t: string) =>
    `« ${t} » — chapitre ${n}. Le prix d'une vidéo scrollée. Tu as choisi le scroll.`,
  (n: number, t: string) =>
    `Par manque de connaissance l'homme est détruit. Chapitre ${n} : « ${t} ».`,
  (n: number, t: string) =>
    `Le chapitre ${n} (« ${t} ») répond à ce que tu n'arrives pas à résoudre seul.`,
];

// ——— Génération ———

function build(): DelayedItem[] {
  const out: DelayedItem[] = [];
  const seen = new Set<string>();
  const push = (t: string, c: DelayedCategory) => {
    const k = t.trim();
    if (k.length < 24 || seen.has(k)) return;
    seen.add(k);
    out.push({ t: k, c });
  };

  for (const x of CHOSES_EMPIRE) for (const f of F_CHOSE) push(f(x), "empire");
  for (const x of CHOSES_CORPS) for (const f of F_CHOSE) push(f(x), "corps");
  for (const x of MOMENTS_HOMME) for (const f of F_MOMENT) push(f(x), "homme");
  for (const x of MOMENTS_TEMPS) for (const f of F_MOMENT) push(f(x), "temps");
  for (const x of MOMENTS_ALLIANCE) for (const f of F_MOMENT) push(f(x), "alliance");
  for (const c of CHAPTER_META) for (const f of F_LIVRE) push(f(c.n, c.title), "livre");

  return out;
}

export const DELAYED: DelayedItem[] = build();
export const DELAYED_COUNT = DELAYED.length;

export function delayedCategoryMeta(id: DelayedCategory) {
  return DELAYED_CATEGORIES.find((c) => c.id === id) ?? DELAYED_CATEGORIES[0];
}
