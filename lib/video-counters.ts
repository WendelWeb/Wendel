// Video-upload objectives are counters, not single checkboxes: the user taps
// "+1 publiée" each time he uploads one. When the count reaches the target, the
// objective auto-completes (in completedItems) and counts toward the score.

export interface VideoCounter {
  id: string;
  label: string;
  target: number;
}

export const VIDEO_COUNTERS: VideoCounter[] = [
  { id: "tiktok", label: "Vidéos TikTok publiées", target: 4 },
  { id: "youtube", label: "Vidéos YouTube publiées", target: 6 },
];

export const VIDEO_COUNTER_IDS: string[] = VIDEO_COUNTERS.map((c) => c.id);

const BY_ID = new Map(VIDEO_COUNTERS.map((c) => [c.id, c]));

export function isVideoCounter(id: string): boolean {
  return BY_ID.has(id);
}

export function videoTarget(id: string): number {
  return BY_ID.get(id)?.target ?? 0;
}

export function videoCounter(id: string): VideoCounter | undefined {
  return BY_ID.get(id);
}
