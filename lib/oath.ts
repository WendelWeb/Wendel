// LE SERMENT DU JOUR — les lois du mantra, découpées en écrans qu'il doit
// traverser un par un, chaque matin. La répétition est ce qui ancre : lire en
// diagonale n'ancre rien, avancer écran par écran oblige à lire.
// Client-safe.

export const OATH_ITEM_ID = "serment";

export interface OathStep {
  id: string;
  label: string; // l'en-tête de l'écran
  main: string; // la ligne qu'il déclare
  sub?: string; // le prolongement
  accent: string; // couleur du fond
  gold?: boolean; // texte principal en or plutôt qu'en blanc
}

export const OATH_STEPS: OathStep[] = [
  {
    id: "promesse",
    label: "La promesse · montagne 2021",
    main: "Dieu me l'a dit : si je ne gaspille pas mon énergie, tout ce que je conçois se réalisera.",
    sub: "Ce n'est pas un espoir. C'est une alliance reçue de Sa bouche.",
    accent: "#B45309",
    gold: true,
  },
  {
    id: "existence",
    label: "Pourquoi j'existe",
    main: "Dieu ne m'a pas créé pour me répandre et me vider — mais pour me contenir, bâtir, et régner.",
    accent: "#0F172A",
  },
  {
    id: "matiere",
    label: "Ce dont je suis fait · Gn 2:7",
    main: "Mon corps, Il l'a formé de Ses mains.",
    sub: "Pour tout le reste, Il a parlé. Moi, Il m'a touché et Il a insufflé Son souffle en moi. J'ai droit à cet orgueil.",
    accent: "#0C0A09",
    gold: true,
  },
  {
    id: "main-yeux",
    label: "La main · les yeux",
    main: "Une main qui se masturbe ne bâtira pas ces choses. Des yeux qui regardent du porno ne les verront jamais.",
    sub: "Si je veux vraiment les bâtir, je respecte ma main. Si je veux vraiment les voir, je respecte mes yeux.",
    accent: "#DC2626",
  },
  {
    id: "consequence",
    label: "Loi 1 — la conséquence",
    main: "Every action has consequences.",
    sub: "Aucun acte n'est neutre. Aucun n'est petit. Le délai entre l'acte et sa facture est le piège.",
    accent: "#1E3A5F",
  },
  {
    id: "echange",
    label: "Loi 2 — l'échange",
    main: "Chaque action, aussi petite soit-elle, est un échange.",
    sub: "Calcule bien ce que tu prends et ce que tu donnes.",
    accent: "#0F766E",
  },
  {
    id: "pacte",
    label: "Loi 3 — le pacte",
    main: "Chaque action est un pacte.",
    sub: "Every second on TikTok is an agreement to hand over your energy. Avec qui tu viens de signer ?",
    accent: "#4C1D95",
  },
  {
    id: "jugement",
    label: "Le jugement que je choisis",
    main: "Qu'Il me juge arrogant du pouvoir qu'Il m'a donné — jamais pour l'avoir enterré. Qu'Il me juge conquérant — jamais lâche.",
    sub: "Je suis héritier de Dieu. Je refuse d'être un putain de rien.",
    accent: "#7F1D1D",
  },
  {
    id: "identite",
    label: "Ma réponse",
    main: "Je ne vais pas sur TikTok. Je suis le sujet dont on parle — et qui ne fane jamais.",
    sub: "Inébranlable · Démesuré · Fidèle.",
    accent: "#111827",
    gold: true,
  },
  {
    id: "source",
    label: "Ma source",
    main: "Dieu est ma source. Sa provision est illimitée. À Dieu rien n'est impossible.",
    sub: "Prier sans cesse — cette victoire entrera par la main de Dieu.",
    accent: "#B45309",
    gold: true,
  },
  {
    id: "maintenant",
    label: "L'exécution",
    main: "Je suis celui qui fait tout ça.",
    sub: "Pas dans 5 minutes. Pas plus tard. Pas lundi prochain. MAINTENANT.",
    accent: "#000000",
    gold: true,
  },
];

export const OATH_COUNT = OATH_STEPS.length;
