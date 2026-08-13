// LES 30 JOURS — le mécanisme qui rouvre l'app.
//
// Trois fois par jour — au réveil, à midi, avant de dormir — il déclare ce
// qu'il choisit. Soit il perpétue ce qu'il a écrit dans le miroir, soit il
// décide de le vouloir vraiment et de le prouver par tous ses choix.
//
// Mais « je choisis différemment » n'est pas un bouton qu'on tape. C'est un
// AUDIT : quatre cases, et il faut pouvoir les cocher toutes.
//
//   — Je n'ai pas réinstallé TikTok.
//   — Je n'ai pas bu de boisson gazeuse.
//   — Je n'ai pas regardé de porno.
//   — Je suis allé dans mes fichiers regarder ce que je vais accomplir.
//
// S'il ne peut pas cocher les quatre, il ne déclare pas : il déclare la
// rechute, et le compteur retombe à zéro. C'est tout le mécanisme.
//
// Quatre garde-fous qu'il n'a pas demandés, et sans lesquels le compteur ne
// vaudrait rien :
//
//   1. FENÊTRES HORAIRES. On ne peut pas cocher les trois d'un coup le soir.
//      Trois clics à 23h ne prouvent rien — c'est justement ce qu'il faut
//      empêcher.
//   2. UN CRÉNEAU MANQUÉ CASSE LA CHAÎNE. Une journée à deux déclarations sur
//      trois n'est pas une journée tenue.
//   3. LES RECHUTES SONT IRRÉVERSIBLES. Un aveu qu'on peut retirer n'est pas
//      un aveu.
//   4. LA PLUS LONGUE SÉRIE EST GARDÉE. Une remise à zéro efface le compteur,
//      pas l'histoire. Il doit pouvoir voir qu'il a déjà tenu neuf jours.
//
// Client-safe.

export const CIBLE_JOURS = 30;

export type Creneau = "matin" | "midi" | "soir";
export type Choix = "vouloir" | "perpetuer";
export type Rechute = "tiktok" | "gazeuse" | "porn";

export interface CreneauMeta {
  id: Creneau;
  label: string;
  quand: string;
  /** Heure de Port-au-Prince : [début, fin] inclus. */
  debut: number;
  fin: number;
}

export const CRENEAUX: CreneauMeta[] = [
  { id: "matin", label: "Au réveil", quand: "5h – 11h", debut: 5, fin: 10 },
  { id: "midi", label: "À midi", quand: "11h – 17h", debut: 11, fin: 16 },
  { id: "soir", label: "Avant de dormir", quand: "17h – minuit", debut: 17, fin: 23 },
];

/**
 * Les quatre cases de l'audit. Les trois premières sont des abstentions, la
 * dernière est un acte — et c'est le seul du lot qui demande de se lever et
 * d'aller ouvrir quelque chose.
 */
export interface Confirmations {
  pasTiktok: boolean;
  pasGazeuse: boolean;
  pasPorn: boolean;
  fichiers: boolean;
  lecture: boolean;
  reverie: boolean;
  meditation: boolean;
  bible: boolean;
}

export interface CaseAudit {
  id: keyof Confirmations;
  label: string;
  rechute?: Rechute;
  /** Vraie seulement pour la lecture : la case ne s'ouvre pas d'elle-même. */
  verifiee?: boolean;
  /**
   * Les créneaux où cette case s'applique. Absent = les trois.
   * La méditation et la lecture biblique n'ont lieu que matin et soir : les
   * demander à midi ferait cocher une case pour un acte qui n'existe pas, et
   * une case qu'on coche par habitude ne vaut plus rien.
   */
  creneaux?: Creneau[];
}

export const CASES: CaseAudit[] = [
  { id: "pasTiktok", label: "Je n'ai pas réinstallé TikTok", rechute: "tiktok" },
  { id: "pasGazeuse", label: "Je n'ai pas bu de boisson gazeuse", rechute: "gazeuse" },
  { id: "pasPorn", label: "Je n'ai pas regardé de porno", rechute: "porn" },
  {
    id: "fichiers",
    label: "Je suis allé dans mes fichiers regarder ce que je vais accomplir",
  },
  {
    // La rêverie compulsive, prise par ses deux bouts : le déclencheur (la
    // musique, qui ouvre la porte) et l'automatisme lui-même, qu'il faut
    // couper à voix haute. Une pensée qu'on chasse en silence revient ; une
    // pensée qu'on interrompt en parlant se voit interrompue.
    id: "reverie",
    label:
      "Je n'ai pas écouté de musique en rêvassant, et j'ai coupé chaque rêverie par une parole à voix haute",
  },
  {
    id: "meditation",
    label: "J'ai fait mes 20 minutes de méditation",
    creneaux: ["matin", "soir"],
  },
  {
    id: "bible",
    label:
      "J'ai fait mes 20 minutes de lecture biblique — l'Ancien Testament, jusqu'au bout",
    creneaux: ["matin", "soir"],
  },
  {
    // La seule case que l'écran vérifie lui-même : elle ne devient cochable
    // qu'une fois arrivé au bas du miroir. Une case qu'on peut cocher sans
    // avoir lu ne prouve rien — celle-ci oblige à traverser le texte.
    id: "lecture",
    label:
      "J'ai relu tout ce que j'ai écrit — mes choix de ces 8 dernières années et mon état actuel",
    verifiee: true,
  },
];

/** Les cases qui s'appliquent à ce créneau-là. */
export function casesPour(creneau: Creneau): CaseAudit[] {
  return CASES.filter((c) => !c.creneaux || c.creneaux.includes(creneau));
}

