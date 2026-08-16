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

/** Sept par séance — son chiffre, et il est bon. Trois séances : 21 par jour. */
export const REPS_PAR_SEANCE = 7;
export const SEANCES_PAR_JOUR = 3;
export const REPS_PAR_JOUR = REPS_PAR_SEANCE * SEANCES_PAR_JOUR;

/**
 * La phrase-noyau. Elle ne tourne pas, et c'est le seul endroit de l'app où
 * rien ne tourne : la répétition exige l'identique. Tout le reste de l'app
 * change à chaque visite précisément pour que celle-ci reste reconnaissable.
 *
 * Trois lignes, trois piliers : ce qu'il décide, la condition de l'alliance,
 * et le but suprême.
 */
export interface BlocRepetition {
  id: string;
  titre: string;
  /** Ce qu'il dit à voix haute, sept fois. */
  lignes: string[];
  /** Pourquoi ce bloc existe et pas un autre. */
  role: string;
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
    id: "decision",
    titre: "I · La décision",
    role: "L'ordre donné. Pas une demande, pas un souhait — une décision déjà prise.",
    lignes: [
      "Je décide de tout, tout, tout réaliser.",
      "Tout ce que j'ai écrit, et tout ce que je n'ai pas encore osé écrire.",
      "Je ne demande pas. Je décide.",
    ],
  },
  {
    id: "identite",
    titre: "II · L'identité",
    role: "Au présent. « Je serai » repousse à plus tard ; « je suis » engage la minute qui vient.",
    lignes: [
      "Je suis l'homme que Dieu veut que je sois.",
      "La douleur ne décide pas de mes actions.",
      "Ma main est libre à l'heure où Il appelle.",
      "Je deviens méconnaissable — même pour moi-même.",
    ],
  },
  {
    id: "condition",
    titre: "III · La condition",
    role: "L'alliance, et sa clause. La promesse est branchée dessus — elle ne tient pas sans elle.",
    lignes: [
      "Je ne gaspille rien. Ni une goutte, ni une seconde.",
      "Chaque goutte gardée, chaque seconde tenue, part dans l'œuvre.",
      "Et tout ce que je conçois se réalise.",
    ],
  },
];

/** À plat, pour les emails et les écrans compacts. */
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
