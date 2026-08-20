// LES SEPT ANS — le sacrifice, et son prix exact.
//
// Ses mots : « je décide de consacrer ces 7 prochaines années à la discipline
// et à mes visions, pas de vie sociale, pas de plaisir, pas de fantasmes,
// jusqu'en 2033. C'est mon sacrifice. »
//
// Le module est écrit avec trois corrections assumées, et elles sont dites à
// voix haute dans le contenu lui-même plutôt que cachées dans le code.
//
// PREMIÈRE. La déclaration est structurellement identique à janvier 2026 :
// une promesse plus grande posée à la place d'une action plus petite. Il passe
// d'un serment de trente jours qu'il n'a pas encore tenu un seul jour à un
// serment de deux mille quatre cent soixante-deux. Le module contient donc son
// propre garde-fou : les sept ans ne se tiennent pas, ils se découpent. Sans
// ça, l'app lui aurait construit son prochain janvier.
//
// DEUXIÈME. Aucune, en fait — j'avais lu « pas de vie sociale » comme « pas de
// gens », et il a corrigé : les relations politiques et d'affaires ne sont pas
// de la vie sociale, c'est de la stratégie. Il parlait de la boîte et des
// sorties. La distinction est la sienne, elle est plus tranchante que ma
// correction, et c'est elle qui structure le bloc « ce que je garde » :
// stratégie contre divertissement, et non gens contre solitude.
//
// TROISIÈME. « Pas de plaisir » en absolu, combiné à sa règle « une rechute et
// tout est mort », fabrique un système où un écart au mois quatre annule sept
// ans. Le renoncement est donc nommé précisément — le porno, la main, les
// fantasmes, les rêveries, les écrans — et pas en bloc.
//
// Repères arithmétiques, calculés au 19 août 2026 : 2 462 jours jusqu'au
// 16 mai 2033, jour de ses trente ans. Le module ne les met pas en dur dans
// les phrases qui vieilliraient — l'app calcule ses compteurs elle-même.
//
// Client-safe.

/** Le serment, dans ses mots. Ce bloc ne se corrige pas : il se cite. */
export const SEPT_ANS_SERMENT: string[] = [
  "Je décide de consacrer ces sept prochaines années à la discipline et à mes visions.",
  "Pas de fantasmes. Pas de rêveries. Pas de vie que je ne choisis pas.",
  "Jusqu'en 2033. C'est mon sacrifice, et je l'ai choisi les yeux ouverts.",
  "Le 16 mai 2033, j'aurai trente ans. Ce qui sera vrai ce jour-là se décide dans ces sept années, et nulle part ailleurs.",
];

/**
 * CE QUE JE RENONCE — nommé, pas en bloc.
 *
 * Un renoncement flou ne se tient pas : il n'y a rien à tenir. Chaque ligne
 * désigne une chose qu'il peut arrêter aujourd'hui et vérifier ce soir.
 */
export const SEPT_ANS_RENONCE: string[] = [
  "Le porno. Ma main. Les fantasmes. Les scènes dans ma tête. Ce sont les quatre, et ce sont les seuls qui comptent vraiment.",
  "Les rêveries avec de la musique dans les oreilles, où j'ai déjà tout réussi sans rien avoir fait.",
  "TikTok, X, le défilement sans fin. Ce ne sont pas des pauses : c'est là que sont passées mes années.",
  "La boîte. Les sorties. Les soirées entre amis qui ne mènent nulle part. Sept ans sans, et je ne les regretterai pas une seule fois en 2033.",
  "Les liens qui n'existent que pour tuer le temps. Pas les gens — les liens qui ne servent qu'à ça.",
  "Le divertissement comme réglage par défaut. Il redevient une exception que je décide, pas un état où je tombe.",
  "L'idée qu'une soirée perdue se rattrape. Elle ne se rattrape pas : elle se soustrait.",
  "Le droit de me plaindre. J'ai choisi ça. Personne ne me l'a imposé.",
];

/**
 * STRATÉGIE CONTRE DIVERTISSEMENT — sa distinction, et elle tranche net.
 *
 * Une relation qui construit l'empire est du travail, pas de la vie sociale.
 * Une sortie qui tue le temps est du divertissement, quel que soit le nombre
 * de gens dedans. Le critère n'est pas la solitude : c'est la fonction.
 */
