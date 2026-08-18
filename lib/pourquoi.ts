// LE POURQUOI — le carburant, accessible à tout moment.
//
// La Vision est fermée pendant les trente jours : elle décrit ce qu'il veut
// obtenir, et il a décidé de ne plus la regarder avant de l'avoir mérité. Le
// POURQUOI est autre chose — c'est ce qui le fait tenir à l'instant précis où
// il n'a plus envie. Le fermer serait retirer le carburant en pleine côte.
//
// Deux parties : ce qu'il a dicté lui-même au fil des semaines, et vingt
// autres que j'ai tirés de tout ce que contient l'app — son livre, sa Vision,
// son carnet, l'alliance de la montagne, le miroir.
//
// Client-safe.

export interface PourquoiBloc {
  id: string;
  titre: string;
  lignes: string[];
}

/** Ce qu'il a dicté lui-même. Ses mots, ses formulations. */
export const POURQUOI_SIEN: PourquoiBloc[] = [
  {
    id: "trois-mots",
    titre: "Les trois mots gravés sur moi",
    lignes: [
      "INÉBRANLABLE · DÉMESURÉ · FIDÈLE — jusqu'à mon dernier souffle.",
      "Puissance qui ne plie pas. Création sans limite. Loyauté à Celui qui m'a élevé.",
    ],
  },
  {
    id: "origine",
    titre: "D'où je viens",
    lignes: [
      "Né le 16 mai 2003, à midi — le soleil à son zénith — dans le Nord-Ouest d'Haïti, le coin que le pays lui-même a oublié.",
      "C'est de là que je viens. C'est ça que je vais relever.",
      "Je ne supporte pas de voir les miens souffrir et vivre indignement. Je l'ai en moi depuis l'enfance, parce que les miens, c'est moi.",
    ],
  },
  {
    id: "hypocrisie",
    titre: "Ce que je hais",
    lignes: [
      "Je hais l'hypocrisie plus que tout. Je ne peux pas me cacher devant la face de Dieu — alors je ne me cacherai devant personne.",
      "Je méprise le faux vertueux qui critique les puissants d'une supériorité morale qui ne coûte rien. Des mots, jamais un acte.",
      "Moi je ne parle pas : je pose l'acte, je résous, je bâtis de mes mains ce que les autres se contentent de pleurer.",
    ],
  },
  {
    id: "liberte",
    titre: "Pourquoi l'argent",
    lignes: [
      "Je ne cherche pas l'argent pour posséder, ni pour le confort.",
      "Je cherche la fuck-you money et le fuck-you success : le niveau où je ne réponds plus à aucun homme, où personne ne peut me dire quoi faire, où je peux dire non à n'importe qui et m'en aller.",
      "Je ne prends pas plaisir à avoir. Je prends plaisir à ACCOMPLIR.",
      "Je veux assez de pouvoir pour faire toutes les dingueries que je déciderai de faire — des plus sérieuses aux plus enfantines — sans en subir la moindre conséquence.",
      "Le seul devant qui je m'incline, c'est Dieu.",
    ],
  },
  {
    id: "mains",
    titre: "Pour quoi je veux mes mains libres",
    lignes: [
      "Pour construire des hôpitaux que nul n'a jamais vus.",
      "Pour que mon peuple cesse de mourir de ce qui se soigne ailleurs.",
      "Pour que le nom de ce pays cesse d'être une note en bas de page.",
    ],
  },
  {
    id: "nova-axe",
    titre: "Et après Haïti — NOVA-AXE",
    lignes: [
      "« We do not chase wealth. We position ourselves where it must pass. » On ne court pas après la richesse : on se place là où elle doit obligatoirement passer.",
      "Après Haïti, l'Afrique : NOVA-AXE — un corridor souverain de quatre millions de kilomètres carrés, la taille de l'Inde, qui coupe le continent en deux, du Sahel au bassin du Congo jusqu'à l'Afrique australe.",
      "Cent cinquante trillions. Trois capitales — Axiom, Verdia, Forge. Une monnaie, l'AXE, qui remplace le dollar. Le passage obligé de tout ce qui traverse le continent.",
      "Haïti est la démonstration ; NOVA-AXE est le théorème. Si je le prouve sur vingt-sept mille kilomètres carrés, on m'en confiera quatre millions.",
      "Et la démonstration commence plus bas encore : sur les quelques mètres carrés de cette chambre, ce matin.",
      "Une AGI souveraine, la fusion, des mégafabs 1 nm, l'anneau orbital, l'ascenseur spatial : je ne rattrape pas les technologies, j'en saute une génération. On ne dépasse pas un empire en le suivant sur sa route.",
      "Plus un gramme de minerai brut ne sortira du corridor. La valeur se prend en aval — c'est l'erreur qui a saigné l'Afrique pendant cent ans, et je ne la referai pas.",
      "Je ne bâtirai rien seul : cent mille ingénieurs, un million d'ouvriers, quelques centaines d'hommes de confiance. La compétence qui me manque le plus n'est pas technique — c'est de savoir tenir des hommes meilleurs que moi.",
      "Deux siècles, ce n'est pas une vie de travail : c'est une institution qui travaille. Je ne construis pas un empire, je construis la machine qui le construira.",
      "Et le premier verrou de toute la chaîne, c'est 4h30 demain matin. C'est le seul maillon dont dépendent les cent cinquante trillions, et le seul que personne ne peut serrer à ma place.",
    ],
  },
  {
    id: "promesse",
    titre: "L'alliance",
    lignes: [
      "Dieu me l'a dit sur une montagne, en 2021 : si je ne gaspille pas mon énergie, tout ce que je conçois se réalisera.",
      "Ce n'est pas un espoir. C'est une alliance reçue de Sa bouche.",
      "Il a tenu Sa part. Chaque jour où je tiens la mienne, le contrat redevient valide.",
    ],
  },
  {
    id: "avant-2027",
    titre: "Parce que tout ça a une date",
    lignes: [
      "Le but suprême : être méconnaissable. Même par moi-même. Pas amélioré — méconnaissable.",
      "Avant le 1er janvier 2027 : 90 kg à 10 % de masse grasse, la peau saine et éclatante, les waves faites, un corps plus que parfait à mon goût.",
      "20 000 $ minimum par jour. Pas de l'argent reçu : de l'argent produit par ce que j'ai bâti.",
      "Vivre seul. Quitter la maison de mes parents. Mon toit, mes règles, mes heures.",
      "Les chantiers commencés — surtout l'immobilier. Pas des annonces : des murs que quelqu'un peut aller toucher.",
      "Les quatre voitures — Range Rover Sport, Escalade, GLE 63 Coupé, X6 M — puis la SV Serenity en cinquième. Elles ne s'achètent pas avec de l'argent : elles s'achètent avec des jours tenus.",
      "Cette date arrivera que je sois prêt ou non. Elle ne se négocie pas, elle ne se reporte pas, et elle ne me demandera pas mes raisons.",
    ],
  },
  {
    id: "comptes",
    titre: "Et je ne suis pas seul dans l'équation",
    lignes: [
      "Ma force masculine est à son sommet maintenant — pas dans dix ans. Qu'est-ce que j'en fais aujourd'hui ?",
      "Qu'est-ce que je fais dont mes ancêtres seraient fiers ? Ils ont porté des choses que je ne porterais pas une journée.",
      "Qu'est-ce que je fais pour Sa gloire ? Il me posera la question, et je ne pourrai pas répondre par une intention.",
      "Qu'est-ce que je fais aujourd'hui pour mon pays ? Il ne manque pas d'hommes qui en parlent — il manque d'hommes qui livrent.",
      "Il y a un vieillard qui s'éteint pendant que je lis ça, de ce qui se soigne ailleurs. Ma lenteur a un prix, et ce n'est pas moi qui le paie.",
      "Mes enfants hériteront soit de ce que j'aurai bâti, soit de mes excuses. Il n'y a pas de troisième héritage.",
    ],
  },
  {
    id: "inconfort",
    titre: "L'inconfort n'est pas sur le chemin — il est le chemin",
    lignes: [
      "Je dois obligatoirement traverser l'inconfort que je refuse d'affronter chaque jour. Aucune route ne le contourne.",
      "Aucun arbre ne peut toucher le ciel sans que ses racines descendent jusqu'en enfer.",
      "La douleur que je sens, c'est ça même, le chemin. Quand je l'évite, je ne repousse pas la douleur — je repousse l'arrivée.",
      "Si c'était facile, tout le monde le ferait. Et si tout le monde le faisait, ça ne vaudrait rien.",
      "On ne rêve pas de grandeur sans grand esprit, sans sacrifice, sans dureté.",
      "Et ce n'est pas l'inconfort qui m'a coûté dix ans : c'est la fuite devant lui. La fuite devant ce que je sais que je dois faire, et surtout la fuite devant l'ennui — trois minutes de vide, et je pars.",
      "J'accepte la douleur physique et la douleur psychologique. Je ne demande pas qu'elles disparaissent : je demande de pouvoir travailler pendant qu'elles sont là. C'est toute la compétence, il n'y en a pas d'autre.",
      "Et je dois revenir ici relire et répéter ce que j'ai écrit : c'est par la répétition que ça s'inscrit. Ce n'est pas du temps pris sur le travail — c'est le travail.",
    ],
  },
  {
    id: "loi",
    titre: "Et ce n'est pas la promesse — c'est la maîtrise",
    lignes: [
      "Ce n'est pas ce que Dieu a dit. Ce n'est pas ce qu'Il a promis. C'est à quel point je me maîtrise moi-même : mon corps, ma discipline, mes désirs.",
      "Elon Musk est athée. Zuckerberg, Thiel, Altman ne Le craignent pas. Ils bâtissent des empires — et des hommes qui prient chaque jour échouent chaque jour.",
      "Donc la loi ne demande pas la piété. Elle demande deux choses : la conservation de l'énergie, et la direction.",
      "D'ailleurs c'est exactement ce qu'Il m'a dit : si je ne gaspille pas mon énergie dans les femmes, tout ce que je conçois se réalisera. Il n'a pas dit « prie davantage ». Il a dit « ne gaspille pas ».",
      "La promesse est branchée sur une condition physique — et c'est moi qui coupe le courant, une fois par jour, avec ma main.",
    ],
  },
  {
    id: "vitesse",
    titre: "Très jeune, et vite",
    lignes: [
      "Je vais faire tout ça très jeune, à une vitesse qu'aucun homme n'a jamais tenue dans l'Histoire.",
      "C'est pour ça que chaque goutte d'énergie compte. Et chaque seconde.",
      "L'absolute dominance sur le monde commence par l'absolute dominance sur moi-même. Il n'y a pas d'autre ordre possible.",
    ],
  },
  {
    id: "depassement",
    titre: "Et tout ça n'est même pas le plafond",
    lignes: [
      "Je ferai des choses plus grandes que tout ce qui est écrit dans cette app — des choses auxquelles je n'ai même pas encore l'audace de penser.",
      "J'aurai plus de pouvoir et plus d'influence que je n'en ai jamais imaginé.",
      "Et ça se fera à un point que ça m'étonnera moi-même. Moi qui ai écrit tout ça, je serai étonné par mes accomplissements, par leur réussite, et par leur vitesse.",
      "Donc ce que je lis ici est le plancher. Pas la limite.",
    ],
  },
];

