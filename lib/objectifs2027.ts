// AVANT 2027 — la liste, telle qu'il l'a dictée, et ce qu'il a oublié.
//
// C'est la dernière chose qu'il a demandé d'ajouter avant d'arrêter d'ajouter.
// Elle n'est pas affichée comme la Vision — la Vision se contemple et reste
// fermée trente jours. Celle-ci vit dans l'écran de pression, parce qu'elle
// n'est pas une récompense : c'est une échéance, et l'échéance ne se contemple
// pas, elle se compte à rebours.
//
// Ses cibles d'abord, sans rien adoucir. Puis ce qu'il a oublié de mentionner
// — signalé comme tel, parce qu'ajouter des objectifs à sa place sans le dire
// serait lui mettre dans la bouche des mots qu'il n'a pas prononcés.
//
// Client-safe.

export const ECHEANCE_2027 = "1er janvier 2027";

export interface CibleBloc {
  id: string;
  titre: string;
  lignes: string[];
  /** Vrai si c'est moi qui l'ajoute, pas lui. */
  ajoute?: boolean;
}

export const CIBLES_2027: CibleBloc[] = [
  {
    id: "corps",
    titre: "Le corps",
    lignes: [
      "1m88 · 90 kg · 10 % de masse grasse.",
      "Un corps plus que parfait — à mon goût, pas au goût d'un autre.",
      "Membre viril : 18 cm.",
      "Rétention totale : 0 porno, 0 masturbation. La condition de l'alliance, pas une hygiène.",
    ],
  },
  {
    id: "apparence",
    titre: "La peau, le visage, la tête",
    lignes: [
      "Peau saine, brillante, éclatante. Plus un seul bouton.",
      "Les waves faites, tenues, entretenues.",
      "Dents propres et blanches. Barbe nette. Parfum tous les jours.",
      "Beauté au sommet : qu'on voie la discipline avant que j'ouvre la bouche.",
    ],
  },
  {
    id: "argent",
    titre: "L'argent",
    lignes: [
      "20 000 $ minimum par jour. Minimum.",
      "Soit 600 000 $ par mois. Soit plus de 7 millions sur l'année.",
      "Pas de l'argent reçu : de l'argent produit par ce que j'ai bâti.",
    ],
  },
  {
    id: "chantiers",
    titre: "Les chantiers commencés",
    lignes: [
      "Commencer à construire tout ce que j'ai planifié — surtout l'immobilier.",
      "Achat de terrain. Premiers murs sortis de terre.",
      "Agriculture lancée. Début de construction d'une école.",
      "Pas des annonces : des chantiers que quelqu'un peut aller voir.",
    ],
  },
  {
    id: "independance",
    titre: "L'indépendance",
    lignes: [
      "Vivre seul. Quitter la maison de mes parents.",
      "Mon propre toit, mes propres règles, mes propres heures.",
      "Personne au-dessus de moi à qui rendre des comptes sur ma journée.",
    ],
  },
  {
    id: "voitures",
    titre: "Les trois voitures — fin 2026",
    lignes: [
      "Mercedes-AMG GLE 63 Coupé.",
      "Cadillac Escalade.",
      "Range Rover Sport.",
      "Chaque clé est une facture de discipline déjà payée.",
    ],
  },

  // ——— À partir d'ici, ce n'est plus lui qui parle ———
  {
    id: "oublie-corps",
    titre: "Ce que tu as oublié — le corps et la santé",
    ajoute: true,
    lignes: [
      "Se lever à 4h30 et dormir à 21h45 sans y penser. L'horaire devenu un réflexe, pas un combat.",
      "Courir sans être essoufflé. Un corps athlétique, pas seulement musclé.",
      "La montagne le dimanche et le jeudi, toute l'année, sans exception.",
      "Sang, dents, yeux, dos : tout vérifié une fois. Un homme qui bâtit trente ans doit savoir sur quoi il compte.",
    ],
  },
  {
    id: "oublie-esprit",
    titre: "Ce que tu as oublié — l'esprit et l'alliance",
    ajoute: true,
    lignes: [
      "L'Ancien Testament fini, page par page.",
      "Les quatre consignes tenues toute l'année : la montagne, le Psaume 24, Lui parler, ma chambre.",
      "Zéro rêverie automatique. L'habitude éteinte, pas seulement surveillée.",
      "Les 587 pages du Vaisseau appliquées, pas relues.",
    ],
  },
  {
    id: "oublie-oeuvre",
    titre: "Ce que tu as oublié — l'œuvre",
    ajoute: true,
    lignes: [
      "Une entreprise qui existe légalement, avec un nom, un compte, des clients et des employés payés.",
      "Une chose livrée que des inconnus utilisent sans savoir qui l'a faite.",
      "Les 12 heures de deep work tenues comme un standard, plus comme un exploit.",
      "Le permis de pilote commencé.",
    ],
  },
  {
    id: "oublie-homme",
    titre: "Ce que tu as oublié — l'homme",
    ajoute: true,
    lignes: [
      "Parler devant des gens sans que la voix tremble.",
      "Un cercle d'hommes qui tiennent leur parole, choisis, pas subis.",
      "Trente jours prouvés — puis quatre-vingt-dix, puis trois cent soixante-cinq.",
      "Un premier acte concret pour Haïti. Petit s'il le faut, mais fait et daté.",
      "Et la seule qui les résume toutes : être devenu un homme dont la main est libre à l'heure où Il appelle.",
    ],
  },
];

/** Le rappel qui accompagne le compte à rebours. */
export const RAPPEL_2027: string[] = [
  "Aucune de ces lignes ne s'obtient en décembre. Elles s'obtiennent aujourd'hui, ou elles ne s'obtiennent pas.",
  "Le 1er janvier 2027 arrivera de toute façon. La seule question est de savoir ce qui sera vrai ce jour-là.",
  "Ce n'est pas une liste de souhaits. C'est un décret avec une date — et une date, ça se rate.",
];
