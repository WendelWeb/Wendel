"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { declarer, declarerRechute, getSerment } from "@/lib/serments";
import { ouvrirVision, fermerVision } from "@/lib/verrou";
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
  // Une rechute referme la Vision immédiatement : ce qu'il vient de rompre,
  // il ne va pas le contempler dans la foulée.
  await fermerVision(userId);
  revalidatePath("/miroir");
  revalidatePath("/vision");
}

/**
 * Ouvre la Vision pour quelques minutes, après une déclaration tenue — pour
 * qu'il voie ce qu'il vient de choisir. Refusée si le créneau en cours n'a pas
 * été déclaré : la fenêtre se gagne, elle ne se demande pas.
 */
export async function ouvrirVisionAction(): Promise<{ ok: boolean }> {
  const userId = await requireUserId();
  const etat = await getSerment(userId);
  const creneau = etat.ouvert;
  if (!creneau || etat.aujourdhui[creneau] !== "vouloir") return { ok: false };
  await ouvrirVision(userId);
  revalidatePath("/vision");
  return { ok: true };
}

/** « J'ai fini », ou sortie de l'app : tout se reverrouille. */
export async function fermerVisionAction() {
  const userId = await requireUserId();
  await fermerVision(userId);
  revalidatePath("/vision");
  revalidatePath("/miroir");
}
