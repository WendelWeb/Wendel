import { requireUserId } from "@/lib/auth";
import { getOrCreateTodayLog, getStreak } from "@/lib/daily";
import { getRetention } from "@/lib/retention";
import { getProgram } from "@/lib/programs";
import { getPlan } from "@/lib/plans";
import { isRestDay } from "@/lib/program";
import { planCoreStatus } from "@/lib/plan";
import { todayHaiti, weekdayHaiti } from "@/lib/dates";
import { daysUntil, DATE_JANVIER, DATE_TRENTE_ANS } from "@/lib/objectives";
import { MIROIR, MIROIR_THESE, MIROIR_SORTIE } from "@/lib/miroir";
import { MIROIR_RETOURNE } from "@/lib/miroir-plus";
import { MIROIR_EN, MIROIR_EN_THESE, MIROIR_EN_SORTIE } from "@/lib/miroir-en";
import { MIROIR_HT, MIROIR_HT_THESE, MIROIR_HT_SORTIE } from "@/lib/miroir-ht";
import { getSerment } from "@/lib/serments";
import { haitiHour } from "@/lib/dates";
import MiroirView, { type MiroirLangue } from "@/components/MiroirView";

export const dynamic = "force-dynamic";

const LANGUES: MiroirLangue[] = [
  {
    code: "en",
    nom: "English",
    these: MIROIR_EN_THESE,
    sortie: MIROIR_EN_SORTIE,
    sortieLabel: "The way out",
    blocs: MIROIR_EN,
  },
  {
    code: "fr",
    nom: "Français",
    these: MIROIR_THESE,
    sortie: MIROIR_SORTIE,
    sortieLabel: "La sortie",
    blocs: [...MIROIR, ...MIROIR_RETOURNE],
  },
  {
    code: "ht",
    nom: "Kreyòl",
    these: MIROIR_HT_THESE,
    sortie: MIROIR_HT_SORTIE,
    sortieLabel: "Pòt sòti a",
    blocs: MIROIR_HT,
  },
];

export default async function MiroirPage() {
  const userId = await requireUserId();
  const [log, streak, ret, program, plan, serment] = await Promise.all([
    getOrCreateTodayLog(userId),
    getStreak(userId),
    getRetention(userId),
    getProgram(userId),
    getPlan(userId),
    getSerment(userId),
  ]);

  const rest = isRestDay(program, weekdayHaiti());
  const core = planCoreStatus(plan, log.completedItems, rest);
  const today = todayHaiti();

  return (
    <MiroirView
      langues={LANGUES}
      serment={serment}
      heure={haitiHour()}
      etat={{
        daysToJan: daysUntil(today, DATE_JANVIER),
        daysTo30: daysUntil(today, DATE_TRENTE_ANS),
        retentionDays: ret.days,
        coreDone: core.done,
        coreTotal: core.total,
        streak: streak.currentStreak ?? 0,
      }}
    />
  );
}
