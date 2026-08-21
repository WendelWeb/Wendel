// LES PROMESSES MORTES — le précédent, et il est à lui.
//
// Il vient de donner à l'app la seule pièce qui lui manquait : la preuve que
// le dispositif a DÉJÀ été essayé et a DÉJÀ échoué. En 2025 il s'est fixé
// janvier 2026. Janvier 2026 est arrivé, puis reparti. Rien. Il s'est ensuite
// fixé janvier 2027, exactement de la même manière, avec les mêmes mots.
//
// C'est plus fort que tout le reste de l'app réuni, et pour une raison
// technique : le reste prédit ce qui arrivera s'il ne change pas. Ceci le
// MESURE. Ce n'est plus une menace, c'est un relevé.
//
// L'hélicoptère est le meilleur exemple parce qu'il est vérifiable. Un brevet
// de pilote d'hélicoptère demande au minimum quarante heures de vol côté
// américain, quarante-cinq côté européen — et en pratique cinquante à
// soixante-dix. Ce n'est pas une question d'argent ni de volonté : c'est un
// nombre d'heures que personne ne peut comprimer. Il ne peut donc pas piloter
// en janvier 2027 sans avoir commencé bien avant janvier 2027. Le 19 août
// 2026, il n'a pas commencé. La date est donc déjà manquée, indépendamment de
// tout ce qu'il fera d'ici là. C'est arithmétique, pas moral.
//
// Correction du 20 août : il a répondu qu'il n'a pas le budget des leçons, et
// que faire l'argent avant la fin de l'année fait partie du défi. C'est exact,
// et deux lignes de ce module devenaient donc fausses — celles qui lui
// reprochaient un appel non passé. Elles sont réécrites : l'obstacle n'est pas
// extérieur, c'est une ligne de sa propre liste qui en bloque une autre. Une
// seule ligne fausse dans cette app ferait perdre leur force à toutes les
// autres, et c'est la raison de la correction.
//
// Le module ne cite aucun chiffre de compte à rebours en dur : ceux-là sont
// calculés par l'app et changent chaque jour.
//
// Client-safe.

/**
 * LE PRÉCÉDENT. Ce qui s'est déjà passé, une fois.
 *
 * Le registre est celui du procès-verbal : pas de reproche, pas d'adjectif.
 * Un reproche se discute, un relevé ne se discute pas.
 */
export const PRECEDENT: string[] = [
  "En 2025, je me suis fixé janvier 2026. Janvier 2026 est arrivé. Rien. Nada.",
  "Janvier 2026 n'a pas été raté de peu. Il a été raté de tout.",
  "Ce n'est pas la première fois que je fixe une date. C'est la deuxième fois que je fixe la même date, décalée d'un an.",
  "J'ai déjà fait exactement ça. J'ai déjà écrit, j'ai déjà daté, j'ai déjà juré. Et janvier est passé sans moi.",
  "La seule différence entre janvier 2026 et janvier 2027, c'est le chiffre. Rien d'autre n'a changé — surtout pas moi.",
  "Le 1er janvier 2026, j'ai regardé la liste, je n'avais rien fait, et j'ai écrit une nouvelle liste.",
  "Une date ratée qu'on remplace par une autre date, ce n'est pas un nouveau départ. C'est la même chose qui continue.",
  "Je n'ai pas manqué janvier 2026 par malchance. Je l'ai manqué jour après jour, en connaissance de cause.",
];

/**
 * L'HÉLICOPTÈRE. La ligne la plus vérifiable de toute la liste.
 *
 * On peut discuter de « devenir méconnaissable ». On ne peut pas discuter d'un
 * nombre d'heures de vol.
 */
export const HELICOPTERE: string[] = [
  "Un hélicoptère neuf, et apprendre à piloter. Pour janvier 2027. Aujourd'hui : aucune leçon, aucun brevet commencé, aucun rendez-vous pris.",
  "Le brevet de pilote d'hélicoptère demande au minimum quarante heures de vol, quarante-cinq en Europe. En pratique, cinquante à soixante-dix.",
  "Ces heures ne se compriment pas. Ni avec de l'argent, ni avec de la volonté, ni avec une bonne semaine en décembre.",
  "Pour piloter en janvier 2027, il fallait avoir commencé bien avant janvier 2027. Je n'ai pas commencé.",
  "Cette ligne-là n'est pas en retard : elle est déjà manquée, et c'est de l'arithmétique, pas de la morale.",
  "Je n'ai pas l'argent des leçons, et c'est vrai. Mais l'argent était déjà une ligne de la même liste, avec la même date. Ce n'est pas un obstacle extérieur : c'est la première ligne qui bloque la deuxième.",
  "Je ne peux pas payer une leçon aujourd'hui. Je peux gagner aujourd'hui le premier dollar qui la paiera. Les deux choses sont dans ma liste, et une seule dépend de moi ce matin.",
  "Dire « je n'ai pas le budget » est exact. Ça ne répond pas à la question : qu'est-ce que j'ai fait aujourd'hui pour l'avoir ?",
  "Si je ne peux pas commencer la chose qui prend le plus de temps, je ne finirai aucune des autres.",
];