export const RECHUTES: { id: Rechute; label: string }[] = [
  { id: "tiktok", label: "J'ai réinstallé TikTok" },
  { id: "gazeuse", label: "J'ai bu une boisson gazeuse" },
  { id: "porn", label: "J'ai regardé du porno" },
];

/** Toutes les cases de ce créneau sont-elles cochées. */
export function auditComplet(c: Confirmations, creneau: Creneau): boolean {
  return casesPour(creneau).every((x) => c[x.id]);
}

/** Le créneau ouvert à cette heure-là, ou null hors des plages. */
export function creneauOuvert(heure: number): Creneau | null {
  return CRENEAUX.find((c) => heure >= c.debut && heure <= c.fin)?.id ?? null;
}

/** Le prochain créneau à s'ouvrir, quand aucun ne l'est. */
export function prochainCreneau(heure: number): CreneauMeta {
  return CRENEAUX.find((c) => c.debut > heure) ?? CRENEAUX[0];
}

export interface Declaration {
  date: string;
  creneau: Creneau;
  choix: Choix;
}

export interface RechuteDeclaree {
  date: string;
  kind: Rechute;
}

export interface EtatSerment {
  /** Jours consécutifs pleinement tenus, aujourd'hui compris s'il est complet. */
  jours: number;
  /**
   * Le jour qu'il est en train de vivre. On commence aujourd'hui, pas demain :
   * tant que la journée n'est pas cassée, elle porte déjà son numéro.
   */
  jourActuel: number;
  /** Aujourd'hui est-il encore récupérable (ni « perpétuer », ni rechute). */
  jourVivant: boolean;
  /** Ce qui est déjà déclaré aujourd'hui. */
  aujourdhui: Partial<Record<Creneau, Choix>>;
  /** Une rechute a-t-elle été déclarée aujourd'hui. */
  rechuteAujourdhui: boolean;
  /** Le créneau ouvert maintenant, ou null. */
  ouvert: Creneau | null;
  /** Combien des trois déclarations du jour portent « vouloir ». */
  faitAujourdhui: number;
  /** Trente jours atteints : la Vision se rouvre. */
  debloque: boolean;
  /** La plus longue série jamais tenue — gardée même après une remise à zéro. */
  record: number;
  /** Date à laquelle la Vision se rouvrira si tout tient. */
  dateOuverture: string;
}

export function jourSuivant(date: string, n: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const x = new Date(Date.UTC(y, m - 1, d) + n * 86_400_000);
  return `${x.getUTCFullYear()}-${String(x.getUTCMonth() + 1).padStart(2, "0")}-${String(x.getUTCDate()).padStart(2, "0")}`;
}

/**
 * L'état du serment.
 *
 * Une journée compte si — et seulement si — les trois créneaux portent
 * « vouloir » et qu'aucune rechute n'a été déclarée. Tout le reste casse la
 * chaîne : un « perpétuer », une rechute, ou un créneau resté vide.
 */
export function etatSerment(
  declarations: Declaration[],
  rechutes: RechuteDeclaree[],
  aujourdhuiDate: string,
  heure: number,
): EtatSerment {
  const parJour = new Map<string, Partial<Record<Creneau, Choix>>>();
  for (const d of declarations) {
    if (!parJour.has(d.date)) parJour.set(d.date, {});
    parJour.get(d.date)![d.creneau] = d.choix;
  }
  const joursRechute = new Set(rechutes.map((r) => r.date));

  const tenu = (date: string): boolean => {
    if (joursRechute.has(date)) return false;
    const j = parJour.get(date);
    if (!j) return false;
    return CRENEAUX.every((c) => j[c.id] === "vouloir");
  };

  // On remonte à partir d'hier : aujourd'hui est encore en cours.
  let jours = 0;
  let curseur = jourSuivant(aujourdhuiDate, -1);
  while (tenu(curseur)) {
    jours++;
    curseur = jourSuivant(curseur, -1);
  }

  // La plus longue série jamais tenue, sur tout l'historique.
  const dates = [...new Set([...parJour.keys(), ...joursRechute])].sort();
  let record = 0;
  let courant = 0;
  for (let i = 0; i < dates.length; i++) {
    if (tenu(dates[i])) {
      const veille = jourSuivant(dates[i], -1);
      courant = i > 0 && dates[i - 1] === veille && tenu(veille) ? courant + 1 : 1;
      if (courant > record) record = courant;
    } else {
      courant = 0;
    }
  }

  const aujourdhui = parJour.get(aujourdhuiDate) ?? {};
  const rechuteAujourdhui = joursRechute.has(aujourdhuiDate);
  const faitAujourdhui = CRENEAUX.filter(
    (c) => aujourdhui[c.id] === "vouloir",
  ).length;
  const complet = !rechuteAujourdhui && faitAujourdhui === CRENEAUX.length;
  const total = jours + (complet ? 1 : 0);

  // Aujourd'hui est mort si une rechute a été déclarée ou si un créneau déjà
  // passé porte « perpétuer ». Sinon la journée court encore, et elle porte
  // son numéro dès maintenant — on ne commence pas demain.
  const perpetueAujourdhui = CRENEAUX.some(
    (c) => aujourdhui[c.id] === "perpetuer",
  );
  const jourVivant = !rechuteAujourdhui && !perpetueAujourdhui;
  const jourActuel = complet ? total : jourVivant ? jours + 1 : jours;

  return {
    jours: total,
    jourActuel,
    jourVivant,
    aujourdhui,
    rechuteAujourdhui,
    ouvert: creneauOuvert(heure),
    faitAujourdhui,
    debloque: total >= CIBLE_JOURS,
    record: Math.max(record, total),
    dateOuverture: jourSuivant(
      aujourdhuiDate,
      Math.max(0, CIBLE_JOURS - (jourVivant ? jours + 1 : jours)),
    ),
  };
}
