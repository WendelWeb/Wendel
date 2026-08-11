import "server-only";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { plans } from "./schema";
import { DEFAULT_PLAN, normalizePlan, type Plan } from "./plan";

/** Le plan enregistré, ou celui par défaut s'il n'a rien modifié. */
export async function getPlan(userId: string): Promise<Plan> {
  const rows = await db
    .select()
    .from(plans)
    .where(eq(plans.userId, userId))
    .limit(1);
  const data = rows[0]?.data;
  return data ? normalizePlan(data) : DEFAULT_PLAN;
}

/** Enregistre le plan modifié, après nettoyage. */
export async function savePlan(userId: string, input: unknown): Promise<void> {
  const data = normalizePlan(input);
  await db
    .insert(plans)
    .values({ userId, data })
    .onConflictDoUpdate({
      target: plans.userId,
      set: { data, updatedAt: new Date() },
    });
}

/** Revient au plan par défaut (supprime la personnalisation). */
export async function resetPlan(userId: string): Promise<void> {
  await db.delete(plans).where(eq(plans.userId, userId));
}
