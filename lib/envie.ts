// « JE RESSENS L'ENVIE » — ce qui se passe à l'instant où ça monte.
//
// Il a fermé la page Urgence avec le reste. Ce bouton la remplace, et il est
// plus dur : au lieu d'une phrase tirée au sort, on lui met d'abord son état
// réel sous les yeux — le corps, l'argent, l'énergie, les preuves — puis vingt
// lignes de ce qu'il a écrit lui-même, une par une, à lire à voix haute. Et on
// ne peut pas fermer sans décider.
//
// Vingt lignes tapées une par une, ça prend deux à trois minutes. C'est
// exactement la durée d'une vague : elle passe pendant qu'il lit.
//
// Client-safe.

import { MIROIR } from "./miroir";
import { MIROIR_RETOURNE } from "./miroir-plus";

export const NB_PHRASES = 20;

export interface EtatLigne {
  categorie: string;
  lignes: string[];
}

/**
 * L'état réel, rangé par domaine. Tiré de ce qu'il a écrit — rien d'inventé.
 * C'est le premier écran : avant les phrases, le constat chiffré.
 */
export const ETAT_ACTUEL: EtatLigne[] = [
  {
    categorie: "Le corps",
    lignes: [
      "1m70. 67 kg. Faible.",
      "Visage non soigné, plein de boutons. Dents jaunes. Aucun parfum.",
      "5 ans à la gym, et je ressemble comme une merde.",
    ],
  },
  {
    categorie: "L'énergie",
    lignes: [
      "23 ans, et je me lève fatigué. Tous les jours.",
      "Dans la peau d'un vieillard de 80 ans, à mon âge.",
      "Pour l'instant tu n'as rien pour manifester. Pas d'énergie.",
    ],
  },
  {
    categorie: "L'argent",
    lignes: [
      "Ma situation financière prouve ma médiocrité.",
      "Je rêve résultat trillions et je ne fais même pas ce qu'un homme qui gagne 1000$ fait.",
      "Je laisse mes crédits Claude à plan max 200$ pour aller sur X.",
    ],
  },
  {
    categorie: "Les preuves",
    lignes: [
      "Il n'y a même pas progrès en cours depuis 8 ans.",
      "Je n'ai accompli aucun de mes objectifs.",
      "Aucune preuve de ma soi-disant intelligence, de mon travail, de ma grandeur.",
    ],
  },
];

/** Toutes les lignes du miroir, à plat — le vivier du tirage. */
export const VIVIER: string[] = [...MIROIR, ...MIROIR_RETOURNE].flatMap(
  (b) => b.lignes,
);

/** Vingt lignes tirées au sort, sans doublon. */
export function tirerPhrases(n = NB_PHRASES): string[] {
  const copie = [...VIVIER];
  const out: string[] = [];
  while (out.length < Math.min(n, copie.length)) {
    const i = Math.floor(Math.random() * copie.length);
    out.push(copie.splice(i, 1)[0]);
  }
  return out;
}

// ——————————————————————————————————————————————————————————————
// Ce qui se passe dans sa tête, et ce que le geste fait au réel
// ——————————————————————————————————————————————————————————————

export interface Systeme {
  nom: string;
  age: string;
  lignes: string[];
  couleur: string;
}

/**
 * Les deux systèmes en guerre — chapitre 4 du Vaisseau, appliqué à l'instant
 * précis où l'envie monte. Le savoir change le combat : tant qu'il croit que
 * c'est « lui contre une envie », il perd, parce qu'il se bat contre lui-même.
 * Dès qu'il voit que c'est un circuit contre un autre, il redevient l'arbitre.
 */
export const SYSTEMES: Systeme[] = [
  {
    nom: "Le limbique",
    age: "Le plus ancien. Rapide, muet, sans mémoire.",
    couleur: "#7f1d1d",
    lignes: [
      "Il ne connaît qu'un seul temps : maintenant.",
      "Il ne sait pas ce qu'est un hôpital, une année, une promesse faite sur une montagne.",
      "Il veut la décharge, tout de suite, et il ne négocie pas — il ne parle pas.",
      "C'est lui qui a la main en ce moment. La preuve : tu ressens l'envie.",
    ],
  },
  {
    nom: "Le préfrontal",
    age: "Le plus jeune. Lent, coûteux, fatigable.",
    couleur: "#1e3a5f",
    lignes: [
      "C'est lui qui tient le futur, qui calcule les conséquences, qui dit non.",
      "C'est lui qui a écrit ta Vision, ton livre, chacune de ces phrases.",
      "Il s'éteint quand tu es fatigué, seul, dans le noir — et l'autre le sait.",
      "En ce moment il est en train de perdre. C'est pour ça que tu es sur cet écran.",
    ],
  },
];

/** Ce que la décision fait, physiquement, à ces deux circuits. */
export const CE_QUE_LA_DECISION_FAIT: string[] = [
  "Le limbique ne s'argumente pas : il ne comprend pas les mots. Mais il ne tient pas non plus — sans acte, la vague redescend d'elle-même en trois minutes.",
  "Chaque fois que tu cèdes, tu épaissis ce circuit-là. Tu l'entraînes. Il reviendra plus vite et plus fort.",
  "Chaque fois que tu tiens, tu épaissis l'autre. C'est la seule musculation qui compte vraiment.",
  "Tu n'es pas en train de résister à une envie. Tu es en train de décider lequel des deux commandera les dix prochaines années.",
];

/**
 * L'arbre des réalités — chapitres 77 à 89. Ce n'est pas une image poétique :
 * c'est la description de ce qui se joue dans les trois secondes qui viennent.
 */
export const ARBRE: string[] = [
  "À cet instant précis, deux branches partent de toi. Pas dans un an : maintenant.",
  "Ce n'est jamais la grande décision qui trace une vie. C'est celle-ci, minuscule, répétée mille fois.",
  "La branche où tu cèdes, tu l'as déjà prise mille fois. Tu connais la suite par cœur — tu l'as écrite en entier dans ce miroir.",
  "La branche où tu tiens, tu ne l'as jamais suivie plus de quelques jours. Tu ne sais pas ce qu'il y a au bout. Personne ne le sait.",
  "Les deux versions de toi existent en ce moment, superposées. Celle qui cède, et celle qui tient.",
  "Ce que tu fais dans les dix prochaines secondes en efface une, définitivement.",
  "Le saut ne se fera pas plus tard, dans un moment de grandeur. Il se fait ici, sur un geste de trois secondes que personne ne verra.",
];

/** Ce qu'on lui propose à la fin. Il n'y a pas de troisième porte. */
export const SORTIES = {
  tiens: {
    titre: "Je ne cède pas",
    detail:
      "Je me lève, je change de pièce, et je fais la chose que j'évitais. Maintenant, pas dans cinq minutes.",
  },
  cede: {
    titre: "J'ai cédé",
    detail:
      "Alors je le déclare, et le compteur retombe à zéro. Un aveu qu'on garde pour soi ne coûte rien — et c'est pour ça qu'il ne change rien.",
  },
};
