import { describe, it, expect } from "vitest";
import { buildVerdict, VERDICTS } from "./verdict";
import { CHECKLIST_IDS } from "./checklist";
import { RULE_IDS } from "./rules";

describe("buildVerdict", () => {
  it("returns null with no failures", () => {
    expect(buildVerdict([])).toBeNull();
    expect(buildVerdict(["bogus-id"])).toBeNull();
  });

  it("single failure → that item's own chapter", () => {
    const v = buildVerdict(["wake"])!;
    expect(v.count).toBe(1);
    expect(v.assignedChapter).toBe(4);
    expect(v.headline).toMatch(/UNE ENTORSE/);
    expect(v.assignedChapterTitle.length).toBeGreaterThan(0);
  });

  it("two non-cardinal failures → ch.77 (la tyrannie)", () => {
    const v = buildVerdict(["hair", "skincare"])!;
    expect(v.count).toBe(2);
    expect(v.assignedChapter).toBe(77);
  });

  it("cardinal breach (porn) overrides to its chapter even among many", () => {
    const v = buildVerdict(["rule_porn", "wake", "hair"])!;
    expect(v.assignedChapter).toBe(8);
  });

  it("cardinal breach (cheat) → ch.122", () => {
    expect(buildVerdict(["rule_cheat", "rule_tiktok"])!.assignedChapter).toBe(
      122,
    );
  });

  it("orders failures by gravity (gravest first)", () => {
    const v = buildVerdict(["hair", "rule_porn"])!;
    expect(v.failures[0].id).toBe("rule_porn");
  });

  it("every failure carries a non-empty domino and chapter title", () => {
    const v = buildVerdict(["wake", "rule_tiktok", "dw1"])!;
    for (const f of v.failures) {
      expect(f.domino.length).toBeGreaterThan(0);
      expect(f.chapterTitle.length).toBeGreaterThan(0);
    }
  });

  it("has a verdict entry for every objective (checklist + rules)", () => {
    for (const id of [...CHECKLIST_IDS, ...RULE_IDS]) {
      expect(VERDICTS[id], `missing verdict for ${id}`).toBeDefined();
      expect(VERDICTS[id].domino.length).toBeGreaterThanOrEqual(3);
    }
  });
});
