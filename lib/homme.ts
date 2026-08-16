// LES DEUX HOMMES — la question posée partout.
//
// Il l'a redressée lui-même, et le redressement est décisif. L'homme décrit
// dans cette app n'est pas un idéal qu'il se serait fabriqué : c'est l'homme
// que Dieu veut qu'il soit. Ça retire toute possibilité de négocier — on
// discute un objectif personnel, on ne discute pas ça.
//
// Et en face, il n'a pas voulu d'un simple « ce que je suis ». Il a voulu une
// échéance, et il l'a étirée lui-même : l'homme qu'il ne veut être ni demain,
// ni dans un mois, ni dans trois, six, un an, cinq ans, dix ans. C'est la
// forme exacte de la fuite qu'il connaît — « pas maintenant, plus tard » — et
// la liste ferme la porte à chaque « plus tard » d'avance.
//
// Deux formes de test :
//
//   • « Si je suis vraiment sérieux, … » — au présent, complété par la chose
//     exacte qui est devant lui.
//   • Les deux hommes — le même test à la troisième personne. Il est plus dur
//     à esquiver : on se pardonne à soi, on ne pardonne pas à un homme qu'on
//     regarde de l'extérieur.
//
// Et le mot « demain » est nommé, parce qu'il a dit lui-même que c'est avec
// ce mot-là qu'il a brûlé dix ans.
//
// Client-safe.

/** Les deux titres, tels qu'il les a dictés. */
export const HOMME_DIEU_TITRE =
  "L'homme que je décris dans l'app — celui que Dieu veut que je sois";

export const HOMME_REFUS_TITRE =
  "L'homme que je ne veux pas être — ni demain, ni dans un mois, ni dans trois, ni dans six, ni dans un an, ni dans cinq ans, ni dans dix ans";

/** La question, telle qu'il l'a formulée. Elle ouvre le bloc partout. */
export const LA_QUESTION =
  "L'homme que je décris dans l'app — celui que Dieu veut que je sois — il fait quoi là ? Et l'homme que je ne veux être ni demain ni dans dix ans, il fait quoi ?";

/** L'échelle des « plus tard », dans son ordre. */
export const ECHEANCES: string[] = [
  "demain",
  "dans un mois",
  "dans trois mois",
  "dans six mois",
  "dans un an",
  "dans cinq ans",
  "dans dix ans",
];

/** Le mot qui a coûté les dix ans. */
export const LE_MOT_DEMAIN: string[] = [
  "« Demain. » C'est le mot exact avec lequel j'ai brûlé dix ans.",
  "Ce n'est jamais une grande trahison. C'est ce mot-là, dit doucement, une fois par jour, pendant dix ans.",
  "Je n'ai pas perdu dix ans d'un coup. Je les ai perdus en remettant à demain, chaque jour, la même petite chose.",
  "Je ne veux pas être cet homme demain. Ni dans un mois. Ni dans trois. Ni dans six. Ni dans un an. Ni dans cinq. Ni dans dix. Donc pas ce soir non plus.",
];

/**
 * Le test au présent. Chaque ligne se complète par ce qu'il a devant lui à
 * l'instant où il la lit — c'est pour ça qu'elles sont courtes et nombreuses.
 */
