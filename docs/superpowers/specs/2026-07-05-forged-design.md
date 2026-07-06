# FORGED — Design Document

**Date:** 2026-07-05
**Status:** Approved for implementation
**Author:** Brainstormed with Claude Code

---

## 1. Purpose

FORGED is a **premium single-user daily discipline tracking web app**. It is not a todo app — it is a daily proof of identity. Every checkbox is a declaration; every streak is evidence. The app must feel like a weapon: clean, precise, military, premium. The user opens it and feels accountable; closes it feeling he earned the day.

This is a personal app for **one person** (the owner). It is cloud-first: data lives in Neon Postgres, never on any single device.

---

## 2. Locked Decisions (from brainstorming)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | **Neon Postgres (already provisioned)** | User confirmed a Neon project + `DATABASE_URL` is ready. |
| Accounts | **Single seeded account, login-only. No public registration.** | Personal app; a public signup page would let anyone register once deployed. |
| Timezone | **Pinned to `America/Port-au-Prince` (Haiti)** | All "today"/date/streak logic derives from Haiti local time via one helper, so a UTC Vercel server can never roll the day at the wrong moment. IANA zone → DST handled automatically. |
| Mutations | **Server Actions for all app writes.** Only real API route is `/api/auth/[...nextauth]`. `/api/stats` becomes a Server Component fetch. | Less code than dual API-routes + actions; type-safe; clean optimistic UI. User approved. |
| Data durability | **Cloud-first, PC-disposable.** | Source of truth is Neon. Browser holds only a temporary optimistic copy. PC loss = zero data loss. |

---

## 3. Stack (non-negotiable, as specified)

- **Framework:** Next.js 14 (App Router, Server Components by default; `"use client"` only for interactive islands).
- **Database:** PostgreSQL via **Drizzle ORM** + **Neon serverless** (`@neondatabase/serverless`).
- **Auth:** NextAuth.js v5 (beta) — credentials provider (email + password), JWT session strategy (no session table), `bcryptjs` hashing.
- **Styling:** Tailwind CSS + custom CSS variables for the design system.
- **Charts:** Recharts. **Icons:** Lucide React.
- **Fonts:** Inter (body) + Oswald (display/score) via `next/font`.
- **Deploy:** Vercel (edge-ready).

---

## 4. Design System

### Philosophy
Minimal. Military. Premium. Every element earns its place. White space is intentional. Typography does the heavy lifting. **Dark mode NOT required — clean white only.**

### Colors (CSS variables)
```
--background: #FAFAFA      --surface: #FFFFFF        --surface-raised: #F4F4F5
--border: #E4E4E7          --navy: #0F172A           --navy-light: #1E293B
--red: #DC2626             --red-soft: #FEF2F2       --orange: #EA580C
--green: #16A34A           --green-soft: #F0FDF4
--text-primary: #09090B    --text-secondary: #71717A --text-muted: #A1A1AA
--white: #FFFFFF           --black: #000000
```

### Typography scale
```
Display: Oswald 700, 48px — app name, score display
H1: Inter 700, 24px — page titles
H2: Inter 600, 18px — section headers
Body: Inter 400, 14px — checklist items
Small: Inter 500, 12px — timestamps, badges
Micro: Inter 400, 11px — helper text
```

### Spacing
8px base grid. Sections separated by 24px. Items 12px gap. Cards 16px padding. Page padding 16px horizontal. **Mobile-first, must be perfect at 375px width. No layout shift on load.**

---

## 5. Database Schema (Drizzle + PostgreSQL)

Exactly as specified. Four tables.

