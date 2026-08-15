// NIETZSCHE — sur la fuite, la douleur, la durée et la maîtrise de soi.
//
// Il a demandé ces phrases après avoir cité lui-même l'arbre dont les racines
// descendent en enfer. Cette formule-là circule partout mais n'est pas de lui
// telle quelle : c'est une contraction de deux passages réels, et les deux
// sont plus forts que la version populaire. Ils sont ici, marqués.
//
// Chaque ligne porte sa source. C'était le minimum : une citation sans source
// est une phrase de motivation déguisée, et il en a déjà assez lu.
//
// Client-safe.

export interface Citation {
  t: string;
  source: string;
  /** Pourquoi elle est là — jamais décoratif, toujours son cas précis. */
  pour: string;
}

/** L'enfer, les racines, la hauteur — les deux vrais passages. */
export const NIETZSCHE_RACINES: Citation[] = [
  {
    t: "Les chemins vers son propre ciel passent toujours par la volupté de son propre enfer.",
    source: "Le Gai Savoir, § 338",
    pour: "C'est le passage exact que la formule populaire contracte. Il ne dit pas qu'il faut souffrir : il dit que la route passe par là, et nulle part ailleurs.",
  },
  {
    t: "Plus il veut s'élever vers la hauteur et la lumière, plus ses racines tendent vigoureusement vers la terre, vers le bas, dans l'obscur, dans le profond — dans le mal.",
    source: "Ainsi parlait Zarathoustra, « De l'arbre sur la montagne »",
    pour: "L'arbre, dans son texte réel. La hauteur n'est pas gagnée malgré la profondeur : elle est proportionnelle à elle.",
  },
];

/** La douleur, et ce qu'elle bâtit. */
export const NIETZSCHE_DOULEUR: Citation[] = [
  {
    t: "La discipline de la souffrance, de la grande souffrance — ne savez-vous pas que c'est cette discipline-là seule qui a créé jusqu'ici toutes les élévations de l'homme ?",
    source: "Par-delà le bien et le mal, § 225",
    pour: "Toutes. Pas quelques-unes. Il n'existe aucun exemple de l'autre méthode.",
  },
  {
    t: "Ce qui ne me tue pas me rend plus fort.",
    source: "Crépuscule des idoles, « Maximes et traits », 8",
    pour: "La plus citée, et la plus mal comprise : elle ne dit pas que tout ce qui fait mal élève. Elle dit ce qui reste debout après.",
  },
  {
    t: "Il faut encore porter en soi un chaos pour pouvoir enfanter une étoile qui danse.",
    source: "Ainsi parlait Zarathoustra, Prologue, 5",
    pour: "Ce que tu sens quand tu t'assois et que tu ne veux pas rester assis n'est pas un défaut de fabrication. C'est la matière.",
  },
  {
    t: "Qui possède un pourquoi qui lui tient lieu de but supporte à peu près n'importe quel comment.",
    source: "Crépuscule des idoles, « Maximes et traits », 12",
    pour: "C'est exactement pourquoi le bouton POURQUOI reste ouvert quand la Vision est fermée.",
  },
  {
    t: "Ma formule pour la grandeur de l'homme est amor fati : ne rien vouloir d'autre que ce qui est — ni devant, ni derrière, ni dans les siècles des siècles. Non pas seulement supporter le nécessaire, mais l'aimer.",
    source: "Ecce Homo, « Pourquoi je suis si avisé », 10",
    pour: "Pas subir l'inconfort : le vouloir. C'est la seule position depuis laquelle il ne peut plus te faire fuir.",
  },
];

