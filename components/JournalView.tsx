"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { addDays, lastNDates, formatLong, formatShort } from "@/lib/dates";
import { saveJournalAction } from "@/app/actions";

export default function JournalView({
  today,
  minDate,
  textByDate,
}: {
  today: string;
  minDate: string;
  textByDate: Record<string, string>;
}) {
  const [map, setMap] = useState<Record<string, string>>(textByDate);
  const [selected, setSelected] = useState(today);
  const [text, setText] = useState(textByDate[today] ?? "");
  const [savedTick, setSavedTick] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load text when switching days.
  useEffect(() => {
    setText(map[selected] ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const persist = useCallback(
    (date: string, value: string) => {
      setMap((m) => ({ ...m, [date]: value }));
      saveJournalAction(date, value)
        .then(() => setSavedTick((t) => t + 1))
        .catch(() => {});
    },
    [],
  );

  function onChange(value: string) {
    setText(value);
    if (timer.current) clearTimeout(timer.current);
    const date = selected;
    timer.current = setTimeout(() => persist(date, value), 500);
  }

  // Flush pending save immediately on blur.
  function onBlur() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    persist(selected, text);
  }

  const canPrev = selected > minDate;
  const canNext = selected < today;
  const recent = lastNDates(today, 7).reverse(); // newest first

  return (
    <main className="px-4 pt-6 md:mx-auto md:max-w-2xl xl:max-w-none">
      <h1 className="mb-4 text-2xl font-bold text-text-primary">Journal</h1>

      {/* Date selector */}
      <div className="mb-3 flex items-center justify-between rounded-xl border border-border bg-surface px-2 py-2">
        <button
          type="button"
          aria-label="Jour précédent"
          disabled={!canPrev}
          onClick={() => setSelected((d) => addDays(d, -1))}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-[13px] font-semibold capitalize text-text-primary">
          {formatLong(selected)}
          {selected === today && (
            <span className="ml-1 text-text-muted">· aujourd&apos;hui</span>
          )}
        </span>
        <button
          type="button"
          aria-label="Jour suivant"
          disabled={!canNext}
          onClick={() => setSelected((d) => addDays(d, 1))}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Qu'as-tu forgé aujourd'hui ? Sois honnête."
          className="min-h-[200px] w-full resize-y rounded-xl border border-border bg-surface p-4 text-[15px] leading-relaxed text-text-primary outline-none transition focus:border-navy"
        />
        {savedTick > 0 && (
          <span
            key={savedTick}
            className="animate-toast-in absolute right-3 top-3 flex items-center gap-1 rounded-md bg-green-soft px-2 py-1 text-[11px] font-semibold text-green"
          >
            <Check size={12} /> Sauvegardé
          </span>
        )}
      </div>

      {/* Recent entries */}
      <h2 className="mb-2 mt-7 text-[12px] font-semibold uppercase tracking-wider text-text-muted">
        7 derniers jours
      </h2>
      <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-2 2xl:grid-cols-3">
        {recent.map((date) => {
          const entry = (map[date] ?? "").trim();
          const isSel = date === selected;
          return (
            <button
              key={date}
              type="button"
              onClick={() => setSelected(date)}
              className="flex flex-col gap-0.5 rounded-xl border px-4 py-3 text-left transition"
              style={{
                borderColor: isSel ? "var(--navy)" : "var(--border)",
                background: "var(--surface)",
              }}
            >
              <span className="text-[12px] font-semibold capitalize text-text-secondary">
                {formatShort(date)}
                {date === today && " · aujourd'hui"}
              </span>
              <span className="line-clamp-2 text-[13px] text-text-primary">
                {entry || (
                  <span className="italic text-text-muted">Rien écrit</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </main>
  );
}