export const SI_SERIEUX: string[] = [
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie à TikTok.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie au porno.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie aux rêveries mentales.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie aux femmes.",
  "Si je suis vraiment sérieux, j'arrête de donner mon temps, ma dopamine et mon énergie à X.",
  "Si je suis vraiment sérieux, j'arrête de m'imaginer en interview au lieu de faire le travail qui m'y mènerait.",
  "Si je suis vraiment sérieux, j'arrête d'écouter de la musique en me racontant des scènes.",
  "Si je suis vraiment sérieux, j'arrête les boissons gazeuses.",
  "Si je suis vraiment sérieux, je tiens mes 20 minutes de méditation ce matin.",
  "Si je suis vraiment sérieux, je tiens mes 20 minutes de méditation ce soir.",
  "Si je suis vraiment sérieux, je tiens mes 20 minutes de lecture biblique — et je finis l'Ancien Testament.",
  "Si je suis vraiment sérieux, je tiens mes 6 heures de deep work. Puis les 6 autres.",
  "Si je suis vraiment sérieux, je me lève à 4h30. Pas à 4h35.",
  "Si je suis vraiment sérieux, je dors à 21h45, parce que la journée de demain se joue ce soir.",
  "Si je suis vraiment sérieux, je monte la montagne dimanche et jeudi. Deux heures. Pas une.",
  "Si je suis vraiment sérieux, je dis le Psaume 24 — c'est l'une des quatre seules choses qu'Il m'a demandées.",
  "Si je suis vraiment sérieux, je range ma chambre. C'est la deuxième des quatre.",
  "Si je suis vraiment sérieux, je Lui parle aujourd'hui. C'est la troisième.",
  "Si je suis vraiment sérieux, j'ouvre l'acide exfoliant que j'ai acheté il y a des mois et jamais utilisé.",
  "Si je suis vraiment sérieux, je me lave le visage, je soigne mes dents, je mets du parfum. Aujourd'hui, pas un jour.",
  "Si je suis vraiment sérieux, je vais dans mes fichiers regarder ce que je vais accomplir.",
  "Si je suis vraiment sérieux, j'ouvre mon livre au lieu de me contenter de l'avoir écrit.",
  "Si je suis vraiment sérieux, je stoppe la rêverie à voix haute dès qu'elle commence — pas dans dix minutes.",
  "Si je suis vraiment sérieux, je n'ouvre pas X avec des crédits Claude payés 200 $ qui m'attendent.",
  "Si je suis vraiment sérieux, ça se voit dans les cinq prochaines minutes. Pas dans mes intentions.",
  "Si je suis vraiment sérieux, les 90 kg à 10 % se gagnent dans l'assiette de ce midi, pas en décembre.",
  "Si je suis vraiment sérieux, je commence les waves aujourd'hui — pas quand j'aurai le temps.",
  "Si je suis vraiment sérieux, je fais aujourd'hui le premier geste qui me sort de chez mes parents.",
  "Si je suis vraiment sérieux, je fais aujourd'hui un pas vers le premier terrain. Un seul, mais daté.",
  "Si je suis vraiment sérieux, 20 000 $ par jour commence par une heure de travail que personne ne m'a demandée.",
  "Si je suis vraiment sérieux, je compte les jours qui restent avant 2027 — et j'arrête de faire comme s'il y en avait d'autres.",
];

/**
 * Le premier homme : celui que Dieu veut qu'il soit. Ce n'est pas un modèle
 * qu'il s'est choisi — c'est une commande reçue, et c'est ce qui retire la
 * possibilité de négocier.
 */
