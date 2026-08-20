// PAS LE BONHEUR — la cible n'a jamais été un état.
//
// Ses mots : « mon objectif n'est pas le bonheur, la motivation ou le confort.
// Je n'ai pas besoin d'être heureux, j'ai besoin de faire les choses. »
//
// Ce module ne double pas lib/inconfort.ts, et la distinction compte. L'autre
// dit : la douleur est le chemin, traverse-la. Celui-ci dit autre chose, et de
// plus radical : arrête de viser un état, quel qu'il soit. La question « est-ce
// que je me sens bien » n'est pas une question difficile à laquelle répondre —
// c'est une question qui n'a pas sa place dans la décision.
//
// Un point de fait, parce qu'il change tout le reste : la motivation ne
// précède pas l'action, elle la suit. Attendre d'avoir envie pour commencer,
// c'est attendre la sortie avant d'avoir fourni l'entrée. C'est pour ça qu'il
// n'a jamais commencé — il attend un signal qui n'arrive qu'après.
//
// Le registre est plat exprès. Pas d'exhortation, pas de « tu peux le faire » :
// une exhortation est encore une tentative de produire un état. Ce module ne
// veut produire aucun état.
//
// Client-safe.

/** LA CIBLE. Ce qui est visé, et ce qui ne l'est pas. */
export const LA_CIBLE: string[] = [
  "Mon objectif n'est pas le bonheur. Ce n'est pas la motivation. Ce n'est pas le confort.",
  "Je n'ai pas besoin d'être heureux. J'ai besoin de faire les choses.",
  "Je ne vise aucun état. Je vise des faits.",
  "La question n'est jamais « est-ce que je me sens bien ». C'est « est-ce que c'est fait ».",
  "Un homme qui vise un état passe sa vie à ajuster son humeur. Un homme qui vise un fait le produit et passe au suivant.",
  "Le bonheur n'est pas un objectif, c'est un sous-produit. Personne ne l'a jamais obtenu en le visant.",
  "Je n'ai jamais échoué par manque de bonheur. J'ai échoué par manque de choses faites.",
  "Bien-être, équilibre, sérénité : ce sont des mots pour hommes qui n'ont rien à bâtir.",
];

/**
 * LA MOTIVATION EST UNE SORTIE, PAS UNE ENTRÉE.
 *
 * Le bloc le plus utile du module, parce qu'il corrige une erreur de câblage
 * et pas seulement une attitude.
 */
export const LA_MOTIVATION: string[] = [
  "La motivation ne précède pas l'action. Elle la suit. J'attends une sortie en refusant de fournir l'entrée.",
  "Je n'ai pas besoin d'avoir envie. J'ai besoin de commencer — l'envie arrive après vingt minutes, ou elle n'arrive pas, et ça ne change rien.",
  "« Je le ferai quand je serai motivé » veut dire : je le ferai quand je l'aurai déjà commencé.",
  "Attendre la motivation, c'est attendre que la voiture démarre avant de tourner la clé.",
  "Un homme motivé qui n'agit pas ne produit rien. Un homme sans aucune envie qui s'assoit produit tout.",
  "Les vidéos, les phrases, les musiques qui me « motivent » : c'est le sentiment de l'action sans l'action. Le plus dangereux des substituts.",
  "Se motiver est encore une façon de ne pas commencer. Ça se fait assis.",
  "La discipline est précisément ce qui reste quand la motivation n'est pas là. S'il faut être motivé, ce n'est pas de la discipline.",
];

/**
 * L'HUMEUR N'EST PAS UNE DONNÉE.
 *
 * Ce que je ressens n'entre pas dans la décision. C'est le cœur opératoire du
 * module : il ne s'agit pas de vaincre l'émotion mais de lui retirer son droit
 * de vote.
 */
export const L_HUMEUR: string[] = [
  "Ce que je ressens n'est pas une information sur ce que je dois faire.",
  "Fatigué, triste, vide, à plat : ce sont des états, pas des instructions.",
  "Je n'ai pas à me sentir prêt. Personne ne se sent prêt. On se sent prêt après, et seulement une fois.",
  "L'humeur n'a pas le droit de vote. Elle peut être là, elle ne décide pas.",
  "« Je ne le sens pas aujourd'hui » n'est pas un argument. C'est un bulletin météo.",
  "Le jour où je n'ai aucune envie est exactement le jour qui compte. Les autres, n'importe qui les tient.",
  "Je peux faire une chose et la détester pendant que je la fais. C'est même le cas normal.",
];

