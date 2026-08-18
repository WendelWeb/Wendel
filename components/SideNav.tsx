"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";
import {
  Target,
  Eye,
  BarChart3,
  Dumbbell,
  BookOpen,
  Ship,
  Flame,
  SlidersHorizontal,
  Landmark,
  Crown,
  Siren,
  Quote,
  ScrollText,
  Hourglass,
  LogOut,
} from "lucide-react";
import { signOutAction } from "@/app/actions";

const TABS = [
  { href: "/miroir", label: "Le miroir", Icon: Eye },
  { href: "/today", label: "Aujourd'hui", Icon: Target },
  { href: "/progression", label: "Progression", Icon: BarChart3 },
  { href: "/muscu", label: "Muscu", Icon: Dumbbell },
  { href: "/journal", label: "Journal", Icon: BookOpen },
  { href: "/vaisseau", label: "Le Vaisseau", Icon: Ship },
  { href: "/carnet", label: "Le Carnet", Icon: ScrollText },
  { href: "/quotes", label: "Citations", Icon: Quote },
  { href: "/empire", label: "NOVA-AXE", Icon: Crown },
  { href: "/vision", label: "Ma Vision", Icon: Landmark },
  { href: "/retards", label: "Ce que tu retardes", Icon: Hourglass },
  { href: "/urgence", label: "Urgence", Icon: Siren },
  { href: "/coach", label: "Forge Coach", Icon: Flame },
  { href: "/reglages", label: "Réglages", Icon: SlidersHorizontal },
];

export default function SideNav({ verrouille = false }: { verrouille?: boolean }) {
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  return (
    <aside className="sticky top-0 hidden h-[100dvh] w-60 shrink-0 flex-col border-r border-border bg-surface md:flex">
      <div className="px-6 py-7">
        <span className="font-display text-3xl font-bold tracking-tight text-navy">
          FORGED
        </span>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Proof of identity
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {(verrouille ? TABS.filter((t) => t.href === "/miroir") : TABS).map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium transition"
              style={{
                background: active ? "var(--surface-raised)" : "transparent",
                color: active ? "var(--navy)" : "var(--text-secondary)",
              }}
            >
              <Icon size={19} strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => startTransition(() => signOutAction())}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-text-secondary transition hover:text-red"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
