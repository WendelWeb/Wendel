"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

const TABS = [
  { href: "/today", label: "Auj.", Icon: Target },
  { href: "/progression", label: "Progr.", Icon: BarChart3 },
  { href: "/muscu", label: "Muscu", Icon: Dumbbell },
  { href: "/journal", label: "Journal", Icon: BookOpen },
  { href: "/vaisseau", label: "Vaisseau", Icon: Ship },
  { href: "/carnet", label: "Carnet", Icon: ScrollText },
  { href: "/quotes", label: "Cita.", Icon: Quote },
  { href: "/vision", label: "Vision", Icon: Landmark },
  { href: "/urgence", label: "SOS", Icon: Siren },
  { href: "/coach", label: "Coach", Icon: Flame },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-16 max-w-md items-stretch">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center justify-center gap-1"
            >
              <Icon
                size={21}
                strokeWidth={active ? 2.5 : 2}
                style={{ color: active ? "var(--navy)" : "var(--text-muted)" }}
              />
              <span
                className="text-[9.5px] font-medium tracking-tight"
                style={{ color: active ? "var(--navy)" : "var(--text-muted)" }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
