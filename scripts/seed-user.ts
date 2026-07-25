import { config } from "dotenv";
// Load env BEFORE importing db (which reads DATABASE_URL at module load).
config({ path: ".env.local" });

import bcrypt from "bcryptjs";

async function main() {
  const email = process.env.SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_PASSWORD;

  if (!email || !password) {
    throw new Error("Set SEED_EMAIL and SEED_PASSWORD in .env.local first.");
  }
  if (password === "change-me-before-seeding") {
    throw new Error(
      "Refusing to seed the placeholder password. Set a real SEED_PASSWORD in .env.local.",
    );
  }

  const { db } = await import("../lib/db");
  const { users, streaks } = await import("../lib/schema");
  const { eq } = await import("drizzle-orm");

  const passwordHash = await bcrypt.hash(password, 10);

  const existing = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  let userId: string;
  if (existing[0]) {
    await db
      .update(users)
      .set({ passwordHash })
      .where(eq(users.id, existing[0].id));
    userId = existing[0].id;
    console.log(`✓ Updated password for ${email}`);
  } else {
    const inserted = await db
      .insert(users)
      .values({ email, passwordHash })
      .returning();
    userId = inserted[0].id;
    console.log(`✓ Created account ${email}`);
  }

  const streakRow = await db
    .select()
    .from(streaks)
    .where(eq(streaks.userId, userId))
    .limit(1);
  if (!streakRow[0]) {
    await db.insert(streaks).values({ userId });
    console.log("✓ Initialized streak record");
  }

  console.log("Done. You can now log in.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
