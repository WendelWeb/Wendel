import { scoreColorVar } from "@/lib/scoring";

export default function ProgressBar({
  percent,
  className = "",
}: {
  percent: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full bg-surface-raised ${className}`}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%`, background: scoreColorVar(clamped) }}
      />
    </div>
  );
}
