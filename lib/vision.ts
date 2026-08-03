import "server-only";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { vision } from "./schema";

export { DEFAULT_CREED, DEFAULT_VISION } from "./vision-content";
import { DEFAULT_CREED, DEFAULT_VISION } from "./vision-content";

export interface Vision {
  content: string;
  creed: string;
}

export async function getVision(userId: string): Promise<Vision> {
  const rows = await db
    .select()
    .from(vision)
    .where(eq(vision.userId, userId))
    .limit(1);
  const row = rows[0];
  return {
    content: row?.content ?? DEFAULT_VISION,
    creed: row?.creed ?? DEFAULT_CREED,
  };
}

export async function saveVision(
  userId: string,
  content: string,
  creed: string,
): Promise<void> {
  const c = String(content ?? "").slice(0, 20000);
  const cr = String(creed ?? "").slice(0, 500);
  await db
    .insert(vision)
    .values({ userId, content: c, creed: cr })
    .onConflictDoUpdate({
      target: vision.userId,
      set: { content: c, creed: cr, updatedAt: new Date() },
    });
}
