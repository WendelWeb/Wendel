"use client";

import { useMemo, useState } from "react";
import { Quote as QuoteIcon, Search, Shuffle, X } from "lucide-react";
import {
  QUOTES,
  CATEGORIES,
  categoryMeta,
  type CategoryId,
  type Quote,
} from "@/lib/quotes";
import { shuffled, picked, branch } from "@/lib/rotate";

function CatChip({ id }: { id: CategoryId }) {
  const m = categoryMeta(id);
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
      style={{ background: m.color }}
    >
      {m.label}
    </span>
  );
}

function QuoteCard({ q }: { q: Quote }) {
  const m = categoryMeta(q.c);
  return (
    <figure
      className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5"
      style={{ borderLeft: `3px solid ${m.color}` }}
    >
      <blockquote className="font-display text-[15px] font-semibold leading-snug text-text-primary">
        « {q.t} »
      </blockquote>
      <figcaption className="mt-auto flex items-center justify-between gap-2">
        <CatChip id={q.c} />
        {q.s && (
          <span className="text-[11px] font-medium text-text-muted">{q.s}</span>
        )}
      </figcaption>
    </figure>
  );
}

export default function QuotesView({ seed }: { seed: number }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [shuffle, setShuffle] = useState(0);

  // `seed` vient du serveur et change à chaque visite : la citation mise en
  // avant et l'ordre de la liste ne sont jamais deux fois les mêmes.
  const qod = useMemo(() => picked(QUOTES, branch(seed, "vedette")), [seed]);

  // Combien de citations par catégorie (pour n'afficher que les filtres utiles).
  const counts = useMemo(() => {
    const c = new Map<CategoryId, number>();
    for (const q of QUOTES) c.set(q.c, (c.get(q.c) ?? 0) + 1);
    return c;
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = QUOTES.filter((q) => {
      if (cat !== "all" && q.c !== cat) return false;
      if (term && !q.t.toLowerCase().includes(term)) return false;
      return true;
    });
    // Mélangé d'office, avec la graine de la visite : l'ordre est déjà neuf en
    // arrivant. Le bouton ne fait que redonner un tour de plus.
    return shuffled(list, branch(seed, `liste:${shuffle}`));
  }, [search, cat, shuffle, seed]);

  return (
    <main className="px-4 pb-12 pt-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <QuoteIcon size={22} className="text-navy" />
          <h1 className="font-display text-3xl font-bold tracking-tight text-navy">
            CITATIONS
          </h1>
        </div>
        <span className="tnum rounded-full bg-surface-raised px-3 py-1 text-[12px] font-semibold text-text-secondary">
          {QUOTES.length}
        </span>
      </div>

      {/* Citation du jour */}
      <div
        className="mb-6 overflow-hidden rounded-2xl p-6"
        style={{
          background:
            "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
        }}
      >
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
          La citation de cette visite
        </p>
        <blockquote className="font-display text-[22px] font-bold leading-tight text-white">
          « {qod.t} »
        </blockquote>
        <div className="mt-4 flex items-center gap-2">
          <CatChip id={qod.c} />
          {qod.s && (
            <span className="text-[11px] font-medium text-white/50">
              {qod.s}
            </span>
          )}
        </div>
      </div>

      {/* Recherche + aléatoire */}
      <div className="mb-3 flex items-center gap-2 xl:max-w-2xl">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Chercher une citation…"
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-9 pr-9 text-[14px] text-text-primary outline-none focus:border-navy"
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
          onClick={() => setShuffle((n) => n + 1)}
          className="flex items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold text-white transition active:scale-[0.97]"
          style={{ background: "var(--navy)" }}
        >
          <Shuffle size={15} /> Aléatoire
        </button>
      </div>

      {/* Filtres par catégorie */}
      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setCat("all")}
          className="flex-shrink-0 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition"
          style={{
            background: cat === "all" ? "var(--navy)" : "transparent",
            color: cat === "all" ? "#fff" : "var(--text-secondary)",
            borderColor: cat === "all" ? "var(--navy)" : "var(--border)",
          }}
        >
          Tout · {QUOTES.length}
        </button>
        {CATEGORIES.filter((c) => counts.get(c.id)).map((c) => {
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setCat(active ? "all" : c.id)}
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

      {/* Résultats */}
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-[14px] text-text-muted">
          Aucune citation pour « {search} ».
        </p>
      ) : (
        <div className="mosaique">
          {filtered.map((q, i) => (
            <QuoteCard key={`${q.t.slice(0, 24)}-${i}`} q={q} />
          ))}
        </div>
      )}
    </main>
  );
}
