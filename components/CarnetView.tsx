"use client";

import { useMemo, useState } from "react";
import { NOTES, NOTE_THEMES, type NoteTheme } from "@/lib/notes";

function Line({ text }: { text: string }) {
  const t = text.trim();
  if (t === "") return null;

  if (t.startsWith("## "))
    return (
      <h3 className="mt-3 font-display text-[13px] font-bold uppercase tracking-wide text-text-primary">
        {t.slice(3)}
      </h3>
    );

  if (t.startsWith("> "))
    return (
      <p
        className="my-1 rounded-lg border-l-[3px] px-3 py-2 text-[13.5px] font-semibold leading-snug"
        style={{
          borderColor: "var(--red)",
          background: "var(--red-soft)",
          color: "var(--red)",
        }}
      >
        {t.slice(2)}
      </p>
    );

  if (t.startsWith("- "))
    return (
      <div className="flex gap-2 text-[13.5px] leading-snug text-text-secondary">
        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-red" />
        <span>{t.slice(2)}</span>
      </div>
    );

  return (
    <p className="text-[13.5px] leading-relaxed text-text-secondary">{t}</p>
  );
}

export default function CarnetView() {
  const [theme, setTheme] = useState<NoteTheme | "all">("all");

  const sections = useMemo(
    () => (theme === "all" ? NOTES : NOTES.filter((n) => n.theme === theme)),
    [theme],
  );

  const themeColor = (id: NoteTheme) =>
    NOTE_THEMES.find((t) => t.id === id)?.color ?? "var(--navy)";
  const themeLabel = (id: NoteTheme) =>
    NOTE_THEMES.find((t) => t.id === id)?.label ?? id;

  return (
    <main className="px-4 pb-12 pt-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-navy">
        LE CARNET
      </h1>
      <p className="mb-5 mt-1 text-[12px] uppercase tracking-[0.15em] text-text-muted">
        Ce que je me dis à moi-même — à lire chaque matin
      </p>

      {/* Filtres par thème */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setTheme("all")}
          className="flex-shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
          style={{
            background: theme === "all" ? "var(--navy)" : "transparent",
            color: theme === "all" ? "#fff" : "var(--text-secondary)",
            borderColor: theme === "all" ? "var(--navy)" : "var(--border)",
          }}
        >
          Tout
        </button>
        {NOTE_THEMES.map((t) => {
          const active = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(active ? "all" : t.id)}
              className="flex-shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
              style={{
                background: active ? t.color : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
                borderColor: active ? t.color : "var(--border)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mosaique">
        {sections.map((s) => (
          <section
            key={s.id}
            className="overflow-hidden rounded-2xl border border-border bg-surface"
          >
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ background: themeColor(s.theme) }}
            >
              <span className="text-lg">{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-[14px] font-bold uppercase leading-tight tracking-wide text-white">
                  {s.title}
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/60">
                  {themeLabel(s.theme)}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 px-4 py-3">
              {s.lines.map((line, i) => (
                <Line key={i} text={line} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] text-text-muted">
        « Si tu l'imprimes dans ta moelle, le monde entier ne pourra plus
        t'arrêter. »
      </p>
    </main>
  );
}
