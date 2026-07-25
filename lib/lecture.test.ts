import { describe, it, expect } from "vitest";
import { dailyChapters, lectureProgress, LECTURE_TARGET } from "./lecture";

describe("dailyChapters", () => {
  it("returns 5 distinct chapters in 1..129, sorted ascending", () => {
    const c = dailyChapters("2026-07-06");
    expect(c).toHaveLength(LECTURE_TARGET);
    expect(new Set(c).size).toBe(LECTURE_TARGET);
    for (const n of c) {
      expect(n).toBeGreaterThanOrEqual(1);
      expect(n).toBeLessThanOrEqual(129);
    }
    expect([...c].sort((a, b) => a - b)).toEqual(c);
  });

  it("is deterministic for the same date", () => {
    expect(dailyChapters("2026-07-06")).toEqual(dailyChapters("2026-07-06"));
  });

  it("varies across dates", () => {
    const days = [
      "2026-07-06",
      "2026-07-07",
      "2026-07-08",
      "2026-07-09",
      "2026-07-10",
    ].map((d) => dailyChapters(d).join(","));
    expect(new Set(days).size).toBeGreaterThan(1);
  });
});

describe("lectureProgress", () => {
  const date = "2026-07-06";
  const chapters = dailyChapters(date);

  it("counts only today's assigned chapters", () => {
    const readMap = { "9999": true }; // not one of the daily 5
    expect(lectureProgress(readMap, date).readCount).toBe(0);
  });

  it("counts reads within the assigned set", () => {
    const readMap = { [String(chapters[0])]: true, [String(chapters[1])]: true };
    const p = lectureProgress(readMap, date);
    expect(p.readCount).toBe(2);
    expect(p.done).toBe(false);
  });

  it("is done when all 5 are read", () => {
    const readMap = Object.fromEntries(chapters.map((n) => [String(n), true]));
    const p = lectureProgress(readMap, date);
    expect(p.readCount).toBe(5);
    expect(p.done).toBe(true);
  });

  it("handles null readMap", () => {
    expect(lectureProgress(null, date).readCount).toBe(0);
  });
});
