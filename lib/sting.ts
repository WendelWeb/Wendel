// LES PHRASES QUI PIQUENT — source unique, utilisée par le mantra (chaque page)
// et par les emails horaires. Client-safe.

/** L'interrogatoire, en trois étages : l'empire, l'homme, Dieu. */
export const INTERROGATION: { step: string; lines: string[] }[] = [
  {
    step: "L'empire",
    lines: [
      "un homme qui bâtit des hôpitaux à 1 Md, des ports à 10 Mds, des aéroports à 15 Mds ?",
      "celui qui déplace les frontières de l'Afrique, bâtit un empire neuf et domine mondialement ?",
      "celui qui contrôle la finance, la bourse, la politique, les ressources naturelles ?",
      "un maître en géopolitique — ferme et sans pitié ?",
      "un homme plus important qu'un président ou un roi — considéré comme tout-puissant, admiration totale et intimidation ?",
      "celui qui peut développer un continent entier rien qu'en le décidant ?",
    ],
  },
  {
    step: "L'homme",
    lines: [
      "la vie d'un CONQUÉRANT ?",
      "un homme qui triomphe d'abord de lui-même ?",
      "un homme qui contrôle les conséquences de chaque action ?",
      "l'homme qui avait dit qu'il couperait TikTok, Instagram — et qui donne 100% de son temps à ses objectifs ?",
      "un homme qui résiste et qui SUPPRIME l'envie, au lieu de la servir ?",
      "un homme qui marche dans l'ennui et dans la difficulté sans se plaindre ?",
      "un homme dont la parole tenue à lui-même n'a jamais plié ?",
      "un homme au vaisseau plein, qui monte l'escalier marche après marche ?",
      "un homme qui ne parle pas et qui livre — qu'on découvre au fait accompli ?",
    ],
  },
  {
    step: "Dieu",
    lines: [
      "un homme FIDÈLE À DIEU, qui garde intacte l'alliance de la montagne ?",
    ],
  },
];

/** Toutes les questions à plat, pour tirer au sort. */
export const INTERROGATION_LINES: string[] = INTERROGATION.flatMap(
  (g) => g.lines,
);

/** Ce qu'il devient à l'instant où il cède. Ses mots, gardés crus. */
export const SI_TU_CEDES: string[] = [
  "Un compulsif masturbateur. Un homme sans contrôle. Un chien en laisse mené par la luxure.",
  "Un lâche. Un putain de rien. Un mec lambda, banal, remplaçable, oubliable.",
  "Un rêveur qui se branle sur son propre avenir au lieu de le bâtir.",
  "Un empereur en pensée, un esclave en pratique.",
  "Tu prétends déplacer les frontières de l'Afrique — et tu ne contrôles même pas ta main.",
  "Tu veux dominer les marchés et les nations — et une notification te domine.",
  "Le sujet dont on parle ? Personne ne parle de toi. Personne ne sait que tu existes.",
  "Dieu t'a parlé sur une montagne — et tu Lui réponds dans un mouchoir.",
  "Tu gaspilles ce qu'Il t'a confié, et tu oses en réclamer plus.",
  "Dix ans. Rien. Zéro. Et tu te crois pressé aujourd'hui ?",
  "Tu n'es pas un roi. Tu es un chien qui rêve d'être roi.",
];

/** Les rappels d'objectifs — ce qui est repoussé quand la journée est molle. */
export const OBJECTIFS_RAPPEL: string[] = [
  "50 hôpitaux ultra-modernes, 500 à 1 000 lits chacun. Ils attendent l'homme que tu deviens aujourd'hui.",
  "50 000 maisons données à ton peuple. Chaque toit commence par un « non » que personne ne voit.",
  "2 à 4 ports en eau profonde, hubs logistiques de la Caraïbe.",
  "3 à 5 aéroports internationaux, 20 à 50 millions de passagers par an.",
  "Une entreprise d'IA souveraine : Google + SpaceX + OpenAI réunis.",
  "Une armée privée dans le TOP 3 mondial — la plus crainte, capable de frapper n'importe où.",
  "100 écoles premium et une université de rang mondial : 150 000 élèves, 2 000 leaders par an.",
  "Exploitation et contrôle TOTAL des ressources naturelles du pays.",
  "Banques, bourse, fonds souverain : l'indépendance financière d'une nation.",
  "L'immortalité biologique : repousser la mort, porter la vie humaine à 120–150 ans.",
  "Base lunaire, projets martiens, satellites — le contrôle stratégique de l'espace.",
  "Devenir l'homme le plus riche du monde. Ce n'est pas une image : c'est une ligne du plan.",
  "GLE 63 Coupé, Escalade, Range Rover Sport — fin 2026. Elles s'achètent en jours tenus.",
  "1m88 · 90 kg · 10% BF · peau éclatante. Au 1er janvier, le miroir ne mentira pas.",
  "Des présidents qui se déplacent pour te visiter, TOI — pas le président de ton pays.",
  "Ton nom qui résonne pendant des millénaires, et hante toutes les théories du complot.",
];

/** Les déclarations d'identité — l'antidote, à lire à voix haute. */
export const DECLARATIONS: string[] = [
  "Je ne vais pas sur TikTok. Je suis le sujet dont on parle — et qui ne fane jamais.",
  "Je suis héritier de Dieu. Je refuse d'être un putain de rien.",
  "Inébranlable · Démesuré · Fidèle.",
  "Je suis celui qui fait tout ça. Pas dans 5 minutes, pas plus tard, pas lundi prochain. MAINTENANT.",
  "Mon corps, Il l'a formé de Ses mains. J'ai droit à cet orgueil.",
  "Je ne parle pas, je ne débats pas, je n'opine pas. Je FAIS. J'AGIS.",
  "Dieu est ma source. Sa provision est illimitée. À Dieu rien n'est impossible.",
  "Je refuse d'être un lâche. Je refuse d'être un masturbateur. Je refuse d'être soumis.",
];
