// LA VOIX HAUTE — une seule phrase, tirée dans tout ce que l'app contient.
//
// Il a supprimé le diaporama du serment : il ne veut plus enchaîner des écrans
// avant d'arriver à sa journée. Il veut une phrase, une seule, tirée au sort
// parmi les milliers écrites ici — et la lire à voix haute.
//
// Le choix de lire À VOIX HAUTE n'est pas décoratif. Une phrase lue en silence
// se survole ; la même phrase prononcée oblige à la parcourir en entier, au
// rythme de la parole, et il s'entend la dire. C'est la seule différence entre
// relire un mur de texte et le déclarer.
//
// Le corpus rassemble tout ce qui est déclaratif dans l'app — le miroir, les
// axiomes, la loi, les comptes, le pourquoi, l'inconfort, la décision, les
// cibles, les notes. On écarte ce qui n'est pas prononçable : identifiants,
// libellés d'interface, métadonnées de chapitres.
//
// Client-safe : que des tableaux de chaînes, aucune dépendance serveur.

import { MIROIR_LIGNES } from "./miroir";
import { MIROIR_RETOURNE_LIGNES } from "./miroir-plus";
import { AXIOMES, AXIOMES_MARTEAU } from "./axiomes";
import { SI_SERIEUX, HOMME_DIEU, HOMME_REFUS, LE_MOT_DEMAIN } from "./homme";
import {
  DEPASSEMENT,
  DECLARATION_FINALE,
  DECLARATION_SCEAU,
} from "./declaration";
import { LA_LOI, LES_PREUVES, LE_CONTRAT } from "./loi";
import { POURQUOI_SIEN, POURQUOI_VINGT } from "./pourquoi";
import {
  L_INCONFORT,
  LA_FUITE,
  L_ACCEPTATION,
  J_ACCEPTE_LE_PRIX,
  LE_TEMPS_PASSERA,
  LA_PORTE,
  LA_REPETITION,
} from "./inconfort";
import { COMPTES, QUESTIONS_COMPTES } from "./comptes";
import {
  STOP,
  BOUGE,
  CONTINUE,
  PROMESSES,
  CORPS_RAPPEL,
  ACCOMPLISSEMENTS,
  ALLIANCE_RAPPEL,
} from "./decision";
import { MANTRA_LINES } from "./mantra-lines";
import { STOPP_PHRASES } from "./stopp";
import { CIBLES_2027 } from "./objectifs2027";
import { LE_PRIX, ARBRE } from "./envie";
import { INTERROGATION_LINES, SI_TU_CEDES, DECLARATIONS } from "./sting";
import { DECISIONS_SIENNES, DECISIONS_AJOUTEES } from "./decisions";
import { RETENTION_AFFIRMATIONS } from "./affirmations";
import { SACRIFICE_POUR, SACRIFICE_OUVERTURE } from "./repetition";
import { INSTRUMENT } from "./instrument";
import { NIETZSCHE_TOUT } from "./nietzsche";
import { PAS_LE_BONHEUR } from "./pas-le-bonheur";
import { SIX_MOIS } from "./six-mois";
import { PROMESSES_MORTES } from "./promesses-mortes";
import { SEPT_ANS } from "./sept-ans";

/**
 * Tout ce qui se prononce, en une seule liste.
 *
 * L'ordre n'a aucune importance : rien ne lit cette liste de haut en bas, on
 * n'y tire qu'un index.
 */
const TOUT: string[] = [
  ...MIROIR_LIGNES,
  ...MIROIR_RETOURNE_LIGNES,
  ...AXIOMES,
  ...AXIOMES_MARTEAU,
  ...SI_SERIEUX,
  ...HOMME_DIEU,
  ...HOMME_REFUS,
  ...LE_MOT_DEMAIN,
  ...DEPASSEMENT,
  ...DECLARATION_FINALE,
  ...DECLARATION_SCEAU,
  ...LA_LOI,
  ...LES_PREUVES,
  ...LE_CONTRAT,
  ...POURQUOI_SIEN.flatMap((b) => b.lignes),
  ...POURQUOI_VINGT,
  ...L_INCONFORT,
  ...LA_FUITE,
  ...L_ACCEPTATION,
  ...J_ACCEPTE_LE_PRIX,
  ...LE_TEMPS_PASSERA,
  ...LA_PORTE,
  ...LA_REPETITION,
  ...COMPTES.flatMap((b) => b.lignes),
  ...QUESTIONS_COMPTES,
  ...STOP,
  ...BOUGE,
  ...CONTINUE,
  ...PROMESSES,
  ...CORPS_RAPPEL,
  ...ACCOMPLISSEMENTS,
  ...ALLIANCE_RAPPEL,
  ...MANTRA_LINES,
  ...STOPP_PHRASES,
  ...CIBLES_2027.flatMap((b) => b.lignes),
  ...LE_PRIX,
  ...ARBRE,
  ...INTERROGATION_LINES,
  ...SI_TU_CEDES,
  ...DECLARATIONS,
  ...DECISIONS_SIENNES,
  ...DECISIONS_AJOUTEES,
  ...RETENTION_AFFIRMATIONS,
  ...PAS_LE_BONHEUR,
  ...SIX_MOIS,
  ...PROMESSES_MORTES,
  ...SEPT_ANS,
  // Le sacrifice ne se tient pas debout tout seul : « pour l'homme que je jure
  // de devenir » n'est une phrase qu'avec son ouverture.
  ...SACRIFICE_POUR.map((d) => `${SACRIFICE_OUVERTURE} ${d}`),
  // Ce que Dieu pourrait faire de lui, et ce qu'Il trouve — les deux moitiés
  // ensemble, sinon la phrase perd sa charnière.
  ...INSTRUMENT.map((e) => `${e.mission} ${e.mais}`),
  // Nietzsche avec sa source : sans elle ce serait une phrase de motivation.
  ...NIETZSCHE_TOUT.map((n) => `« ${n.t} » — ${n.source}`),
];

/**
 * Sans doublon : dix-sept phrases vivent dans deux fichiers à la fois — le
 * miroir et la déclaration se recoupent. En laissant les doublons, elles
 * sortiraient deux fois plus souvent que les autres sans raison.
 */
export const VOIX_HAUTE: string[] = [...new Set(TOUT)];

/** Combien de phrases il peut tirer. Affiché sous la phrase du jour. */
export const VOIX_HAUTE_TOTAL = VOIX_HAUTE.length;
