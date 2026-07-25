"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
import { markChapterReadAction } from "@/app/actions";
import type { ReadContext } from "@/lib/daily";

export default function ChapterReadButton({
  chapterN,
  initialRead,
  ctx,
}: {
  chapterN: number;
  initialRead: boolean;
  ctx: ReadContext;
}) {
  const [read, setRead] = useState(initialRead);
  const [pending, start] = useTransition();
  const router = useRouter();

  function mark() {
    setRead(true);
    start(async () => {
      try {
        await markChapterReadAction(chapterN, ctx);
        router.refresh();
      } catch {
        setRead(initialRead);
      }
    });
  }

  if (read) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-xl border border-green/30 bg-green-soft px-4 py-3 text-[14px] font-semibold text-green">
        <Check size={18} />
        {ctx === "verdict"
          ? "Chapitre lu — obligation remplie"
          : "Chapitre lu — compté dans ta lecture du jour"}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={mark}
      disabled={pending}
      className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy text-[15px] font-semibold uppercase tracking-wide text-white transition active:scale-[0.99] disabled:opacity-70"
    >
      {pending && <Loader2 size={18} className="animate-spin" />}
      J&apos;ai lu ce chapitre
    </button>
  );
}
