"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2, Flame } from "lucide-react";

type CoachMessage = { role: "user" | "coach"; text: string };

const STARTERS = [
  "Sois honnête : à quel point je suis sérieux avec ce plan ?",
  "Analyse ma semaine. Où je me mens à moi-même ?",
  "J'ai envie de céder au porn là maintenant. Parle-moi.",
  "Je vois aucun résultat. Pourquoi je continue ?",
];

export default function CoachChat() {
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  async function send(text: string) {
    const msg = text.trim();
    if (!msg || pending) return;
    const history = messages;
    setMessages((m) => [
      ...m,
      { role: "user", text: msg },
      { role: "coach", text: "" },
    ]);
    setInput("");
    setPending(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history }),
      });
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages((m) => {
          const c = [...m];
          c[c.length - 1] = { role: "coach", text: acc };
          return c;
        });
      }
    } catch {
      setMessages((m) => {
        const c = [...m];
        c[c.length - 1] = {
          role: "coach",
          text: "Erreur. Le Coach n'a pas répondu (il ne marche qu'en local).",
        };
        return c;
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col md:h-[100dvh]">
      <header className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <Flame size={18} className="text-red" fill="var(--red)" />
          <h1 className="font-display text-xl font-bold uppercase tracking-wide text-navy">
            Forge Coach
          </h1>
        </div>
        <p className="mt-0.5 text-[11px] text-text-muted">
          Brutal, honnête, nourri du Vaisseau et de tes vrais chiffres · local
          uniquement
        </p>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="mx-auto max-w-md">
            <p className="mb-3 text-center text-[13px] text-text-secondary">
              Parle-lui de ta journée, ta semaine, ton mois, ou d&apos;une
              tentation. Il te dira la vérité.
            </p>
            <div className="flex flex-col gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-xl border border-border bg-surface px-4 py-2.5 text-left text-[13px] text-text-primary transition hover:border-navy"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed"
                style={
                  m.role === "user"
                    ? { background: "var(--navy)", color: "#fff" }
                    : { background: "var(--surface-raised)", color: "var(--text-primary)" }
                }
              >
                {m.role === "coach" && m.text === "" ? (
                  <span className="flex items-center gap-2 text-text-muted">
                    <Loader2 size={15} className="animate-spin" /> Le Coach
                    réfléchit…
                  </span>
                ) : (
                  m.text
                )}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="border-t border-border p-3"
      >
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Écris au Coach…"
            className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-[14px] text-text-primary outline-none focus:border-navy"
          />
          <button
            type="submit"
            disabled={pending || !input.trim()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-white transition active:scale-95 disabled:opacity-50"
            style={{ background: "var(--navy)" }}
            aria-label="Envoyer"
          >
            {pending ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
