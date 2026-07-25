// Retention doctrine: affirmations + the 3-week protocol (ch. 20). Client-safe.

export const THRESHOLD_21 = 21;
export const THRESHOLD_90 = 90;

export const RETENTION_AFFIRMATIONS: string[] = [
  "Ma semence est ma monnaie spirituelle. Je ne la dilapide pas.",
  "Je transmute. Je ne nie pas — je redirige.",
  "L'homme plein reçoit. L'homme vidé mendie.",
  "Chaque jour retenu me rapproche du seuil. Je ne repars pas de zéro.",
  "Mon énergie sexuelle est la matière première de tout ce que je bâtis.",
  "0 porn est 0. Pas 1, pas « une fois », pas « juste pour voir ».",
  "Le vaisseau précède la grâce. Je tiens le vaisseau.",
  "Ce que je ne gaspille pas, tout ce que je pense se réalise.",
  "La honte est le carburant du piège. Je ne la nourris pas — je me relève.",
  "Mon regard reste droit. Aucune image ne me détourne.",
  "Je suis un homme de dominion absolue. Ma parole tenue me construit.",
  "Trois semaines, et quelque chose bascule que je ne pourrai plus défaire.",
];

export function randomAffirmation(): string {
  return RETENTION_AFFIRMATIONS[
    Math.floor(Math.random() * RETENTION_AFFIRMATIONS.length)
  ];
}

export interface Phase {
  from: number;
  to: number;
  title: string;
  text: string;
}

export const PROTOCOL_PHASES: Phase[] = [
  {
    from: 1,
    to: 3,
    title: "Sortie du négatif",
    text: "La charge remonte du négatif vers le neutre. Les attaques précoces sont normales — tiens.",
  },
  {
    from: 4,
    to: 14,
    title: "Montée vers le seuil",
    text: "La charge s'élève. Transmute activement : course, deep work, méditation, décrets.",
  },
  {
    from: 15,
    to: 21,
    title: "Passage du seuil",
    text: "Les transformations spontanées commencent. C'est ici que l'attaque est la plus précise — résistance maximale.",
  },
  {
    from: 22,
    to: Infinity,
    title: "Bascule",
    text: "Le seuil est franchi. Ce qui a changé ne revient plus si tu tiens. Continue.",
  },
];

export function retentionPhase(days: number): Phase {
  const d = Math.max(1, days);
  return (
    PROTOCOL_PHASES.find((p) => d >= p.from && d <= p.to) ?? PROTOCOL_PHASES[0]
  );
}
