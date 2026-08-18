"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import { LogOut, ChevronDown, List, Check, ClipboardCheck } from "lucide-react";
import {
  orderedObjectives,
  planRules,
  planCoreIds,
  planCoreStatus,
  planLabels,
  type Plan,
} from "@/lib/plan";
import { computeScore, scoreColorVar, type ItemState } from "@/lib/scoring";
import { randomStoppPhrase } from "@/lib/stopp";
import { buildVerdict, ITEM_LABEL } from "@/lib/verdict";
import {
  lectureProgress,
  LECTURE_ITEM_ID,
  LECTURE_TARGET,
} from "@/lib/lecture";
import { isVideoCounter, videoTarget } from "@/lib/video-counters";
import {
  setItemStateAction,
  setCounterAction,
  logStoppAction,
  signOutAction,
  validateDayAction,
} from "@/app/actions";
import ProgressBar from "./ProgressBar";
import StreakBadge from "./StreakBadge";
import ChecklistItem from "./ChecklistItem";
import LectureItem from "./LectureItem";
import VideoCounterItem from "./VideoCounterItem";
import StoppButton from "./StoppButton";
import StoppOverlay from "./StoppOverlay";
import StoppList from "./StoppList";
import Verdict from "./Verdict";
import ValidateDayModal from "./ValidateDayModal";
import NowNext from "./NowNext";
import RefreshButton from "./RefreshButton";
import DailyOath from "./DailyOath";
import { OATH_ITEM_ID } from "@/lib/oath";

type StateMap = Record<string, ItemState>;
type BoolMap = Record<string, boolean>;

function initStates(completed: BoolMap, failed: BoolMap): StateMap {
  const s: StateMap = {};
  for (const id in completed) if (completed[id]) s[id] = "done";
  for (const id in failed) if (failed[id]) s[id] = "failed";
  return s;
}

