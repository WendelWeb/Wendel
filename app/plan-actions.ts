"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { savePlan, resetPlan } from "@/lib/plans";
import type { Plan } from "@/lib/plan";

/**
 * Enregistre le plan journalier. Le contenu est renettoyé côté serveur
 * (normalizePlan) : on ne fait jamais confiance à ce qui arrive du client,
 * puisque ce plan sert ensuite à calculer le noyau et donc la série.
 */
export async function savePlanAction(plan: Plan) {
  const userId = await requireUserId();
  await savePlan(userId, plan);
  // La journée, la progression et le coach lisent tous le plan.
  revalidatePath("/reglages");
  revalidatePath("/today");
  revalidatePath("/progression");
  revalidatePath("/coach");
}

/** Revient au plan par défaut. */
export async function resetPlanAction() {
  const userId = await requireUserId();
  await resetPlan(userId);
  revalidatePath("/reglages");
  revalidatePath("/today");
  revalidatePath("/progression");
  revalidatePath("/coach");
}
