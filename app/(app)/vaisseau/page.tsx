import Link from "next/link";
import { ChevronRight, Siren } from "lucide-react";
import { CHAPTER_META, type ChapterMeta } from "@/lib/vaisseau-meta";
import { requireUserId } from "@/lib/auth";
import { exigerDebloque } from "@/lib/verrou";
import { getOrCreateTodayLog } from "@/lib/daily";
import { lectureProgress } from "@/lib/lecture";
import { getRetention } from "@/lib/retention";
import { getMountain } from "@/lib/mountain";
import { todayHaiti, daysBetween } from "@/lib/dates";
import LectureDuJour from "@/components/LectureDuJour";
import RetentionPanel from "@/components/RetentionPanel";
import MountainPanel from "@/components/MountainPanel";
import { visitSeed } from "@/lib/rotate";

export const dynamic = "force-dynamic";

export default async function VaisseauPage() {
  const userId = await requireUserId();
  await exigerDebloque(userId);
  const [log, ret, mtn] = await Promise.all([
    getOrCreateTodayLog(userId),
    getRetention(userId),
    getMountain(userId),
  ]);
  const lectureRead = log.lectureRead ?? {};
  const { chapters, readCount } = lectureProgress(lectureRead, todayHaiti());

  const groups: { book: string; items: ChapterMeta[] }[] = [];
  for (const c of CHAPTER_META) {
    let g = groups[groups.length - 1];
    if (!g || g.book !== c.book) {
      g = { book: c.book, items: [] };
      groups.push(g);
    }
    g.items.push(c);
  }

  return (
    <main className="px-4 pt-6">
      {/* Les livres — en haut, disposés de gauche à droite (ordre de lecture). */}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {groups.map((g) => (
          <section key={g.book}>
            <h2 className="mb-2 font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-text-secondary">
              {g.book}
            </h2>
            <div className="overflow-hidden rounded-xl border border-border bg-surface">
              {g.items.map((c, i) => (
                <Link
                  key={c.n}
                  href={`/vaisseau/${c.n}`}
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-surface-raised"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid var(--border)",
                  }}
                >
                  <span className="tnum w-7 flex-shrink-0 text-[13px] font-bold text-text-muted">
                    {c.n}
                  </span>
                  <span className="min-w-0 flex-1 text-[13.5px] leading-snug text-text-primary">
                    {c.title}
                  </span>
                  <ChevronRight
                    size={16}
                    className="flex-shrink-0 text-text-muted"
                  />
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Titre + rétention + lecture du jour + urgence — déplacés en bas. */}
      <div className="mt-10 md:mx-auto md:max-w-3xl">
        <h1 className="font-display text-4xl font-bold tracking-tight text-navy">
          LE VAISSEAU
        </h1>
        <p className="mb-6 mt-1 text-[12px] uppercase tracking-[0.15em] text-text-muted">
          Livre de l&apos;énergie, de la grâce, et du décret
        </p>

        <RetentionPanel
          days={ret.days}
          startDate={ret.startDate}
          daysUntilStart={Math.max(1, daysBetween(todayHaiti(), ret.startDate))}
          seed={visitSeed()}
        />

        <MountainPanel
          daysSince={mtn.daysSince}
          lastVisit={mtn.lastVisit}
          due={mtn.due}
        />

        <LectureDuJour
          chapters={chapters}
          readMap={lectureRead}
          readCount={readCount}
        />

        <Link
          href="/urgence"
          className="flex items-center gap-3 rounded-2xl border p-4 transition hover:opacity-90"
          style={{ borderColor: "var(--red)", background: "var(--red-soft)" }}
        >
          <Siren size={22} className="flex-shrink-0 text-red" />
          <span className="min-w-0 flex-1">
            <span className="block font-display text-base font-bold uppercase tracking-wide text-red">
              Urgence — quand je suis tenté
            </span>
            <span className="block text-[12px] text-text-secondary">
              «&nbsp;Quand je pense à…&nbsp;» + affirmations + Coach, en un tap.
            </span>
          </span>
          <ChevronRight size={18} className="flex-shrink-0 text-red" />
        </Link>
      </div>
    </main>
  );
}