export const HOMME_DIEU: string[] = [
  "L'homme que Dieu veut que je sois tient ses 20 minutes de méditation. Même quand il n'en a pas envie. Surtout quand il n'en a pas envie.",
  "L'homme que Dieu veut que je sois se lève à 4h30 sans négocier avec lui-même.",
  "L'homme que Dieu veut que je sois fait ses 12 heures de deep work et ne les raconte à personne.",
  "L'homme que Dieu veut que je sois monte la montagne dimanche et jeudi, qu'il pleuve ou qu'il soit fatigué.",
  "L'homme que Dieu veut que je sois tient les quatre choses qu'Il lui a demandées. Quatre. Il n'en rate aucune.",
  "L'homme que Dieu veut que je sois a les dents propres, le visage soigné, et sent bon. Tous les jours.",
  "L'homme que Dieu veut que je sois ne dit pas « demain ». Ce mot n'existe pas dans sa bouche.",
  "L'homme que Dieu veut que je sois ne remet rien. Ce qu'il a décidé, il le fait dans l'heure.",
  "L'homme que Dieu veut que je sois ne se masturbe pas avec la main dont il dit qu'elle bâtira des hôpitaux.",
  "L'homme que Dieu veut que je sois ne rêvasse pas sa gloire : il la fabrique pendant que les autres la rêvent.",
  "L'homme que Dieu veut que je sois ne cherche pas ses limites : il remplit d'abord la vie qu'il a déjà.",
  "L'homme que Dieu veut que je sois dort à 21h45 parce qu'il sait ce que coûte une heure de plus.",
  "L'homme que Dieu veut que je sois n'a pas besoin qu'on le regarde pour tenir.",
  "L'homme que Dieu veut que je sois ne laisse pas trois minutes de désir décider de ses dix prochaines années.",
  "L'homme que Dieu veut que je sois relit ce qu'il a écrit, et ce qu'il lit lui ressemble.",
  "L'homme que Dieu veut que je sois ne construit pas des outils pour éviter de s'en servir.",
  "L'homme que Dieu veut que je sois est déjà décrit en entier dans cette app. Il ne manque que celui qui l'incarne.",
  "L'homme que Dieu veut que je sois fait ce que je suis en train de repousser. Là. Maintenant.",
  "L'homme que Dieu veut que je sois, ce n'est pas encore moi. Et c'est exactement ça, le problème à régler aujourd'hui.",
  "L'homme que Dieu veut que je sois vit seul, et son toit ne doit rien à personne.",
  "L'homme que Dieu veut que je sois n'annonce pas ses chantiers : on les découvre commencés.",
  "L'homme que Dieu veut que je sois a un corps qui prouve dix ans de discipline avant qu'il ouvre la bouche.",
  "L'homme que Dieu veut que je sois ne laisse pas la douleur décider de ses actions. C'est même la seule définition qu'il en donne.",
];

/**
 * Le second : celui qu'il refuse d'être — et le refus est daté sept fois,
 * parce que sa fuite habituelle n'est pas « oui » mais « plus tard ».
 */
export const HOMME_REFUS: string[] = [
  "L'homme que je ne veux pas être scrolle TikTok à 23h. Ni demain, ni dans un mois, ni dans dix ans.",
  "L'homme que je ne veux pas être ouvre du porno et appelle ça une pause.",
  "L'homme que je ne veux pas être se masturbe, puis écrit une page sur la grandeur.",
  "L'homme que je ne veux pas être rêve son interview au lieu de faire le travail qui la provoquerait.",
  "L'homme que je ne veux pas être écoute de la musique en se racontant des scènes où il a déjà gagné.",
  "L'homme que je ne veux pas être se lève fatigué à 23 ans, et se lèvera fatigué à 33.",
  "L'homme que je ne veux pas être dit « demain » — et il le dira encore dans six mois avec la même voix.",
  "L'homme que je ne veux pas être achète les outils, et ne les ouvre jamais.",
  "L'homme que je ne veux pas être écrit 587 pages qu'il n'applique pas.",
  "L'homme que je ne veux pas être promet trois fois par jour et ne tient pas une seule journée entière.",
  "L'homme que je ne veux pas être parle de 50 hôpitaux et ne range pas sa chambre.",
  "L'homme que je ne veux pas être laisse ses crédits payés dormir et va sur X.",
  "L'homme que je ne veux pas être a cinq ans de gym et aucun corps à montrer.",
  "L'homme que je ne veux pas être méprise les faux vertueux, et n'a lui-même aucun acte à produire.",
  "L'homme que je ne veux pas être aura 33 ans avec exactement la même liste d'objectifs non réalisés.",
  "L'homme que je ne veux pas être donnera sa force de jeunesse à ça — et elle ne reviendra jamais.",
  "L'homme que je ne veux pas être, je ne veux pas l'être demain. Ni dans un mois. Ni dans trois. Ni dans six. Ni dans un an. Ni dans cinq. Ni dans dix.",
  "L'homme que je ne veux pas être, c'est celui que je suis en train d'être à cette seconde si je ne bouge pas.",
  "L'homme que je ne veux pas être arrivera au 1er janvier 2027 avec la même liste, et il dira que l'année a été dure.",
  "L'homme que je ne veux pas être habite encore chez ses parents à trente ans, en parlant de cinquante hôpitaux.",
  "L'homme que je ne veux pas être achète l'acide, la salle, les outils — et n'ouvre jamais rien.",
];
