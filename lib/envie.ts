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

/**
 * LE PRIX — ce que ce geste coûte, mesuré contre ce qu'il demande.
 *
 * Tout le reste de cet écran lui met sous les yeux ce qu'il est. Il manquait
 * l'autre moitié : ce qu'il exige. Un homme qui ne voit que sa médiocrité
 * finit par céder par découragement — c'est l'écart entre les deux qui mord,
 * pas la médiocrité seule.
 *
 * Ses mots, y compris les plus arrogants. Les adoucir ici reviendrait à
 * réduire la facture, et c'est le montant de la facture qui le fait tenir.
 */
export const LE_PRIX: string[] = [
  "Tu ne demandes pas une petite vie. Tu demandes les raids militaires, les coups d'État, la conquête, le renversement du pouvoir ennemi, la capture d'un président.",
  "Tu demandes assez de pouvoir pour faire toutes les dingueries que tu décideras — des plus sérieuses jusqu'aux plus enfantines — sans en subir la moindre conséquence.",
  "Tu demandes Haïti à la table des puissances, 50 hôpitaux, et un nom qui hante les théories du complot pendant des millénaires.",
  "ABSOLUTE DOMINANCE. C'est le mot que tu as choisi toi-même. Pas moi.",
  "Et tu demandes tout ça très jeune, à une vitesse qu'aucun homme n'a jamais tenue dans l'Histoire.",
  "Personne n'a jamais tenu cette vitesse-là. Personne. Et sûrement pas avec ce qu'il reste d'un homme qui vient de céder.",
  "L'absolute dominance sur le monde commence par l'absolute dominance sur toi-même. Il n'y a pas d'autre ordre possible — et il n'y a pas d'exception pour cette fois-ci.",
  "Un homme qui ne commande pas trois minutes de son propre désir ne commandera jamais une flotte, ni un pays, ni une salle.",
  "C'est pour ça que chaque goutte d'énergie compte. Et chaque seconde. Y compris celle-ci, pendant que tu lis.",
  "Ce geste ne te coûte pas trois minutes. Il te coûte de la vitesse — et la vitesse est la seule chose qui ne se rachète à aucun prix.",
  "Et tout ce que tu viens de lire n'est même pas le plafond : tu as écrit toi-même que tu ferais plus grand que tout ça, des choses que tu n'as pas encore l'audace de penser, et que tu en serais étonné toi-même.",
  "Ce plafond-là ne se soulève pas avec la main d'un homme qui vient de céder.",
  "Et ce qui décide n'est pas ce que Dieu t'a promis : c'est à quel point tu te maîtrises. Des athées bâtissent des empires pendant que des hommes qui prient chaque jour échouent chaque jour.",
  "La loi ne demande pas ta foi. Elle demande deux choses : conserver l'énergie, et la diriger. Ce geste casse la première.",
  "Et l'inconfort que tu ressens là n'est pas un obstacle sur la route : c'est la route. Aucun arbre ne touche le ciel sans que ses racines descendent jusqu'en enfer.",
  "Si c'était facile, tout le monde le ferait — et ça ne vaudrait rien. Ce que tu fuis en trois secondes est exactement ce qui t'aurait construit.",
  "Et tout ça a une date : le 1er janvier 2027. 90 kg à 10 %, la peau nette, 20 000 $ par jour, ton propre toit, les chantiers commencés.",
  "Cette date arrivera que tu sois prêt ou non. Ce geste-ci ne la repousse pas — il décide seulement de ce qui sera vrai ce jour-là.",
  "Chaque jour rendu à ça est un jour retiré à la seule année qui te restait pour tout renverser.",
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