export default function TodayView({
  initialCompleted,
  initialFailed,
  initialStopps,
  streak,
  readChapters,
  lectureRead,
  todayDate,
  initialValidated,
  initialCounters,
  restDay,
  weekday,
  gymLabel,
  daysToJan,
  plan,
}: {
  initialCompleted: BoolMap;
  initialFailed: BoolMap;
  initialStopps: number;
  streak: number;
  readChapters: BoolMap;
  lectureRead: BoolMap;
  todayDate: string;
  initialValidated: boolean;
  initialCounters: Record<string, number>;
  restDay: boolean;
  /** 0 = dimanche. La montagne ne s'affiche que dimanche et jeudi. */
  weekday: number;
  gymLabel: string;
  daysToJan: number;
  plan: Plan;
}) {
  // Tout vient du plan : les objectifs affichés, les règles, le noyau, le
  // dénominateur du score. Modifier le plan dans les réglages change la
  // journée dès le rechargement.
  const items = orderedObjectives(plan, restDay, weekday);
  const regles = planRules(plan);
  const activeChecklist = items.map((i) => i.id);
  const ruleIds = regles.map((r) => r.id);
  const activeAllIds = [...activeChecklist, ...ruleIds];
  const coreSet = new Set(planCoreIds(plan, restDay, weekday));
  const planLabel = planLabels(plan);
  const [states, setStates] = useState<StateMap>(() =>
    initStates(initialCompleted, initialFailed),
  );
  const [counters, setCounters] =
    useState<Record<string, number>>(initialCounters);
  const [stopps, setStopps] = useState(initialStopps);
  const [phrase, setPhrase] = useState<string | null>(null);
  const [rulesOpen, setRulesOpen] = useState(true);
  const [listOpen, setListOpen] = useState(false);
  const [validated, setValidated] = useState(initialValidated);
  const [validateOpen, setValidateOpen] = useState(false);
  const [, startTransition] = useTransition();

  const { score, failedIds } = useMemo(() => {
    const activeSet = new Set(activeAllIds);
    const completedMap: BoolMap = {};
    const failed: string[] = [];
    for (const [id, st] of Object.entries(states)) {
      if (st === "done") completedMap[id] = true;
      else if (st === "failed" && activeSet.has(id)) failed.push(id);
    }
    return {
      score: computeScore(completedMap, activeChecklist, ruleIds),
      failedIds: failed,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states, restDay, activeAllIds.join(",")]);

  const core = useMemo(() => {
    const completedMap: BoolMap = {};
    for (const [id, st] of Object.entries(states))
      if (st === "done") completedMap[id] = true;
    return planCoreStatus(plan, completedMap, restDay, weekday);
  }, [states, restDay, plan]);

  const labelFor = (id: string) =>
    id === "gym" ? gymLabel : (planLabel[id] ?? ITEM_LABEL[id] ?? id);

  const lectureProg = useMemo(
    () => lectureProgress(lectureRead, todayDate),
    [lectureRead, todayDate],
  );
  const verdict = useMemo(() => buildVerdict(failedIds), [failedIds]);
  const chapterRead = verdict
    ? !!readChapters[String(verdict.assignedChapter)]
    : false;
  const neutralIds = useMemo(
    () => activeAllIds.filter((id) => !states[id]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [states, restDay],
  );

  function setItem(id: string, next: ItemState) {
    const prev = states;
    setStates((s) => {
      const c = { ...s };
      if (next === "neutral") delete c[id];
      else c[id] = next;
      return c;
    });
    startTransition(async () => {
      try {
        await setItemStateAction(id, next);
      } catch {
        setStates(prev);
      }
    });
  }

  function setCounterValue(id: string, value: number) {
    const target = videoTarget(id);
    const v = Math.max(0, Math.min(target, value));
    const prevCounters = counters;
    const prevStates = states;
    setCounters((c) => ({ ...c, [id]: v }));
    setStates((s) => {
      const c = { ...s };
      if (target > 0 && v >= target) c[id] = "done";
      else if (c[id] === "done") delete c[id];
      return c;
    });
    startTransition(async () => {
      try {
        await setCounterAction(id, v);
      } catch {
        setCounters(prevCounters);
        setStates(prevStates);
      }
    });
  }

  function fireStopp() {
    setPhrase(randomStoppPhrase());
    setStopps((n) => n + 1);
    startTransition(async () => {
      try {
        await logStoppAction();
      } catch {
        /* non-critical */
      }
    });
  }

  function doValidate(failNeutrals: boolean) {
    if (failNeutrals) {
      setStates((s) => {
        const c = { ...s };
        for (const id of activeAllIds) if (!c[id]) c[id] = "failed";
        return c;
      });
    }
    setValidated(true);
    setValidateOpen(false);
    startTransition(async () => {
      try {
        await validateDayAction(failNeutrals);
      } catch {
        setValidated(initialValidated);
      }
    });
  }

  function onValidateClick() {
    if (neutralIds.length > 0) setValidateOpen(true);
    else doValidate(false);
  }

  return (
    <>
      {/* Le serment s'impose à l'ouverture tant qu'il n'a pas été déclaré. */}
      <DailyOath
        done={states[OATH_ITEM_ID] === "done"}
        onDone={() => setStates((s) => ({ ...s, [OATH_ITEM_ID]: "done" }))}
      />

      <header className="sticky top-0 z-30 bg-background/95 px-4 pb-2.5 pt-3 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold leading-none tracking-tight text-navy">
            FORGED
          </h1>
          <div className="flex items-center gap-2">
            <StreakBadge streak={streak} />
            <RefreshButton />
            <button
              type="button"
              aria-label="Se déconnecter"
              onClick={() => startTransition(() => signOutAction())}
              className="flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition hover:text-text-secondary md:hidden"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>

        <div className="mt-2">
          <ProgressBar percent={score.percent} />
          <div className="mt-1.5 flex items-center justify-between">
            <span className="tnum font-display text-xl font-bold leading-none text-text-primary">
              {score.completed}
              <span className="text-sm text-text-muted"> / {score.total}</span>
            </span>
            <div className="flex items-center gap-2 text-[11px] text-text-muted">
              {validated && failedIds.length > 0 && (
                <span className="font-semibold text-red">
                  {failedIds.length} échec{failedIds.length > 1 ? "s" : ""}
                </span>
              )}
              {stopps > 0 && <span>· {stopps} STOPP</span>}
              <button
                type="button"
                onClick={() => setListOpen(true)}
                className="inline-flex items-center gap-1 font-medium transition hover:text-red"
                title="Voir les phrases STOPP"
              >
                <List size={12} /> phrases
              </button>
            </div>
            <span
              className="tnum font-display text-xl font-bold leading-none"
              style={{ color: scoreColorVar(score.percent) }}
            >
              {score.percent}%
            </span>
          </div>

          <Link
            href="/vision"
            className="mt-1.5 flex items-center justify-between rounded-lg px-2.5 py-1"
            style={{ background: "var(--red-soft)" }}
          >
            <span className="text-[11px] font-semibold text-red">
              🎯 Objectif 1er janvier 2027
            </span>
            <span className="tnum text-[12px] font-bold text-red">
              J−{daysToJan}
            </span>
          </Link>
        </div>
      </header>

      {/* Le sceau — les trois mots gravés jusqu'au dernier souffle. */}
      <p
        className="px-4 pt-1 text-center text-[10px] font-bold uppercase tracking-[0.25em]"
        style={{ color: "var(--gold)" }}
      >
        Inébranlable · Démesuré · Fidèle
      </p>

      <div className="flex flex-col gap-6 px-4 pt-2">
        <div className="colonnes-xl">
          {verdict && <Verdict verdict={verdict} chapterRead={chapterRead} />}

          {/* Noyau du jour — la série ne tient QUE si le noyau est complet. */}
          <div
            className="rounded-2xl border p-4"
            style={
              core.complete
                ? {
                    background: "var(--green-soft)",
                    borderColor: "rgba(22,163,74,0.4)",
                  }
                : { background: "var(--red-soft)", borderColor: "var(--red)" }
            }
          >
            <div className="flex items-center justify-between">
              <span
                className="flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide"
                style={{ color: core.complete ? "var(--green)" : "var(--red)" }}
              >
                🔑 Noyau du jour
              </span>
              <span
                className="tnum font-display text-lg font-bold"
                style={{ color: core.complete ? "var(--green)" : "var(--red)" }}
              >
                {core.done}/{core.total}
              </span>
            </div>
            {core.complete ? (
              <p className="mt-1 text-[12.5px] font-semibold text-green">
                Streak sécurisée ✓ — tu as tenu l&apos;essentiel. Le reste est du
                bonus.
              </p>
            ) : (
              <p className="mt-1 text-[12px] leading-snug text-text-secondary">
                Manque pour sécuriser la série :{" "}
                <span className="font-semibold text-red">
                  {core.missing.slice(0, 4).map(labelFor).join(" · ")}
                  {core.missing.length > 4 ? ` +${core.missing.length - 4}` : ""}
                </span>
              </p>
            )}
          </div>

          <NowNext items={items} states={states} gymLabel={gymLabel} />
        </div>

        {/* One chronological flow — du début de la journée à sa fin, sans
            libellés matin/après-midi/soir. Ordre par heure. */}
        <div className="grid-objectives">
          {items.map((item) =>
            item.id === LECTURE_ITEM_ID ? (
              <LectureItem
                key={item.id}
                readCount={lectureProg.readCount}
                target={LECTURE_TARGET}
                state={states[item.id] ?? "neutral"}
                core={coreSet.has(item.id)}
                onSetState={(s) => setItem(item.id, s)}
              />
            ) : isVideoCounter(item.id) ? (
              <VideoCounterItem
                key={item.id}
                label={item.label}
                count={counters[item.id] ?? 0}
                target={videoTarget(item.id)}
                state={states[item.id] ?? "neutral"}
                onIncrement={() =>
                  setCounterValue(item.id, (counters[item.id] ?? 0) + 1)
                }
                onDecrement={() =>
                  setCounterValue(item.id, (counters[item.id] ?? 0) - 1)
                }
                onSetFailed={(failed) =>
                  setItem(item.id, failed ? "failed" : "neutral")
                }
              />
            ) : (
              <ChecklistItem
                key={item.id}
                label={item.id === "gym" ? gymLabel : item.label}
                time={item.time}
                state={states[item.id] ?? "neutral"}
                core={coreSet.has(item.id)}
                onSetState={(s) => setItem(item.id, s)}
              />
            ),
          )}
        </div>

        {/* Absolute rules — checkable, red. */}
        <section
          className="flex flex-col gap-2 rounded-2xl p-3"
          style={{ background: "var(--red-soft)" }}
        >
          <button
            type="button"
            onClick={() => setRulesOpen((o) => !o)}
            className="flex items-center justify-between rounded-lg px-3 py-2"
            style={{ background: "var(--red)" }}
          >
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Règles absolues — confirmées aujourd&apos;hui
            </h2>
            <ChevronDown
              size={18}
              color="#fff"
              className="transition"
              style={{ transform: rulesOpen ? "rotate(180deg)" : "none" }}
            />
          </button>

          {rulesOpen && (
            <div className="flex flex-col gap-2">
              <p className="px-1 text-[11px] text-red">
                {score.rulesCompleted} / {regles.length} règles
                confirmées. Le ✕ = j&apos;assume avoir brisé cette règle.
              </p>
              <div className="grid-objectives">
                {regles.map((rule) => (
                  <ChecklistItem
                    key={rule.id}
                    label={rule.label}
                    state={states[rule.id] ?? "neutral"}
                    variant="rule"
                    core={coreSet.has(rule.id)}
                    onSetState={(s) => setItem(rule.id, s)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Close the day */}
        <div className="flex flex-col gap-1.5 pt-1">
          <button
            type="button"
            onClick={onValidateClick}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[15px] font-semibold uppercase tracking-wide text-white transition active:scale-[0.99] md:mx-auto md:max-w-md"
            style={{ background: validated ? "var(--green)" : "var(--navy)" }}
          >
            {validated ? <Check size={18} /> : <ClipboardCheck size={18} />}
            {validated
              ? `Journée validée · ${score.completed} faits · ${failedIds.length} échecs`
              : "Valider la journée"}
          </button>
          {!validated && neutralIds.length > 0 && (
            <p className="text-center text-[11px] text-text-muted">
              {neutralIds.length} objectif{neutralIds.length > 1 ? "s" : ""} non
              décidé{neutralIds.length > 1 ? "s" : ""} (ni ✓ ni ✕)
            </p>
          )}
        </div>
      </div>

      <StoppButton onClick={fireStopp} />
      {phrase && (
        <StoppOverlay phrase={phrase} onDismiss={() => setPhrase(null)} />
      )}
      {listOpen && <StoppList onClose={() => setListOpen(false)} />}
      {validateOpen && (
        <ValidateDayModal
          neutralLabels={neutralIds.map((id) => ITEM_LABEL[id] ?? id)}
          onFailAll={() => doValidate(true)}
          onValidateAnyway={() => doValidate(false)}
          onClose={() => setValidateOpen(false)}
        />
      )}
    </>
  );
}
