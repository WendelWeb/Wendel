// LE MIROIR — l'état réel, écrit par lui, le 11 août 2026.
//
// Toute l'app décrit l'homme qu'il veut être : la Vision, les objectifs, le
// défi ultime, les chantiers. Il manquait exactement l'inverse — l'homme qu'il
// EST, au moment où il lit. Sans ce bloc, chaque email s'adressait à quelqu'un
// qui n'existe pas encore, et il pouvait le lire en s'y reconnaissant par
// avance. C'est précisément le mécanisme qu'il décrit : rêver le résultat au
// lieu de le payer.
//
// Ce sont SES phrases, à la première personne, gardées crues. Rien n'a été
// ajouté pour faire mal, rien n'a été retiré pour ménager. La seule chose que
// j'ai mise de moi est la sortie, à la fin — et c'est encore sa phrase :
// « rien ne changera tant que je ne changerai pas ».
//
// Client-safe.

export interface MiroirBloc {
  id: string;
  titre: string;
  lignes: string[];
}

export const MIROIR: MiroirBloc[] = [
  {
    id: "verite",
    titre: "Ce que je suis, maintenant",
    lignes: [
      "Je ne suis pas une seule des choses que je dis vouloir être.",
      "Je suis un masturbateur chronique.",
      "Je suis un homme incapable de se concentrer.",
      "Je suis un chien enchaîné. Je ne suis pas un homme de dominion.",
      "Je suis un lâche.",
      "Je ne suis ni fiable, ni digne de confiance.",
      "Je suis petit et faible. Je serais incapable de défendre quelqu'un dans la rue, même en le voulant.",
      "À 23 ans, je suis fatigué en permanence.",
      "1m70. 67 kilos. Voilà l'homme réel.",
    ],
  },
  {
    id: "preuves",
    titre: "Les preuves — il n'y en a aucune",
    lignes: [
      "Il n'existe aucune preuve de mon intelligence.",
      "Il n'existe aucune preuve de mon travail.",
      "Il n'existe aucune preuve de ma grandeur.",
      "Huit ans. Pas un progrès en cours. Pas un.",
      "Je n'ai accompli aucun de mes objectifs. Aucun.",
      "Personne — ni Dieu, ni un ange, ni un observateur invisible — ne devinerait mes objectifs en me regardant vivre. C'est impossible.",
      "Ma situation financière est la mesure exacte de ma médiocrité.",
      "Mon corps, mon visage, mon charisme : la même mesure.",
    ],
  },
  {
    id: "parole",
    titre: "Ma parole — chaque objectif trahi",
    lignes: [
      "Je n'ai jamais tenu un seul jour de discipline. Pas un seul.",
      "Chaque objectif que je me suis fixé à moi-même, je l'ai trahi.",
      "Me lever à 5h : trahi.",
      "La rétention : trahie.",
      "Zéro TikTok : je réinstalle l'app et je réactive le compte chaque jour.",
      "Je vais sur X comme un chien.",
      "Je ne peux pas poser mon cul sur une chaise et travailler quatre heures d'affilée.",
      "Je ne peux pas arrêter le maladaptive daydreaming.",
      "Je ne vais pas en montagne.",
      "Je cherche désespérément l'attention des filles.",
    ],
  },
  {
    id: "corps",
    titre: "Le corps — cinq ans pour rien",
    lignes: [
      "Cinq ans de gym, et je ressemble à une merde.",
      "Je ne respecte pas le programme.",
      "Je ne soulève pas dur.",
      "Je n'ai aucune discipline sur la nutrition après la séance.",
      "Chaque jour, je retourne aux boissons gazeuses.",
      "Objectif gym : échoué. Cinq ans de preuve.",
    ],
  },
  {
    id: "ecart",
    titre: "L'écart entre le rêve et l'acte",
    lignes: [
      "Je rêve de trillions et je ne fais même pas ce que fait un homme qui gagne 1 000 dollars.",
      "Je rêve de millions sur YouTube sans produire l'effort de ceux qui en font mille.",
      "Je veux publier sur l'App Store pour des milliards, et je dépense mes crédits Claude — un plan à 200 dollars — pour aller sur X.",
      "Je cherche à faire les choses faciles. Et même celles-là, je ne les fais pas.",
      "Et ensuite je me permets de critiquer.",
      "Je cherche toujours une échappatoire au travail que je sais nécessaire à mon évolution.",
      "Comme si YouTube allait créer les vidéos à ma place, les publier à ma place, et me payer.",
    ],
  },
  {
    id: "outils",
    titre: "Les outils que j'ai abandonnés",
    lignes: [
      "J'ai imprimé une feuille pour cocher mes objectifs. Je ne l'ai pas utilisée une seule fois.",
      "J'ai mis en place un système d'emails automatiques. Je ne les ouvre pas.",
      "J'ai les livres. Je ne les lis pas.",
      "Je ne fais absolument rien de ce que je dis que je vais faire.",
    ],
  },
  {
    id: "temps",
    titre: "Ce qui arrive si rien ne change",
    lignes: [
      "Je gaspille mon temps chaque jour, et je pense quand même atteindre mes objectifs.",
      "Je traite demain comme le jour merveilleux où ma médiocrité disparaîtra toute seule.",
      "Je continue à rêver pendant que les années passent et me prouvent le contraire.",
      "Le mois prochain sera exactement pareil.",
      "La fin de l'année sera exactement pareille.",
      "L'année suivante aussi. Puis 25 ans. Puis 30. Puis 40.",
      "Tant que je resterai comme ça, rien ne changera, et les années continueront de passer.",
    ],
  },
];

/** Toutes les lignes à plat. */
export const MIROIR_LIGNES: string[] = MIROIR.flatMap((b) => b.lignes);

/** L'énoncé qui ouvre le miroir — sa thèse, en une phrase. */
export const MIROIR_THESE =
  "Je ne suis pas une seule des choses que je dis vouloir être. Voilà l'homme réel, à cette heure-ci.";

/**
 * La sortie. Elle n'adoucit rien — c'est sa phrase, et c'est la seule porte
 * que le constat laisse ouverte. Sans elle, le miroir n'est qu'une humiliation
 * qu'on finit par éviter de lire ; avec elle, c'est une adresse.
 */
export const MIROIR_SORTIE =
  "Rien ne changera tant que je ne changerai pas. Rien dans cette liste n'est un destin : chaque ligne est une décision que j'ai reprise hier, et que je peux reprendre dans la minute qui vient.";
