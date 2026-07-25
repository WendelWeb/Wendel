import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface Chapter {
  n: number;
  book: string;
  title: string;
  paragraphs: string[];
}

let cache: Chapter[] | null = null;

function all(): Chapter[] {
  if (!cache) {
    const p = join(process.cwd(), "content", "vaisseau-chapters.json");
    cache = JSON.parse(readFileSync(p, "utf8")) as Chapter[];
  }
  return cache;
}

export function getChapter(n: number): Chapter | null {
  return all().find((c) => c.n === n) ?? null;
}

export function getAdjacent(n: number): {
  prev: number | null;
  next: number | null;
} {
  const a = all();
  const idx = a.findIndex((c) => c.n === n);
  return {
    prev: idx > 0 ? a[idx - 1].n : null,
    next: idx >= 0 && idx < a.length - 1 ? a[idx + 1].n : null,
  };
}