/** La maîtrise de soi — et l'obéissance à soi-même. */
export const NIETZSCHE_MAITRISE: Citation[] = [
  {
    t: "Celui qui ne sait pas s'obéir à soi-même reçoit des ordres d'autrui.",
    source: "Ainsi parlait Zarathoustra, « De la victoire sur soi-même »",
    pour: "La phrase entière de ta fuck-you money, écrite avant toi. On ne devient libre d'aucun homme sans être d'abord maître d'un seul.",
  },
  {
    t: "L'homme est quelque chose qui doit être surmonté.",
    source: "Ainsi parlait Zarathoustra, Prologue, 3",
    pour: "Pas amélioré. Surmonté. Ce qui suppose qu'il y ait quelque chose à perdre.",
  },
  {
    t: "L'homme est une corde tendue entre la bête et le surhumain — une corde au-dessus d'un abîme.",
    source: "Ainsi parlait Zarathoustra, Prologue, 4",
    pour: "Tes deux systèmes, dits en une image : le limbique et le préfrontal, et la corde entre les deux, c'est toi.",
  },
  {
    t: "Qu'est-ce que le bonheur ? Le sentiment que la puissance croît, qu'une résistance est surmontée.",
    source: "L'Antéchrist, § 2",
    pour: "Le bonheur n'est pas dans le confort mais dans la résistance vaincue. Ce que tu cherches le soir ne peut donc pas s'y trouver.",
  },
  {
    t: "Deviens celui que tu es.",
    source: "Le Gai Savoir, § 270",
    pour: "L'homme que tu décris dans l'app n'est pas un autre homme. C'est toi, non encore atteint.",
  },
  {
    t: "Donner du style à son caractère — un art grand et rare !",
    source: "Le Gai Savoir, § 290",
    pour: "Un caractère se compose, comme un bâtiment. Il ne se découvre pas en attendant.",
  },
];

/** La durée, la direction, la répétition. */
export const NIETZSCHE_DUREE: Citation[] = [
  {
    t: "L'essentiel, « au ciel et sur la terre », c'est qu'il y ait obéissance longtemps et dans une seule direction : il en résulte à la longue quelque chose pour quoi il vaut la peine de vivre sur cette terre.",
    source: "Par-delà le bien et le mal, § 188",
    pour: "Ta loi, mot pour mot : conservation et direction. Longtemps, et dans UNE seule direction.",
  },
  {
    t: "Ce n'est pas la force, mais la durée des sentiments élevés qui fait les hommes supérieurs.",
    source: "Par-delà le bien et le mal, § 72",
    pour: "Tu n'as jamais manqué d'intensité. Tu manques de durée. C'est toute la différence entre toi et eux.",
  },
  {
    t: "Formule de mon bonheur : un Oui, un Non, une ligne droite, un but.",
    source: "Crépuscule des idoles, « Maximes et traits », 44",
    pour: "Un but. Pas cinquante. La dispersion est déjà une fuite.",
  },
  {
    t: "Celui qui veut apprendre à voler doit d'abord apprendre à se tenir debout, à marcher, à courir, à grimper, à danser : on n'apprend pas à voler en volant.",
    source: "Ainsi parlait Zarathoustra, « De l'esprit de lourdeur »",
    pour: "Tu veux apprendre à piloter. Commence par te lever à 4h30 — c'est la même leçon, à un étage plus bas.",
  },
  {
    t: "Celui qui n'a pas les deux tiers de sa journée pour lui-même est un esclave.",
    source: "Humain, trop humain, § 283",
    pour: "Compte tes heures réelles. Pas tes intentions.",
  },
];

/** L'ennui, et la fuite. */
export const NIETZSCHE_ENNUI: Citation[] = [
  {
    t: "Pour le penseur et pour tous les esprits inventifs, l'ennui est ce désagréable « calme plat » de l'âme qui précède la traversée heureuse et les vents joyeux.",
    source: "Le Gai Savoir, § 42",
    pour: "L'ennui que tu fuis en trois secondes est le calme plat qui précède le vent. Tu descends du bateau juste avant.",
  },
  {
    t: "On doit chercher ce qui est difficile ; et là où l'on ne trouve rien de difficile, on doit se le rendre difficile soi-même.",
    source: "d'après Ainsi parlait Zarathoustra, « De l'esprit de lourdeur »",
    pour: "La difficulté ne se subit pas : elle se choisit. Sinon elle te choisit, et bien plus tard.",
  },
  {
    t: "Il y a en tout homme un lâche qui dit : « je n'ai plus envie aujourd'hui ». Ce lâche est le même chaque jour, et il ne meurt jamais de vieillesse.",
    source: "Dans son esprit — pas une citation exacte",
    pour: "Marqué comme tel, parce qu'une fausse attribution vaut moins qu'une phrase assumée.",
  },
];

/** Tout, à plat. */
export const NIETZSCHE_TOUT: Citation[] = [
  ...NIETZSCHE_RACINES,
  ...NIETZSCHE_DOULEUR,
  ...NIETZSCHE_MAITRISE,
  ...NIETZSCHE_DUREE,
  ...NIETZSCHE_ENNUI,
];
