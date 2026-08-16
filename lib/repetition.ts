// LA RÉPÉTITION — le protocole, et ce qui le fonde réellement.
//
// Il a demandé combien de fois répéter, en citant Bob Proctor et Bruce Lipton.
// La réponse honnête est qu'aucune étude ne donne de nombre : Proctor est un
// conférencier, les thèses de Lipton sur la « reprogrammation du subconscient »
// ne sont pas soutenues par la recherche, et le « mille fois par jour » qui
// circule ne vient d'aucun protocole contrôlé.
//
// Ce qui est établi, en revanche, dicte la forme de ce module :
//
//   • l'espacement bat le volume — trois séances réparties valent mieux que
//     cent répétitions d'affilée (effet le mieux répliqué de la psychologie de
//     la mémoire) ;
//   • l'automaticité d'un comportement demande 66 jours en médiane, de 18 à
//     254 selon la difficulté (Lally, UCL, 2010) — ses 30 jours sont un
//     premier seuil, pas la fin ;
//   • la répétition seule augmente la croyance (effet de vérité illusoire,
//     Hasher 1977) — mais elle crée une croyance, pas un acte ;
//   • ce qui change le comportement, c'est l'intention d'implémentation
//     (Gollwitzer) : un acte précis, à un moment précis.
//
// D'où la règle qui structure tout l'écran : une séance ne compte pas tant
// qu'un acte physique n'a pas suivi dans les cinq minutes. Sans ça, répéter
// est exactement ce qu'il fait déjà en rejouant l'interview dans sa tête —
// la récompense sans la facture, et plus faim après.
//
// Client-safe.

/** Sept — le chiffre du deuxième bloc, et celui que portent les emails. */
export const REPS_PAR_SEANCE = 7;
export const SEANCES_PAR_JOUR = 3;

/**
 * La phrase-noyau. Elle ne tourne pas, et c'est le seul endroit de l'app où
 * rien ne tourne : la répétition exige l'identique. Tout le reste de l'app
 * change à chaque visite précisément pour que celle-ci reste reconnaissable.
 *
 * Trois lignes, trois piliers : ce qu'il décide, la condition de l'alliance,
 * et le but suprême.
 */
/**
 * L'ouverture du premier bloc. Elle ne change jamais — c'est elle qui est
 * répétée vingt et une fois. Ce qui change à chaque passage, c'est ce à quoi
 * il consacre l'énergie sacrifiée.
 */
export const SACRIFICE_OUVERTURE =
  "Je décide de sacrifier mon confort et mes mauvaises habitudes, et de consacrer toute mon énergie";

/**
 * Les vingt et une destinations. Une par répétition, exactement : le compte
 * tombe juste, et rien n'est dit deux fois.
 *
 * C'est la seule forme qui tienne pour vingt et une répétitions. Réciter le
 * même paragraphe vingt et une fois, ce serait quarante secondes × 21, soit
 * quatorze minutes par séance — et surtout la bouche finirait par le produire
 * sans que l'oreille l'écoute, ce qui est exactement le mécanisme qui a tué
 * les feuilles collées au mur.
 *
 * L'ordre est délibéré : le corps, puis l'œuvre, puis l'homme, puis la
 * puissance. Il monte du plus tangible au plus vaste, et la dernière ligne
 * est la plus arrogante — c'est celle sur laquelle sa voix doit rester.
 */
export const SACRIFICE_POUR: string[] = [
  // Le corps
  "à mes 90 kg, à dix pour cent de masse grasse.",
  "à un corps plus que parfait — à mon goût, pas à celui d'un autre.",
  "à une peau saine, brillante, éclatante.",
  "à un visage soigné, des dents blanches, des waves tenues.",
  "à la rétention totale — la condition de l'alliance.",
  // L'œuvre
  "à mes 20 000 dollars par jour, produits par ce que j'aurai bâti.",
  "à mon propre toit, à ma vie seul, loin de la maison de mes parents.",
  "à mon premier terrain, acheté et signé.",
  "aux chantiers sortis de terre, que quelqu'un peut aller toucher.",
  "à mes quatre voitures — puis à la cinquième.",
  "aux cinquante hôpitaux, et à ceux qui n'auront plus à mourir de ce qui se soigne ailleurs.",
  // L'homme
  "à devenir l'homme que Dieu veut que je sois.",
  "à devenir un homme dont la douleur ne décide pas des actions.",
  "à devenir un homme dont la main est libre à l'heure où Il appelle.",
  "à devenir méconnaissable — même pour moi-même.",
  "à me lever à 4h30 sans négocier, et à dormir à 21h45.",
  "à mes douze heures de travail profond, tenues comme un standard.",
  // La puissance
  "à l'absolute dominance sur moi-même, d'abord.",
  "à l'absolute dominance sur le monde, ensuite.",
  "à ma société militaire — la plus crainte du monde.",
  "à assez de puissance pour faire tout ce que je déciderai, sans en subir aucune conséquence.",
];

export interface BlocRepetition {
  id: string;
  titre: string;
  /** Ce qu'il dit à voix haute. */
  lignes: string[];
  /** Pourquoi ce bloc existe et pas un autre. */
  role: string;
  /** Combien de fois, par séance. */
  fois: number;
  /**
   * Vrai si chaque répétition prend une destination différente au lieu de
   * redire le même texte. Réservé au premier bloc.
   */
  enumere?: boolean;
}

