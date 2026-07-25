import { describe, it, expect } from "vitest";
import { CHECKLIST_IDS, CHECKLIST_COUNT } from "./checklist";
import { RULE_IDS, RULES_COUNT } from "./rules";
import {
  computeScore,
  scoreColor,
  dayPassed,
  TOTAL_ITEMS,
  PASS_THRESHOLD,
} from "./scoring";

describe("constants can't silently drift", () => {
  it("has 24 checklist items", () => {
    expect(CHECKLIST_COUNT).toBe(24);
    expect(CHECKLIST_IDS.length).toBe(24);
  });
  it("has 9 rules", () => {
    expect(RULES_COUNT).toBe(9);
    expect(RULE_IDS.length).toBe(9);
  });
  it("totals 33", () => {
    expect(TOTAL_ITEMS).toBe(33);
  });
  it("has no duplicate ids across checklist + rules", () => {
    const all = [...CHECKLIST_IDS, ...RULE_IDS];
    expect(new Set(all).size).toBe(33);
  });
});

describe("computeScore", () => {
  const allTrue = () =>
    Object.fromEntries([...CHECKLIST_IDS, ...RULE_IDS].map((id) => [id, true]));

  it("empty map = 0", () => {
    const r = computeScore({});
    expect(r).toEqual({
      checklistCompleted: 0,
      rulesCompleted: 0,
      completed: 0,
      total: 33,
      percent: 0,
    });
  });

  it("null/undefined safe", () => {
    expect(computeScore(null).percent).toBe(0);
    expect(computeScore(undefined).percent).toBe(0);
  });

  it("all 33 = 100%", () => {
    const r = computeScore(allTrue());
    expect(r.completed).toBe(33);
    expect(r.percent).toBe(100);
    expect(r.checklistCompleted).toBe(24);
    expect(r.rulesCompleted).toBe(9);
  });

  it("counts checklist and rules separately", () => {
    const r = computeScore({ wake: true, rule_porn: true, rule_sugar: true });
    expect(r.checklistCompleted).toBe(1);
    expect(r.rulesCompleted).toBe(2);
    expect(r.completed).toBe(3);
    expect(r.percent).toBe(Math.round((3 / 32) * 100)); // 9
  });

  it("ignores unknown / false keys", () => {
    const r = computeScore({ wake: true, bogus: true, run: false });
    expect(r.completed).toBe(1);
  });

  it("rounds to nearest percent", () => {
    // 26/33 = 78.79 -> 79
    const ids = [...CHECKLIST_IDS, ...RULE_IDS].slice(0, 26);
    const map = Object.fromEntries(ids.map((id) => [id, true]));
    expect(computeScore(map).percent).toBe(Math.round((26 / 33) * 100));
  });
});

describe("scoreColor + dayPassed", () => {
  it("bands", () => {
    expect(scoreColor(0)).toBe("red");
    expect(scoreColor(59)).toBe("red");
    expect(scoreColor(60)).toBe("orange");
    expect(scoreColor(79)).toBe("orange");
    expect(scoreColor(80)).toBe("green");
    expect(scoreColor(100)).toBe("green");
  });
  it("pass threshold is 80", () => {
    expect(PASS_THRESHOLD).toBe(80);
    expect(dayPassed(79)).toBe(false);
    expect(dayPassed(80)).toBe(true);
  });
});
