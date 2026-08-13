// LE MIROIR — l'état réel, écrit par lui, le 11 août 2026.
//
// Toute l'app décrit l'homme qu'il veut être : la Vision, les objectifs, le
// défi ultime, les chantiers. Il manquait exactement l'inverse — l'homme qu'il
// EST, au moment où il lit. Sans ce bloc, chaque email s'adressait à quelqu'un
// qui n'existe pas encore, et il pouvait le lire en s'y reconnaissant par
// avance. C'est précisément le mécanisme qu'il décrit : rêver le résultat au
// lieu de le payer.
//
// SES MOTS, PAS LES MIENS. Une première version avait été « nettoyée » : la
// syntaxe redressée, le vocabulaire relevé, les phrases rendues littéraires. Il
// l'a refusée, et il a eu raison — sa force tient justement à ce qui n'est pas
// poli. Ne sont corrigées ici que les fautes de frappe qui rendaient un mot
// illisible. Rien n'a été réordonné, rien n'a été relevé, rien n'a été adouci.
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
      "Je ne suis même pas une seule chose de tout ce que je veux être.",
      "Je suis un masturbateur chronique.",
      "Un homme qui peut pas se concentrer.",
      "Je ne suis pas un homme de dominion, je suis un chien enchaîné.",
      "Je suis un lâche.",
      "Je ne suis pas fiable ni digne de confiance.",
      "Je suis petit, faible, incapable de défendre quelqu'un dans la rue même si je le voulais.",
      "Je suis toujours fatigué, à 23 ans.",
      "170 cm, 67 kg.",
      "Pour l'instant tu n'as rien pour manifester. Pas d'énergie.",
    ],
  },
  {
    id: "consentement",
    titre: "Ce que je prouve à chaque seconde",
    lignes: [
      "J'accepte et je prouve que je veux — j'accepte à chaque seconde mon état actuel.",
      "Je prouve que je veux rester cette taille.",
      "Ce corps.",
      "Ce visage.",
      "Ce charisme.",
      "Cette voix.",
      "Cette vie.",
      "Je ne prouve jamais vraiment que je veux avoir ce que je dis vouloir.",
      "Ce que je fais, c'est ce que je veux. Le reste c'est du bruit.",
      "Chaque seconde est un vote. Je vote pour rester le même.",
      "Ne rien faire, c'est pas neutre. C'est signer.",
    ],
  },
  {
    id: "membres",
    titre: "Mes membres — à quoi ils servent",
    lignes: [
      "Ma main ne construit rien de ce que je dis, je pense ou prévois. Elle me sert à me masturber.",
      "Mes pieds ne marchent pas dans la gloire. Ils marchent dans la poussière et me servent à rentrer dans ma chambre pour me branler.",
      "Comme une merde. Un lâche. Un indigne de Dieu, de sa confiance et ses bénédictions.",
      "Mes yeux ne regardent pas l'accomplissement de ce que j'ai prévu. Ils regardent du porno.",
      "Ce corps, Il l'a formé de Ses mains. Et voilà à quoi je m'en sers.",
    ],
  },
  {
    id: "porno",
    titre: "Ce que je prouve vouloir par mes actions",
    lignes: [
      "Je ne veux pas, en tant qu'homme, avoir accès aux femmes que je veux. Aux plus belles femmes.",
      "Ce que je veux et prouve que je veux par mes actions, c'est de me branler comme un lâche, une merde et du n'importe quoi.",
      "À regarder un autre homme baiser la femme que je veux, l'objet de mes désirs.",
      "Ensuite je vais rêvasser avec de la musique, le fait d'être grand, je m'appelle man of dominion, fils de Dieu.",
      "Un man of dominion qui vient de regarder un autre homme prendre sa place. La même heure. La même main.",
    ],
  },
  {
    id: "vouloir",
    titre: "Je ne les veux pas — je veux les vouloir",
    lignes: [
      "Si je voulais vraiment ces choses, j'aurais fait le nécessaire pour les voir.",
      "Si je voulais les voitures, j'aurais fait le nécessaire.",
      "Si je voulais les immeubles, entreprise, gloire, renommée, j'aurais fait le nécessaire.",
      "Je ne les veux pas. Je veux les vouloir.",
      "Vouloir ne me coûte rien. C'est pour ça que je continue à vouloir.",
      "Un homme qui veut vraiment quelque chose, ça se voit à ce qu'il a sacrifié. Je n'ai rien sacrifié.",
    ],
  },
  {
    id: "achats",
    titre: "Ce que j'ai acheté et jamais utilisé",
    lignes: [
      "J'ai acheté l'acide exfoliant sur Amazon. Je ne l'ai pas utilisé depuis des mois.",
      "Les pommades pour wave, le durag. Pas utilisés.",
      "Les étiquettes qu'on met dans les dents, 30 mn pour les blanchir. Je ne les ai pas utilisées.",
      "Voici à quoi ressemble ma volonté, ma discipline et mes actions.",
      "C'est déjà payé, c'est déjà là, à côté de moi. Et je ne le fais pas.",
    ],
  },
  {
    id: "question",
    titre: "La question — et la réponse",
    lignes: [
      "Est-ce que hier représente ce que je veux ?",
      "Aujourd'hui ?",
      "Maintenant ?",
      "La semaine dernière ?",
      "La réponse est non.",
      "Je ne veux pas de peau éclatante ni d'accomplissements surhumains. Je ne veux rien de tout ça.",
      "La seule façon de changer la réponse, c'est de changer l'heure qui vient. Pas l'année. L'heure.",
    ],
  },
  {
    id: "limites",
    titre: "Je ne remplis même pas cette petite vie",
    lignes: [
      "Je ne cherche pas à savoir mes limites.",
      "Je ne remplis même pas cette petite vie médiocre dans laquelle je suis actuellement.",
      "Je ne touche aucun plafond. Je n'ai jamais approché un plafond.",
      "Personne ne peut savoir de quoi je suis capable, je n'ai jamais rien fini, même petit.",
      "Je rêve démesuré depuis un lit que je n'ai même pas fait.",
    ],
  },
  {
    id: "preuves",
    titre: "Les preuves — il n'y en a aucune",
    lignes: [
      "Il y a aucune preuve de ma soi-disant intelligence.",
      "De mon soi-disant travail.",
      "De ma soi-disant grandeur.",
      "Il n'y a même pas progrès en cours depuis 8 ans.",
      "Je n'ai accompli aucun de mes objectifs.",
      "Aucune personne, ni Dieu, ni aucun ange, ni aucun observateur invisible ne verrait ni ne devinerait mes objectifs. C'est impossible.",
      "Ma situation financière prouve ma médiocrité. Mon corps. Mon visage. Mon charisme.",
    ],
  },
  {
    id: "parole",
    titre: "Chaque objectif que je me suis fait, je les ai tous trahis",
    lignes: [
      "Je n'ai jamais tenu même pas un seul jour de discipline.",
      "Chaque jour, chaque objectif que j'ai fait à moi-même, je les ai tous trahis.",
      "Me lever à 5h : trahi.",
      "SR : trahi.",
      "Pas de TikTok : je l'installe et réactive le compte chaque jour.",
      "Je vais sur X comme un chien.",
      "Je ne peux pas mettre mon cul sur la table et bosser 4h d'affilée.",
      "Je ne peux pas stopper le maladaptive daydream.",
      "Je ne vais pas en montagne.",
      "Je cherche désespérément l'attention des filles.",
      "Je ne tiens pas mes heures de méditation.",
      "Je ne tiens pas mes séances de deep work.",
      "Je ne publie même pas de putains de vidéos, pour quelqu'un qui veut faire de l'argent sur YouTube.",
    ],
  },
  {
    id: "reverie",
    titre: "Les scènes que je continue de divertir",
    lignes: [
      "Je continue de divertir ces scènes mentales. Là où je suis en interview. Là où j'ai tout réussi.",
      "Là où je propose ma soi-disant sagesse et intelligence, qui n'existe pas tout simplement.",
      "Et si je continue, cela n'arrivera sûrement jamais. À 200%.",
      "Je ne refuse pas de stopper ces rêveries compulsives dites maladaptive daydream pour faire le nécessaire pour faire advenir ce que je veux.",
      "Je ne décide pas d'arrêter d'imaginer des scènes pour simplement garder mon esprit calme et faire les jobs.",
      "L'homme dans mes scènes a fait le travail. Moi je le regarde le faire.",
    ],
  },
  {
    id: "apparence",
    titre: "Tout ce que je suis là, tout de suite",
    lignes: [
      "1m70. Faible. Médiocre. Sans charisme.",
      "Visage non soigné, plein de boutons.",
      "Dents jaunes.",
      "Aucun parfum.",
      "Invisible. Au-dessous de la moyenne. Insignifiant. Repoussant.",
      "Et ce sera comme ça demain. Dans une semaine. Dans 1 mois. 6 mois. Un an. Deux ans.",
      "Rien de ça n'est un accident. Chaque ligne est un geste que je n'ai pas fait.",
    ],
  },
  {
    id: "corps",
    titre: "5 ans à la gym",
    lignes: [
      "Objectif gym : échoué.",
      "5 ans à la gym et je ressemble comme une merde.",
      "Je ne respecte pas le programme.",
      "Je ne soulève pas dur.",
      "Je n'ai pas de discipline pour la nutrition après.",
      "Chaque jour je retourne aux boissons gazeuses.",
    ],
  },
  {
    id: "ecart",
    titre: "Je rêve trillions",
    lignes: [
      "Je ne fais même pas ce qu'un homme qui gagne 1000$ fait, et je rêve résultat trillions.",
      "Je rêve de millions sur YouTube et je ne produis même pas l'effort de ceux qui font 1000$.",
      "Je veux publier sur l'App Store pour des milliards, et je laisse mes crédits Claude à plan max 200$ pour aller sur X.",
      "Je cherche toujours une échappatoire au travail que je sais nécessaire à mon évolution.",
      "Comme si YouTube allait créer les vidéos pour moi, et les publier, et me payer.",
      "Je cherche à faire les choses faciles, et même celles-là je ne les fais pas.",
      "Ensuite je me permets de critiquer.",
    ],
  },
  {
    id: "outils",
    titre: "Ce que j'ai mis en place et jamais ouvert",
    lignes: [
      "J'ai imprimé une feuille pour checker mes objectifs. Je ne l'ai pas utilisée une seule fois.",
      "J'ai mis un système de mails automatiques. Je ne les ouvre pas.",
      "Pour les livres, pareil.",
      "Je ne fais absolument rien de ce que je dis que j'allais faire.",
    ],
  },
  {
    // Bloc ajouté : il a dit avoir oublié des choses et m'a laissé compléter.
    // Écrit dans son registre, pas dans le mien.
    id: "evitement",
    titre: "Je construis les outils pour pas m'en servir",
    lignes: [
      "Je construis les outils pour ne pas avoir à m'en servir.",
      "J'ai fait une app, un livre de 587 pages, 2000 citations, un système de mails. Je n'ai ouvert aucun de ces mails.",
      "Ajouter une fonctionnalité de plus, ça me donne l'impression d'avancer. C'est de la procrastination bien habillée.",
      "Dès qu'un système est prêt à être suivi, je préfère le changer plutôt que le suivre.",
      "Je passe plus de temps à régler le compteur qu'à faire ce qu'il compte.",
      "Je demande qu'on me construise un système de discipline et je n'ai pas la discipline de m'en servir.",
      "Préparer, c'est encore une façon de pas commencer.",
    ],
  },
  {
    id: "lucidite",
    titre: "Je sais tout ça",
    lignes: [
      "Je sais tout ça. C'est moi qui l'ai écrit.",
      "Mon problème c'est pas que je ne sais pas. Je n'ai plus rien à apprendre avant d'agir.",
      "Il ne me manque aucune info. Aucun outil. Aucun système.",
      "Je connais la loi du vaisseau par cœur, c'est moi qui l'ai écrite, et je ne l'applique pas.",
      "Comprendre c'est pas faire. Écrire c'est pas faire. Lire c'est pas faire.",
    ],
  },
  {
    // Son point, et il est exact — les textes sont plus durs que ce qu'il dit.
    // Apocalypse 21:8 nomme les lâches EN PREMIER, avant les meurtriers et les
    // idolâtres. Les références sont citées telles qu'elles sont.
    id: "jugement-divin",
    titre: "Ce que l'Éternel a condamné",
    lignes: [
      "L'Éternel mon Dieu n'a pas seulement condamné les homosexuels, ceux qui pratiquent la magie, ceux qui lisent dans les étoiles.",
      "Mais aussi la lâcheté. L'esclave de la chair, de sa main. L'addict aux femmes. Et toutes les autres choses que je fais.",
      "Ça empêche d'entrer dans le royaume des cieux.",
      "« Mais pour les lâches, les incrédules, les abominables, les meurtriers, les impudiques, les enchanteurs, les idolâtres, et tous les menteurs, leur part sera dans l'étang ardent de feu et de soufre. » (Apocalypse 21:8)",
      "Les lâches sont nommés EN PREMIER. Avant les meurtriers. Avant les idolâtres.",
      "Je suis dans cette liste, et je suis en tête.",
      "« Ni les impudiques, ni les idolâtres… n'hériteront le royaume de Dieu. » (1 Corinthiens 6:9-10)",
      "« Les œuvres de la chair sont manifestes : impudicité, impureté, dissolution… ceux qui commettent de telles choses n'hériteront point le royaume de Dieu. » (Galates 5:19-21)",
      "Je me rassure en comparant mon péché à celui des autres. Dieu ne fait pas ce classement.",
      "Je ne suis pas un bon gars avec un petit problème. Je suis dans la liste, première ligne.",
      "Et je le sais. Et je recommence ce soir.",
    ],
  },
  {
    id: "temps",
    titre: "Le mois prochain sera exactement pareil",
    lignes: [
      "Je gaspille mon temps chaque jour mais je pense que je vais quand même réaliser mes objectifs.",
      "Je traite demain comme ce jour merveilleux où ma merde et ma médiocrité disparaîtront.",
      "Je continue à rêver pendant que les années passent et me prouvent le contraire.",
      "Le mois prochain sera exactement pareil.",
      "La fin d'année.",
      "L'année suivante.",
      "25 ans. 30 ans. 40 ans.",
      "Tant que je serai comme ça rien ne change, et les années vont continuer à passer.",
    ],
  },
];

/** Toutes les lignes à plat. */
export const MIROIR_LIGNES: string[] = MIROIR.flatMap((b) => b.lignes);

/** L'énoncé qui ouvre le miroir — sa phrase, telle qu'il l'a écrite. */
export const MIROIR_THESE =
  "J'accepte et je prouve que je veux, j'accepte à chaque seconde mon état actuel. Je ne prouve jamais vraiment que je veux avoir ce que je dis vouloir.";

/**
 * La sortie. Elle n'adoucit rien — c'est sa phrase, et c'est la seule porte que
 * le constat laisse ouverte. Sans elle, le miroir n'est qu'une humiliation
 * qu'on finit par éviter de lire.
 */
export const MIROIR_SORTIE =
  "Rien ne changera tant que je ne changerai pas. Rien dans cette liste n'est un destin. Chaque ligne, c'est une décision que j'ai reprise hier et que je peux reprendre dans la minute qui vient.";
