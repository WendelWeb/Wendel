// LES DEUX ÉCHÉANCES — ce qui doit être vrai au 1er janvier 2027, et ce qui
// doit être vrai avant ses 30 ans (16 mai 2033).
//
// Les lignes de la Vision sont trop longues pour être répétées sept fois à
// voix haute : une seule prendrait une minute. Elles sont donc reformulées ici
// en décrets courts, tirés mot pour mot du contenu de la Vision, taillés pour
// la répétition. Client-safe.

export const DATE_JANVIER = "2027-01-01";
export const DATE_TRENTE_ANS = "2033-05-16";

/** Ce qui doit être vrai au 1er janvier 2027. À répéter. */
export const OBJECTIFS_2027: string[] = [
  "Au 1er janvier : 1m88, 90 kilos, 10% de masse grasse.",
  "Au 1er janvier : zéro porno, zéro masturbation, zéro TikTok, zéro sucre, zéro gazeuse. Rétention totale.",
  "Au 1er janvier : la peau éclatante, la beauté au sommet.",
  "Au 1er janvier : les chantiers sont sortis de terre. En construction, pas en projet.",
  "Au 1er janvier : le terrain est acheté. L'école est commencée.",
  "Au 1er janvier : l'agriculture est lancée, et elle produit.",
  "Au 1er janvier : GLE 63 Coupé, Escalade, Range Rover Sport. Achetées, pas rêvées.",
  "Au 1er janvier : des gens réellement aidés, de mes mains, pas en paroles.",
  "Au 1er janvier : ma parole tenue chaque jour, sans une seule entorse.",
  "Au 1er janvier : le Vaisseau lu en entier, plusieurs fois, et incarné.",
  "Au 1er janvier : le miroir ne mentira pas. Il montrera l'homme que j'ai décidé d'être.",
  "Je ne m'intéresse pas à ce qui est possible. Je m'intéresse à la discipline et à la foi qui rendent l'impossible possible.",
];

/** Ce qui doit être vrai avant ses 30 ans. Le défi ultime. À répéter. */
export const OBJECTIFS_2033: string[] = [
  "Avant mes 30 ans : multi-trillionnaire. Aucun homme dans l'Histoire ne l'a jamais fait.",
  "Avant mes 30 ans : tout ce qui est écrit dans cette app est déjà accompli. Pas en cours. Accompli.",
  "Avant mes 30 ans : les chantiers longs sont en construction. Grues levées, béton coulé.",
  "Avant mes 30 ans : je ne serai pas en route vers. Je serai arrivé, et le monde entier le saura.",
  "Avant mes 30 ans : 50 hôpitaux ultra-modernes, de 500 à 1 000 lits chacun.",
  "Avant mes 30 ans : 50 000 maisons modernes, données à mon peuple.",
  "Avant mes 30 ans : une société militaire privée dans le top 5 des puissances mondiales.",
  "Avant mes 30 ans : des sous-marins, des avions de chasse, une flotte qui m'appartient.",
  "Avant mes 30 ans : des ports en eau profonde et des aéroports internationaux.",
  "Avant mes 30 ans : une entreprise d'IA souveraine.",
  "Avant mes 30 ans : 100 écoles premium et une université de rang mondial.",
  "Avant mes 30 ans : 500 000 emplois formels et durables.",
  "Avant mes 30 ans : le contrôle total des ressources naturelles du pays.",
  "Avant mes 30 ans : banques, bourse, fonds souverain — l'indépendance financière d'une nation.",
  "Avant mes 30 ans : des présidents qui se déplacent pour me voir, moi.",
  "Avant mes 30 ans : mon nom dans toutes les théories du complot, et pour des millénaires.",
];

/** Jours restants avant une échéance, à partir d'une date AAAA-MM-JJ. */
export function daysUntil(from: string, target: string): number {
  const j = (d: string) => {
    const [y, m, day] = d.split("-").map(Number);
    return Math.floor(Date.UTC(y, m - 1, day) / 86_400_000);
  };
  return Math.max(0, j(target) - j(from));
}
