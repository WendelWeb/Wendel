// LES PHRASES DE CHAQUE PAGE — le mantra, à plat.
//
// Ce sont les lignes gravées en haut et en bas de toutes les pages de l'app
// (composant Mantra). Elles sont reprises ici, mot pour mot, pour que la
// liturgie des emails puisse en tirer trois par envoi et les faire répéter.
// Gardées au « tu » : c'est ainsi qu'il se les est écrites, et c'est ainsi
// qu'elles le regardent en face. Client-safe.

export const MANTRA_LINES: string[] = [
  // La promesse — elle prime sur tout
  "Dieu me l'a dit : si je ne gaspille pas mon énergie, tout ce que je conçois se réalisera.",
  "Il m'a dit d'aller en montagne, de réciter le Psaume 24 avant de dormir, de Lui parler, et de garder ma chambre propre. Ceux qui se tiendront devant moi, c'est Son affaire.",

  // Le test de la foi
  "If you really believed in God, you would do exactly what He told you to do.",
  "Tu dis une chose et tu prouves le contraire par tes actes. C'est exactement ce que Jésus appelait un hypocrite.",
  "Tu dis haïr l'hypocrisie plus que tout. Voilà la tienne. Elle est dans ta main.",
  "« Ce peuple m'honore des lèvres, mais son cœur est loin de moi. » La foi sans les œuvres est morte.",

  // Pourquoi tu existes
  "Dieu ne t'a pas créé pour te répandre et te vider — mais pour te contenir, bâtir, et régner.",

  // Ce dont je suis fait — Gn 2:7
  "Pour tout le reste de la création, Il a parlé — et ce fut. Mon corps, Il l'a formé de Ses mains.",
  "Il a collé Sa bouche contre moi et y a insufflé Son propre souffle. J'ai droit à cet orgueil, à cette arrogance divine.",
  "Je refuse d'être un lâche. Je refuse d'être un masturbateur. Je refuse d'être soumis.",

  // La main · les yeux
  "Une main qui se masturbe ne pourra pas bâtir ces choses, ni les contenir. Si tu veux vraiment les bâtir, respecte ta main.",
  "Des yeux qui regardent du porno ne verront jamais un tel accomplissement. Si tu veux vraiment les voir, respecte tes yeux.",

  // Les quatre lois de l'acte
  "Every action has consequences. Aucun acte n'est neutre. Aucun n'est petit.",
  "Le délai entre l'acte et sa facture est le piège. La facture arrive toujours.",
  "Chaque action, aussi petite soit-elle, est un échange. Calcule bien ce que tu prends et ce que tu donnes.",
  "Chaque action est un pacte. Every second on TikTok is an agreement to hand over your energy. Avec qui tu viens de signer ?",
  "Every yes is a thousand no. Chaque oui est mille non.",
  "Ce que tu acceptes maintenant refuse en silence tout le reste. Regarde bien ce que tu viens de refuser.",

  // Le jugement que je choisis
  "Qu'Il me juge pour l'arrogance du pouvoir qu'Il m'a donné — jamais pour l'avoir enterré.",
  "Qu'Il me juge pour la domination, l'excès, la démesure — jamais comme un homme qui gaspille tout ce qu'Il lui confie.",
  "Qu'Il me juge conquérant — jamais lâche.",
  "Je suis héritier de Dieu. Je refuse d'être un putain de rien.",
  "Tu n'es pas un roi. Tu es un chien qui rêve d'être roi.",

  // La source
  "Dieu est ma source. Sa provision est illimitée. À Dieu rien n'est impossible — tout est possible avec Lui.",

  // L'interrogatoire
  "Ce que tu fais là, maintenant — est-ce que ça reflète la vie d'un conquérant ? Ou tu vas passer ta vie à rêver ?",
  "Je ne vais pas sur TikTok. Je suis le sujet dont on parle — et qui ne fane jamais.",

  // Aucun alibi
  "Only God and you can stop you. Et Dieu a dit qu'Il serait avec toi.",
  "Tu ne peux plus accuser les démons, le diable, la politique, le système, ton pays, ta famille, l'économie. Aucun alibi ne te reste. Seulement toi.",

  // Le binaire
  "La question n'est pas « est-ce que tu peux ». Dieu a déjà répondu. La question est : est-ce que tu vas le faire, ou non ?",
  "Il n'y a pas de troisième porte.",

  // Fire
  "God kept His word. Now keep yours.",
  "A dog with a dream is still a dog.",
  "Ten years. Zero receipts.",
  "You'll either be the story or the audience.",
  "Nobody is coming. That's the whole point.",

  // L'exécution
  "Je suis celui qui fait tout ça. Pas dans 5 minutes, pas plus tard, pas lundi prochain. MAINTENANT.",

  // Le fil continu
  "Prier sans cesse. Cette victoire entrera par la main de Dieu.",
];

export const MANTRA_LINES_COUNT = MANTRA_LINES.length;

// ——————————————————————————————————————————————————————————————
// LE CADRE — en tête et en bas de chaque email, comme sur chaque page
// ——————————————————————————————————————————————————————————————
//
// Ce bloc ne tourne pas. C'est le mur porteur : il ouvre et il ferme, toujours
// identique, exactement comme en haut et en bas de chaque écran de l'app. Le
// reste de la liturgie change d'une heure à l'autre ; ceci, jamais.

export interface MantraGroup {
  label: string;
  /** Les lignes de tête, dites d'une voix pleine. */
  lines: string[];
  /** Le prolongement, plus bas : la conséquence ou la consigne. */
  echo?: string[];
  /** Vrai quand la ligne doit être dite trois fois, en montant. */
  triple?: boolean;
}

export const MANTRA_BLOC: MantraGroup[] = [
  {
    label: "La main",
    lines: ["Une main qui se masturbe ne pourra pas bâtir ces choses, ni les contenir."],
    echo: ["Si tu veux vraiment les bâtir, respecte ta main."],
  },
  {
    label: "Les yeux",
    lines: ["Des yeux qui regardent du porno ne verront jamais un tel accomplissement."],
    echo: ["Si tu veux vraiment les voir, respecte tes yeux."],
  },
  {
    label: "La loi — aucune exception",
    lines: ["Every action has consequences."],
    triple: true,
  },
  {
    label: "La loi de l'échange",
    lines: ["Chaque action, aussi petite soit-elle, est un échange."],
    echo: [
      "Calcule bien ce que tu prends et ce que tu donnes.",
      "Ce que tu prends — ce que tu donnes.",
    ],
  },
  {
    label: "La loi du pacte",
    lines: ["Chaque action est un pacte."],
    echo: [
      "Every second on TikTok is an agreement to hand over your energy.",
      "Avec qui tu viens de signer ?",
    ],
  },
  {
    label: "Qui peut t'arrêter",
    lines: ["Only God and you can stop you."],
    echo: [
      "Tu ne peux plus accuser les démons, le diable, la politique, le système, ton pays, ta famille, l'économie, le manque d'argent, les autres.",
      "Aucun alibi ne te reste. Seulement toi.",
    ],
  },
  {
    label: "Fire",
    lines: [
      "God kept His word. Now keep yours.",
      "A dog with a dream is still a dog.",
      "Ten years. Zero receipts.",
      "You'll either be the story or the audience.",
      "Nobody is coming. That's the whole point.",
    ],
  },
  {
    label: "L'exécution",
    lines: ["Je suis celui qui fait tout ça."],
    echo: ["Pas dans 5 minutes. Pas plus tard. Pas lundi prochain.", "MAINTENANT."],
  },
];
