import "server-only";
import { getRecentLogs, getGlobalStats, getStreak } from "./daily";
import { getRetention } from "./retention";
import { computeScore } from "./scoring";
import {
  todayHaiti,
  formatShort,
  weekday,
  lastNDates,
  daysBetween,
} from "./dates";
import { ITEM_LABEL } from "./verdict";
import { CHECKLIST, activeChecklistIds } from "./checklist";
import { ABSOLUTE_RULES } from "./rules";
import { getProgram } from "./programs";
import { isRestDay } from "./program";
import { coreStatus } from "./core";

const DAY_FR = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
];

/**
 * Builds a compact, factual snapshot of the man's real discipline data for the
 * coach. No spin — just the numbers, so the AI can judge how serious he is.
 */
export async function assembleContext(userId: string): Promise<string> {
  const today = todayHaiti();
  const [logs, global, streak, ret, program] = await Promise.all([
    getRecentLogs(userId, 30),
    getGlobalStats(userId),
    getStreak(userId),
    getRetention(userId),
    getProgram(userId),
  ]);

  const byDate = new Map(logs.map((l) => [l.date, l]));
  const todayLog = byDate.get(today);
  const restToday = isRestDay(program, weekday(today));
  const todayScore = todayLog
    ? computeScore(todayLog.completedItems, activeChecklistIds(restToday))
    : null;
  const todayCore = todayLog
    ? coreStatus(todayLog.completedItems, restToday)
    : null;

  // Core-based "serious" days over the tracked window.
  const coreDays = logs.filter(
    (l) =>
      coreStatus(l.completedItems, isRestDay(program, weekday(l.date))).complete,
  ).length;

  // When tracking began — days before this DID NOT EXIST (no app), not failures.
  const firstDate = logs.length
    ? logs.map((l) => l.date).sort()[0]
    : null;
  const daysTracked = firstDate ? daysBetween(firstDate, today) + 1 : 0;
  const daysToJan = daysBetween(today, "2027-01-01");

  // Failure frequency across the last 30 days.
  const failCounts: Record<string, number> = {};
  for (const l of logs) {
    for (const [id, v] of Object.entries(l.failedItems ?? {})) {
      if (v) failCounts[id] = (failCounts[id] ?? 0) + 1;
    }
  }
  const topFailures = Object.entries(failCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([id, n]) => `- ${ITEM_LABEL[id] ?? id} : échoué ${n}× ce mois`);

  // Last 7 days line. Days before the app existed are NOT gaps or failures.
  const week: string[] = lastNDates(today, 7).map((ds) => {
    const label = `  ${DAY_FR[weekday(ds)]} ${formatShort(ds)} : `;
    if (firstDate && ds < firstDate) {
      return `${label}— (l'app n'existait pas encore, ignorer)`;
    }
    const l = byDate.get(ds);
    if (!l) return `${label}NON ENREGISTRÉ (vrai trou depuis le début du suivi)`;
    const pct = l.score ?? 0;
    const core = coreStatus(l.completedItems, isRestDay(program, weekday(ds)));
    const fails = Object.values(l.failedItems ?? {}).filter(Boolean).length;
    return `${label}${pct}% · noyau ${core.done}/${core.total}${
      core.complete ? " ✓ TENU" : ""
    }${fails ? ` (${fails} échecs)` : ""}`;
  });

  const totalObjectifs =
    CHECKLIST.reduce((a, s) => a + s.items.length, 0) + ABSOLUTE_RULES.length;

  return [
    `=== DONNÉES RÉELLES DE L'HOMME (heure Haïti, aujourd'hui = ${today}) ===`,
    firstDate
      ? `⚠️ LE SUIVI DANS L'APP A COMMENCÉ LE ${firstDate}. Il n'y a que ${daysTracked} jour(s) de suivi possibles. AVANT le ${firstDate}, l'app N'EXISTAIT PAS : ces jours ne sont NI des trous NI des échecs — ne les mentionne pas, ne l'accuse pas d'avoir "sauté" des jours qui n'existaient pas. Juge uniquement à partir du ${firstDate}, et tiens compte que l'échantillon est minuscule (${daysTracked} jours) : dis la vérité sur ce début, sans inventer un passé.`
      : `⚠️ Aucune donnée : il n'a encore rien enregistré. Ne l'accuse pas d'un passé qui n'existe pas dans l'app.`,
    ``,
    `🎯 COMPTE À REBOURS : J-${daysToJan} avant le 1er janvier 2027 — deadline de sa transformation (objectif : 1m88, 90 kg, 10% BF, peau éclatante, + lancer agriculture, achat de terrain, début d'une école, aider des gens). Relie chaque journée à ce compte à rebours.`,
    ``,
    ret.days > 0
      ? `RÉTENTION SÉMINALE : JOUR ${ret.days} (démarré le ${ret.startDate}). Seuil de bascule à 21 jours (ch. 20). C'est le compteur le plus important — protège-le comme sa vie.`
      : `RÉTENTION SÉMINALE : remise à zéro totale — redémarre DEMAIN (${ret.startDate}), Jour 1. Il repart propre pour finir l'année. Seuil de bascule à 21 jours (ch. 20).`,
    ``,
    `LE STREAK EST BASÉ SUR LE NOYAU NON-NÉGOCIABLE, pas sur le %. Une journée ne compte dans la série QUE si tout le noyau est coché : rétention + 0 porn + 0 scroll + STOPP (le vaisseau) ; course + muscu (jours d'entraînement) + jeûne + 0 sucre + coucher 21h (le corps) ; 1 bloc de deep work (l'œuvre) ; PS 24 + lecture + manifeste (l'esprit). Rétention brisée = streak cassé, toujours. Un petit rituel raté ne casse PAS le streak. Juge son sérieux par le NOYAU, jamais par un détail secondaire.`,
    ``,
    `AUJOURD'HUI :`,
    todayScore
      ? `  ${todayScore.completed}/${todayScore.total} objectifs (${todayScore.percent}%) — ${todayScore.rulesCompleted}/${ABSOLUTE_RULES.length} règles. Journée ${todayLog?.validated ? "VALIDÉE" : "PAS encore validée"}. ${todayLog?.daydreamStopps ?? 0} STOPP.`
      : `  Rien enregistré aujourd'hui.`,
    todayCore
      ? `  🔑 NOYAU DU JOUR : ${todayCore.done}/${todayCore.total} ${
          todayCore.complete
            ? "— TENU ✓ (la série est sécurisée aujourd'hui)"
            : `— PAS encore tenu. Manque : ${todayCore.missing
                .map((id) => ITEM_LABEL[id] ?? id)
                .join(", ")}`
        }`
      : ``,
    ``,
    `7 DERNIERS JOURS :`,
    ...week,
    ``,
    `GLOBAL (depuis le début) :`,
    `  Série actuelle (NOYAU) : ${streak.currentStreak ?? 0} jours · Record : ${streak.longestStreak ?? 0} jours`,
    `  Jours à NOYAU complet : ${coreDays}/${global.totalDays} — c'est le vrai chiffre du sérieux.`,
    `  Jours suivis : ${global.totalDays} · Moyenne : ${global.avgPercent}% · Meilleur jour : ${global.bestPercent}%`,
    `  Jours ≥ 80% : ${global.daysPassed}/${global.totalDays} · Jours parfaits (${totalObjectifs}/${totalObjectifs}) : ${global.perfectDays} · STOPP au total : ${global.totalStopps}`,
    ``,
    topFailures.length
      ? `CE QU'IL RATE LE PLUS (30 jours) :\n${topFailures.join("\n")}`
      : `Aucun échec assumé enregistré ce mois (soit parfait, soit pas assez honnête avec le ✕).`,
    `=== FIN DES DONNÉES ===`,
  ].join("\n");
}
