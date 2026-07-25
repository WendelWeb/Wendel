// "Lecture du jour" — the app picks 5 random Vaisseau chapters each day
// (deterministic per date, so it's stable through the day and fresh each day).
// Reading all 5 auto-completes the `lecture` objective.

export const LECTURE_TARGET = 5;
export const LECTURE_ITEM_ID = "lecture";

const MAX_CHAPTER = 129; // exclude the épilogue (n=130) from the daily draw

function hashStr(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** The 5 chapter numbers assigned for a given date (YYYY-MM-DD), ascending. */
export function dailyChapters(dateStr: string): number[] {
  const rng = mulberry32(hashStr("vaisseau:" + dateStr));
  const pool = Array.from({ length: MAX_CHAPTER }, (_, i) => i + 1);
  for (let i = 0; i < LECTURE_TARGET; i++) {
    const j = i + Math.floor(rng() * (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, LECTURE_TARGET).sort((a, b) => a - b);
}

export interface LectureProgress {
  chapters: number[];
  readCount: number;
  done: boolean;
}

/** How many of today's assigned chapters have been read. */
export function lectureProgress(
  readChapters: Record<string, boolean> | null | undefined,
  dateStr: string,
): LectureProgress {
  const chapters = dailyChapters(dateStr);
  const read = readChapters ?? {};
  const readCount = chapters.filter((n) => read[String(n)]).length;
  return { chapters, readCount, done: readCount >= LECTURE_TARGET };
}