/**
 * Trois blocs, trois fonctions distinctes — c'est ce qui les rend
 * complémentaires plutôt que redondants.
 *
 * L'ordre compte : on décide, puis on se nomme, puis on paie. Inverser
 * donnerait une prière ; dans cet ordre-là, c'est un ordre donné, une identité
 * assumée, et une facture acceptée.
 *
 * Le deuxième est au présent, jamais au futur. « Je serai » repousse ; « je
 * suis » engage la seconde qui vient. C'est le seul point où j'ai corrigé sa
 * formulation, et il peut la remettre au futur s'il le veut.
 */
export const BLOCS_REPETITION: BlocRepetition[] = [
  {
    id: "sacrifice",
    titre: "I · Le sacrifice, et ce à quoi il sert",
    role: "Vingt et une fois. L'ouverture ne bouge jamais ; la destination change à chaque passage — une par répétition, et le compte tombe juste.",
    fois: SACRIFICE_POUR.length,
    enumere: true,
    lignes: [SACRIFICE_OUVERTURE],
  },
  {
    id: "decision",
    titre: "II · La décision",
    role: "Sept fois, sans rien changer. C'est l'ordre donné, l'identité assumée et la clause de l'alliance, dans une seule respiration.",
    fois: 7,
    lignes: [
      "Je décide de tout, tout, tout réaliser.",
      "Tout ce que j'ai écrit, et tout ce que je n'ai pas encore osé écrire.",
      "Je ne demande pas. Je décide.",
      "Je décide de réaliser des choses que nul homme n'a jamais réalisées, et qui semblent impossibles à tout le monde.",
      "Et à un âge encore plus surprenant.",
      "Je serai au maximum dans toutes les choses de la vie — même en beauté, même en charisme.",
      "Je deviens méconnaissable — même pour moi-même.",
      "Je ne gaspille rien. Ni une goutte, ni une seconde.",
      "Chaque goutte gardée, chaque seconde tenue, part dans l'œuvre.",
      "Et tout ce que je conçois se réalise.",
    ],
  },
  {
    id: "litanie",
    titre: "III · Ce que je connais déjà — je le nomme seulement",
    role: "Une fois. Pas de texte à réciter : il connaît chacun par cœur. Le nom suffit à convoquer la chose entière, et c'est plus rapide que n'importe quelle description.",
    fois: 1,
    lignes: [
      "La montagne. 2021.",
      "Le Psaume 24.",
      "L'escalier blanc.",
      "Les quatre consignes.",
      "Le Vaisseau. Cinq cent quatre-vingt-sept pages.",
      "Les cinquante hôpitaux.",
      "Les cinquante mille maisons.",
      "Le port en eau profonde.",
      "L'université.",
      "La société militaire.",
      "Tsevaot.",
      "Le sixième siège.",
      "Le Nord-Ouest.",
      "Ma mère.",
      "Les vieillards qui souffrent.",
      "Les enfants qui ne sont pas encore nés.",
      "Le 1er janvier 2027.",
      "Le 16 mai 2033.",
      "Inébranlable. Démesuré. Fidèle.",
    ],
  },
];

/** Le total d'une séance : 21 + 7. */
export const REPS_PAR_SEANCE_TOTAL = BLOCS_REPETITION.reduce(
  (n, b) => n + b.fois,
  0,
);

/** Et sur la journée entière. */
export const REPS_PAR_JOUR = REPS_PAR_SEANCE_TOTAL * SEANCES_PAR_JOUR;

/** À plat, pour les écrans compacts. */
export const PHRASE_NOYAU: string[] = BLOCS_REPETITION.flatMap((b) => b.lignes);

/** Ce que l'écran rappelle avant de commencer. */
export const PROTOCOLE: string[] = [
  "À voix haute. Debout. Jamais en lisant en silence.",
  "Sept fois, sans compter dans ta tête — l'écran compte pour toi.",
  "Trois séances par jour, espacées : matin, midi, soir. L'espacement bat le volume.",
  "Et la seule règle qui compte : un acte physique dans les cinq minutes qui suivent.",
];

/** L'honnêteté sur ce qui fonde le protocole. Elle a sa place dans l'écran. */
export const CE_QUE_DIT_LA_SCIENCE: string[] = [
  "Aucune étude ne donne de nombre. Le « mille fois par jour » ne vient d'aucun protocole contrôlé — Proctor est conférencier, et les thèses de Lipton sur le subconscient ne sont pas soutenues.",
  "Ce qui est établi : l'espacement bat le volume, et l'automaticité demande 66 jours en médiane (Lally, 2010) — de 18 à 254 selon la difficulté.",
  "La répétition seule augmente la croyance, pas l'acte. Ce qui change le comportement, c'est un acte précis à un moment précis.",
  "Donc une séance sans acte dans les cinq minutes ne compte pas. C'est de la rêverie avec de meilleurs mots — et tu connais déjà ce piège.",
];

/** La clé de stockage locale, par jour et par créneau. */
export function cleRepetition(date: string, creneau: string): string {
  return `forged:rep:${date}:${creneau}`;
}
