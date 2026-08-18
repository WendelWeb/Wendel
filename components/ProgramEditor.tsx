"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Minus,
  Plus,
  X,
  Check,
  Loader2,
  RotateCcw,
  Moon,
} from "lucide-react";
import { saveProgramAction, resetProgramAction } from "@/app/actions";
import {
  DAY_NAMES,
  DAY_ORDER,
  MASTER_MUSCLES,
  orderedMuscles,
  weeklyVolume,
  type Program,
  type DayProgram,
} from "@/lib/program";

const CARDIO = "Course 30 min — 13h00";

export default function ProgramEditor({ initial }: { initial: Program }) {
  const [program, setProgram] = useState<Program>(initial);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const [resetting, startReset] = useTransition();
  const router = useRouter();

  function updateDay(wd: number, patch: Partial<DayProgram>) {
    setSaved(false);
    setProgram((p) => ({ ...p, [String(wd)]: { ...p[String(wd)], ...patch } }));
  }

  function setSets(wd: number, muscle: string, n: number) {
    const day = program[String(wd)];
    const targets = { ...day.targets };
    if (n <= 0) delete targets[muscle];
    else targets[muscle] = Math.min(50, n);
    updateDay(wd, { targets });
  }

  function addMuscle(wd: number, muscle: string) {
    if (!muscle) return;
    const day = program[String(wd)];
    if (day.targets[muscle]) return;
    updateDay(wd, { targets: { ...day.targets, [muscle]: 3 } });
  }

  function markRest(wd: number) {
    updateDay(wd, { targets: {}, cardio: null, name: "REPOS" });
  }

  function save() {
    startTransition(async () => {
      try {
        await saveProgramAction(program);
        setSaved(true);
      } catch {
        /* ignore */
      }
    });
  }

  function reset() {
    startReset(async () => {
      try {
        await resetProgramAction();
        router.refresh();
      } catch {
        /* ignore */
      }
    });
  }

  const weekly = weeklyVolume(program);

  return (
    <main className="px-4 pb-10 pt-5 md:mx-auto md:max-w-3xl xl:max-w-none">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/muscu"
          className="flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary transition hover:text-navy"
        >
          <ArrowLeft size={16} /> Muscu
        </Link>
        <button
          type="button"
          onClick={reset}
          disabled={resetting}
          className="flex items-center gap-1.5 text-[12px] font-semibold text-text-muted transition hover:text-red disabled:opacity-50"
        >
          {resetting ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <RotateCcw size={13} />
          )}
          Réinitialiser
        </button>
      </div>

      <h1 className="mb-1 text-2xl font-bold text-text-primary">Mon programme</h1>
      <p className="mesure mb-5 text-[12px] text-text-secondary">
        Modifie-le comme tu veux : séries, muscles, jours. Un jour sans muscle =
        repos.
      </p>

      {/* Weekly volume preview */}
      <div className="mb-6 rounded-2xl border border-border bg-surface-raised p-3">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
          Volume hebdomadaire (aperçu)
        </p>
        <div className="flex flex-wrap gap-1.5">
          {weekly.length === 0 && (
            <span className="text-[12px] text-text-muted">Aucun set.</span>
          )}
          {weekly.map(({ muscle, sets }) => (
            <span
              key={muscle}
              className="tnum rounded-md bg-surface px-2 py-1 text-[11px] font-medium text-text-secondary"
            >
              {muscle} {sets}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:items-start xl:grid-cols-3 min-[1800px]:grid-cols-4">
        {DAY_ORDER.map((wd) => {
          const day = program[String(wd)];
          const muscles = orderedMuscles(day);
          const rest = muscles.length === 0;
          const available = MASTER_MUSCLES.filter((m) => !day.targets[m]);
          return (
            <section
              key={wd}
              className="rounded-2xl border border-border bg-surface p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="w-20 flex-shrink-0 text-[13px] font-bold uppercase tracking-wide text-navy">
                  {DAY_NAMES[wd]}
                </span>
                <input
                  value={day.name}
                  onChange={(e) => updateDay(wd, { name: e.target.value })}
                  placeholder="Nom de la séance"
                  className="h-9 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-[13px] text-text-primary outline-none focus:border-navy"
                />
              </div>

              {muscles.map((m) => (
                <div key={m} className="mb-2 flex items-center gap-2">
                  <span className="min-w-0 flex-1 truncate text-[13px] text-text-primary">
                    {m}
                  </span>
                  <button
                    type="button"
                    aria-label={`Moins ${m}`}
                    onClick={() => setSets(wd, m, (day.targets[m] ?? 0) - 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary active:scale-95"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="tnum w-6 text-center text-[14px] font-bold text-text-primary">
                    {day.targets[m]}
                  </span>
                  <button
                    type="button"
                    aria-label={`Plus ${m}`}
                    onClick={() => setSets(wd, m, (day.targets[m] ?? 0) + 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-white active:scale-95"
                    style={{ background: "var(--navy)" }}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Retirer ${m}`}
                    onClick={() => setSets(wd, m, 0)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition hover:text-red"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {available.length > 0 && (
                  <select
                    value=""
                    onChange={(e) => {
                      addMuscle(wd, e.target.value);
                      e.currentTarget.value = "";
                    }}
                    className="h-8 rounded-lg border border-border bg-background px-2 text-[12px] text-text-secondary outline-none"
                  >
                    <option value="">+ Ajouter un muscle</option>
                    {available.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                )}

                <label className="flex items-center gap-1.5 text-[12px] text-text-secondary">
                  <input
                    type="checkbox"
                    checked={!!day.cardio}
                    onChange={(e) =>
                      updateDay(wd, { cardio: e.target.checked ? CARDIO : null })
                    }
                  />
                  Course 30 min
                </label>

                {!rest && (
                  <button
                    type="button"
                    onClick={() => markRest(wd)}
                    className="flex items-center gap-1 text-[12px] font-medium text-text-muted transition hover:text-navy"
                  >
                    <Moon size={13} /> Repos
                  </button>
                )}
                {rest && (
                  <span className="flex items-center gap-1 text-[12px] font-medium text-text-muted">
                    <Moon size={13} /> Jour de repos
                  </span>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <button
        type="button"
        onClick={save}
        disabled={pending}
        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold uppercase tracking-wide text-white transition active:scale-[0.99] disabled:opacity-70 xl:max-w-sm"
        style={{ background: saved ? "var(--green)" : "var(--navy)" }}
      >
        {pending && <Loader2 size={18} className="animate-spin" />}
        {saved && !pending && <Check size={18} />}
        {saved ? "Programme enregistré" : "Enregistrer le programme"}
      </button>
    </main>
  );
}
