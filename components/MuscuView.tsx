"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { Check, Loader2, SlidersHorizontal, Moon, Footprints } from "lucide-react";
import { saveGymAction } from "@/app/actions";
import {
  isRest,
  orderedMuscles,
  dayTotalSets,
  weeklyVolume,
  type DayProgram,
  type Program,
} from "@/lib/program";
import ProgressBar from "./ProgressBar";
import MuscleCard from "./MuscleCard";

export default function MuscuView({
  workout,
  program,
  dayName,
  initialSets,
  initialNotes,
  dateLabel,
}: {
  workout: DayProgram;
  program: Program;
  dayName: string;
  initialSets: Record<string, number>;
  initialNotes: string;
  dateLabel: string;
}) {
  const [sets, setSets] = useState<Record<string, number>>(initialSets);
  const [notes, setNotes] = useState(initialNotes);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  const rest = isRest(workout);
  const muscles = orderedMuscles(workout);
  const totalTarget = dayTotalSets(workout);
  const done = useMemo(
    () =>
      muscles.reduce(
        (a, m) => a + Math.min(sets[m] ?? 0, workout.targets[m]),
        0,
      ),
    [sets, muscles, workout],
  );
  const percent = totalTarget ? Math.round((done / totalTarget) * 100) : 0;
  const weekly = weeklyVolume(program);

  function setMuscle(name: string, next: number) {
    setSaved(false);
    setSets((s) => ({ ...s, [name]: next }));
  }

  function save() {
    startTransition(async () => {
      try {
        await saveGymAction(sets, notes);
        setSaved(true);
      } catch {
        /* ignore */
      }
    });
  }

  return (
    <main className="px-4 pt-6 md:mx-auto md:max-w-3xl">
      <div className="mb-1 flex items-baseline justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Muscu</h1>
        <Link
          href="/muscu/programme"
          className="flex items-center gap-1.5 text-[12px] font-semibold text-text-secondary transition hover:text-navy"
        >
          <SlidersHorizontal size={14} /> Programme
        </Link>
      </div>
      <p className="mb-4 text-[11px] uppercase tracking-[0.15em] text-text-muted">
        {dateLabel}
      </p>

      {/* Today's session header */}
      <div
        className="mb-5 rounded-2xl p-4"
        style={{ background: rest ? "var(--surface-raised)" : "var(--navy)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="font-display text-xl font-bold uppercase tracking-wide"
            style={{ color: rest ? "var(--text-secondary)" : "#fff" }}
          >
            {dayName} · {workout.name}
          </span>
          {rest && <Moon size={20} className="text-text-muted" />}
        </div>
        {workout.cardio && (
          <div className="mt-2 flex items-center gap-1.5">
            <Footprints size={14} color="rgba(255,255,255,0.7)" />
            <span className="text-[12px] text-white/70">{workout.cardio}</span>
          </div>
        )}
      </div>

      {rest ? (
        <div className="mb-6 rounded-2xl border border-border bg-surface p-6 text-center">
          <p className="font-display text-lg font-bold uppercase text-text-primary">
            Jour de repos
          </p>
          <p className="mt-1 text-[13px] text-text-secondary">
            La récupération fait partie du programme. Pas de séance aujourd&apos;hui.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-1 flex items-baseline justify-between">
            <span className="text-[12px] font-semibold uppercase tracking-wide text-text-muted">
              Séries du jour
            </span>
            <span className="tnum text-sm font-semibold text-text-secondary">
              {done} / {totalTarget}
            </span>
          </div>
          <ProgressBar percent={percent} className="mb-5" />

          <div className="grid grid-cols-2 items-start gap-2.5 md:grid-cols-3">
            {muscles.map((name) => (
              <MuscleCard
                key={name}
                name={name}
                sets={sets[name] ?? 0}
                target={workout.targets[name]}
                onChange={(n) => setMuscle(name, n)}
              />
            ))}
          </div>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-text-muted">
              Notes de séance
            </span>
            <textarea
              value={notes}
              onChange={(e) => {
                setSaved(false);
                setNotes(e.target.value);
              }}
              placeholder="Charges, sensations, records…"
              className="min-h-[80px] w-full resize-y rounded-xl border border-border bg-surface p-3 text-[14px] text-text-primary outline-none transition focus:border-navy"
            />
          </label>

          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold uppercase tracking-wide text-white transition active:scale-[0.99] disabled:opacity-70"
            style={{ background: saved ? "var(--green)" : "var(--navy)" }}
          >
            {pending && <Loader2 size={18} className="animate-spin" />}
            {saved && !pending && <Check size={18} />}
            {saved ? "Enregistré" : "Enregistrer la séance"}
          </button>
        </>
      )}

      {/* Weekly volume reference */}
      <section className="mt-8">
        <h2 className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.15em] text-text-secondary">
          Volume hebdomadaire
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {weekly.map(({ muscle, sets: v }) => (
            <div
              key={muscle}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
            >
              <span className="text-[12.5px] text-text-primary">{muscle}</span>
              <span className="tnum text-[12.5px] font-bold text-text-secondary">
                {v} sets
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