/**
 * LA DATE NE TRAVAILLE PAS.
 *
 * Le mécanisme du piège, expliqué. Une échéance donne la sensation d'avoir
 * agi, alors qu'elle ne fait strictement rien.
 */
export const LA_DATE_NE_TRAVAILLE_PAS: string[] = [
  "Une date ne fait aucun travail. Elle passe, c'est tout ce qu'elle sait faire.",
  "Fixer une échéance m'a donné la sensation d'avoir commencé. C'est exactement pour ça que je n'ai pas commencé.",
  "J'ai changé la date deux fois et mon comportement zéro fois. Devine ce qui décide du résultat.",
  "Le 1er janvier n'a jamais rien construit pour personne. C'est le 14 mars, le 3 juillet et le 19 août qui construisent.",
  "Écrire « avant 2027 » repousse tout à décembre. Écrire « aujourd'hui » ne laisse nulle part où le mettre.",
  "Ce n'est pas un problème d'objectifs. Mes objectifs sont excellents. C'est un problème de journées.",
  "Une échéance sans un premier geste daté est un vœu avec un calendrier collé dessus.",
];

/**
 * CE QUE JE ME DIRAI LE 1ER JANVIER 2027.
 *
 * La projection — et elle n'est pas une hypothèse, puisqu'il l'a déjà vécue
 * une fois. C'est le bloc le plus dur du module, volontairement.
 */
export const PREMIER_JANVIER: string[] = [
  "Je sais déjà ce que je me dirai le 1er janvier 2027, parce que je me le suis déjà dit le 1er janvier 2026.",
  "« Cette année c'est la bonne. » Je l'ai dit l'année dernière, avec la même conviction, à la même heure.",
  "Le 1er janvier 2027, soit je regarde des preuves, soit je réécris la même liste avec 2028 dessus.",
  "Il n'y a pas de troisième version de ce matin-là. Preuves, ou nouvelle liste.",
  "Combien de fois vais-je faire glisser la même page d'un an ? Deux, c'est déjà un système.",
  "Chaque report est plus facile que le précédent. C'est ça, le vrai danger : ça ne fait même plus mal.",
  "Si janvier 2028 arrive avec les mêmes lignes non cochées, ce ne sera plus un échec — ce sera mon métier.",
];

/**
 * LE PREMIER GESTE. La sortie, et elle est petite exprès.
 *
 * Sans issue concrète, un bloc pareil ne fait que documenter la défaite. Ce
 * qui suit est ce qu'il peut faire dans l'heure, sans argent et sans courage.
 */
export const PREMIER_GESTE: string[] = [
  "La sortie n'est pas de mieux jurer. Elle est de dater un premier geste, cette semaine, sur la ligne qui prend le plus de temps.",
  "Le premier geste de l'hélicoptère n'est pas d'acheter un hélicoptère, ni même de payer une leçon : c'est de gagner l'argent qui les paie. Ça commence aujourd'hui, pas en décembre.",
  "Un premier geste qui débouche sur une facture que je ne peux pas payer n'est pas un premier geste. C'est un obstacle déguisé en action.",
  "Une ligne qui n'a pas de premier geste daté n'est pas un objectif : c'est une décoration.",
  "Ce que je peux faire dans l'heure vaut mieux que ce que je jure de faire cette année. J'ai la preuve des deux.",
  "Je n'ai pas besoin d'une nouvelle liste. J'ai besoin d'une ligne qui bouge aujourd'hui.",
  "Reprends la liste et écris une date de DÉBUT à côté de chaque ligne. Les lignes qui n'en supportent pas sont mortes — retire-les.",
];

/** Tout le module à plat, pour les tirages qui piochent partout. */
export const PROMESSES_MORTES: string[] = [
  ...PRECEDENT,
  ...HELICOPTERE,
  ...LA_DATE_NE_TRAVAILLE_PAS,
  ...PREMIER_JANVIER,
  ...PREMIER_GESTE,
];

export const PROMESSES_MORTES_TOTAL = PROMESSES_MORTES.length;

/** Le titre du bloc, court, reconnaissable d'un coup d'œil. */
export const PROMESSES_TITRE = "Le précédent — janvier 2026";
