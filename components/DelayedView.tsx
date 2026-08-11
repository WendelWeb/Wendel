"use client";

import { useMemo, useState } from "react";
import { Hourglass, Search, Shuffle, X } from "lucide-react";
import {
  DELAYED,
  DELAYED_CATEGORIES,
  delayedCategoryMeta,
  type DelayedCategory,
} from "@/lib/delayed";
import DecisionButton, { type EtatReel } from "./DecisionButton";
import { shuffled, branch } from "@/lib/rotate";

const PAGE = 120;

export default function DelayedView({
  seed,
  daysToJan,
  daysTo30,
  etat,
}: {
  seed: number;
  daysToJan: number;
  daysTo30: number;
  etat: EtatReel;
}) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<DelayedCategory | "all">("all");
  const [shuffle, setShuffle] = useState(0);
  const [limit, setLimit] = useState(PAGE);

  const counts = useMemo(() => {
    const m = new Map<DelayedCategory, number>();
    for (const d of DELAYED) m.set(d.c, (m.get(d.c) ?? 0) + 1);
    return m;
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = DELAYED.filter(
      (d) =>
        (cat === "all" || d.c === cat) &&
        (!term || d.t.toLowerCase().includes(term)),
    );
    // Mélangé dès l'arrivée avec la graine de la visite : sur 351 lignes, il ne
    // tombera jamais deux fois sur les mêmes en haut de page.
    return shuffled(list, branch(seed, `liste:${shuffle}`));
  }, [search, cat, shuffle, seed]);

  const shown = filtered.slice(0, limit);

  return (
    <main className="px-4 pb-12 pt-6">
      <div className="mb-1 flex items-center gap-2">
        <Hourglass size={22} className="text-red" />
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-red">
          Tout ce que tu retardes
        </h1>
      </div>
      <p className="mb-4 text-[12.5px] leading-snug text-text-secondary">
        <span className="tnum font-bold text-red">{DELAYED.length}</span>{" "}
        choses que tu repousses en ce moment même. Chacune est tirée de ton
        propre plan — pas d&apos;une liste générique.
      </p>

      <DecisionButton etat={etat} />

      {/* Le compte à rebours, en tête : c'est lui qui rend la liste urgente. */}
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
            <p className="font-display text-[15px] font-bold uppercase leading-tight text-white">
              La transformation
            </p>
          </div>
          <span className="tnum font-display text-3xl font-bold leading-none text-white">
            J−{daysToJan}
          </span>
        </div>

        {/* L'échéance qui ne se négocie pas. */}
        <div
          className="flex items-center justify-between rounded-2xl px-5 py-4"
          style={{
            background: "linear-gradient(135deg, #0F172A 0%, #B45309 100%)",
          }}
        >
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
              16 mai 2033 · 30 ans
            </p>
            <p className="font-display text-[15px] font-bold uppercase leading-tight text-white">
              Le défi ultime
            </p>
          </div>
          <span className="tnum font-display text-3xl font-bold leading-none text-white">
            J−{daysTo30}
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setLimit(PAGE);
            }}
            placeholder="Chercher (hôpital, chapitre, corps…)"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-9 text-[14px] text-text-primary outline-none focus:border-red"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Effacer"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setShuffle((n) => n + 1);
            setLimit(PAGE);
          }}
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white transition active:scale-[0.97]"
          style={{ background: "var(--red)" }}
        >
          <Shuffle size={15} /> Au hasard
        </button>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => {
            setCat("all");
            setLimit(PAGE);
          }}
          className="flex-shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
          style={{
            background: cat === "all" ? "var(--red)" : "transparent",
            color: cat === "all" ? "#fff" : "var(--text-secondary)",
            borderColor: cat === "all" ? "var(--red)" : "var(--border)",
          }}
        >
          Tout · {DELAYED.length}
        </button>
        {DELAYED_CATEGORIES.filter((c) => counts.get(c.id)).map((c) => {
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCat(active ? "all" : c.id);
                setLimit(PAGE);
              }}
              className="flex-shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
              style={{
                background: active ? c.color : "transparent",
                color: active ? "#fff" : "var(--text-secondary)",
                borderColor: active ? c.color : "var(--border)",
              }}
            >
              {c.label} · {counts.get(c.id)}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[14px] text-text-muted">
          Rien pour « {search} ».
        </p>
      ) : (
        <>
          <div className="flex flex-col gap-1.5">
            {shown.map((d, i) => {
              const m = delayedCategoryMeta(d.c);
              return (
                <div
                  key={`${i}-${d.t.slice(0, 20)}`}
                  className="flex gap-3 rounded-xl border border-border bg-surface px-4 py-3"
                  style={{ borderLeft: `3px solid ${m.color}` }}
                >
                  <span className="tnum flex-shrink-0 text-[11px] font-bold text-text-muted">
                    {String(i + 1).padStart(4, "0")}
                  </span>
                  <span className="text-[13.5px] leading-snug text-text-primary">
                    {d.t}
                  </span>
                </div>
              );
            })}
          </div>

          {limit < filtered.length && (
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE * 4)}
              className="mt-4 w-full rounded-xl border border-border py-3 text-[13px] font-semibold text-text-secondary transition hover:border-red hover:text-red"
            >
              Afficher plus — {filtered.length - limit} restantes
            </button>
          )}
        </>
      )}

      <p className="mt-6 text-center text-[11px] leading-relaxed text-text-muted">
        Tu ne retardes pas une liste. Tu retardes une vie.
        <br />
        Chaque ligne ci-dessus attend un homme, pas un rêveur.
      </p>
    </main>
  );
}
