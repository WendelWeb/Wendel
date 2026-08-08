// LE BINAIRE — la question n'est plus « est-ce que tu peux ». Dieu a déjà
// répondu à celle-là sur la montagne. La seule question qui reste est « veux-tu,
// oui ou non » — et il n'existe aucune troisième porte. Client-safe.

export const BINARY_FRAME_EN =
  "The question is not « can you ». God already told you that you can.";
export const BINARY_FRAME_FR =
  "La question n'est pas « est-ce que tu peux ». Dieu te l'a déjà dit : tu peux. La seule question qui reste :";

export interface BinaryQuestion {
  en: string;
  fr: string;
}

export const BINARY: BinaryQuestion[] = [
  {
    en: "Will you pay the price — or not?",
    fr: "Vas-tu payer le prix — ou pas ?",
  },
  {
    en: "Will you keep being a dog on a leash — or not?",
    fr: "Vas-tu continuer d'être un chien en laisse — ou pas ?",
  },
  {
    en: "Will you prove at every second that you are the man you think you are — or not?",
    fr: "Vas-tu prouver à chaque seconde que tu es l'homme que tu crois être — ou pas ?",
  },
  {
    en: "Will you hold the covenant today — or not?",
    fr: "Vas-tu tenir l'alliance aujourd'hui — ou pas ?",
  },
  {
    en: "Will you get up at 5 without negotiating — or not?",
    fr: "Vas-tu te lever à 5h sans négocier — ou pas ?",
  },
  {
    en: "Will you close it right now — or not?",
    fr: "Vas-tu fermer ça tout de suite — ou pas ?",
  },
  {
    en: "Will you finish what you started — or not?",
    fr: "Vas-tu finir ce que tu as commencé — ou pas ?",
  },
  {
    en: "Will you keep your word to yourself — or not?",
    fr: "Vas-tu tenir ta parole envers toi-même — ou pas ?",
  },
  {
    en: "Will you walk through the boredom without complaining — or not?",
    fr: "Vas-tu marcher dans l'ennui sans te plaindre — ou pas ?",
  },
  {
    en: "Will you become undeniable — or forgettable?",
    fr: "Vas-tu devenir indéniable — ou oubliable ?",
  },
  {
    en: "Will you build it — or die having described it?",
    fr: "Vas-tu le bâtir — ou mourir en l'ayant décrit ?",
  },
  {
    en: "Will you say no a thousand times today — or not?",
    fr: "Vas-tu dire non mille fois aujourd'hui — ou pas ?",
  },
  {
    en: "Will you have arrived at 30 — or still be on your way?",
    fr: "Seras-tu arrivé à 30 ans — ou encore « en route » ?",
  },
  {
    en: "Will you be the subject people talk about — or the one who watches?",
    fr: "Vas-tu être le sujet dont on parle — ou celui qui regarde ?",
  },
  {
    en: "Will you become the man God formed with His hands — or not?",
    fr: "Vas-tu devenir l'homme que Dieu a formé de Ses mains — ou pas ?",
  },
];

/** Les quatre gravées en dur dans le mantra ; les autres tournent ailleurs. */
export const BINARY_CORE = BINARY.slice(0, 4);
