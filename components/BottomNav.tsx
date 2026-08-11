"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Target,
  BarChart3,
  Dumbbell,
  BookOpen,
  Ship,
  Flame,
  Landmark,
  Siren,
  Quote,
  ScrollText,
  Hourglass,
  SlidersHorizontal,
  MoreHorizontal,
  X,
  type LucideIcon,
} from "lucide-react";
import RefreshButton from "./RefreshButton";

// Four everyday destinations. Urgence is NOT here — it gets the raised center
// button, because reaching it in one thumb-tap is the whole point of this app.
const LEFT_TABS = [
  { href: "/today", label: "Aujourd'hui", Icon: Target },
  { href: "/vaisseau", label: "Vaisseau", Icon: Ship },
];
const RIGHT_TABS = [{ href: "/coach", label: "Coach", Icon: Flame }];

interface MoreItem {
  href: string;
  label: string;
  desc: string;
  Icon: LucideIcon;
  color: string;
}

// Grouped by what they're for: measuring the work vs. feeding the fire.
const MORE_GROUPS: { group: string; items: MoreItem[] }[] = [
  {
    group: "Suivi",
    items: [
      {
        href: "/progression",
        label: "Progression",
        desc: "Courbes, séries, noyau tenu",
        Icon: BarChart3,
        color: "#1E3A5F",
      },
      {
        href: "/muscu",
        label: "Muscu",
        desc: "Séance du jour et programme",
        Icon: Dumbbell,
        color: "#BE123C",
      },
      {
        href: "/journal",
        label: "Journal",
        desc: "Ce que j'écris chaque soir",
        Icon: BookOpen,
        color: "#0F766E",
      },
    ],
  },
  {
    group: "Le feu",
    items: [
      {
        href: "/vision",
        label: "Ma Vision",
        desc: "Mon pourquoi et l'empire",
        Icon: Landmark,
        color: "#B45309",
      },
      {
        href: "/retards",
        label: "Ce que tu retardes",
        desc: "Tout ce que tu repousses, en ce moment",
        Icon: Hourglass,
        color: "#DC2626",
      },
      {
        href: "/carnet",
        label: "Le Carnet",
        desc: "Ce que je me dis à moi-même",
        Icon: ScrollText,
        color: "#111827",
      },
      {
        href: "/quotes",
        label: "Citations",
        desc: "Des lignes pour tenir debout",
        Icon: Quote,
        color: "#3B1F6E",
      },
      {
        href: "/reglages",
        label: "Réglages",
        desc: "Modifier mon plan journalier",
        Icon: SlidersHorizontal,
        color: "#334155",
      },
    ],
  },
];

const MORE_HREFS = MORE_GROUPS.flatMap((g) => g.items.map((i) => i.href));

function isOn(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

function Tab({
  href,
  label,
  Icon,
  active,
}: {
  href: string;
  label: string;
  Icon: LucideIcon;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className="relative flex flex-1 flex-col items-center justify-center gap-1 pt-1.5"
    >
      {/* Active marker in the covenant's gold, not a generic underline */}
      <span
        aria-hidden
        className="absolute top-0 h-[3px] w-8 rounded-full transition-opacity"
        style={{
          background: "var(--gold-border)",
          opacity: active ? 1 : 0,
        }}
      />
      <Icon
        size={23}
        strokeWidth={active ? 2.5 : 1.9}
        style={{ color: active ? "var(--navy)" : "var(--text-muted)" }}
      />
      <span
        className="text-[10px] font-semibold tracking-tight"
        style={{ color: active ? "var(--navy)" : "var(--text-muted)" }}
      >
        {label}
      </span>
    </Link>
  );
}

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close the sheet whenever navigation happens.
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  const urgenceActive = isOn(pathname, "/urgence");
  const moreActive = MORE_HREFS.some((h) => isOn(pathname, h));

  return (
    <>
      {/* ——— Overflow sheet ——— */}
      {moreOpen && (
        <div
          className="animate-overlay-in fixed inset-0 z-50 flex items-end bg-black/50 md:hidden"
          onClick={() => setMoreOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Toutes les sections"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="animate-sheet-up w-full rounded-t-3xl bg-surface pb-[env(safe-area-inset-bottom)] motion-reduce:animate-none"
          >
            <div className="flex items-center justify-between px-5 pb-1 pt-4">
              <h2 className="font-display text-lg font-bold uppercase tracking-tight text-navy">
                Tout FORGED
              </h2>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="Fermer"
                className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition active:scale-95"
                style={{ background: "var(--surface-raised)" }}
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[65dvh] overflow-y-auto px-3 pb-4">
              <RefreshButton variant="row" />

              {MORE_GROUPS.map((g) => (
                <section key={g.group} className="mt-3">
                  <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                    {g.group}
                  </p>
                  <div className="flex flex-col gap-1">
                    {g.items.map(({ href, label, desc, Icon, color }) => {
                      const active = isOn(pathname, href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-3.5 rounded-2xl px-3 py-3 transition active:scale-[0.99]"
                          style={{
                            background: active
                              ? "var(--surface-raised)"
                              : "transparent",
                          }}
                        >
                          <span
                            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                            style={{ background: color }}
                          >
                            <Icon size={20} color="#fff" strokeWidth={2} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-[15px] font-semibold leading-tight text-text-primary">
                              {label}
                            </span>
                            <span className="mt-0.5 block truncate text-[12px] text-text-secondary">
                              {desc}
                            </span>
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ——— Bar ——— */}
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-[64px] max-w-md items-stretch">
          {LEFT_TABS.map((t) => (
            <Tab key={t.href} {...t} active={isOn(pathname, t.href)} />
          ))}

          {/* URGENCE — the panic lever. Raised, red, impossible to miss. */}
          <div className="flex flex-1 justify-center">
            <Link
              href="/urgence"
              aria-label="Urgence — je suis tenté"
              aria-current={urgenceActive ? "page" : undefined}
              className="-mt-6 flex h-[58px] w-[58px] flex-col items-center justify-center gap-0.5 rounded-full shadow-lg transition active:scale-95"
              style={{
                background: "var(--red)",
                border: "4px solid var(--surface)",
                boxShadow: urgenceActive
                  ? "0 0 0 3px var(--red-soft), 0 6px 16px rgba(220,38,38,0.45)"
                  : "0 6px 16px rgba(220,38,38,0.35)",
              }}
            >
              <Siren size={22} color="#fff" strokeWidth={2.4} />
              <span className="text-[9px] font-bold uppercase tracking-wider text-white">
                SOS
              </span>
            </Link>
          </div>

          {RIGHT_TABS.map((t) => (
            <Tab key={t.href} {...t} active={isOn(pathname, t.href)} />
          ))}

          {/* Plus */}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-label="Toutes les sections"
            aria-expanded={moreOpen}
            className="relative flex flex-1 flex-col items-center justify-center gap-1 pt-1.5"
          >
            <span
              aria-hidden
              className="absolute top-0 h-[3px] w-8 rounded-full transition-opacity"
              style={{
                background: "var(--gold-border)",
                opacity: moreActive ? 1 : 0,
              }}
            />
            <MoreHorizontal
              size={23}
              strokeWidth={moreActive ? 2.5 : 1.9}
              style={{
                color: moreActive ? "var(--navy)" : "var(--text-muted)",
              }}
            />
            <span
              className="text-[10px] font-semibold tracking-tight"
              style={{
                color: moreActive ? "var(--navy)" : "var(--text-muted)",
              }}
            >
              Plus
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
