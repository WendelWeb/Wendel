import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-3">
      <span className="font-display text-3xl font-bold tracking-tight text-navy">
        FORGED
      </span>
      <Loader2 size={22} className="animate-spin text-text-muted" />
    </div>
  );
}
