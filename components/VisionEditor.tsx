"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Pencil,
  Check,
  Loader2,
  X,
  Flame,
  Home,
  Store,
  Sun,
  GraduationCap,
  School,
  BedDouble,
  Building2,
  Briefcase,
  Car,
  Trophy,
  Sparkles,
  Landmark,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { saveVisionAction } from "@/app/vision-actions";

const ACCENTS = [
  "#0F172A",
  "#16A34A",
  "#DC2626",
  "#EA580C",
  "#0F766E",
  "#3B1F6E",
  "#1E3A5F",
];

function iconFor(title: string): LucideIcon {
  const t = title.toLowerCase();
  if (t.includes("pourquoi")) return Flame;
  if (t.includes("hôpit") || t.includes("santé")) return HeartPulse;
  if (t.includes("maison")) return Home;
  if (t.includes("marché")) return Store;
  if (t.includes("solaire") || t.includes("énergie")) return Sun;
  if (t.includes("universit")) return GraduationCap;
  if (t.includes("école")) return School;
  if (t.includes("hôtel")) return BedDouble;
  if (t.includes("gratte") || t.includes("immeuble")) return Building2;
  if (t.includes("emploi")) return Briefcase;
  if (t.includes("voiture")) return Car;
  if (t.includes("défi")) return Trophy;
  if (t.includes("venir")) return Sparkles;
  return Landmark;
}

// Split a line into bold / money / big-number / plain tokens and style each.
const TOKEN =
  /(\*\*[^*]+\*\*|\$\d[\d.,]*(?:\s?[–-]\s?\$?\d[\d.,]*)?(?:\s?(?:Md|M|B|K))?|\b\d{1,3}(?:[   ]\d{3})+\b)/g;

function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((p, i) => {
        if (!p) return null;
        if (p.startsWith("**") && p.endsWith("**"))
          return (
            <strong key={i} className="font-bold text-text-primary">
              {p.slice(2, -2)}
            </strong>
          );
        if (p.startsWith("$"))
          return (
            <strong key={i} className="font-bold text-green">
              {p}
            </strong>
          );
        if (/^\d/.test(p))
          return (
            <strong key={i} className="font-bold text-navy">
              {p}
            </strong>
          );
        return <span key={i}>{p}</span>;
      })}
    </>
  );
}

interface Section {
  title: string;
  lines: string[];
}

function parseSections(content: string): { preamble: string[]; sections: Section[] } {
  const preamble: string[] = [];
  const sections: Section[] = [];
  for (const raw of content.split("\n")) {
    const line = raw.trimEnd();
    if (line.startsWith("# ")) {
      sections.push({ title: line.slice(2), lines: [] });
    } else if (sections.length === 0) {
      if (line.trim()) preamble.push(line);
    } else {
      sections[sections.length - 1].lines.push(line);
    }
  }
  return { preamble, sections };
}

