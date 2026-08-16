// L'ÉCART — la cible de 2027 posée à côté de ce qui est vrai ce matin.
//
// C'est le seul bloc de l'app où les deux moitiés sont côte à côte sur la même
// ligne. Ailleurs, elles vivent séparées : le miroir dit ce qu'il est, la
// Vision dit ce qu'il veut, et cette séparation lui permet de croire aux deux
// en même temps. Collées, elles ne se supportent plus.
//
// Une seule règle de sélection : je n'ai gardé que les écarts que la
// discipline referme. La taille en est absente — elle ne dépend d'aucune
// journée tenue, et l'inclure ferait passer le reste pour un reproche gratuit.
//
// Client-safe.

export interface Ecart {
  /** Ce qui doit être vrai avant le 1er janvier 2027. */
  cible: string;
  /** Ce qui est vrai ce matin. */
  aujourdhui: string;
}

export const ECARTS: Ecart[] = [
  { cible: "Méconnaissable — même par moi-même", aujourdhui: "Reconnaissable au premier coup d'œil. Rien n'a bougé depuis huit ans." },
  { cible: "90 kg, 10 % de masse grasse", aujourdhui: "67 kg. Faible. Cinq ans de gym sans corps à montrer." },
  { cible: "Peau saine, brillante, éclatante", aujourdhui: "Le visage non soigné, plein de boutons. L'acide exfoliant jamais ouvert." },
  { cible: "Dents blanches, parfum tous les jours", aujourdhui: "Dents jaunes. Aucun parfum." },
  { cible: "Les waves faites et tenues", aujourdhui: "Rien de commencé." },
  { cible: "20 000 $ par jour", aujourdhui: "Une situation financière qui prouve ma médiocrité." },
  { cible: "Vivre seul, mon propre toit", aujourdhui: "Chez mes parents." },
  { cible: "Quatre voitures, puis une cinquième", aujourdhui: "Aucune. Et pas un jour tenu pour les payer." },
  { cible: "Des chantiers que quelqu'un peut aller voir", aujourdhui: "Des plans écrits, pas une pierre posée." },
  { cible: "Un terrain acheté, l'immobilier commencé", aujourdhui: "Aucun acte. Aucun contrat. Aucune date." },
  { cible: "12 heures de deep work comme standard", aujourdhui: "Des heures données à TikTok, à X, aux scènes dans ma tête." },
  { cible: "Debout à 4h30 sans négocier", aujourdhui: "Réveillé fatigué. À 23 ans." },
  { cible: "L'Ancien Testament fini", aujourdhui: "Commencé, jamais tenu." },
  { cible: "La montagne dimanche et jeudi, toute l'année", aujourdhui: "Pas dimanche dernier. Ni celui d'avant." },
  { cible: "Rétention totale — la condition de l'alliance", aujourdhui: "Le compteur que je regarde en ce moment." },
  { cible: "Un homme dont la main est libre à l'heure où Il appelle", aujourdhui: "Un homme qu'Il cherche et qu'Il ne trouve pas." },
];

/** Ce qui accompagne le tableau, pour qu'il ne devienne pas un tableau de honte. */
export const ECART_SORTIE: string[] = [
  "Aucune de ces lignes ne se referme le 31 décembre. Elles se referment aujourd'hui, une par une, ou pas du tout.",
  "L'écart n'est pas une condamnation : c'est une mesure. Et une mesure, ça se réduit — mais seulement en la regardant.",
];
