// L'INSTRUMENT — ce que Dieu pourrait faire de lui, et ce qu'Il trouve.
//
// C'est le retournement le plus dur de toute l'app, et c'est lui qui l'a
// formulé. Partout ailleurs, la question est ce que lui perd en cédant. Ici,
// la question est ce que Dieu ne peut pas faire parce qu'Il ne trouve pas
// l'instrument disponible.
//
// Ce n'est pas une menace : c'est la structure exacte d'Ézéchiel 22:30 — « Je
// cherche parmi eux un homme qui élève un mur, qui se tienne à la brèche
// devant moi en faveur du pays, afin que je ne le détruise pas ; mais je n'en
// trouve point. » Et d'Esther 4:14 : le secours viendra d'ailleurs. Le poste
// n'est pas réservé.
//
// La forme est toujours la même, et elle est de lui : ce que Dieu pourrait
// faire — puis ce qu'Il trouve à la place. Les deux moitiés doivent rester
// collées, sinon la première devient un rêve de plus.
//
// Client-safe.

export const INSTRUMENT_TITRE = "Ce que Dieu pourrait faire de moi — et ce qu'Il trouve";

/** Les deux textes qui portent tout le bloc. Ils ne sont pas de moi. */
export const INSTRUMENT_ANCRE: { t: string; source: string }[] = [
  {
    t: "Je cherche parmi eux un homme qui élève un mur, qui se tienne à la brèche devant moi en faveur du pays, afin que je ne le détruise pas ; mais je n'en trouve point.",
    source: "Ézéchiel 22:30",
  },
  {
    t: "Si tu te tais maintenant, le secours et la délivrance surgiront d'autre part — et toi, tu périras. Et qui sait si ce n'est pas pour un temps comme celui-ci que tu es parvenue à la royauté ?",
    source: "Esther 4:14",
  },
];

export interface Emploi {
  /** Ce que Dieu pourrait faire de lui. */
  mission: string;
  /** Ce qu'Il trouve à la place. */
  mais: string;
}

export const INSTRUMENT: Emploi[] = [
  {
    mission:
      "Dieu pourrait t'utiliser, toi et ta société militaire, pour régler le problème des gangs en Haïti.",
    mais: "Mais Il ne trouve pas ta main libre. Elle est en train de se branler.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour prouver Sa gloire de façon irréfutable — montrer au monde entier que c'est Son serviteur qui a effacé les gangs.",
    mais: "Mais l'homme qu'Il voudrait montrer n'est pas montrable. Pas aujourd'hui.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser comme réponse aux prières des expulsés : leur bâtir des maisons, des hôpitaux, des écoles.",
    mais: "Mais tes yeux sont souillés, ton esprit est souillé, ta main est souillée.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour montrer que Son pouvoir n'a aucune limite.",
    mais: "Mais Il ne verse pas Sa puissance dans un vase fissuré, et tu rouvres la fissure chaque soir.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour prouver que Lui aussi donne la gloire et la réussite — pas seulement les corrompus et les satanistes.",
    mais: "Mais la démonstration exige un homme propre, et tu n'es pas encore candidat.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour donner une leçon aux prophètes des démons, aux praticiens de la magie, aux gouvernements qui sacrifient.",
    mais: "Mais eux tiennent leurs disciplines. Toi, tu ne tiens pas trois minutes.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour répondre à la prière d'une mère qui n'a pas de quoi soigner son enfant ce soir.",
    mais: "Mais l'homme par qui la réponse devait passer était occupé ailleurs.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour rendre l'eau et l'électricité à des quartiers qui n'en ont plus depuis vingt ans.",
    mais: "Mais Il te cherche à 4h30, et tu n'es pas là.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour ramener des milliers d'enfants à l'école.",
    mais: "Mais Il trouve un homme qui a écrit 587 pages et qui n'en applique aucune.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour protéger les femmes et les filles de ce pays de ce qui leur arrive chaque nuit.",
    mais: "Mais Il ne confie pas une armée à un homme qui perd contre lui-même.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour faire tomber un pouvoir corrompu sans une goutte de sang injuste.",
    mais: "Mais la ruse et la maîtrise se paient d'avance, et tu n'as encore rien déposé.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour confondre ceux qui disent qu'Il ne fait plus rien aujourd'hui.",
    mais: "Mais Il n'a pas de preuve à montrer tant que tu es la preuve du contraire.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour montrer qu'un homme sans relations, sans argent et sans nom peut être choisi.",
    mais: "Mais Il cherche un homme, et Il trouve un rêveur avec des écouteurs.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour prouver à toute une génération qu'on peut réussir sans pacte, sans sacrifice, sans vendre personne.",
    mais: "Mais tu leur prouves l'inverse à chaque fois que tu cèdes en silence.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour asseoir Haïti à la table où se décident les choses.",
    mais: "Mais on n'y assied pas un homme qui ne tient pas sa propre chambre.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour nourrir le Nord-Ouest — le coin que ce pays lui-même a oublié, celui d'où tu viens.",
    mais: "Mais Il regarde ta journée, et il n'y a pas une heure de libre pour ça.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour répondre à un pasteur qui prie pour ce pays depuis trente ans.",
    mais: "Mais sa réponse dort à 4h35 après avoir promis 4h30.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour soigner ceux qui meurent de ce qui se soigne partout ailleurs.",
    mais: "Mais Il ne peut pas bâtir cinquante hôpitaux avec un homme qui n'a pas tenu cinquante jours.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour former d'autres hommes, et faire de dix un millier.",
    mais: "Mais on ne forme pas à ce qu'on ne fait pas soi-même. Ils verraient tout de suite.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour financer ceux qui prient depuis des années sans voir la moindre réponse.",
    mais: "Mais l'argent passe par des mains disciplinées, et Il le sait mieux que toi.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour faire une chose que personne ne pourra expliquer autrement que par Lui.",
    mais: "Mais l'inexplicable a besoin d'un homme irréprochable, sinon on l'expliquera par la chance.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour montrer à tes ennemis qu'Il défend les Siens.",
    mais: "Mais tu es en train de faire à ta place ce qu'aucun ennemi n'a réussi à te faire.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour que le nom de ce pays cesse d'être une note en bas de page.",
    mais: "Mais Il ne trouve personne. Alors Il continue de chercher.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser pour tenir la brèche pour tout un peuple.",
    mais: "Et s'Il ne te trouve pas, le secours surgira d'ailleurs. Le poste n'est réservé à personne.",
  },
  {
    mission:
      "Dieu pourrait t'utiliser dès ce matin — Il n'attend ni ton diplôme, ni ton argent, ni ton âge.",
    mais: "Il attend une seule chose, et c'est la seule que tu ne Lui donnes pas : un homme qui se tient.",
  },
];

/**
 * La conclusion. Sans elle, le bloc n'est qu'une accusation — et une
 * accusation ne bâtit rien.
 */
export const INSTRUMENT_SORTIE: string[] = [
  "Rien de tout cela ne demande que tu sois digne. Ça demande que tu sois disponible.",
  "Il n'a pas besoin d'un homme parfait. Il a besoin d'un homme dont la main est libre à l'heure où Il appelle.",
  "Chaque jour tenu te remet sur la liste. Chaque soir cédé t'en retire — et la liste est courte.",
  "La question n'est pas s'Il peut. La question est s'Il te trouve.",
];
