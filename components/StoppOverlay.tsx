"use client";

import { useEffect } from "react";

export default function StoppOverlay({
  phrase,
  onDismiss,
}: {
  phrase: string;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      className="animate-overlay-in fixed inset-0 z-[100] flex items-center justify-center bg-black px-8"
      role="alertdialog"
      aria-label="STOPP"
    >
      <p className="animate-phrase-in text-center font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
        {phrase}
      </p>
    </div>
  );
}
