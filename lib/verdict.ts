import { CHAPTER_TITLES } from "./vaisseau-meta";
import { CHECKLIST } from "./checklist";
import { ABSOLUTE_RULES } from "./rules";

/** Short display label per item id (for the verdict header lines). */
export const ITEM_LABEL: Record<string, string> = {
  ...Object.fromEntries(
    CHECKLIST.flatMap((s) => s.items).map((i) => [i.id, i.label]),
  ),
  ...Object.fromEntries(ABSOLUTE_RULES.map((r) => [r.id, r.label])),
};

interface ItemVerdict {
  chapter: number;
  gravity: number; // higher = graver; drives single-failure chapter + ordering
  domino: string[];
}

// The cascade for the "vidéos discipline" sas item (mental warm-up before work).
const DISCIPLINE_DOMINO = [
  "Rappel de discipline sauté. Tu es entré dans le bloc sans armer le mental.",
  "Le préfrontal doit être rappelé à son poste — sinon le limbique commande (ch. 4).",
  "Sans ce sas, la première distraction gagne, et tu appelles ça « manque de motivation ».",
  "Ce n'était pas la motivation qui manquait. C'était l'entrée que tu as sautée.",
];

export const VERDICTS: Record<string, ItemVerdict> = {
  // ——— OBJECTIFS DU JOUR ———
  lecture: {
    chapter: 25,
    gravity: 5,
    domino: [
      "Lecture du jour non faite. Tu n'as pas ouvert le Vaisseau — tu avances à l'aveugle.",
      "Par manque de connaissance, l'homme est détruit (ch. 25). Ce n'est pas un manque de temps, c'est un manque de faim.",
      "Chaque jour sans lecture, l'ancienne version de toi reprend le micro que le livre devait couvrir.",
      "5 chapitres. Le prix d'une vidéo scrollée. Aujourd'hui tu as choisi le scroll.",
    ],
  },
  // ——— MATIN ———
  wake: {
    chapter: 4,
    gravity: 8,
    domino: [
      "Tu ne t'es pas levé à 5h00. Ton premier acte du jour fut une reddition.",
      "Le limbique a battu le préfrontal avant même que tes pieds touchent le sol (ch. 4). Tu as appris à ton cerveau qu'une envie annule une décision.",
      "Le bloc de deep work du matin est déjà amputé — et tu sais que tu ne le rattraperas pas.",
      "Une journée qui commence par « 10 minutes de plus » se termine par dix entorses. Ce n'était pas petit : c'était la première pièce du domino.",
    ],
  },
  meal: {
    chapter: 1,
    gravity: 5,
    domino: [
      "Tu n'as pas rempli le vaisseau. 1000 kcal, ce n'était pas un caprice — c'était le carburant.",
      "On ne verse pas la grâce dans un récipient vide, et on ne bâtit pas du muscle sur rien (ch. 1).",
      "Ta séance sera plus faible, ta concentration chutera à 15h, ta volonté du soir sera creuse.",
      "Le vaisseau vide ne tient pas la parole qu'un vaisseau plein tient sans effort.",
    ],
  },
  meditation: {
    chapter: 120,
    gravity: 7,
    domino: [
      "Pas de méditation. L'antenne est restée désaccordée toute la journée (ch. 16).",
      "Quand je dis méditation, c'est méditation — pas « si j'ai le temps » (ch. 120).",
      "Sans elle, tes décrets tombent dans un système nerveux agité qui ne les porte pas.",
      "Tu as troqué 15 minutes de présence contre une journée de réactivité.",
    ],
  },
  run: {
    chapter: 119,
    gravity: 7,
    domino: [
      "Tu n'as pas couru. Le corps est resté au sol, et l'esprit suit toujours le corps.",
      "Quand je dis montagne, c'est montagne (ch. 119). « Pas aujourd'hui » est la phrase qui a enterré mille hommes.",
      "Ton énergie ne s'est pas mise en mouvement — elle stagnera, puis cherchera à se décharger ailleurs, mal.",
      "Le jour où courir devient négociable, tout devient négociable.",
    ],
  },
  bible: {
    chapter: 31,
    gravity: 6,
    domino: [
      "Psaume 24 non récité, chapitres non lus. Tu as laissé le canal fermé (ch. 31).",
      "Ce n'est pas un rituel décoratif : c'est l'opération qui protège ce qui se manifeste.",
      "Sans la Parole le matin, tu affrontes la journée avec tes seules forces — et elles ne suffisent pas.",
      "Tu as laissé ouverte la porte que ces versets étaient censés fermer.",
    ],
  },
  hair: {
    chapter: 77,
    gravity: 2,
    domino: [
      "Brossage sauté. « C'est rien. » Exactement — et c'est tout le problème.",
      "Une petite décision n'est jamais petite : elle confirme une trajectoire (ch. 77).",
      "L'homme qui néglige le petit s'entraîne à négliger. Le muscle du sérieux s'atrophie sur les détails.",
      "Ce ne sont pas les cheveux. C'est la preuve que « négociable » est entré dans ta journée.",
    ],
  },
  goals: {
    chapter: 44,
    gravity: 5,
    domino: [
      "Images des goals non ouvertes. Tu n'as pas habité la fin ce matin.",
      "On manifeste depuis l'accompli, pas depuis le manque (ch. 44). Aujourd'hui tu as vécu depuis le manque.",
      "Tu as laissé le monde dicter ton état intérieur au lieu de le décréter.",
      "L'aigle porte ce que tu écris — mais seulement si tu le regardes et le crois.",
    ],
  },
  manifesto_am: {
    chapter: 124,
    gravity: 6,
    domino: [
      "Manifeste non déclaré. Ta parole tenue à toi-même a plié dès le matin (ch. 124).",
      "Ce que tu ne te dis pas, l'époque te le dit à ta place — et elle ment.",
      "Un homme devient la voix qu'il écoute le plus. Aujourd'hui, ce n'était pas la tienne.",
      "La bouche qui ne décrète pas laisse le doute décréter.",
    ],
  },
  // ——— DEEP WORK / APRÈS-MIDI ———
  discipline_v1: { chapter: 4, gravity: 4, domino: DISCIPLINE_DOMINO },
  dw1: {
    chapter: 80,
    gravity: 7,
    domino: [
      "Deep work du matin manqué. Le seul bloc où le monde ne te réclame rien — gâché.",
      "Ce que tu fais à ces heures détermine où tu seras dans dix ans (ch. 80).",
      "Un livrable concret de moins. Multiplié par 365, c'est une autre vie.",
      "L'ambition sans le bloc n'est qu'un fantasme qui te fait te sentir en mouvement pendant que tu stagnes.",
    ],
  },
  dw2: {
    chapter: 126,
    gravity: 7,
    domino: [
      "Deuxième bloc de deep work manqué. L'après-midi est parti en fumée.",
      "La journée se juge à ce qu'elle a produit, pas à ce qu'elle a ressenti (ch. 126).",
      "Deux blocs prévus, un seul tenu : tu désapprends à exécuter sans envie.",
      "Le projet n'attend pas ton humeur. Il attend tes heures.",
    ],
  },
  tiktok: {
    chapter: 80,
    gravity: 6,
    domino: [
      "4 TikTok non postés. La machine que tu construis est restée muette aujourd'hui.",
      "Ce sont les micro-actions répétées qui basculent une trajectoire, pas les grands coups (ch. 80).",
      "Zéro post aujourd'hui = zéro composé demain. L'algorithme oublie qui disparaît.",
      "Tu n'as pas « manqué de temps ». Tu as manqué la décision de dix minutes.",
    ],
  },
  youtube: {
    chapter: 81,
    gravity: 6,
    domino: [
      "6 YouTube non postés. La distribution que tu prétends vouloir, tu l'as sabotée par l'absence.",
      "L'inertie du parcours va dans les deux sens (ch. 81) : ne rien poster renforce le ne-rien-poster.",
      "Chaque jour sans upload, ta version passive gagne sur ta version qui construit.",
      "Le rêve ne se réalise pas les jours où tu ne le nourris pas.",
    ],
  },
  // ——— CORPS ———
  gym: {
    chapter: 119,
    gravity: 8,
    domino: [
      "Séance manquée ou trichée. Le corps que tu réclames, tu ne l'as pas payé aujourd'hui.",
      "Quand je dis séance, c'est séance — 0 cheat (ch. 119).",
      "Le muscle ne négocie pas et ne ment pas : il rend exactement ce que tu déposes.",
      "Un jour sauté n'est pas neutre. C'est un retrait sur le compte que tu voulais remplir.",
    ],
  },
  fasting: {
    chapter: 1,
    gravity: 6,
    domino: [
      "Fenêtre de jeûne brisée. Tu as mangé quand tu devais laisser le vaisseau travailler.",
      "Le jeûne plénifie le vaisseau, libère l'attention, concentre l'énergie (ch. 1–2).",
      "Chaque entorse rééduque le corps à réclamer — et l'homme qui obéit à ses réclamations n'est pas libre.",
      "Ce n'était pas la faim. C'était l'habitude de céder à la faim.",
    ],
  },
  // ——— SOIR ———
  no_face: {
    chapter: 121,
    gravity: 4,
    domino: [
      "Tu as touché ton visage — encore. Une main qui monte sans que tu l'aies décidé.",
      "C'est exactement ça, le limbique aux commandes (ch. 121) : le corps agit avant que tu choisisses.",
      "Si tu ne maîtrises pas ce geste minuscule, quelle parole plus grande tiendras-tu ?",
      "La souveraineté se prouve sur le plus petit mouvement, pas dans les grands discours.",
    ],
  },
  skincare: {
    chapter: 77,
    gravity: 2,
    domino: [
      "Routine peau sautée. « Demain. » C'est toujours demain, et demain ne vient jamais pour le négligent.",
      "La constance sur l'insignifiant est l'école de la constance sur l'essentiel (ch. 77).",
      "Ce que tu laisses tomber quand personne ne regarde définit qui tu es.",
      "Petit soin manqué, petit reniement acté.",
    ],
  },
  manifesto_pm: {
    chapter: 124,
    gravity: 6,
    domino: [
      "Manifeste du soir non déclaré. Deux fois dans la journée, ta parole a plié.",
      "La parole tenue à soi-même est le fondement de toute autre parole (ch. 114, 124).",
      "Dit une fois, un manifeste est un souhait ; répété, c'est une identité. Tu ne l'as pas construite.",
      "Le soir sans déclaration laisse la nuit murmurer l'ancienne version de toi.",
    ],
  },
  affirmations: {
    chapter: 45,
    gravity: 5,
    domino: [
      "Affirmations du soir sautées. Tes dernières pensées du jour furent des pensées subies.",
      "La parole décrète — même celle que tu ne prononces pas volontairement (ch. 45).",
      "Le vide que tu ne remplis pas d'affirmations, la peur le remplit de scénarios.",
      "Tu choisis tes mots, ou tes mots te choisissent.",
    ],
  },
  no_screen: {
    chapter: 11,
    gravity: 7,
    domino: [
      "Écran après 21h30. Tu as rouvert la ferme énergétique au moment où il fallait fermer (ch. 11).",
      "Le scroll du soir vole le sommeil, et le sommeil volé vole le 5h00 de demain.",
      "Vois le domino : un écran ce soir → réveil raté demain → journée amputée → soir faible → écran encore.",
      "Ce n'était pas « juste 5 minutes ». C'était la brèche par où toute la spirale rentre.",
    ],
  },
  room_clean: {
    chapter: 9,
    gravity: 6,
    domino: [
      "Chambre laissée sale. Le lieu où tu dors est le lieu où ton vaisseau se recharge — ou se fait piller (ch. 9).",
      "C'est une consigne directe de l'alliance de la montagne, pas une corvée optionnelle.",
      "Un espace en désordre est un esprit en désordre : tu dors dans le chaos, tu te réveilles dispersé.",
      "Garder ta chambre propre, c'est garder propre le temple où l'alliance opère.",
    ],
  },
  ps24_pm: {
    chapter: 31,
    gravity: 8,
    domino: [
      "Psaume 24 du soir non récité, prière non faite. Tu es entré dans le sommeil sans sceller ta nuit dans Sa présence.",
      "C'est une consigne DIRECTE de l'alliance de la montagne (2021), pas une option (ch. 31).",
      "Le dernier état de conscience imprègne la nuit ; tu y es entré vide au lieu d'y entrer scellé.",
      "Rompre la consigne, c'est fissurer le pacte qui rend tout le reste possible.",
    ],
  },
  // ——— RÈGLES ABSOLUES ———
  rule_retention: {
    chapter: 8,
    gravity: 10,
    domino: [
      "Tu as rompu la rétention. Ce n'est pas un écart — c'est le vaisseau percé à sa source (ch. 8).",
      "Tu n'es pas revenu à zéro : tu es passé en négatif, et il faudra des jours pour seulement neutraliser (ch. 8, 20).",
      "Le seuil des trois semaines que tu montais s'est effondré. Toute l'énergie que tu bâtissais attendait là.",
      "C'est LE zéro absolu : une main qui se vide ne bâtit pas ces choses, ni ne les contient.",
    ],
  },
  rule_porn: {
    chapter: 8,
    gravity: 10,
    domino: [
      "Tu as brisé le 0 porn. Ce n'est pas une rechute — c'est une destruction du vaisseau (ch. 8).",
      "Tu n'es pas revenu à zéro : tu es passé en territoire négatif, et il faudra des jours pour seulement neutraliser (ch. 8, 20).",
      "Le seuil des trois semaines que tu montais s'est effondré. La prochaine ascension repart plus bas.",
      "C'est la seule entorse qui n'est jamais « petite » : elle annule la possibilité même de ce que tu construis.",
    ],
  },
  rule_tiktok: {
    chapter: 117,
    gravity: 9,
    domino: [
      "Tu as scrollé. 0 TikTok est 0 — pas 1, pas 2, pas exceptionnellement (ch. 117).",
      "Chaque « juste une vidéo » réécrit ta dopamine pour préférer la stimulation à la complétion.",
      "Tu as donné ton attention — ta seule vraie monnaie — à une machine conçue pour la prendre (ch. 11).",
      "Le zéro n'était pas un chiffre. C'était une frontière. Tu l'as effacée.",
    ],
  },
  rule_sugar: {
    chapter: 118,
    gravity: 7,
    domino: [
      "Sucre / gazeux / jus : le zéro absolu est tombé (ch. 118).",
      "Un pic de dopamine cheap aujourd'hui abaisse le seuil de tout ce qui demande de l'effort demain.",
      "Le palais que tu habitues à la facilité réclamera la facilité partout.",
      "Ce n'est pas le sucre le problème. C'est le « une exception » que tu viens de valider.",
    ],
  },
  rule_music: {
    chapter: 12,
    gravity: 6,
    domino: [
      "Musique — la consommation invisible qui remplit le silence où la présence devait être (ch. 12).",
      "Tu as anesthésié l'inconfort au lieu de l'habiter. L'antenne reste couverte de bruit.",
      "Le silence était le lieu du travail. Tu l'as bouché.",
      "Ce que tu ne peux pas supporter en silence te commande.",
    ],
  },
  rule_youtube: {
    chapter: 11,
    gravity: 7,
    domino: [
      "YouTube surf. Tu es entré pour « une chose » et l'algorithme a pris l'heure suivante (ch. 11).",
      "Upload seulement — pas consommation. Tu as inversé le rapport : nourri la machine au lieu de la tienne.",
      "Chaque minute de surf est une minute retirée à ce que tu prétends construire.",
      "Le créateur qui consomme comme un spectateur redevient spectateur.",
    ],
  },
  rule_cheat: {
    chapter: 122,
    gravity: 9,
    domino: [
      "Tu as triché sur le programme. Le coût d'une entorse n'est pas l'entorse — c'est la fissure (ch. 122).",
      "Une parole trahie une fois s'apprend à se trahir. Le cerveau enregistre : « mes règles sont négociables ».",
      "Ce que tu appelles exception, ton futur toi l'appellera le début de la fin.",
      "L'homme de dominion ne triche pas quand personne ne voit — surtout quand personne ne voit (ch. 116).",
    ],
  },
  rule_apps: {
    chapter: 10,
    gravity: 7,
    domino: [
      "Une app interdite touchée ou réinstallée. Tu as rouvert la porte que tu avais condamnée (ch. 10).",
      "L'architecture de ces plateformes est conçue pour te reprendre — ta volonté seule ne gagne pas contre le design.",
      "Tant qu'elle habite ta poche, ta foi opère dans un environnement qui la sabote en continu (ch. 11).",
      "Tu n'as pas « juste regardé ». Tu as rétabli le sabotage.",
    ],
  },
  rule_pretexte: {
    chapter: 76,
    gravity: 9,
    domino: [
      "Tu as négocié. Un prétexte, une exception, une clause — la seule chose vraiment interdite (ch. 76).",
      "On ne négocie pas la parole donnée à soi-même. Dès qu'on négocie, on a déjà perdu (ch. 90).",
      "Le prétexte est le langage de l'ego qui rabote l'infini pour le rendre gérable.",
      "Ce n'est pas la circonstance qui t'a arrêté. C'est que tu aies accepté de discuter.",
    ],
  },
  rule_daydream: {
    chapter: 33,
    gravity: 6,
    domino: [
      "Daydream laissé courir, sans STOPP. L'esprit est parti au cinéma pendant que la vie attendait.",
      "Cesser de ruminer et prier à la place (ch. 33) : tu as ruminé au lieu de prier.",
      "Chaque rêverie non coupée creuse le sillon d'une réalité que tu ne veux pas.",
      "Ton mental est une arme, pas une salle de projection. Aujourd'hui tu l'as prêté à l'ennemi.",
    ],
  },
};

