// The gym program is USER-EDITABLE and stored in the DB. This module holds the
// shared types, the default program (from programme_muscu_v2 + adjustments),
// the master muscle list for the editor, and pure helpers. Client-safe.

export interface DayProgram {
  name: string; // "Upper", "Push", "REPOS"…
  cardio: string | null; // e.g. "Course 30 min — 13h00", or null
  targets: Record<string, number>; // muscle -> target sets ({} = rest day)
}

// Keys are weekday numbers as strings: "0"=Sunday … "6"=Saturday.
export type Program = Record<string, DayProgram>;

export const DAY_NAMES = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

/** Display order: Monday first, Sunday last. */
export const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

/** Muscles selectable in the editor when adding to a day. */
export const MASTER_MUSCLES = [
  "Pectoraux",
  "Dos",
  "Épaules latérales",
  "Épaules arrière",
  "Trapèzes",
  "Biceps",
  "Triceps",
  "Avant-bras",
  "Quadriceps",
  "Ischios/Fessiers",
  "Mollets",
  "Abdominaux",
];

const CARDIO = "Course 30 min — 13h00";

export const DEFAULT_PROGRAM: Program = {
  "1": {
    name: "Upper",
    cardio: CARDIO,
    targets: {
      Pectoraux: 4,
      Dos: 6,
      "Épaules latérales": 3,
      Biceps: 3,
      Triceps: 3,
    },
  },
  "2": {
    name: "Lower postérieur",
    cardio: CARDIO,
    targets: { Quadriceps: 3, "Ischios/Fessiers": 6, Mollets: 6 },
  },
  "3": { name: "REPOS", cardio: null, targets: {} },
  "4": {
    name: "Push",
    cardio: CARDIO,
    targets: { Pectoraux: 6, "Épaules latérales": 6, Triceps: 3 },
  },
  "5": {
    name: "Pull",
    cardio: CARDIO,
    targets: { Dos: 9, Biceps: 3, "Épaules arrière": 3 },
  },
  "6": {
    name: "Legs complet",
    cardio: CARDIO,
    targets: { Quadriceps: 5, "Ischios/Fessiers": 6, Mollets: 6 },
  },
  "0": { name: "REPOS", cardio: null, targets: {} },
};

export function isRest(d: DayProgram): boolean {
  return !d.targets || Object.keys(d.targets).length === 0;
}

/** Is the given weekday (0=Sun … 6=Sat) a total-rest day in this program? */
export function isRestDay(program: Program, weekday: number): boolean {
  const d = program[String(weekday)];
  return !d || isRest(d);
}

/** Today's muscu objective label, driven by the program (session or rest). */
export function gymSessionLabel(program: Program, weekday: number): string {
  const d = program[String(weekday)];
  if (!d || isRest(d)) return "Repos total — aucune séance";
  return `Muscu 10h30 — ${d.name} (${dayTotalSets(d)} séries)`;
}

/** Target muscles for a day, ordered by the master list then any extras. */
export function orderedMuscles(d: DayProgram): string[] {
  const keys = Object.keys(d.targets);
  const known = MASTER_MUSCLES.filter((m) => keys.includes(m));
  const extras = keys.filter((k) => !MASTER_MUSCLES.includes(k));
  return [...known, ...extras];
}

export function dayTotalSets(d: DayProgram): number {
  return Object.values(d.targets).reduce((a, b) => a + b, 0);
}

/** Weekly volume per muscle across all days, ordered. */
export function weeklyVolume(p: Program): { muscle: string; sets: number }[] {
  const totals: Record<string, number> = {};
  for (const day of Object.values(p)) {
    for (const [m, s] of Object.entries(day.targets)) {
      totals[m] = (totals[m] ?? 0) + s;
    }
  }
  const order = [
    ...MASTER_MUSCLES.filter((m) => totals[m] > 0),
    ...Object.keys(totals).filter((m) => !MASTER_MUSCLES.includes(m)),
  ];
  return order.map((m) => ({ muscle: m, sets: totals[m] }));
}

/** Sanitize an arbitrary object into a valid Program (used before persisting). */
export function normalizeProgram(input: unknown): Program {
  const out: Program = {};
  const src = (input ?? {}) as Record<string, unknown>;
  for (const k of ["0", "1", "2", "3", "4", "5", "6"]) {
    const raw = (src[k] ?? {}) as Partial<DayProgram>;
    const targets: Record<string, number> = {};
    const rawTargets = (raw.targets ?? {}) as Record<string, unknown>;
    for (const [m, v] of Object.entries(rawTargets)) {
      const n = Math.max(0, Math.min(50, Math.floor(Number(v) || 0)));
      if (n > 0) targets[String(m).slice(0, 40)] = n;
    }
    out[k] = {
      name: String(raw.name ?? DAY_NAMES[Number(k)]).slice(0, 40) || "REPOS",
      cardio:
        typeof raw.cardio === "string" ? raw.cardio.slice(0, 60) : null,
      targets,
    };
  }
  return out;
}
