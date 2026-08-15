// « JE DÉCIDE » — la déclaration ramenée dans le monde physique.
//
// La DECLARATION_FINALE dit ce qu'il veut : la conquête, la domination, tout.
// Elle est juste, mais elle est encore de l'ordre du vouloir — et il a écrit
// lui-même qu'il excelle à vouloir sans jamais payer. Ces lignes-ci sont la
// moitié manquante : pas ce qu'il veut obtenir, mais ce qu'il décide de faire
// avec son corps, cette semaine, dans le monde réel.
//
// Le critère de chaque ligne : elle doit pouvoir être filmée. « Être puissant »
// n'est pas filmable ; « mettre mon cul sur ma chaise pendant six heures »
// l'est. C'est pour ça qu'elles sont si concrètes — c'est exactement ce qu'il a
// demandé : les voir, les toucher, les construire, les faire.
//
// Ses lignes d'abord, dans son ordre. Les miennes ensuite, au même critère.
//
// Client-safe.

export const DECISIONS_SIENNES: string[] = [
  "Je décide de ne plus rêvasser avec de la musique dans les oreilles, installé dans mon petit confort médiocre.",
  "Je décide de mettre mon cul sur ma chaise, en face de mon PC et de mes deux moniteurs, pendant 6 heures. 9 heures. 12 heures s'il le faut.",
  "Pour construire ce que je pense être capable de construire.",
  "Je décide d'aller courir, pour être athlétique.",
  "Je décide d'aller à la gym, pour avoir le corps que je veux.",
  "Je décide d'aller ouvrir les entreprises militaires et de mener les opérations militaires que je veux.",
  "Je décide d'apprendre à piloter.",
  "Je décide d'être puissant.",
  "Je décide d'être encore plus que tout ce que j'ai rêvé d'être.",
  "Je décide d'arrêter d'imaginer des trucs sans jamais en payer le prix.",
  "Je veux le faire dans le monde réel. Je veux les voir, les toucher, les construire. Je veux les faire.",
];

/**
 * Les miennes, au même critère : chacune doit pouvoir être filmée. Rien qui
 * décrive un état d'esprit — uniquement des choses qu'un homme fait avec son
 * corps, et dont il reste une trace.
 */
export const DECISIONS_AJOUTEES: string[] = [
  "Je décide de me lever à 4h30 et de le prouver par l'heure affichée, pas par le souvenir que j'en ai.",
  "Je décide de monter la montagne dimanche et jeudi avec mes jambes, pas dans ma tête.",
  "Je décide de finir l'Ancien Testament page par page, pas d'en parler.",
  "Je décide de livrer chaque semaine une chose que quelqu'un d'autre peut ouvrir, toucher ou utiliser.",
  "Je décide de mettre mon nom sur des choses qui existent, avec une date dessus.",
  "Je décide de signer des contrats, pas de les imaginer.",
  "Je décide de recruter des hommes, de les payer, et de répondre d'eux.",
  "Je décide d'apprendre à tirer, à nager, et à conduire tout ce qui roule, vole ou flotte.",
  "Je décide de parler devant des gens jusqu'à ce que ma voix ne tremble plus.",
  "Je décide d'avoir un corps qui dit la vérité sur ma discipline avant que j'ouvre la bouche.",
  "Je décide de me tenir devant des hommes plus puissants que moi sans baisser les yeux.",
  "Je décide de compter mes heures réelles, pas mes intentions.",
  "Je décide que la prochaine fois qu'une scène commence dans ma tête, je me lève et j'en fais la première étape dans les cinq minutes.",
  "Je décide que ce que je ne peux pas montrer, je considère que je ne l'ai pas fait.",
  "Je décide de choisir la version fatigante de chaque journée, parce que c'est la seule qui laisse une trace.",
  "Je décide que rien de tout ça n'attend le 1er janvier. Tout commence à la prochaine heure pleine.",
];

/** Tout, dans l'ordre : les siennes puis les miennes. */
export const JE_DECIDE: string[] = [
  ...DECISIONS_SIENNES,
  ...DECISIONS_AJOUTEES,
];
