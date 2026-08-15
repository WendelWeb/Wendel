// À QUI JE DOIS DES COMPTES — et ce que je fais, aujourd'hui, pour chacun.
//
// Tout le reste de l'app lui parle de lui : son corps, sa série, son prix, sa
// jeunesse. Ce bloc-ci fait l'inverse et c'est pour ça qu'il manquait. Il
// n'est pas seul dans l'équation : cinq créanciers attendent quelque chose de
// cette énergie-là, et aucun ne peut être payé en intentions.
//
// L'ordre n'est pas arbitraire. Sa force est nommée en premier parce qu'elle
// est la ressource, et qu'elle est à son maximum maintenant — pas dans dix
// ans. Tout le reste en dépend : les ancêtres, Dieu, le pays, les vieillards
// qui meurent cette semaine, les enfants qui ne sont pas nés.
//
// Chaque ligne est une question au présent. Pas « qu'est-ce que je ferai » :
// « qu'est-ce que je fais ». Le futur est exactement l'endroit où il se cache
// depuis huit ans.
//
// Client-safe.

export interface CompteBloc {
  id: string;
  titre: string;
  lignes: string[];
}

export const COMPTES: CompteBloc[] = [
  {
    id: "force",
    titre: "Ma force est à son sommet — maintenant",
    lignes: [
      "Ma force masculine est à son maximum en ce moment. Pas dans dix ans : aujourd'hui, à cette heure-ci.",
      "Qu'est-ce que je fais de cette force, exactement, aujourd'hui ?",
      "Un homme reçoit une seule fenêtre où le corps, l'énergie et le temps coïncident. Je suis dedans. Et je la vide en trois minutes.",
      "Ce que je ne bâtis pas avec cette force-là, je devrai le bâtir plus tard avec moins. Ou jamais.",
      "À vingt-trois ans, tout est encore possible et rien n'est encore fait. Les deux sont vrais le même jour — un seul des deux va durer.",
    ],
  },
  {
    id: "ancetres",
    titre: "Pour la fierté de mes ancêtres",
    lignes: [
      "Qu'est-ce que je fais aujourd'hui dont mes ancêtres seraient fiers ?",
      "Ils ont porté des choses que je ne porterais pas une seule journée. Et moi, je n'arrive pas à me lever.",
      "Des hommes se sont battus pour que ce pays existe. Leur descendant scrolle.",
      "Je suis le résultat de tout ce qu'ils ont survécu. C'est ça, ma dette — et elle ne se paie pas en paroles.",
      "Le nom que je porte : est-il plus lourd ou plus léger depuis que c'est moi qui le porte ?",
    ],
  },
  {
    id: "dieu",
    titre: "Pour Sa gloire — et Il me posera la question",
    lignes: [
      "Qu'est-ce que je fais pour la gloire de Dieu ? Il me posera cette question, et je ne pourrai pas répondre par une intention.",
      "Il m'a formé de Ses mains. Il m'a donné une intelligence, un pays, une alliance sur une montagne. Qu'est-ce que j'en ai fait ?",
      "Le jour où Il demandera, je n'aurai pas cette app pour m'aider, ni le temps de préparer une réponse.",
      "Ce que je Lui montrerai, ce seront des actes ou rien. Mes phrases, Il les connaît déjà — Il les a entendues toutes les nuits.",
      "Ma vie, telle qu'elle est aujourd'hui : est-ce qu'elle Le glorifie, ou est-ce qu'elle Le contredit ?",
    ],
  },
  {
    id: "pays",
    titre: "Pour mon pays",
    lignes: [
      "Qu'est-ce que je fais aujourd'hui pour Haïti ? Concrètement. Aujourd'hui.",
      "Mon pays ne manque pas d'hommes qui en parlent. Il manque d'hommes qui livrent.",
      "Chaque jour que je perds est un jour de plus où personne ne vient.",
      "Je dis que je ne supporte pas de voir les miens souffrir — et je fais exactement ce qu'il faut pour que rien ne change.",
      "Si tous les hommes de mon pays faisaient de leur journée ce que je fais de la mienne, dans quel état serait-il dans dix ans ?",
    ],
  },
  {
    id: "vieillards",
    titre: "Pour les vieillards qui souffrent",
    lignes: [
      "Qu'est-ce que je fais pour les vieux qui meurent aujourd'hui de ce qui se soigne ailleurs ?",
      "Il y en a un qui s'éteint pendant que je scrolle. Ce n'est pas une image : c'est l'heure qu'il est.",
      "Les hôpitaux que je promets arriveront trop tard pour eux. Ils peuvent encore arriver à temps pour d'autres — si je commence maintenant.",
      "Ceux qui souffrent aujourd'hui n'ont pas dix ans devant eux. Ma lenteur a un prix, et ce n'est pas moi qui le paie.",
      "Un vieillard qui souffre en ce moment ne saura jamais mon nom. C'est exactement pour lui qu'il faut le faire.",
    ],
  },
  {
    id: "enfants",
    titre: "Pour les enfants qui viennent",
    lignes: [
      "Qu'est-ce que je fais pour les enfants qui ne sont pas encore nés ?",
      "Mes enfants hériteront soit de ce que j'aurai bâti, soit de mes excuses. Il n'y a pas de troisième héritage.",
      "Un jour, un enfant portera mon nom. Est-ce que ce sera un poids ou une porte ?",
      "Le pays qu'ils recevront est décidé aujourd'hui, par des hommes qui travaillent pendant que je lis. Je n'en suis pas.",
      "Je veux qu'ils naissent dans un pays où ce que j'ai vécu ne se voit plus. Ça ne se souhaite pas : ça se construit, à partir de ce matin.",
    ],
  },
];

/**
 * Les questions seules, à plat — pour le bandeau des pages. Une par
 * chargement : c'est assez pour qu'elle soit lue, et trop peu pour qu'elle
 * devienne un décor.
 */
export const QUESTIONS_COMPTES: string[] = [
  "Ta force masculine est à son sommet maintenant, pas dans dix ans. Qu'est-ce que tu en fais aujourd'hui ?",
  "Qu'est-ce que tu fais aujourd'hui dont tes ancêtres seraient fiers ?",
  "Qu'est-ce que tu fais pour Sa gloire ? Il te posera la question, et l'intention ne sera pas une réponse.",
  "Qu'est-ce que tu fais aujourd'hui pour ton pays ? Concrètement, aujourd'hui.",
  "Qu'est-ce que tu fais pour les vieux qui meurent de ce qui se soigne ailleurs ?",
  "Qu'est-ce que tu fais pour les enfants qui ne sont pas encore nés ?",
  "Tu es dans la seule fenêtre où le corps, l'énergie et le temps coïncident. Qu'est-ce que tu en fais à cette heure-ci ?",
  "Mes enfants hériteront soit de ce que j'aurai bâti, soit de mes excuses. Lequel des deux suis-je en train de préparer ?",
  "Il y a un vieillard qui s'éteint pendant que tu lis ça. Qu'est-ce que tu fais ?",
  "Si tous les hommes de ton pays faisaient de leur journée ce que tu fais de la tienne, dans quel état serait-il dans dix ans ?",
];
