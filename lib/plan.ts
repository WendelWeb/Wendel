// LE PLAN JOURNALIER — modifiable depuis les réglages.
//
// Jusqu'ici la journée était figée dans le code : les objectifs dans
// checklist.ts, les règles dans rules.ts, le noyau dans core.ts. Trois listes
// séparées qu'il fallait éditer à la main. Le plan les réunit en une seule
// structure, stockée en base et éditable dans l'app.
//
// Le défaut reste exactement la journée d'aujourd'hui : tant qu'il n'a rien
// modifié, rien ne change. Le plan enregistré ne fait que la remplacer.
//
// Client-safe.

import { CHECKLIST } from "./checklist";
import { ABSOLUTE_RULES } from "./rules";
import { CORE_IDS } from "./core";

/** Un objectif a une heure ; une règle est un interdit permanent. */
export type PlanKind = "objectif" | "regle";

export interface PlanItem {
  id: string;
  label: string;
  /** "5h00", "7h–11h30", "jour", "permanent". Ignoré pour les règles. */
  time: string;
  kind: PlanKind;
  /** Dans le noyau : si ce n'est pas coché, la journée ne compte pas. */
  core: boolean;
  /** Disparaît les jours de repos total (course, muscu). */
  trainingOnly?: boolean;
}

export interface Plan {
  items: PlanItem[];
}

/** Le plan par défaut — la journée telle qu'elle est écrite dans le code. */
export const DEFAULT_PLAN: Plan = {
  items: [
    ...CHECKLIST.flatMap((s) =>
      s.items.map(
        (i): PlanItem => ({
          id: i.id,
          label: i.label,
          time: i.time,
          kind: "objectif",
          core: CORE_IDS.includes(i.id),
          trainingOnly: i.id === "run" || i.id === "gym",
        }),
      ),
    ),
    ...ABSOLUTE_RULES.map(
      (r): PlanItem => ({
        id: r.id,
        label: r.label,
        time: "permanent",
        kind: "regle",
        core: CORE_IDS.includes(r.id),
      }),
    ),
  ],
};

/** Un identifiant stable, dérivé du libellé. Utilisé pour les ajouts. */
export function slugify(label: string): string {
  const base = label
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 40);
  return base || "objectif";
}

/**
 * Nettoie ce qui vient du client. Un plan mal formé ne doit jamais pouvoir
 * casser le calcul du score ou du noyau : on jette tout ce qui n'est pas
 * exploitable, et on dédoublonne les identifiants.
 */
export function normalizePlan(input: unknown): Plan {
  const raw = (input as Plan | null)?.items;
  if (!Array.isArray(raw)) return DEFAULT_PLAN;

  const vus = new Set<string>();
  const items: PlanItem[] = [];
  for (const brut of raw) {
    if (!brut || typeof brut !== "object") continue;
    const it = brut as Partial<PlanItem>;
    const label = typeof it.label === "string" ? it.label.trim() : "";
    if (!label) continue;

    let id = typeof it.id === "string" && it.id.trim() ? it.id.trim() : slugify(label);
    // Deux objectifs ne peuvent pas partager un identifiant : leurs coches se
    // marcheraient dessus dans completedItems.
    if (vus.has(id)) {
      let n = 2;
      while (vus.has(`${id}_${n}`)) n++;
      id = `${id}_${n}`;
    }
    vus.add(id);

    const kind: PlanKind = it.kind === "regle" ? "regle" : "objectif";
    items.push({
      id,
      label: label.slice(0, 160),
      time:
        kind === "regle"
          ? "permanent"
          : typeof it.time === "string" && it.time.trim()
            ? it.time.trim().slice(0, 20)
            : "jour",
      kind,
      core: it.core === true,
      trainingOnly: it.trainingOnly === true,
    });
  }

  return items.length ? { items } : DEFAULT_PLAN;
}

// ——————————————————————————————————————————————————————————————
// Lectures — ce que le reste de l'app demande au plan
// ——————————————————————————————————————————————————————————————

/** Minutes depuis minuit, pour ranger la journée dans l'ordre. */
export function planMinutes(time: string): number {
  if (/jour|permanent/i.test(time)) return 100_000;
  const m = time.match(/(\d{1,2})h(\d{2})?/);
  if (!m) return 99_999;
  return parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0);
}

/** Les entrées actives aujourd'hui — les jours de repos retirent course/muscu. */
export function activeItems(plan: Plan, rest: boolean): PlanItem[] {
  return rest ? plan.items.filter((i) => !i.trainingOnly) : plan.items;
}

/** Les objectifs (hors règles), rangés du début à la fin de la journée. */
export function orderedObjectives(plan: Plan, rest: boolean): PlanItem[] {
  return activeItems(plan, rest)
    .filter((i) => i.kind === "objectif")
    .sort((a, b) => planMinutes(a.time) - planMinutes(b.time));
}

export function planRules(plan: Plan): PlanItem[] {
  return plan.items.filter((i) => i.kind === "regle");
}

/** Le noyau du jour : ce qui doit être coché pour que la journée compte. */
export function planCoreIds(plan: Plan, rest: boolean): string[] {
  return activeItems(plan, rest)
    .filter((i) => i.core)
    .map((i) => i.id);
}

/** Tous les identifiants qui comptent aujourd'hui, noyau ou pas. */
export function planAllIds(plan: Plan, rest: boolean): string[] {
  return activeItems(plan, rest).map((i) => i.id);
}

/** Les libellés, pour afficher un identifiant en clair (verdicts, emails). */
export function planLabels(plan: Plan): Record<string, string> {
  const out: Record<string, string> = {};
  for (const i of plan.items) out[i.id] = i.label;
  return out;
}

export interface PlanCoreStatus {
  done: number;
  total: number;
  complete: boolean;
  missing: string[];
}

/**
 * L'état du noyau selon le plan. Même contrat que coreStatus(), mais la liste
 * des cases vient du plan enregistré : s'il ajoute un objectif au noyau depuis
 * les réglages, sa série en dépend dès le jour même.
 */
export function planCoreStatus(
  plan: Plan,
  completed: Record<string, boolean> | null | undefined,
  rest: boolean,
): PlanCoreStatus {
  const ids = planCoreIds(plan, rest);
  const c = completed ?? {};
  const missing = ids.filter((id) => c[id] !== true);
  return {
    done: ids.length - missing.length,
    total: ids.length,
    complete: missing.length === 0,
    missing,
  };
}

/** Vrai si le plan est resté identique au défaut. */
export function isDefaultPlan(plan: Plan): boolean {
  if (plan.items.length !== DEFAULT_PLAN.items.length) return false;
  return plan.items.every((i, n) => {
    const d = DEFAULT_PLAN.items[n];
    return (
      d &&
      d.id === i.id &&
      d.label === i.label &&
      d.time === i.time &&
      d.kind === i.kind &&
      d.core === i.core &&
      !!d.trainingOnly === !!i.trainingOnly
    );
  });
}
