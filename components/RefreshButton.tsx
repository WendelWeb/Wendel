"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { RotateCw } from "lucide-react";

// Installed to the home screen, the app has no browser chrome — so no reload.
// A tap re-runs the server components (score, rétention, date, noyau…).
// A long press does a hard reload, for when the bundle itself is stale.
export default function RefreshButton({
  variant = "icon",
}: {
  variant?: "icon" | "row";
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [held, setHeld] = useState<ReturnType<typeof setTimeout> | null>(null);

  function soft() {
    start(() => router.refresh());
  }

  function pressStart() {
    setHeld(
      setTimeout(() => {
        window.location.reload();
      }, 700),
    );
  }

  function pressEnd() {
    if (held) clearTimeout(held);
    setHeld(null);
  }

  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={soft}
        onPointerDown={pressStart}
        onPointerUp={pressEnd}
        onPointerLeave={pressEnd}
        className="flex w-full items-center gap-3.5 rounded-2xl px-3 py-3 text-left transition active:scale-[0.99]"
      >
        <span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
          style={{ background: "var(--navy)" }}
        >
          <RotateCw
            size={20}
            color="#fff"
            strokeWidth={2}
            className={pending ? "animate-spin" : ""}
          />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-tight text-text-primary">
            {pending ? "Actualisation…" : "Actualiser l'app"}
          </span>
          <span className="mt-0.5 block text-[12px] text-text-secondary">
            Recharge tes données · appui long = rechargement complet
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={soft}
      onPointerDown={pressStart}
      onPointerUp={pressEnd}
      onPointerLeave={pressEnd}
      aria-label="Actualiser l'app"
      title="Actualiser (appui long = rechargement complet)"
      className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition active:scale-95 hover:text-text-secondary"
    >
      <RotateCw size={17} className={pending ? "animate-spin" : ""} />
    </button>
  );
}
