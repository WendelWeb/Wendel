// L'ÉCHELLE — Haïti posée à côté de NOVA-AXE.
//
// Il a demandé que sa Vision pour Haïti ait l'air d'une fourmi devant celle du
// corridor. C'était déjà vrai dans les chiffres, mais nulle part visible : les
// deux vivaient dans deux sections différentes, et on ne compare pas ce qu'on
// ne voit pas ensemble. Ce tableau les met sur la même ligne.
//
// Deux précautions, et elles ne sont pas rhétoriques.
//
// Les chiffres d'Haïti sont ceux de sa propre Vision, repris tels quels — 50
// hôpitaux, 50 000 maisons, 100 écoles, 500 000 emplois, un gigawatt. Ceux du
// corridor sont des cibles posées à l'échelle de cent cinquante mille
// milliards. Les rapports sont donc calculés entre ses chiffres et ses
// chiffres, pas entre les siens et une estimation flatteuse.
//
// Et les faits du monde réel qui servent de repère — la superficie d'Haïti,
// celle du corridor, la population des sept nations traversées — sont exacts.
//
// Client-safe.

export const ECHELLE_TITRE = "L'échelle — la fourmi et le corridor";

export const ECHELLE_INTRO =
  "Les mêmes lignes, dans les deux Visions. À gauche ce qui refonde une nation ; à droite ce qui déplace le centre de gravité d'un siècle. Le rapport est calculé entre ses propres chiffres, jamais entre les siens et une estimation complaisante.";

export interface Mesure {
  quoi: string;
  haiti: string;
  nova: string;
  /** Le rapport, quand il se calcule. Sinon, ce qui change de nature. */
  rapport: string;
}

export const MESURES: Mesure[] = [
  {
    quoi: "Territoire",
    haiti: "27 750 km²",
    nova: "4 000 000 km²",
    rapport: "× 144",
  },
  {
    quoi: "Capital engagé",
    haiti: "1 000 Md $",
    nova: "150 000 Md $",
    rapport: "× 150",
  },
  {
    quoi: "Population concernée",
    haiti: "12 millions",
    nova: "plus de 200 millions",
    rapport: "× 17",
  },
  {
    quoi: "Hôpitaux de rang mondial",
    haiti: "50",
    nova: "500",
    rapport: "× 10",
  },
  {
    quoi: "Maisons données",
    haiti: "50 000",
    nova: "5 000 000",
    rapport: "× 100",
  },
  {
    quoi: "Écoles premium",
    haiti: "100",
    nova: "2 000",
    rapport: "× 20",
  },
  {
    quoi: "Universités de rang mondial",
    haiti: "1",
    nova: "20",
    rapport: "× 20",
  },
  {
    quoi: "Puissance électrique",
    haiti: "1 GW solaire",
    nova: "plus de 100 GW — Inga, fusion, thorium, Sahel",
    rapport: "× 100",
  },
  {
    quoi: "Emplois formels",
    haiti: "500 000",
    nova: "50 000 000",
    rapport: "× 100",
  },
  {
    quoi: "Ports en eau profonde",
    haiti: "2 à 4",
    nova: "12, dont des mégaports autonomes",
    rapport: "× 4",
  },
  {
    quoi: "Aéroports internationaux",
    haiti: "3 à 5",
    nova: "30, plus le spatioport équatorial",
    rapport: "× 8",
  },
  {
    quoi: "Horizon",
    haiti: "2033 — mes trente ans",
    nova: "An 200 — la génération fondatrice encore vivante",
    rapport: "× 6 générations",
  },
];

/**
 * Les lignes où le rapport ne se calcule pas, parce que ce n'est plus une
 * question de taille : la chose change de nature. C'est ici que la fourmi
 * cesse d'être une petite chose et devient une autre espèce.
 */
export const SAUTS: { quoi: string; haiti: string; nova: string }[] = [
  {
    quoi: "La monnaie",
    haiti: "Une monnaie nationale forte, qui cesse d'être dévaluée par d'autres.",
    nova: "L'AXE, valeur refuge mondiale : les nations détiennent des obligations AXE comme le XXᵉ siècle détenait des bons du Trésor américain.",
  },
  {
    quoi: "La force",
    haiti: "Une société militaire privée dans le top 5 mondial, alors même qu'elle est privée.",
    nova: "La même, devenue armée souveraine : bouclier orbital, légions robotisées, capacité de refuser le ciel à quiconque.",
  },
  {
    quoi: "La table",
    haiti: "Le sixième siège permanent au Conseil de sécurité, avec droit de veto.",
    nova: "L'empire n'occupe plus un siège à la table : il fixe l'ordre du jour, et une décision mondiale prise sans lui ne tient pas.",
  },
  {
    quoi: "Le haut",
    haiti: "Des satellites d'observation et de communication souverains.",
    nova: "Le spatioport équatorial, l'anneau orbital à l'An 50, l'ascenseur spatial à l'An 100, la Lune, Mars, les astéroïdes.",
  },
  {
    quoi: "Le temps",
    haiti: "Porter la vie humaine à cent vingt, cent cinquante ans.",
    nova: "La longevity escape velocity à l'An 30 : chaque année vécue rend plus d'un an d'espérance, et la limite cesse d'exister.",
  },
  {
    quoi: "La règle",
    haiti: "Zéro export brut : la valeur se transforme sur le sol national.",
    nova: "La même règle imposée à un continent — et avec elle, la norme, la mesure, le droit, la carte, l'heure et la langue selon lesquels le monde se juge.",
  },
];

/**
 * Ce qui empêche le tableau de devenir un mépris. Il a demandé la fourmi, et
 * la fourmi est juste — en taille. Elle ne l'est pas en fonction : c'est
 * elle qui rend l'autre possible, et c'est elle qui contient le motif.
 */
export const ECHELLE_SORTIE: string[] = [
  "Oui, Haïti est la fourmi. Cent quarante-quatre fois plus petite en sol, cent cinquante fois en capital.",
  "Mais la fourmi est première, et l'ordre ne s'inverse pas : rien ne commence au centre de l'Afrique avant que vingt-sept mille kilomètres carrés aient prouvé qu'un homme tient ce qu'il écrit.",
  "Et elle garde ce que le corridor ne contient pas : le Nord-Ouest, ceux qui meurent aujourd'hui de ce qui se soigne ailleurs, et la réponse à la seule question qui protège un homme du pouvoir — pour faire quoi.",
  "La fourmi est petite. Elle n'est pas facultative.",
];
