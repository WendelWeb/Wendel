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
import {
  DEFAULT_PLAN,
  normalizePlan,
  planCoreIds,
  planCoreStatus,
  orderedObjectives,
  planRules,
  planMinutes,
} from "./plan";

// Le plan par défaut est la journée écrite dans le code. Ces bornes existent
// pour qu'un ajout d'objectif ou de règle ne passe pas inaperçu.
const OBJECTIFS = 24;
const REGLES = 10;
const TOTAL = OBJECTIFS + REGLES;

describe("constants can't silently drift", () => {
  it(`has ${OBJECTIFS} checklist items`, () => {
    expect(CHECKLIST_COUNT).toBe(OBJECTIFS);
    expect(CHECKLIST_IDS.length).toBe(OBJECTIFS);
  });
  it(`has ${REGLES} rules`, () => {
    expect(RULES_COUNT).toBe(REGLES);
    expect(RULE_IDS.length).toBe(REGLES);
  });
  it(`totals ${TOTAL}`, () => {
    expect(TOTAL_ITEMS).toBe(TOTAL);
  });
  it("has no duplicate ids across checklist + rules", () => {
    const all = [...CHECKLIST_IDS, ...RULE_IDS];
    expect(new Set(all).size).toBe(TOTAL);
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
      total: TOTAL,
      percent: 0,
    });
  });

  it("null/undefined safe", () => {
    expect(computeScore(null).percent).toBe(0);
    expect(computeScore(undefined).percent).toBe(0);
  });

  it(`all ${TOTAL} = 100%`, () => {
    const r = computeScore(allTrue());
    expect(r.completed).toBe(TOTAL);
    expect(r.percent).toBe(100);
    expect(r.checklistCompleted).toBe(OBJECTIFS);
    expect(r.rulesCompleted).toBe(REGLES);
  });

  it("counts checklist and rules separately", () => {
    const r = computeScore({ wake: true, rule_porn: true, rule_sugar: true });
    expect(r.checklistCompleted).toBe(1);
    expect(r.rulesCompleted).toBe(2);
    expect(r.completed).toBe(3);
    expect(r.percent).toBe(Math.round((3 / TOTAL) * 100));
  });

  it("ignores unknown / false keys", () => {
    const r = computeScore({ wake: true, bogus: true, run: false });
    expect(r.completed).toBe(1);
  });

  it("rounds to nearest percent", () => {
    const ids = [...CHECKLIST_IDS, ...RULE_IDS].slice(0, 26);
    const map = Object.fromEntries(ids.map((id) => [id, true]));
    expect(computeScore(map).percent).toBe(Math.round((26 / TOTAL) * 100));
  });

  // Le plan est éditable : le dénominateur doit suivre ce qu'il a écrit, sinon
  // une journée personnalisée ne pourrait jamais atteindre 100%.
  it("suit les identifiants du plan quand on les lui passe", () => {
    const r = computeScore({ a: true, b: true }, ["a", "b"], ["c"]);
    expect(r.total).toBe(3);
    expect(r.completed).toBe(2);
    expect(r.percent).toBe(67);
  });
});

describe("le plan journalier", () => {
  it("le plan par défaut reprend exactement la journée du code", () => {
    expect(DEFAULT_PLAN.items.length).toBe(TOTAL);
    expect(planRules(DEFAULT_PLAN).length).toBe(REGLES);
    expect(orderedObjectives(DEFAULT_PLAN, false).length).toBe(OBJECTIFS);
  });

  it("un jour de repos retire course et muscu", () => {
    const plein = orderedObjectives(DEFAULT_PLAN, false).map((i) => i.id);
    const repos = orderedObjectives(DEFAULT_PLAN, true).map((i) => i.id);
    expect(plein).toContain("run");
    expect(plein).toContain("gym");
    expect(repos).not.toContain("run");
    expect(repos).not.toContain("gym");
    expect(planCoreIds(DEFAULT_PLAN, true)).not.toContain("gym");
  });

  it("range la journée de 5h jusqu'au soir, l'informel à la fin", () => {
    const t = orderedObjectives(DEFAULT_PLAN, false).map((i) => i.time);
    const minutes = t.map(planMinutes);
    expect(minutes).toEqual([...minutes].sort((a, b) => a - b));
    expect(planMinutes("5h00")).toBe(300);
    expect(planMinutes("jour")).toBeGreaterThan(planMinutes("21h00"));
  });

  it("le noyau décide seul si la journée compte", () => {
    const noyau = planCoreIds(DEFAULT_PLAN, false);
    const tout = Object.fromEntries(noyau.map((id) => [id, true]));
    expect(planCoreStatus(DEFAULT_PLAN, tout, false).complete).toBe(true);

    const moinsUn = { ...tout };
    delete moinsUn[noyau[0]];
    const st = planCoreStatus(DEFAULT_PLAN, moinsUn, false);
    expect(st.complete).toBe(false);
    expect(st.missing).toEqual([noyau[0]]);
    expect(st.done).toBe(noyau.length - 1);
  });

  it("un rituel secondaire raté ne casse pas le noyau", () => {
    const noyau = planCoreIds(DEFAULT_PLAN, false);
    const tout = Object.fromEntries(noyau.map((id) => [id, true]));
    // "hair" (brossage) n'est pas dans le noyau : l'omettre ne change rien.
    expect(noyau).not.toContain("hair");
    expect(planCoreStatus(DEFAULT_PLAN, tout, false).complete).toBe(true);
  });

  it("normalizePlan jette ce qui est inexploitable", () => {
    const p = normalizePlan({
      items: [
        { id: "a", label: "Un objectif", time: "6h00", kind: "objectif", core: true },
        { id: "b", label: "   ", time: "7h", kind: "objectif" }, // sans libellé
        null,
        "n'importe quoi",
      ],
    });
    expect(p.items.length).toBe(1);
    expect(p.items[0].id).toBe("a");
  });

  it("dédoublonne les identifiants — deux cases ne peuvent pas se marcher dessus", () => {
    const p = normalizePlan({
      items: [
        { id: "x", label: "Premier", kind: "objectif" },
        { id: "x", label: "Second", kind: "objectif" },
      ],
    });
    expect(p.items.map((i) => i.id)).toEqual(["x", "x_2"]);
  });

  it("une règle est toujours permanente, quoi qu'on lui passe", () => {
    const p = normalizePlan({
      items: [{ id: "r", label: "0 quelque chose", time: "8h00", kind: "regle" }],
    });
    expect(p.items[0].time).toBe("permanent");
  });

  it("un plan vide ou cassé retombe sur le défaut", () => {
    expect(normalizePlan(null).items.length).toBe(TOTAL);
    expect(normalizePlan({ items: [] }).items.length).toBe(TOTAL);
    expect(normalizePlan({ items: "non" }).items.length).toBe(TOTAL);
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
