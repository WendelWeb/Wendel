"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { declarer, declarerRechute } from "@/lib/serments";
import type { Choix, Confirmations, Rechute } from "@/lib/serment";

export async function declarerAction(
  choix: Choix,
  confirmations: Confirmations,
): Promise<{ ok: boolean; raison?: string }> {
  const userId = await requireUserId();
  const r = await declarer(userId, choix, confirmations);
  revalidatePath("/miroir");
  revalidatePath("/vision");
  return r.ok ? { ok: true } : { ok: false, raison: r.raison };
}

/** Irréversible : aucune action de retrait n'existe, et c'est voulu. */
export async function declarerRechuteAction(kind: Rechute) {
  const userId = await requireUserId();
  await declarerRechute(userId, kind);
  revalidatePath("/miroir");
  revalidatePath("/vision");
}
