export interface ChecklistItem {
  id: string;
  label: string;
  time: string;
}

export interface ChecklistSectionData {
  section: string;
  color: string;
  items: ChecklistItem[];
}

export const CHECKLIST: ChecklistSectionData[] = [
  {
    section: "OBJECTIFS DU JOUR",
    color: "#0F766E",
    items: [
      {
        id: "lecture",
        label: "Lecture du jour — 5 chapitres du Vaisseau",
        time: "jour",
      },
      {
        id: "gym",
        label: "Muscu — séance selon programme (0 cheat)",
        time: "13h",
      },
      {
        id: "fasting",
        label: "Jeûne intermittent respecté — manger 9h00 à 17h00",
        time: "9h/17h",
      },
      {
        id: "no_face",
        label: "Ne pas toucher le visage — toute la journée",
        time: "permanent",
      },
      {
        id: "tiktok",
        label: "Vidéos TikTok publiées",
        time: "jour",
      },
      {
        id: "youtube",
        label: "Vidéos YouTube publiées",
        time: "jour",
      },
    ],
  },
  {
    section: "MATIN",
    color: "#0F172A",
    items: [
      { id: "wake", label: "Réveil 4h30 — eau, 0 téléphone", time: "4h30" },
      {
        id: "serment",
        label: "Serment du jour — lire les lois à voix haute",
        time: "4h32",
      },
      {
        id: "bible",
        label: "Lecture biblique 20 min — Ancien Testament + PS 24 × 3",
        time: "4h35",
      },
      {
        id: "meditation",
        label: "Méditation 20 min + affirmations positives",
        time: "4h55",
      },
      {
        id: "meal",
        label: "Préparer le repas (6 œufs + 100g pâtes + shaker) — pas encore manger",
        time: "5h15",
      },
      {
        id: "room_clean",
        label: "Chambre propre & lit fait (consigne de l'alliance)",
        time: "5h25",
      },
      {
        id: "run",
        label: "Course 30 min — matin",
        time: "5h35",
      },
      {
        id: "hair",
        label: "Brossage cheveux 5 min (cap / durag)",
        time: "6h15",
      },
      {
        id: "goals",
        label: "Images goals ouvertes (vision du matin)",
        time: "6h25",
      },
      {
        id: "manifesto_am",
        label: "Manifeste 3× à voix haute (EN → FR → Créole)",
        time: "6h35",
      },
      {
        id: "discipline_v1",
        label: "Vidéos discipline PC — 15 min",
        time: "6h45",
      },
    ],
  },
  {
    // 12 heures de deep work par jour. C'est sa décision, prise en connaissance
    // de cause : « je veux aller à l'extrême cette fois ».
    section: "DEEP WORK — 12 H",
    color: "#1E3A5F",
    items: [
      {
        id: "dw1",
        label: "Deep work bloc 1 — 6h focus (1 livrable concret)",
        time: "7h–13h",
      },
      {
        id: "dw2",
        label: "Deep work bloc 2 — 6h focus (projet différent du matin)",
        time: "14h30–20h30",
      },
    ],
  },
  {
    section: "SOIR",
    color: "#7F1D1D",
    items: [
      {
        id: "skincare",
        label: "Routine peau : nettoyant + acide salicylique + hydratant",
        time: "20h30",
      },
      {
        id: "bible_pm",
        label: "Lecture biblique 20 min — Ancien Testament",
        time: "20h40",
      },
      {
        id: "meditation_pm",
        label: "Méditation 20 min",
        time: "21h00",
      },
      {
        id: "manifesto_pm",
        label: "Manifeste 3× à voix haute (EN → FR → Créole)",
        time: "21h20",
      },
      { id: "affirmations", label: "Affirmations positives du soir", time: "21h30" },
      {
        id: "ps24_pm",
        label: "Psaume 24 + parler à Dieu — avant de dormir (consigne de l'alliance)",
        time: "21h35",
      },
      {
        id: "no_screen",
        // FORGED est la seule exception : la messe du soir se lit sur écran à
        // 21h. Sans cette clause, lire l'office casserait le noyau chaque soir.
        label: "0 écran hors travail (sauf FORGED) — coucher 21h45, tel mode avion",
        time: "21h45",
      },
    ],
  },
];

export const CHECKLIST_IDS: string[] = CHECKLIST.flatMap((s) =>
  s.items.map((i) => i.id),
);

export const CHECKLIST_COUNT = CHECKLIST_IDS.length;

/** Objectives that only exist on training days (course + muscu). On total-rest
 *  days they are hidden and excluded from the score denominator. */
export const TRAINING_ONLY_IDS: string[] = ["run", "gym"];

/** The checklist ids that count today: all of them, or all-but-training on a
 *  total-rest day. */
export function activeChecklistIds(rest: boolean): string[] {
  return rest
    ? CHECKLIST_IDS.filter((id) => !TRAINING_ONLY_IDS.includes(id))
    : CHECKLIST_IDS;
}

/**
 * Parse a time label ("5h00", "7h–11h30", "9h/17h") to minutes since midnight,
 * used to lay the day out chronologically. All-day labels ("jour", "permanent")
 * have no fixed hour, so they sort to the very end — after the timed routine.
 */
export function timeToMinutes(time: string): number {
  if (/jour|permanent/i.test(time)) return 100000;
  const m = time.match(/(\d{1,2})h(\d{2})?/);
  if (!m) return 99999;
  return parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0);
}

/**
 * Every checklist item in a single chronological list — from the start of the
 * day (5h) to its end (21h). The timed routine unfolds hour by hour first, then
 * the all-day objectives (no fixed hour) close the list. Rendered flat, without
 * the morning/afternoon/evening section labels.
 */
export const CHECKLIST_ORDERED: ChecklistItem[] = CHECKLIST.flatMap(
  (s) => s.items,
).sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
