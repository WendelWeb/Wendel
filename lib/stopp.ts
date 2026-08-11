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

  // LE VRAI NOM — la chose se présente comme un plaisir, un repos, une pause.
  // Chacune de ces lignes lui retire ce nom, lui rend le vrai, et refuse de
  // payer. C'est la mécanique de sa propre phrase du carnet : « ce n'est pas un
  // plaisir, c'est un péage ». En anglais parce que c'est la langue dans
  // laquelle il se parle quand il faut trancher.
  "STOP. This is not a pleasure. It's a toll. It takes everything and returns nothing. I don't pay.",
  "STOP. This is not rest. It's anesthesia. It doesn't remove the tiredness — it removes the witness.",
  "STOP. This is not free. It's billed. The invoice always arrives, late and with interest.",
  "STOP. This is not you taking. This is you being taken.",
  "STOP. This is not a choice. It's a signature. And you know whose name is on the other line.",
  "STOP. This is not a break. It's a loan. Ten minutes borrowed, three weeks repaid.",
  "STOP. This is not relief. It's a transfer. Your power just changes owner.",
  "STOP. This is not a reward. It's an advance on wages you haven't earned yet.",
  "STOP. This is not a leak you can ignore. It's a hole in the hull. Ten minutes of water, weeks of bailing.",
  "STOP. This is not a slip. It's a tax you levy on everything you're about to build.",
  "STOP. This is not an image. It's an invoice with a pretty picture on it. Close it unread.",
  "STOP. This is not an easy win. It's a fast defeat, beautifully wrapped. Don't open it.",
  "STOP. This is not your hand wanting. It's your vessel being emptied. Hold the hand, keep the vessel.",
  "STOP. The wave doesn't decide — you do. It passes in three minutes. Your fall lasts three weeks.",
  "STOP. This is not a moment. It's a step. You climb the white staircase or you freeze on it.",
  "STOP. This is not a secret between you and no one. It's an answer you give to God.",
  "STOP. Ten minutes of pleasure against three weeks of power. That's the trade. Refuse it.",
  "STOP. Nothing here is being offered to you. Something is being taken from you.",
];

// Full pool shown at each STOPP and listed in StoppList — his 5 phrases first.
export const ALL_STOPP_PHRASES: string[] = [...CREED_PHRASES, ...STOPP_PHRASES];

export function randomStoppPhrase(): string {
  return ALL_STOPP_PHRASES[
    Math.floor(Math.random() * ALL_STOPP_PHRASES.length)
  ];
}
