"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-8 text-center">
      <AlertTriangle size={32} className="text-red" />
      <div>
        <p className="text-lg font-bold text-text-primary">
          Quelque chose a cassé.
        </p>
        <p className="mt-1 text-[13px] text-text-secondary">
          Le forgeron reste debout. Réessaie.
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="h-11 rounded-lg bg-navy px-6 text-[14px] font-semibold uppercase tracking-wide text-white transition active:scale-95"
      >
        Réessayer
      </button>
    </div>
  );
}
