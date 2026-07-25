"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import { saveVision } from "@/lib/vision";

export async function saveVisionAction(content: string, creed: string) {
  const userId = await requireUserId();
  await saveVision(userId, content, creed);
  revalidatePath("/vision");
  return { savedAt: Date.now() };
}