```typescript
users {
  id: uuid pk defaultRandom
  email: text notNull unique
  passwordHash: text notNull
  createdAt: timestamp defaultNow
}

dailyLogs {
  id: uuid pk defaultRandom
  userId: uuid -> users.id notNull
  date: date notNull
  completedItems: jsonb default {} $type<Record<string, boolean>>
  score: integer default 0          // stored as PERCENTAGE 0-100
  totalItems: integer default 0     // stored as 23 for historical integrity
  journal: text default ''
  daydreamStopps: integer default 0
  createdAt / updatedAt: timestamp defaultNow
  UNIQUE(userId, date)
}

gymSessions {
  id: uuid pk defaultRandom
  userId: uuid -> users.id notNull
  date: date notNull
  setsCompleted: jsonb default {} $type<Record<string, number>>
  notes: text default ''
  createdAt: timestamp defaultNow
  // NOTE: add UNIQUE(userId, date) — one session per day, matches upsert-by-date API.
}

streaks {
  id: uuid pk defaultRandom
  userId: uuid -> users.id notNull UNIQUE
  currentStreak: integer default 0
  longestStreak: integer default 0
  lastLoggedDate: date
  totalDaysLogged: integer default 0
  updatedAt: timestamp defaultNow
}
```

Applied via `drizzle-kit push` to the existing Neon database.

---

## 6. Domain Constants

### Checklist (`lib/checklist.ts`)
Ordered sections, each with `section`, `color`, and `items[]` of `{ id, label, time }`. Full content exactly as specified in the megaprompt:

- **MATIN** (`#0F172A`): wake, meal, meditation, run, bible, hair, goals, manifesto_am (8 items)
- **DEEP WORK** (`#1E3A5F`): discipline_v1, dw1, tiktok, youtube (4 items)
- **CORPS** (`#064E3B`): gym, fasting (2 items)
- **APRÈS-MIDI** (`#3B1F6E`): discipline_v2, dw2 (2 items)
- **SOIR** (`#7F1D1D`): no_face, skincare, discipline_v3, goals_pm, manifesto_pm, affirmations, no_screen (7 items)