/**
 * LE CONFORT EST UNE MONNAIE.
 *
 * Pas un ennemi : une chose qui se dépense. Le cadre du paiement plutôt que
 * celui du combat — on ne se bat pas contre sa propre monnaie, on la sort.
 */
export const LE_CONFORT: string[] = [
  "Le confort n'est pas mon ennemi. C'est ma monnaie. Tout ce que je veux se paie avec.",
  "Je ne me bats pas contre le confort. Je le dépense.",
  "Chaque chose que je veux est de l'autre côté d'une chose que je ne veux pas faire. Il n'y a pas d'exception.",
  "Je ne cherche pas à souffrir. Je cherche à ne plus consulter mon confort avant d'agir.",
  "Un homme qui ne dépense jamais son confort meurt riche de confort et pauvre de tout le reste.",
  "Ce n'est pas dur parce que quelque chose ne va pas. C'est dur parce que c'est le prix, et le prix est toujours le même.",
];

/**
 * LA MESURE. Ce qui compte à la fin de la journée.
 *
 * Un seul critère, vérifiable, qui ne demande aucune introspection.
 */
export const LA_MESURE: string[] = [
  "À la fin de la journée, une seule question : qu'est-ce que j'ai fait ? Pas : comment je me sens.",
  "Personne ne me demandera si j'étais heureux pendant que je bâtissais. On regardera ce qui est debout.",
  "Le journal ne consigne pas mon humeur. Il consigne mes heures.",
  "Une bonne journée n'est pas une journée agréable. C'est une journée où c'est fait.",
  "Je peux avoir passé une journée épouvantable et une excellente journée. Ce sont deux mesures différentes, et une seule compte.",
  "Mes accomplissements ne se souviendront pas de mon état d'esprit.",
];

/**
 * MAINTENANT. Les lignes du moment exact où il n'a pas envie.
 *
 * Courtes, utilisables debout, sans réflexion.
 */
export const MAINTENANT: string[] = [
  "Tu n'as pas envie. Très bien. Assieds-toi quand même.",
  "Tu n'as pas à vouloir. Tu as à faire.",
  "L'envie n'est pas requise. Elle n'a jamais été requise.",
  "Commence mal, mais commence. Dix minutes suffisent à changer le sujet.",
  "Ce n'est pas censé être agréable. Ça n'a jamais été le contrat.",
  "Fais-le en étant fatigué. Fais-le en étant vide. C'est ça, la seule différence entre toi et l'autre homme.",
  "Personne ne viendra te rendre l'envie. Fais-le sans.",
];

/** Tout le module à plat, pour les tirages qui piochent partout. */
export const PAS_LE_BONHEUR: string[] = [
  ...LA_CIBLE,
  ...LA_MOTIVATION,
  ...L_HUMEUR,
  ...LE_CONFORT,
  ...LA_MESURE,
  ...MAINTENANT,
];

export const PAS_LE_BONHEUR_TOTAL = PAS_LE_BONHEUR.length;

/**
 * La ligne unique posée au pied de CHAQUE bandeau.
 *
 * Il a demandé qu'on le lui rappelle tellement de fois qu'il ne puisse pas ne
 * pas s'en souvenir. Les quatre bandeaux, en haut et en bas de chaque page,
 * font jusqu'à huit passages par écran — c'est la surface la plus fréquente de
 * l'app, et de loin. D'où une ligne courte : longue, elle deviendrait un décor
 * au bout d'une semaine, et un décor ne se lit plus.
 */
export const RAPPEL_COURT: string[] = [
  "Pas le bonheur. Pas la motivation. Pas le confort. Faire les choses.",
  "Je n'ai pas besoin d'être heureux. J'ai besoin que ce soit fait.",
  "L'envie n'est pas requise.",
  "La motivation vient après. Toujours après.",
  "Ce que je ressens n'est pas une instruction.",
  "Le confort est ma monnaie, pas mon but.",
  "Qu'est-ce que j'ai fait aujourd'hui ? C'est la seule question.",
  "Je ne vise aucun état. Je vise des faits.",
  "Tu n'as pas à vouloir. Tu as à faire.",
  "Une bonne journée n'est pas une journée agréable.",
];
