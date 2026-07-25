"use client";

import { useEffect, useState } from "react";
import { Clock, ArrowRight } from "lucide-react";
import { timeToMinutes, type ChecklistItem } from "@/lib/checklist";
import { isCore } from "@/lib/core";
import type { ItemState } from "@/lib/scoring";

/** Minutes since midnight, Haiti time — independent of the phone's timezone. */
function haitiMinutes(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Port-au-Prince",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const [h, m] = parts.split(":").map(Number);
  return h * 60 + m;
}

export default function NowNext({
  items,
  states,
  gymLabel,
}: {
  items: ChecklistItem[];
  states: Record<string, ItemState>;
  gymLabel: string;
}) {
  // null until mounted, so server and client markup match.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(haitiMinutes());
    const id = setInterval(() => setNow(haitiMinutes()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;

  // Only clock-bound objectives take part in the timeline.
  const timed = items
    .map((i) => ({ item: i, at: timeToMinutes(i.time) }))
    .filter((x) => x.at < 100000)
    .sort((a, b) => a.at - b.at);
  if (timed.length === 0) return null;

  const started = timed.filter((x) => x.at <= now);
  const current = started.length ? started[started.length - 1] : null;
  const next = timed.find((x) => x.at > now) ?? null;

  const label = (i: ChecklistItem) => (i.id === "gym" ? gymLabel : i.label);
  const currentDone = current ? states[current.item.id] === "done" : false;

  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-center gap-2">
        <Clock size={15} className="text-text-muted" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
          {current ? "Maintenant" : "La journée commence"}
        </span>
      </div>

      {current ? (
        <p
          className="mt-1.5 text-[14px] font-semibold leading-snug"
          style={{
            color: currentDone ? "var(--green)" : "var(--text-primary)",
            textDecoration: currentDone ? "line-through" : "none",
          }}
        >
          {isCore(current.item.id) && "🔑 "}
          {label(current.item)}
          <span className="ml-1.5 text-[12px] font-normal text-text-muted">
            · {current.item.time}
          </span>
        </p>
      ) : (
        <p className="mt-1.5 text-[14px] font-semibold text-text-primary">
          Rien n&apos;a encore commencé aujourd&apos;hui.
        </p>
      )}

      {next && (
        <p className="mt-2 flex items-start gap-1.5 text-[12.5px] leading-snug text-text-secondary">
          <ArrowRight size={13} className="mt-0.5 flex-shrink-0" />
          <span>
            Ensuite : {isCore(next.item.id) && "🔑 "}
            <strong className="font-semibold text-text-primary">
              {label(next.item)}
            </strong>{" "}
            à {next.item.time}
          </span>
        </p>
      )}
    </div>
  );
}
