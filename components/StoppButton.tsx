"use client";

export default function StoppButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="STOPP — recentre-toi maintenant"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full text-[11px] font-bold uppercase tracking-wider text-white shadow-lg transition active:scale-95 md:bottom-8 md:right-8"
      style={{
        background: "var(--red)",
        boxShadow: "0 8px 24px rgba(220,38,38,0.4)",
      }}
    >
      STOPP
    </button>
  );
}
