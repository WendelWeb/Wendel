import { CREED_PHRASES } from "./creed-phrases";

export const STOPP_PHRASES: string[] = [
  "STOP. Your mind is a weapon — not a cinema. Lock in.",
  "STOP. I am building. I am not dreaming. Back to work.",
  "STOP. Mind is a tool, not a playground. Execute now.",
  "STOP. I am not my thoughts. I am my actions. Move.",
  "STOP. I am the man who shows up. Every single time.",
  "STOP. Champions redirect. Losers drift. Choose now.",
  "STOP. I am here. I am present. I am forging myself.",
  "STOP. Every second lost is paid by your future self.",
  "STOP. I do not negotiate with distraction. Zero.",
  "STOP. The man I am becoming does not drift. He locks in.",
  "STOP. God sees what you do right now. Make it worth it.",
  "STOP. 10 years gone. Not one more second wasted.",
];

// Full pool shown at each STOPP and listed in StoppList — his 5 phrases first.
export const ALL_STOPP_PHRASES: string[] = [...CREED_PHRASES, ...STOPP_PHRASES];

export function randomStoppPhrase(): string {
  return ALL_STOPP_PHRASES[
    Math.floor(Math.random() * ALL_STOPP_PHRASES.length)
  ];
}