export const SEPT_ANS_GARDE: string[] = [
  "Une relation politique n'est pas de la vie sociale. C'est de la stratégie, et c'est du travail.",
  "Ce que je coupe, c'est la boîte, la sortie, la soirée entre amis. Pas les hommes qui ouvrent des portes.",
  "Le critère n'est pas le nombre de gens dans la pièce. C'est ce que la pièce produit.",
  "Un dîner qui me place à une table où se décide quelque chose : je le prends. Une soirée qui finit à quatre heures sans rien : jamais.",
  "Un empire, une armée, sept nations — ça se bâtit à travers des hommes. Serrer des mains utiles n'est pas une entorse au sacrifice, c'est le sacrifice qui travaille.",
  "Je ne renonce pas au sommeil. Il est la condition de l'alliance, pas son ennemi.",
  "Je ne renonce pas à mon corps. La gym, la nourriture, la montagne : ce sont des chantiers, pas des loisirs.",
  "Je ne renonce pas à la joie d'avoir livré. C'est la seule qui ne coûte rien et qui ne se paie pas le lendemain.",
  "Ce que je coupe, ce sont les substituts. Pas la vie — les choses qui la remplacent.",
];

/**
 * SEPT ANS NE SE TIENNENT PAS — le garde-fou.
 *
 * Le bloc le plus important du module. Il désamorce le mécanisme exact qui a
 * tué janvier 2026 : la promesse large qui dispense du geste étroit.
 */
export const SEPT_ANS_DECOUPE: string[] = [
  "Sept ans ne se tiennent pas. Ils se découpent. Personne n'a jamais tenu sept ans — on tient aujourd'hui, deux mille fois.",
  "Je n'ai pas encore tenu UN jour. Décider d'en tenir deux mille quatre cent soixante-deux ne rend pas le premier plus facile : ça me dispense de le faire.",
  "Une promesse plus grande à la place d'une action plus petite : c'est exactement ce qui a tué janvier 2026.",
  "La seule journée que ce serment engage, c'est celle-ci. Les autres arriveront une par une, et elles poseront la même question.",
  "Si les sept ans ne se traduisent pas en un geste avant ce soir, ils ne valent pas plus que la liste de janvier 2026.",
  "Ce n'est pas la longueur du serment qui prouve le sérieux. C'est le nombre de jours déjà derrière moi. Aujourd'hui : zéro.",
  "Sept ans, c'est la portée. Aujourd'hui, c'est le mécanisme. Ne jamais confondre les deux.",
];

/**
 * LE PRIX EXACT — l'arithmétique, sans adjectif.
 *
 * Les chiffres rendent le sacrifice réel : il cesse d'être une figure de style
 * et devient une quantité.
 */
export const SEPT_ANS_PRIX: string[] = [
  "Deux mille quatre cent soixante-deux jours entre aujourd'hui et mes trente ans. Ils passeront tous, que je les utilise ou non.",
  "Deux mille quatre cent soixante-deux blocs de six heures. C'est ça, la vraie unité de ma vision — pas les années.",
  "Sept ans de discipline, c'est le prix. Sept ans sans discipline, c'est le même temps pour rien. Le temps se dépense dans les deux cas.",
  "Le sacrifice n'est pas de renoncer sept ans. C'est de renoncer aujourd'hui, et de recommencer demain.",
  "Ce que je paie : des soirées, des écrans, des scènes. Ce que j'achète : d'être méconnaissable à trente ans.",
  "À vingt-trois ans, sept ans me paraissent longs. À trente, ils m'auront paru courts. C'est toujours dans ce sens-là.",
];

/**
 * 2033 — ce qu'il y a de l'autre côté.
 *
 * Un renoncement sans destination est une punition. La destination est déjà
 * écrite ailleurs dans l'app ; ici on la rappelle brièvement, et elle rend le
 * prix supportable.
 */
export const SEPT_ANS_2033: string[] = [
  "Le 16 mai 2033, soit je suis méconnaissable, soit j'ai trente ans et la même vie qu'à vingt-trois.",
  "Sept ans de sacrifice ne me rendent pas malheureux sept ans. Ils me rendent intouchable après.",
  "Ce que je refuse aujourd'hui, je ne le refuse pas pour toujours. Je le refuse jusqu'à ce que je sois l'homme pour qui ce n'est plus une question.",
  "En 2033 je n'aurai plus à me priver de rien. C'est précisément ce que ces sept ans achètent.",
  "L'autre chemin existe aussi : sept ans à ne rien sacrifier, et trente ans sans rien à montrer. Celui-là ne demande aucun effort.",
];

/** Tout le module à plat, pour les tirages qui piochent partout. */
export const SEPT_ANS: string[] = [
  ...SEPT_ANS_SERMENT,
  ...SEPT_ANS_RENONCE,
  ...SEPT_ANS_GARDE,
  ...SEPT_ANS_DECOUPE,
  ...SEPT_ANS_PRIX,
  ...SEPT_ANS_2033,
];

export const SEPT_ANS_TOTAL = SEPT_ANS.length;

/** Le titre du bloc, court, reconnaissable d'un coup d'œil. */
export const SEPT_ANS_TITRE = "Les sept ans — mon sacrifice";
