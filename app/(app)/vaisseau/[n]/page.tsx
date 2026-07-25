import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, List, Gavel } from "lucide-react";
import { getChapter, getAdjacent } from "@/lib/vaisseau";
import { requireUserId } from "@/lib/auth";
import { getOrCreateTodayLog } from "@/lib/daily";
import ChapterReadButton from "@/components/ChapterReadButton";

export const dynamic = "force-dynamic";

// Heuristic: a paragraph like "…texte… — Référence 12:3" is a scripture quote.
function isQuote(p: string): boolean {
  const idx = p.lastIndexOf(" — ");
  if (idx < 0 || idx < p.length - 70) return false;
  const tail = p.slice(idx + 3);
  return /[0-9:]/.test(tail) && tail.length < 60;
}

export default async function ChapterPage({
  params,
  searchParams,
}: {
  params: { n: string };
  searchParams: { ctx?: string };
}) {
  const n = Number(params.n);
  if (!Number.isInteger(n)) notFound();
  const chapter = getChapter(n);
  if (!chapter) notFound();

  const ctx =
    searchParams.ctx === "verdict"
      ? "verdict"
      : searchParams.ctx === "lecture"
        ? "lecture"
        : "browse";

  const userId = await requireUserId();
  const log = await getOrCreateTodayLog(userId);
  const alreadyRead =
    ctx === "verdict"
      ? !!(log.readChapters ?? {})[String(n)]
      : ctx === "lecture"
        ? !!(log.lectureRead ?? {})[String(n)]
        : false;

  const backHref = ctx === "verdict" ? "/today" : "/vaisseau";
  const backLabel =
    ctx === "verdict" ? "Retour aux objectifs" : "Sommaire";
  const { prev, next } = getAdjacent(n);
  const showNav = ctx === "browse";

  return (
    <main className="px-4 pb-10 pt-5 md:mx-auto md:max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={backHref}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-text-secondary transition hover:text-navy"
        >
          <ArrowLeft size={16} /> {backLabel}
        </Link>
        <span className="tnum text-[12px] font-semibold text-text-muted">
          Chapitre {chapter.n}
        </span>
      </div>

      {ctx === "verdict" && (
        <div
          className="mb-5 flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: "var(--red-soft)" }}
        >
          <Gavel size={15} color="var(--red)" />
          <span className="text-[12px] font-semibold text-red">
            Obligation du Verdict — lis, puis retourne aux objectifs.
          </span>
        </div>
      )}

      <p className="mb-1 text-[11px] uppercase tracking-[0.12em] text-text-muted">
        {chapter.book}
      </p>
      <h1 className="mb-6 font-display text-3xl font-bold leading-tight tracking-tight text-navy">
        {chapter.title}
      </h1>

      <article className="flex flex-col gap-4">
        {chapter.paragraphs.map((p, i) =>
          isQuote(p) ? (
            <blockquote
              key={i}
              className="border-l-4 py-1 pl-4 text-[15px] italic leading-relaxed text-text-secondary"
              style={{ borderColor: "var(--red)" }}
            >
              {p}
            </blockquote>
          ) : (
            <p key={i} className="text-[15px] leading-relaxed text-text-primary">
              {p}
            </p>
          ),
        )}
      </article>

      {ctx !== "browse" && (
        <div className="mt-8 border-t border-border pt-6">
          <ChapterReadButton chapterN={n} initialRead={alreadyRead} ctx={ctx} />
        </div>
      )}

      {showNav && (
        <nav className="mt-8 flex items-center justify-between border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/vaisseau/${prev}`}
              className="flex items-center gap-1 text-[13px] font-semibold text-text-secondary transition hover:text-navy"
            >
              <ChevronLeft size={16} /> Précédent
            </Link>
          ) : (
            <span />
          )}
          <Link
            href="/vaisseau"
            className="text-text-muted transition hover:text-navy"
            aria-label="Sommaire"
          >
            <List size={18} />
          </Link>
          {next ? (
            <Link
              href={`/vaisseau/${next}`}
              className="flex items-center gap-1 text-[13px] font-semibold text-text-secondary transition hover:text-navy"
            >
              Suivant <ChevronRight size={16} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </main>
  );
}
