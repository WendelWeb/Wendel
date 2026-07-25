import { describe, it, expect } from "vitest";
import { computeStreak, summarizeStreak, DayStatus } from "./streak";

const p = (date: string): DayStatus => ({ date, passed: true });
const f = (date: string): DayStatus => ({ date, passed: false });

describe("computeStreak — current", () => {
  it("no history = 0", () => {
    expect(computeStreak([], "2026-07-05").currentStreak).toBe(0);
  });

  it("today passed after gap = 1", () => {
    const h = [p("2026-06-01"), p("2026-07-05")];
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(1);
  });

  it("three consecutive days ending today = 3", () => {
    const h = [p("2026-07-03"), p("2026-07-04"), p("2026-07-05")];
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(3);
  });

  it("streak stays alive if yesterday passed but today not yet logged", () => {
    const h = [p("2026-07-03"), p("2026-07-04")];
    // today = 2026-07-05, not passed yet
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(2);
  });

  it("broken when most recent pass is older than yesterday", () => {
    const h = [p("2026-07-01"), p("2026-07-02")];
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(0);
  });

  it("a failed middle day breaks the chain", () => {
    const h = [p("2026-07-03"), f("2026-07-04"), p("2026-07-05")];
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(1);
  });

  it("today dropping below 80 removes today's contribution but keeps yesterday's chain alive", () => {
    const h = [p("2026-07-03"), p("2026-07-04"), f("2026-07-05")];
    // today failed -> anchor falls back to yesterday, chain = 2
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(2);
  });

  it("is order-independent", () => {
    const h = [p("2026-07-05"), p("2026-07-03"), p("2026-07-04")];
    expect(computeStreak(h, "2026-07-05").currentStreak).toBe(3);
  });
});

describe("computeStreak — longest", () => {
  it("finds the longest historical run", () => {
    const h = [
      p("2026-01-01"),
      p("2026-01-02"),
      p("2026-01-03"), // run of 3
      f("2026-01-04"),
      p("2026-06-10"),
      p("2026-06-11"), // run of 2 (current-ish)
    ];
    expect(computeStreak(h, "2026-06-11").longestStreak).toBe(3);
  });

  it("longest = current when the current run is the biggest", () => {
    const h = [p("2026-07-03"), p("2026-07-04"), p("2026-07-05")];
    const r = computeStreak(h, "2026-07-05");
    expect(r.longestStreak).toBe(3);
    expect(r.currentStreak).toBe(3);
  });
});

describe("summarizeStreak", () => {
  it("reports totals and never regresses longest", () => {
    const h = [p("2026-07-03"), p("2026-07-04"), p("2026-07-05")];
    const s = summarizeStreak(h, "2026-07-05", 10);
    expect(s.currentStreak).toBe(3);
    expect(s.longestStreak).toBe(10); // prevLongest wins
    expect(s.totalDaysLogged).toBe(3);
    expect(s.lastLoggedDate).toBe("2026-07-05");
  });

  it("empty history", () => {
    const s = summarizeStreak([], "2026-07-05");
    expect(s).toEqual({
      currentStreak: 0,
      longestStreak: 0,
      lastLoggedDate: null,
      totalDaysLogged: 0,
    });
  });
});