`CHECKLIST_COUNT = 23` (derived by reduce, asserted in a test so it can't silently drift).

### Absolute Rules — CHECKABLE (`lib/rules.ts`)
The 9 "RÈGLES ABSOLUES" are **checkable each day** and contribute to the score. Each has a unique `id` (prefixed `rule_`) + `label`:

```
rule_porn      0 porn — toute la journée
rule_tiktok    0 TikTok / réseaux sociaux (scroll)
rule_sugar     0 sucre / gazeux / jus en bouteille
rule_music     0 musique (maison + gym)
rule_youtube   0 YouTube surf (upload uniquement)
rule_cheat     0 cheat programme (gym, nutrition, horaires)
rule_apps      0 téléphone pour installer apps interdites
rule_pretexte  0 prétexte / exception / négociation
rule_daydream  Daydream détecté = STOPP + affirmation immédiate
```

`RULES_COUNT = 9`. **`TOTAL_ITEMS = CHECKLIST_COUNT + RULES_COUNT = 32`** — the score denominator. Asserted in a test so it can't silently drift.

**State model:** `completedItems` stays a flat `Record<string, boolean>` (per the schema) keyed by all 32 unique ids (checklist ids like `wake` + rule ids like `rule_porn`). No nesting. `checklistScore` / `rulesScore` are derived by checking which ids belong to which set.

### Muscle targets (`lib/muscles.ts`)
```
Pectoraux: 9, Dos: 10, Biceps: 4, Triceps: 4, Quadriceps: 5,
Ischio / Fessiers: 6, Épaule latérale: 6, Épaule arrière: 4,
Épaule avant: 2, Mollets: 6, Abdominaux: 3, Avant-bras: 4
```

### STOPP phrases (`lib/stopp.ts`)
The 12 phrases exactly as specified, picked at random on each STOPP tap.

---

## 7. Core Logic (pure functions, unit-tested)

These are the two places where bugs actually hurt, so they are pure and tested in isolation.

### Scoring (`lib/scoring.ts`)
```
computeScore(completedItems: Record<string,bool>): {
  checklistCompleted, rulesCompleted, completed, total: 32, percent: 0-100
}
completed = count of the 32 known ids where completedItems[id] === true
percent   = round(completed / TOTAL_ITEMS * 100)   // TOTAL_ITEMS = 32
```
Computed **server-side on every save**. The client's number is never trusted. `scoreColor(percent)`: `<60 → red`, `60–79 → orange`, `≥80 → green`.

### Streak (`lib/streak.ts`)
Pure function `recomputeStreak(prev, todayDate, todayPassed)` where a day "passes" at **percent ≥ 80**.

Rules:
1. If today passes and `lastLoggedDate === yesterday(today)` and yesterday passed → `current = prev.current + 1`.
2. If today passes and there is a gap (missed day) → `current = 1`.
3. If today no longer passes (dropped below 80 after previously counting) → recompute down (today doesn't contribute).
4. `longest = max(prev.longest, current)`.
5. `lastLoggedDate = today`; `totalDaysLogged` increments only on first log of a given date.
6. All date math uses the Haiti-pinned date helper; "yesterday" = Haiti-local previous calendar day.

### Date helper (`lib/dates.ts`)
Single source of truth. `todayHaiti(): string (YYYY-MM-DD)`, `yesterdayHaiti(date)`, formatting — all pinned to `America/Port-au-Prince`. Everything date-related in the app imports from here; nothing calls `new Date()` for "today" directly.

---

## 8. Pages & Navigation

Bottom navigation bar (mobile-first), 4 tabs: **Aujourd'hui**, **Progression**, **Muscu**, **Journal**. Everything except `/auth/login` is behind the NextAuth session (401/redirect if unauthenticated).

### Page 1 — Aujourd'hui (`/today`)
- **Header:** `FORGED` (Oswald bold navy) + streak badge (🔥 + number) top-right. Full-width animated progress bar colored by score %. Score number prominent (32px bold), e.g. `24 / 32   75%`.
- **Checklist:** Server Component loads/creates today's log. Client island renders sections (colored band header, white item cards with custom square checkbox + label + time badge). Checked = line-through + muted + **green** checkmark. **Optimistic** toggle → Server Action persists → revalidate. 2-per-row on mobile when labels are short, else 1-per-row.
- **RÈGLES ABSOLUES — CONFIRMÉES AUJOURD'HUI:** a **checkable** section rendered after the main checklist, on a soft-red (`#FEF2F2`) background with a dark-red header. The 9 rules each have a checkbox; checking = "Je confirme avoir respecté cette règle aujourd'hui." Checked checkbox is **red** (not green) — the color signals seriousness. Unchecked rules stay vivid red as a warning. These 9 count toward the score (32 total); all 32 checked = perfect 32/32.
- **STOPP button:** fixed floating 56px red circle, bottom-right, "STOPP". On tap: fullscreen black overlay fades in (300ms), random phrase (white Oswald 36px uppercase, scale+fade in), auto-dismiss after 4s or tap to dismiss. Increments `daydreamStopps` via fire-and-forget Server Action (overlay never waits on network). STOPP count shown subtly under header.

### Page 2 — Progression (`/progression`)
- Toggle: Cette semaine / Ce mois.
- Recharts BarChart: X = dates, Y = 0–100%, bars colored by score range, dashed green reference line at 80%, tooltip = date + score + items completed.
- Stats row: `Moyenne`, `Meilleur jour`, `Jours ≥ 80%` — computed server-side.
- Server Component fetches last 7/30 days → client Recharts island.

### Page 3 — Muscu (`/muscu`)
- Per-day `gym_session`. 2-column grid of 12 muscle cards: name, stepper (+/-) for sets done, `X / Y sets`, inner progress bar, card bg green if met / red-soft if under / white if empty. One save Server Action.

### Page 4 — Journal (`/journal`)
- Date selector (today default, can go back). Full-width textarea (min 200px). Debounced autosave (500ms) via Server Action → "Sauvegardé" toast. Below: last-7-days list, clickable to view.

---

## 9. Auth & Seeding

- **NextAuth v5** credentials provider; `authorize()` looks up user by email, `bcrypt.compare` password, returns user or null. JWT sessions.
- **Login page** (`/auth/login`) only. No register page.
- **Seed script** (`scripts/seed-user.ts`, run via `tsx`): reads `SEED_EMAIL` + `SEED_PASSWORD` from env, bcrypt-hashes, upserts the single user. Also creates the user's `streaks` row.
- Middleware / layout guard redirects unauthenticated requests to `/auth/login`.

---

## 10. Data Flow Summary

- **Writes:** Server Actions (`toggleItem`, `saveGym`, `saveJournal`, `logStopp`). Each re-derives score/streak server-side and revalidates the affected path.
- **Reads:** Server Components query Drizzle directly (today's log, streak, stats windows).
- **Optimistic UI:** checklist checkboxes update instantly client-side, then reconcile with the server result.

---

## 11. Quality Requirements

- All DB access via Drizzle query builder — no raw SQL.
- `loading.tsx` + `error.tsx` on each route (loading states + error boundaries).
- Mobile-first, perfect at 375px, no layout shift on load.
- Optimistic checklist (instant checkbox).
- Only `/auth/login` and `/api/auth/*` are public; everything else session-guarded.

---

## 12. Testing Strategy

- **Unit tests** for the two pure cores: **scoring** and **streak** logic (including edge cases: missed days, dropping below 80% after passing, first-ever log, longest-streak update).
- **Assertion test** that `CHECKLIST_COUNT === 23`, `RULES_COUNT === 9`, and `TOTAL_ITEMS === 32` so the constants can't silently drift.
- UI verified by running the app (not unit-tested).

---

## 13. Environment Variables

```
DATABASE_URL      # Neon Postgres connection string (ready)
NEXTAUTH_SECRET   # random secret
NEXTAUTH_URL      # http://localhost:3000 in dev, Vercel URL in prod
SEED_EMAIL        # single account email (seed script)
SEED_PASSWORD     # single account password (seed script, hashed on seed)
```

---

## 14. Folder Structure

```
/app
  /api/auth/[...nextauth]/route.ts
  /(app)
    /today/page.tsx        + loading.tsx + error.tsx
    /progression/page.tsx  + loading.tsx + error.tsx
    /muscu/page.tsx        + loading.tsx + error.tsx
    /journal/page.tsx      + loading.tsx + error.tsx
    layout.tsx             (session guard + BottomNav)
  /auth/login/page.tsx
  actions/                 (Server Actions: today, gym, journal, stopp)
  layout.tsx globals.css
/components
  ChecklistSection.tsx ChecklistItem.tsx StoppButton.tsx StoppOverlay.tsx
  ProgressBar.tsx StreakBadge.tsx MuscleCard.tsx ProgressChart.tsx
  BottomNav.tsx RulesPanel.tsx
/lib
  db.ts schema.ts auth.ts dates.ts scoring.ts streak.ts
  checklist.ts muscles.ts stopp.ts rules.ts
/scripts/seed-user.ts
/drizzle/ (migrations)  drizzle.config.ts
```

---

## 15. Build Sequence

1. `create-next-app` (TS, Tailwind, App Router) + install deps.
2. Design tokens (CSS vars, Tailwind config, fonts).
3. Schema + `db.ts` + `drizzle-kit push` to Neon.
4. Domain constants + pure logic (`dates`, `scoring`, `streak`) + their tests.
5. Auth (NextAuth config, login page, seed script, guard).
6. Today page (checklist + score + STOPP + rules).
7. Progression (charts + stats).
8. Muscu (logger).
9. Journal.
10. Polish (loading/error states, 375px pass) → deploy to Vercel with env vars.

---

## 16. Deployment & Durability Note

Data is stored in Neon (cloud), not on any device — PC loss means zero data loss. Even during local development the app writes to the cloud Neon DB. Deploy to Vercel (final step) for access from any device (e.g. phone at 5h00) without the PC powered on. **Recommendation:** confirm Neon's backup/point-in-time-restore is enabled as an extra safety net.
