"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { resetRetention, setRetentionStart } from "@/lib/retention";
import { markMountainVisit } from "@/lib/mountain";

/** Record that he went up the mountain (covenant instruction). */
export async function markMountainAction() {
  const userId = await requireUserId();
  await markMountainVisit(userId);
  revalidatePath("/vaisseau");
  revalidatePath("/today");
}

export async function resetRetentionAction() {
  const userId = await requireUserId();
  await resetRetention(userId);
  revalidatePath("/vaisseau");
}

export async function setRetentionStartAction(date: string) {
  const userId = await requireUserId();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("bad date");
  await setRetentionStart(userId, date);
  revalidatePath("/vaisseau");
}
