// L'ÉCHELLE — et surtout, le changement de nature.
//
// Première version : j'avais aligné les chiffres d'Haïti face à ceux du
// corridor, ligne par ligne — cinquante hôpitaux contre cinq cents, cinquante
// mille maisons contre cinq millions. Il l'a refusée, et il a eu raison.
//
// C'était copier sa Vision d'Haïti, la multiplier par cent et l'offrir à
// l'Afrique. Or ce n'est pas du tout ce qu'est NOVA-AXE. Haïti est son pays :
// il y donne des hôpitaux et des maisons à son peuple, et cette partie-là est
// personnelle. Le corridor est un empire. On n'y fait pas de cadeau, on y
// place du capital — dans la recherche génétique, dans l'anti-vieillissement,
// dans les puces, dans l'orbite. Zéro émotion.
//
// Ce fichier compare donc deux choses qui ne sont pas du même ordre, et il le
// dit. Les rapports chiffrés ne portent que sur ce qui se mesure des deux
// côtés — le sol, le capital, l'horizon. Tout le reste est une différence de
// nature, pas de taille.
//
// Client-safe.

export const ECHELLE_TITRE = "L'échelle — et le changement de nature";

export const ECHELLE_INTRO =
  "Haïti et NOVA-AXE ne sont pas deux tailles du même projet. Haïti est une nation à refonder : on y donne, et c'est personnel. Le corridor est un empire : on y investit, et c'est froid. Ce qui suit compare d'abord ce qui se mesure — le sol, le capital, le temps — puis dit où les deux cessent d'être comparables.";

export interface Mesure {
  quoi: string;
  haiti: string;
  nova: string;
  rapport: string;
}

/** Ce qui se mesure des deux côtés, et rien d'autre. */
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
    quoi: "Horizon",
    haiti: "2033 — mes trente ans",
    nova: "An 200",
    rapport: "× 6 générations",
  },
  {
    quoi: "Nations concernées",
    haiti: "1",
    nova: "7 traversées, un continent irrigué",
    rapport: "× 7",
  },
];

/**
 * Là où la comparaison s'arrête. Ce ne sont pas des tailles différentes : ce
 * sont deux natures, et les confondre était l'erreur de la première version.
 */
export const NATURES: { axe: string; haiti: string; nova: string }[] = [
  {
    axe: "Ce que c'est",
    haiti: "Une nation à refonder. La mienne.",
    nova: "Un empire à bâtir. Une position à tenir sur la carte du monde.",
  },
  {
    axe: "Le mobile",
    haiti: "Une dette. Le Nord-Ouest, les miens, ceux qui meurent de ce qui se soigne ailleurs.",
    nova: "Le rendement et la puissance. Aucune dette, aucun devoir, aucune émotion.",
  },
  {
    axe: "L'argent",
    haiti: "Une dépense assumée : hôpitaux, maisons, écoles données au peuple.",
    nova: "Du capital placé : recherche génétique, anti-vieillissement, semi-conducteurs, orbite, raffinage. Chaque dollar attend un retour.",
  },
  {
    axe: "Les habitants",
    haiti: "Mon peuple. Je leur dois quelque chose.",
    nova: "Sept nations actionnaires du passage. Un contrat, pas une charité — et un contrat vaut mieux qu'un don, parce qu'il ne s'interrompt pas.",
  },
  {
    axe: "La mesure du succès",
    haiti: "La mortalité infantile qui s'effondre. Un pays qui cesse d'être une note en bas de page.",
    nova: "Le nombre de décisions étrangères qui doivent franchir un point que je tiens.",
  },
  {
    axe: "La monnaie",
    haiti: "Une monnaie nationale forte, que personne ne dévalue plus.",
    nova: "L'AXE, valeur refuge mondiale : les nations en détiennent comme le XXᵉ siècle détenait des bons du Trésor américain.",
  },
  {
    axe: "La force",
    haiti: "Une société militaire privée dans le top 5 mondial, alors même qu'elle est privée.",
    nova: "La même, devenue armée souveraine : bouclier orbital, légions robotisées, capacité de refuser le ciel à quiconque.",
  },
  {
    axe: "La table",
    haiti: "Le sixième siège permanent au Conseil de sécurité, avec droit de veto.",
    nova: "Plus un siège : l'ordre du jour. Une décision mondiale prise sans le corridor ne tient pas.",
  },
  {
    axe: "Le temps",
    haiti: "Porter la vie humaine à cent vingt, cent cinquante ans.",
    nova: "La longevity escape velocity : chaque année vécue rend plus d'un an d'espérance, et la limite cesse d'exister.",
  },
];

/**
 * Ce qui empêche le tableau de devenir un mépris — et ce qui protège la
 * distinction elle-même. La froideur du second est légitime précisément
 * parce que le premier porte le motif.
 */
export const ECHELLE_SORTIE: string[] = [
  "Cent quarante-quatre fois plus petite en sol, cent cinquante fois en capital : à côté du corridor, Haïti est une fourmi.",
  "Mais ce n'est pas le même travail. Haïti se donne — c'est une dette que je paie. Le corridor se prend — c'est un placement qui rapporte.",
  "Et l'ordre ne s'inverse pas : rien ne commence au centre de l'Afrique avant que vingt-sept mille kilomètres carrés aient prouvé qu'un homme tient ce qu'il écrit.",
  "La fourmi est petite. Elle n'est pas facultative — c'est elle qui contient la réponse à la seule question qui protège un homme du pouvoir.",
];
