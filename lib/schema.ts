import {
  pgTable,
  uuid,
  text,
  integer,
  jsonb,
  date,
  timestamp,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import type { Program } from "./program";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dailyLogs = pgTable(
  "daily_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    date: date("date").notNull(),
    completedItems: jsonb("completed_items")
      .default({})
      .$type<Record<string, boolean>>(),
    // Items the user explicitly marked as FAILED (the red ✕), owned failures.
    failedItems: jsonb("failed_items")
      .default({})
      .$type<Record<string, boolean>>(),
    // Chapters read to fulfill a VERDICT obligation (after failing a goal).
    readChapters: jsonb("read_chapters")
      .default({})
      .$type<Record<string, boolean>>(),
    // Chapters read as part of the daily "Lecture du jour" (the 5 app-picked).
    lectureRead: jsonb("lecture_read")
      .default({})
      .$type<Record<string, boolean>>(),
    // Counter objectives (e.g. videos published): id -> count. Reaching the
    // target auto-completes that objective in completedItems.
    counters: jsonb("counters").default({}).$type<Record<string, number>>(),
    score: integer("score").default(0),
    totalItems: integer("total_items").default(0),
    journal: text("journal").default(""),
    daydreamStopps: integer("daydream_stopps").default(0),
    // The day was consciously closed by the user ("Valider la journée").
    validated: boolean("validated").default(false),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (t) => ({
    uniqueUserDate: unique().on(t.userId, t.date),
  }),
);

export const gymSessions = pgTable(
  "gym_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id)
      .notNull(),
    date: date("date").notNull(),
    setsCompleted: jsonb("sets_completed")
      .default({})
      .$type<Record<string, number>>(),
    notes: text("notes").default(""),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (t) => ({
    // One session per day — matches the upsert-by-date save action.
    uniqueUserDate: unique().on(t.userId, t.date),
  }),
);

export const streaks = pgTable("streaks", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  currentStreak: integer("current_streak").default(0),
  longestStreak: integer("longest_streak").default(0),
  lastLoggedDate: date("last_logged_date"),
  totalDaysLogged: integer("total_days_logged").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const programs = pgTable("programs", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  data: jsonb("data").$type<Program>(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const retention = pgTable("retention", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  startDate: date("start_date"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const vision = pgTable("vision", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id)
    .notNull()
    .unique(),
  content: text("content"),
  creed: text("creed"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type DailyLog = typeof dailyLogs.$inferSelect;
export type GymSession = typeof gymSessions.$inferSelect;
export type Streak = typeof streaks.$inferSelect;
