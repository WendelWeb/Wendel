import "server-only";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { programs } from "./schema";
import { DEFAULT_PROGRAM, normalizeProgram, type Program } from "./program";

/** The user's stored program, or the default if they haven't customized it. */
export async function getProgram(userId: string): Promise<Program> {
  const rows = await db
    .select()
    .from(programs)
    .where(eq(programs.userId, userId))
    .limit(1);
  const data = rows[0]?.data;
  return data ? normalizeProgram(data) : DEFAULT_PROGRAM;
}

/** Persist the user's edited program (sanitized). */
export async function saveProgram(
  userId: string,
  input: unknown,
): Promise<void> {
  const data = normalizeProgram(input);
  await db
    .insert(programs)
    .values({ userId, data })
    .onConflictDoUpdate({
      target: programs.userId,
      set: { data, updatedAt: new Date() },
    });
}

/** Reset to the default program (deletes the customization). */
export async function resetProgram(userId: string): Promise<void> {
  await db.delete(programs).where(eq(programs.userId, userId));
}