function SectionBody({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {lines.map((line, i) => {
        const t = line.trim();
        if (t.startsWith("## ") || t.startsWith("### "))
          return (
            <h4 key={i} className="mt-1.5 text-[13px] font-bold text-text-primary">
              <Rich text={t.replace(/^#+\s/, "")} />
            </h4>
          );
        if (t.startsWith("- "))
          return (
            <div key={i} className="flex gap-2 text-[13px] leading-snug text-text-secondary">
              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-red" />
              <span>
                <Rich text={t.slice(2)} />
              </span>
            </div>
          );
        if (t === "") return null;
        return (
          <p key={i} className="text-[13px] leading-relaxed text-text-secondary">
            <Rich text={t} />
          </p>
        );
      })}
    </div>
  );
}

export default function VisionEditor({
  initialContent,
  initialCreed,
  daysToJan,
  daysTo30,
}: {
  initialContent: string;
  initialCreed: string;
  daysToJan: number;
  daysTo30: number;
}) {
  const [content, setContent] = useState(initialContent);
  const [creed, setCreed] = useState(initialCreed);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, start] = useTransition();

  const { preamble, sections } = useMemo(
    () => parseSections(content),
    [content],
  );
  const chantiers = sections.filter(
    (s) => !/pourquoi|venir|objectif/i.test(s.title),
  ).length;

  function save() {
    start(async () => {
      try {
        await saveVisionAction(content, creed);
        setSaved(true);
        setEditing(false);
      } catch {
        /* ignore */
      }
    });
  }

  return (
    <main className="px-4 pb-12 pt-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight text-navy">
          MA VISION
        </h1>
        {!editing ? (
          <button
            type="button"
            onClick={() => {
              setSaved(false);
              setEditing(true);
            }}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[13px] font-semibold text-text-secondary transition hover:border-navy"
          >
            <Pencil size={14} /> Modifier
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setContent(initialContent);
                setCreed(initialCreed);
                setEditing(false);
              }}
              className="flex items-center gap-1 rounded-lg px-2 py-2 text-[13px] text-text-muted"
            >
              <X size={14} /> Annuler
            </button>
            <button
              type="button"
              onClick={save}
              disabled={pending}
              className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold uppercase tracking-wide text-white disabled:opacity-60"
              style={{ background: "var(--navy)" }}
            >
              {pending ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Check size={14} />
              )}
              Enregistrer
            </button>
          </div>
        )}
      </div>

      {/* Les deux échéances : la transformation, puis le défi ultime. */}
      {!editing && (
        <div className="mb-5 grid gap-2.5 sm:grid-cols-2">
          <div
            className="flex items-center justify-between rounded-2xl px-5 py-4"
            style={{
              background:
                "linear-gradient(135deg, var(--red) 0%, var(--orange) 100%)",
            }}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                1er janvier 2027
              </p>
              <p className="font-display text-lg font-bold uppercase leading-tight text-white">
                La transformation
              </p>
            </div>
            <div className="text-right">
              <span className="tnum font-display text-3xl font-bold leading-none text-white">
                J−{daysToJan}
              </span>
            </div>
          </div>

          <div
            className="flex items-center justify-between rounded-2xl px-5 py-4"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #B45309 100%)",
            }}
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                16 mai 2033 · mes 30 ans
              </p>
              <p className="font-display text-lg font-bold uppercase leading-tight text-white">
                Le défi ultime
              </p>
            </div>
            <div className="text-right">
              <span className="tnum font-display text-3xl font-bold leading-none text-white">
                J−{daysTo30}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* HERO — credo */}
      <div
        className="mb-6 overflow-hidden rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
        }}
      >
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-white/50">
          Mon credo
        </p>
        {editing ? (
          <textarea
            value={creed}
            onChange={(e) => setCreed(e.target.value)}
            className="min-h-[70px] w-full resize-y rounded-lg bg-white/10 p-2 text-[15px] text-white outline-none"
          />
        ) : (
          <p className="font-display text-xl font-bold leading-snug text-white">
            {creed}
          </p>
        )}
        {!editing && (
          <div className="mt-4 flex flex-wrap gap-2">
            {chantiers > 0 && (
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
                {chantiers} grands chantiers
              </span>
            )}
            <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
              Pour Haïti · Je bâtis
            </span>
          </div>
        )}
      </div>

      {saved && (
        <p className="mb-3 flex items-center gap-1.5 text-[12px] font-semibold text-green">
          <Check size={14} /> Vision enregistrée.
        </p>
      )}

      {editing ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[60vh] w-full resize-y rounded-xl border border-border bg-surface p-4 font-mono text-[13px] leading-relaxed text-text-primary outline-none focus:border-navy"
          placeholder="Markdown simple : # Titre de chantier · ## Sous-titre · - puce · **gras**"
        />
      ) : (
        <>
          {preamble.length > 0 && (
            <p className="mb-4 text-[13.5px] leading-relaxed text-text-secondary">
              {preamble.map((l, i) => (
                <span key={i}>
                  <Rich text={l} />
                  <br />
                </span>
              ))}
            </p>
          )}
          <div className="grid-objectives">
            {sections.map((s, i) => {
              const Icon = iconFor(s.title);
              const accent = ACCENTS[i % ACCENTS.length];
              return (
                <section
                  key={i}
                  className={`overflow-hidden rounded-2xl border border-border bg-surface${
                    s.lines.length > 12 ? " pleine-largeur" : ""
                  }`}
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ background: accent }}
                  >
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-white/15">
                      <Icon size={18} color="#fff" />
                    </span>
                    <h2 className="font-display text-[15px] font-bold uppercase leading-tight tracking-wide text-white">
                      {s.title}
                    </h2>
                  </div>
                  <div className="px-4 py-3">
                    <SectionBody lines={s.lines} />
                  </div>
                </section>
              );
            })}
          </div>
        </>
      )}

      <p className="mt-6 text-center text-[11px] text-text-muted">
        Le Coach lit cette vision. Chaque jour faible, il te dira le but précis
        que tu retardes.
      </p>
    </main>
  );
}
