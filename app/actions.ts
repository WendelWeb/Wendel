"use server";

import { revalidatePath } from "next/cache";
import { requireUserId } from "@/lib/auth";
import {
  setItemState,
  setCounter,
  markChapterRead,
  incrementStopp,
  saveJournal,
  saveGymSession,
  validateDay,
  type ItemState,
  type ReadContext,
} from "@/lib/daily";
import { CHECKLIST_IDS } from "@/lib/checklist";
import { RULE_IDS } from "@/lib/rules";
import { VIDEO_COUNTER_IDS } from "@/lib/video-counters";
import { saveProgram, resetProgram } from "@/lib/programs";
import { todayHaiti } from "@/lib/dates";

const VALID_ITEM_IDS = new Set([...CHECKLIST_IDS, ...RULE_IDS]);
const VALID_STATES: ItemState[] = ["neutral", "done", "failed"];
const VALID_COUNTER_IDS = new Set(VIDEO_COUNTER_IDS);

/** Set a checklist item or rule to neutral / done / failed for today. */
export async function setItemStateAction(itemId: string, state: ItemState) {
  const userId = await requireUserId();
  if (!VALID_ITEM_IDS.has(itemId)) throw new Error(`Unknown item: ${itemId}`);
  if (!VALID_STATES.includes(state)) throw new Error(`Bad state: ${state}`);
  const score = await setItemState(userId, itemId, state);
  revalidatePath("/today");
  revalidatePath("/progression");
  return score;
}

/** Set a counter objective's value for today (e.g. videos published). */
export async function setCounterAction(itemId: string, value: number) {
  const userId = await requireUserId();
  if (!VALID_COUNTER_IDS.has(itemId))
    throw new Error(`Unknown counter: ${itemId}`);
  if (!Number.isFinite(value)) throw new Error("Bad value");
  const res = await setCounter(userId, itemId, value);
  revalidatePath("/today");
  revalidatePath("/progression");
  return res;
}

/** Mark a Vaisseau chapter read — context "verdict" (obligation) or "lecture". */
export async function markChapterReadAction(
  chapterN: number,
  ctx: ReadContext,
) {
  const userId = await requireUserId();
  if (!Number.isInteger(chapterN)) throw new Error("Bad chapter");
  if (ctx !== "verdict" && ctx !== "lecture") throw new Error("Bad context");
  await markChapterRead(userId, chapterN, ctx);
  revalidatePath("/today");
  revalidatePath("/vaisseau");
}

/** Close the day. `failNeutrals` marks every undecided objective as failed. */
export async function validateDayAction(failNeutrals: boolean) {
  const userId = await requireUserId();
  await validateDay(userId, failNeutrals);
  revalidatePath("/today");
  revalidatePath("/progression");
  return { validatedAt: Date.now() };
}

/** Log a STOPP event for today. Fire-and-forget from the UI. */
export async function logStoppAction() {
  const userId = await requireUserId();
  const count = await incrementStopp(userId);
  revalidatePath("/today");
  return count;
}

/** Save journal text for a given date (defaults to today, no future dates). */
export async function saveJournalAction(date: string, text: string) {
  const userId = await requireUserId();
  const today = todayHaiti();
  const safeDate = date && date <= today ? date : today;
  await saveJournal(userId, safeDate, text);
  revalidatePath("/journal");
  return { savedAt: Date.now() };
}

/** Save the day's gym session (muscles are dynamic — from the user's program). */
export async function saveGymAction(
  setsCompleted: Record<string, number>,
  notes: string,
) {
  const userId = await requireUserId();
  const date = todayHaiti();

  // Clamp values; accept any muscle key (cap count for safety).
  const clean: Record<string, number> = {};
  for (const [name, raw] of Object.entries(setsCompleted ?? {})) {
    const n = Number.isFinite(raw) ? Math.max(0, Math.floor(raw)) : 0;
    if (n > 0 && Object.keys(clean).length < 40) clean[String(name).slice(0, 40)] = n;
  }

  await saveGymSession(userId, date, clean, notes ?? "");
  revalidatePath("/muscu");
  return { savedAt: Date.now() };
}

/** Save the user's edited gym program. */
export async function saveProgramAction(input: unknown) {
  const userId = await requireUserId();
  await saveProgram(userId, input);
  revalidatePath("/muscu");
  revalidatePath("/muscu/programme");
  return { savedAt: Date.now() };
}

/** Reset the gym program to the default. */
export async function resetProgramAction() {
  const userId = await requireUserId();
  await resetProgram(userId);
  revalidatePath("/muscu");
  revalidatePath("/muscu/programme");
}

/** Sign out helper usable from a client component via a server action. */
export async function signOutAction() {
  const { signOut } = await import("@/lib/auth");
  await signOut({ redirectTo: "/auth/login" });
}