// Cardinal breaches too grave to defer to the generic "tyranny" chapter.
const CARDINAL_CHAPTER: Record<string, number> = {
  rule_retention: 8,
  rule_porn: 8,
  rule_cheat: 122,
  rule_pretexte: 76,
};

export interface VerdictFailure {
  id: string;
  label: string;
  chapter: number;
  chapterTitle: string;
  domino: string[];
}

export interface Verdict {
  count: number;
  headline: string;
  failures: VerdictFailure[];
  assignedChapter: number;
  assignedChapterTitle: string;
  obligation: string;
  closing: string;
}

/**
 * Builds the day's verdict from the set of explicitly-failed item ids.
 * Chapter assignment: 1 failure → its own chapter; 2+ → ch.77 (la tyrannie des
 * petites décisions), unless a cardinal rule was broken → that rule's chapter.
 */
export function buildVerdict(failedIds: string[]): Verdict | null {
  const ids = failedIds.filter((id) => id in VERDICTS);
  if (ids.length === 0) return null;

  const failures: VerdictFailure[] = ids
    .map((id) => ({
      id,
      label: ITEM_LABEL[id] ?? id,
      chapter: VERDICTS[id].chapter,
      chapterTitle: CHAPTER_TITLES[VERDICTS[id].chapter] ?? "",
      domino: VERDICTS[id].domino,
      gravity: VERDICTS[id].gravity,
    }))
    .sort((a, b) => b.gravity - a.gravity)
    .map(({ gravity: _g, ...rest }) => rest);

  const count = ids.length;

  // Assigned chapter.
  let assignedChapter: number;
  const cardinal = ids.find((id) => id in CARDINAL_CHAPTER);
  if (count === 1) {
    assignedChapter = VERDICTS[ids[0]].chapter;
  } else if (cardinal) {
    assignedChapter = CARDINAL_CHAPTER[cardinal];
  } else {
    assignedChapter = 77; // la tyrannie des petites décisions
  }

  const headline =
    count === 1
      ? "UNE ENTORSE. Tu la crois isolée. Elle ne l'est jamais."
      : `${count} REDDITIONS AUJOURD'HUI. Ce n'est pas 1 + 1 : c'est une réaction en chaîne.`;

  const assignedChapterTitle = CHAPTER_TITLES[assignedChapter] ?? "";
  const obligation = `Obligation : lis le chapitre ${assignedChapter} — « ${assignedChapterTitle} ». Maintenant, pas plus tard.`;

  const closing =
    count === 1
      ? "Coupe-la ici. Une entorse reconnue et arrêtée ne devient pas une spirale."
      : "Chaque chose non respectée cause la suivante. C'est ça, la tyrannie des petites décisions — et tu viens de la nourrir.";

  return {
    count,
    headline,
    failures,
    assignedChapter,
    assignedChapterTitle,
    obligation,
    closing,
  };
}