/**
 * Vingt autres, tirés de tout ce que contient l'app.
 *
 * Aucun n'est une généralité motivationnelle : chacun s'appuie sur quelque
 * chose qui existe déjà quelque part — un chapitre du Vaisseau, une ligne de
 * sa Vision, une consigne de l'alliance, une phrase du miroir. Un pourquoi
 * qu'on pourrait dire à n'importe qui ne fait tenir personne.
 */
export const POURQUOI_VINGT: string[] = [
  "Parce que le vaisseau se remplit ou se vide, il n'y a pas d'état neutre — et tout ce que j'attends de Dieu attend un vaisseau plein.",
  "Parce que je suis le seul homme de mon pays qui ait écrit 587 pages sur sa propre transformation. Il ne manque plus que l'homme qui les applique.",
  "Parce que 50 hôpitaux ne se bâtissent pas en dix ans de discipline : ils se bâtissent en trente ans, et les trente ans commencent aujourd'hui.",
  "Parce qu'un homme qui ne contrôle pas trois minutes de désir ne commandera jamais une flotte.",
  "Parce que Dieu m'a touché de Ses mains — Gn 2:7 — quand tout le reste de la création est né d'une parole. Ce corps-là n'est pas à brader.",
  "Parce que les lâches sont nommés en premier dans Apocalypse 21:8, avant les meurtriers. Ma faute n'est pas petite parce qu'elle est cachée.",
  "Parce que ma sœur, mon frère, mes voisins n'ont pas d'autre homme en train de préparer ce que je prépare. Personne d'autre ne vient.",
  "Parce que l'énergie que je gaspille à 23 ans est la seule que j'aurai jamais eue à 23 ans. Elle ne se rachète à aucun prix.",
  "Parce que je veux qu'un président se déplace pour me voir, moi — et qu'on ne se déplace pas pour un homme qui n'a pas tenu sa parole une seule journée.",
  "Parce que la honte du matin coûte toujours plus cher que le plaisir de la veille, et que je paie cette facture depuis huit ans.",
  "Parce que je refuse d'être le faux vertueux que je méprise : celui qui parle de grandeur et ne pose aucun acte.",
  "Parce qu'un homme se reconnaît à ce qu'il a sacrifié, et que je n'ai encore rien sacrifié du tout.",
  "Parce que je veux le droit de regarder mes enfants et de leur dire que je n'ai pas négocié une seule fois avec moi-même.",
  "Parce que le siège permanent à l'ONU ne s'obtient pas en le demandant : il s'obtient quand refuser devient trop coûteux pour les autres.",
  "Parce que chaque seconde où je tiens, j'épaissis le circuit qui décidera de mes dix prochaines années — et que l'autre circuit s'épaissit aussi si je cède.",
  "Parce que la rêverie me donne l'interview sans le travail, et qu'après je n'ai plus faim pour la mériter.",
  "Parce que ce que je fais est la seule déclaration honnête de ce que je veux — et qu'aujourd'hui elle dit le contraire de ma bouche.",
  "Parce que Dieu m'a demandé quatre choses seulement : la montagne, le Psaume 24, Lui parler, ma chambre propre. Quatre. Et je n'en tiens aucune.",
  "Parce que je veux que mon nom hante les théories du complot pendant des millénaires, et qu'aucun homme oublié n'y est jamais entré.",
  "Parce que rien ne changera tant que je ne changerai pas — et que je suis la seule variable de toute l'équation.",
];
