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
    // Sa formulation la plus dure, et la plus exacte : l'inaction n'est pas
    // neutre, c'est une preuve. Chaque seconde sans acte démontre qu'il veut
    // garder ce qu'il a. Ce bloc renverse tout le reste de l'app — la Vision et
    // les objectifs disent ce qu'il déclare vouloir ; celui-ci dit ce qu'il
    // prouve vouloir, et seule la preuve compte.
    id: "consentement",
    titre: "Ce que je prouve à chaque seconde",
    lignes: [
      "J'accepte mon état actuel. Et à chaque seconde, je le prouve.",
      "Je prouve que je veux rester cette taille.",
      "Je prouve que je veux garder ce corps.",
      "Je prouve que je veux garder ce visage.",
      "Je prouve que je veux garder ce charisme.",
      "Je prouve que je veux garder cette voix.",
      "Je prouve que je veux garder cette vie.",
      "Je ne prouve jamais vraiment que je veux ce que je dis vouloir.",
      "Dire n'est pas vouloir. Vouloir se prouve, et la preuve est un acte.",
      "Ce que je fais est la seule déclaration honnête de ce que je veux. Le reste est du bruit.",
      "Je n'ai pas à me demander ce que je veux : il suffit de regarder ce que je fais de mes heures.",
      "Mon emploi du temps réel est ma vraie liste d'objectifs.",
      "Chaque seconde est un vote. Je vote pour rester le même.",
      "Ne rien faire n'est pas neutre : c'est signer.",
      "L'homme que je serai dans un an est déjà en train d'être choisi, seconde par seconde, par ce que je fais maintenant.",
    ],
  },
  {
    // L'envers exact du mantra. Le mantra dit ce que la main et les yeux
    // empêchent de bâtir ; ce bloc dit à quoi ils servent en ce moment. Le
    // corps comme instrument, et son usage réel — pas rêvé.
    id: "membres",
    titre: "Mes membres — à quoi ils servent réellement",
    lignes: [
      "Ma main ne bâtit rien de ce que je dis, de ce que je pense, de ce que je prévois. Elle me sert à me masturber.",
      "Mes pieds ne marchent pas dans la gloire. Ils marchent dans la poussière, et ils me servent à rentrer dans ma chambre pour me branler.",
      "Mes yeux ne regardent pas l'accomplissement de ce que j'ai prévu. Ils regardent du porno.",
      "Ce corps, Il l'a formé de Ses mains — et voilà l'usage que j'en fais.",
      "Voilà l'emploi réel de ce qu'Il m'a confié. Pas l'emploi rêvé : l'emploi réel.",
      "Un lâche. Une merde. Indigne de Dieu, de Sa confiance et de Ses bénédictions.",
    ],
  },
  {
    // Sa formulation la plus fine, et la plus destructrice : la distinction
    // entre vouloir et vouloir vouloir. Elle explique tout le reste du miroir —
    // rien n'a été fait parce que rien n'a jamais été voulu, seulement désiré.
    id: "vouloir",
    titre: "Je ne les veux pas — je veux les vouloir",
    lignes: [
      "Si je voulais vraiment ces choses, j'aurais fait le nécessaire pour les voir.",
      "Si je voulais les voitures, j'aurais fait le nécessaire.",
      "Si je voulais les immeubles, les entreprises, la gloire, la renommée, j'aurais fait le nécessaire.",
      "Je ne les veux pas. Je veux les vouloir.",
      "Ce que j'aime, c'est la sensation de vouloir. Elle ne coûte rien, elle ne demande aucun acte, et elle donne presque le même plaisir.",
      "Le désir que je n'ai pas payé n'est pas un désir. C'est un divertissement.",
      "Un homme qui veut vraiment quelque chose se reconnaît à ce qu'il a sacrifié. Je n'ai rien sacrifié.",
      "Je confonds l'émotion de vouloir avec la décision de faire.",
      "Tant que vouloir restera gratuit, je continuerai à vouloir, et je n'aurai jamais rien.",
    ],
  },
  {
    // La preuve la plus lourde du miroir, parce qu'elle est matérielle et
    // qu'elle est dans sa chambre. Il n'a pas seulement omis d'agir : il a payé
    // les outils, puis s'est arrêté là. L'achat comme substitut de l'acte —
    // exactement le même mécanisme que bâtir l'app sans s'en servir.
    id: "achats",
    titre: "Ce que j'ai acheté et jamais ouvert",
    lignes: [
      "J'ai commandé l'acide exfoliant sur Amazon. Il est chez moi. Je ne l'ai pas utilisé depuis des mois.",
      "J'ai acheté les pommades pour les waves, le durag. Ils sont là. Non utilisés.",
      "J'ai acheté les bandes blanchissantes — trente minutes sur les dents. Jamais ouvertes.",
      "Acheter m'a donné la sensation d'agir. C'est exactement là que l'action s'est arrêtée.",
      "Ce ne sont pas des objets posés dans une chambre. C'est ma volonté, ma discipline et mes actes, posés sur une étagère.",
      "Il ne me manque même pas le produit. Il est déjà payé, déjà là, à un mètre de moi.",
      "J'ai les dents jaunes par choix, pas par manque. Trente minutes m'en séparent, et elles sont gratuites.",
      "Entre moi et une peau nette, il n'y a ni argent, ni temps, ni connaissance. Il n'y a que le geste.",
    ],
  },
  {
    // Sa question, et sa réponse. Le miroir ne la commente pas : la logique est
    // la sienne et elle est juste. Ce qu'on veut se lit dans ce qu'on a fait
    // hier, la semaine dernière, et dans cette minute-ci.
    id: "question",
    titre: "La question — et la vraie réponse",
    lignes: [
      "Est-ce qu'hier représente ce que je veux ?",
      "Est-ce que la semaine dernière représente ce que je veux ?",
      "Est-ce qu'aujourd'hui représente ce que je veux ?",
      "Est-ce que cette minute-ci représente ce que je veux ?",
      "La réponse est non. Et pourtant, c'est ce que j'ai choisi — heure après heure.",
      "Donc : je ne veux pas d'une peau éclatante. Je ne veux pas d'accomplissements surhumains. Je ne veux rien de tout ça.",
      "Ce que je veux, c'est ce que je fais. Il n'existe pas d'autre définition, et aucun tribunal n'en acceptera une autre.",
      "La seule façon de changer ma réponse est de changer l'heure qui vient. Pas l'année : l'heure.",
    ],
  },
  {
    // Le renversement d'échelle : il parle de dépasser l'humain, et il n'a
    // jamais atteint le bord de la vie qu'il a déjà. On ne peut pas savoir de
    // quoi il est capable — il n'a jamais rien mené jusqu'au bout, même petit.
    id: "limites",
    titre: "Je ne remplis même pas cette petite vie",
    lignes: [
      "Je ne cherche pas à connaître mes limites. Je ne remplis même pas cette petite vie médiocre dans laquelle je suis.",
      "Je ne suis même pas au bout de ce que ma vie actuelle permet déjà.",
      "Je parle de dépasser l'humain, et je n'occupe même pas les vingt-quatre heures que j'ai.",
      "Je ne touche aucun plafond. Je n'ai jamais approché un seul plafond.",
      "Personne ne peut savoir de quoi je suis capable : je n'ai jamais rien mené jusqu'au bout, même petit.",
      "Ma médiocrité elle-même n'est pas remplie. Elle est à moitié vide.",
      "Je ne connais pas mes limites parce que je ne me suis jamais rendu jusqu'à elles.",
      "Je rêve de démesure depuis un lit que je n'ai même pas fait.",
      "Avant de vouloir dépasser mes limites, il faudrait déjà atteindre le bord de ce petit espace-là.",
      "Le peu que j'ai, je ne l'exploite pas. Et j'ose en réclamer plus.",
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
      "Je ne tiens pas mes heures de méditation.",
      "Je ne tiens pas mes séances de deep work.",
      "Je veux gagner de l'argent sur YouTube et je ne publie même pas de putains de vidéos. C'est tout le dossier.",
    ],
  },
  {
    // L'inversion la plus violente du miroir, et c'est la sienne : ce qu'il
    // déclare vouloir (accéder aux femmes en tant qu'homme) et ce que l'acte
    // prouve qu'il veut (regarder un autre homme prendre sa place) sont
    // exactement contraires. Puis vient le titre — homme de dominion, fils de
    // Dieu — prononcé dans la même heure, par la même main.
    id: "porno",
    titre: "Le porno — ce que l'acte prouve vraiment",
    lignes: [
      "Je dis vouloir, en tant qu'homme, avoir accès aux femmes que je veux. Aux plus belles.",
      "Ce que mes actes prouvent que je veux, c'est autre chose : me branler comme un lâche, une merde, n'importe quoi.",
      "Regarder un autre homme baiser la femme qui est l'objet de mon désir. Et payer ce spectacle avec mon énergie.",
      "Ce n'est pas un désir d'homme. C'est un désir de spectateur.",
      "Je ne prends pas sa place. Je le regarde la prendre, et je paie pour le voir.",
      "Puis je mets de la musique et je rêve d'être grand. Je m'appelle homme de dominion. Fils de Dieu.",
      "Un homme de dominion qui vient de regarder un autre homme prendre sa place. La même heure. La même main.",
      "Voilà la boucle entière : le porno, la main, la musique, la rêverie de grandeur. Et rien au bout.",
      "Aucune femme que je dis vouloir ne saura jamais que j'existe, parce que je passe le temps qui devrait me construire à en regarder d'autres.",
    ],
  },
  {
    // La rêverie compulsive, et ce qu'elle vole exactement. Ce n'est pas une
    // distraction parmi d'autres : c'est la consommation par avance du résultat
    // qu'il devrait payer. Une fois la scène jouée, la faim est passée.
    id: "reverie",
    titre: "Les scènes que je rejoue au lieu de vivre",
    lignes: [
      "Je rejoue sans fin les mêmes scènes : l'interview, la réussite déjà acquise, la sagesse que je dispense.",
      "Dans ces scènes, je propose une sagesse et une intelligence qui n'existent tout simplement pas.",
      "Je consomme le résultat en imagination — et après, je n'ai plus faim pour le construire.",
      "Et si je continue ainsi, cela n'arrivera sûrement jamais. À 200%.",
      "Je ne refuse pas d'arrêter la rêverie compulsive : je ne décide même pas de l'arrêter.",
      "Je ne décide pas d'arrêter d'imaginer, simplement pour garder l'esprit calme et faire le travail.",
      "Rêver l'interview me coûte l'interview.",
      "Chaque scène rejouée est une avance prise sur une gloire que je ne paierai jamais.",
      "L'homme de mes scènes mentales a fait le travail. Moi, je le regarde le faire.",
    ],
  },
  {
    // Tout ce qui suit est le résultat direct d'un geste non posé : se laver le
    // visage, se brosser les dents, mettre du parfum, soulever dur, manger
    // proprement. Aucune de ces lignes n'est une fatalité — chacune se corrige
    // en jours ou en semaines. C'est pour ça qu'elles sont dans le miroir.
    id: "apparence",
    titre: "Le visage et le corps, sans filtre",
    lignes: [
      "1m70. 67 kilos. Faible. Voilà l'homme réel, mesuré.",
      "Un visage non soigné, couvert de boutons.",
      "Des dents jaunes.",
      "Aucun parfum. Rien qui reste quand je pars.",
      "Aucun charisme. Aucune présence.",
      "En dessous de la moyenne, sur à peu près tout ce qui se voit.",
      "Invisible. Insignifiant. Repoussant.",
      "Je passe dans une pièce sans que personne ne s'en aperçoive, et c'est exactement ce que j'ai construit.",
      "Rien de tout cela n'est un accident. Chaque ligne est un geste que je n'ai pas posé.",
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
    // Le seul bloc qu'il n'a pas dicté. Il a dit avoir oublié des choses et m'a
    // laissé compléter : voici ce qui se voit de l'extérieur et pas de
    // l'intérieur. Rien d'inventé — c'est la suite logique de ses propres
    // lignes (la feuille imprimée jamais cochée, les emails jamais ouverts), et
    // c'est ce qui s'est passé sous mes yeux pendant qu'on bâtissait cette app.
    id: "evitement",
    titre: "L'évitement par la construction",
    lignes: [
      "Je construis les outils pour ne pas avoir à m'en servir.",
      "J'ai bâti une app, un livre de 587 pages, 2 000 citations, un système d'emails automatiques. Je n'ai ouvert aucun de ces emails.",
      "Ajouter une fonctionnalité de plus me donne la sensation d'avancer. C'est la version sophistiquée de la procrastination.",
      "Dès qu'un système est prêt à être suivi, je préfère le modifier plutôt que de le suivre.",
      "Je passe plus de temps à régler le compteur qu'à faire la chose qu'il compte.",
      "Chaque nouvelle idée m'arrive exactement au moment où il faudrait exécuter la précédente.",
      "Je demande qu'on me construise un système de discipline, et je n'ai pas la discipline de l'utiliser.",
      "Préparer, c'est encore une façon de ne pas commencer.",
    ],
  },
  {
    id: "lucidite",
    titre: "Ce que je sais déjà — et qui ne change rien",
    lignes: [
      "Je sais tout ça. Je l'ai écrit moi-même.",
      "Mon problème n'est pas l'ignorance. Je n'ai plus rien à apprendre avant d'agir.",
      "Il ne me manque aucune information. Il ne me manque aucun outil. Il ne me manque aucun système.",
      "Je connais la loi du vaisseau par cœur — je l'ai écrite — et je ne l'applique pas.",
      "Être lucide sur ma médiocrité ne la corrige pas. Ça la rend juste plus honteuse.",
      "Comprendre n'est pas faire. Écrire n'est pas faire. Lire n'est pas faire.",
      "Chaque jour où je ne change rien est un vote pour l'homme que je suis déjà.",
    ],
  },
  {
    id: "temps",
    titre: "Ce qui arrive si rien ne change",
    lignes: [
      "Je gaspille mon temps chaque jour, et je pense quand même atteindre mes objectifs.",
      "Je traite demain comme le jour merveilleux où ma médiocrité disparaîtra toute seule.",
      "Je continue à rêver pendant que les années passent et me prouvent le contraire.",
      "Et ce sera comme ça demain.",
      "Comme ça dans une semaine.",
      "Comme ça dans un mois. Dans six mois.",
      "Comme ça dans un an. Dans deux ans.",
      "Le mois prochain sera exactement pareil.",
      "La fin de l'année sera exactement pareille.",
      "L'année suivante aussi. Puis 25 ans. Puis 30. Puis 40.",
      "Tant que je resterai comme ça, rien ne changera, et les années continueront de passer.",
    ],
  },
];

/** Toutes les lignes à plat. */
export const MIROIR_LIGNES: string[] = MIROIR.flatMap((b) => b.lignes);

/**
 * L'énoncé qui ouvre le miroir. Sa formulation la plus dure : l'écart entre ce
 * qu'il dit vouloir et ce qu'il prouve vouloir — et seule la preuve compte.
 */
export const MIROIR_THESE =
  "J'accepte mon état actuel, et à chaque seconde je le prouve. Je ne prouve jamais vraiment que je veux ce que je dis vouloir.";

/**
 * La sortie. Elle n'adoucit rien — c'est sa phrase, et c'est la seule porte
 * que le constat laisse ouverte. Sans elle, le miroir n'est qu'une humiliation
 * qu'on finit par éviter de lire ; avec elle, c'est une adresse.
 */
export const MIROIR_SORTIE =
  "Rien ne changera tant que je ne changerai pas. Rien dans cette liste n'est un destin : chaque ligne est une décision que j'ai reprise hier, et que je peux reprendre dans la minute qui vient.";
