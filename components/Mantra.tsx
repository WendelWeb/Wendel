import { Hand, Eye } from "lucide-react";

// The mantra. Shown at the TOP and BOTTOM of EVERY page (rendered in the app
// layout): a spiritual crown, two verses (main / yeux — each a warning + a
// decree), and the provision decree (Dieu est ma source). `placement` only
// tunes the vertical spacing.
export default function Mantra({
  placement = "bottom",
}: {
  placement?: "top" | "bottom";
}) {
  const spacing = placement === "top" ? "mb-6 mt-3" : "mt-10 pb-2";
  return (
    <aside className={`mx-auto max-w-3xl px-4 ${spacing}`}>
      <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-text-muted">
        Loi du vaisseau
      </p>

      {/* LA PROMESSE — elle prime sur tout */}
      <div
        className="mb-3 rounded-2xl px-5 py-4 text-center"
        style={{
          background: "var(--gold-soft)",
          border: "1.5px solid var(--gold-border)",
        }}
      >
        <p
          className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--gold)" }}
        >
          La promesse · montagne 2021 · prime sur tout
        </p>
        <p
          className="font-display text-[15px] font-bold uppercase leading-snug"
          style={{ color: "var(--gold)" }}
        >
          Dieu me l&apos;a dit : si je ne gaspille pas mon énergie, tout ce que
          je conçois se réalisera.
        </p>
      </div>

      {/* THE CROWN — why you exist */}
      <div
        className="mb-3 overflow-hidden rounded-2xl px-5 py-5 text-center"
        style={{
          background:
            "linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)",
        }}
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/50">
          Pourquoi tu existes
        </p>
        <p className="font-display text-[16px] font-bold uppercase leading-snug tracking-wide text-white">
          Dieu ne t&apos;a pas créé pour te répandre et te vider — mais pour te
          contenir, bâtir, et régner.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {/* LA MAIN */}
        <section
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "var(--red)", background: "var(--red-soft)" }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Hand size={15} className="text-red" />
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-red">
              La main
            </span>
          </div>
          <p className="font-display text-[13.5px] font-bold uppercase leading-snug tracking-wide text-red">
            Une main qui se masturbe ne pourra pas bâtir ces choses, ni les
            contenir.
          </p>
          <p className="mt-2.5 flex items-start gap-1.5 text-[12.5px] font-semibold leading-snug text-text-secondary">
            <span className="text-red">→</span>
            <span>Si tu veux vraiment les bâtir, respecte ta main.</span>
          </p>
        </section>

        {/* LES YEUX */}
        <section
          className="rounded-2xl border px-5 py-4"
          style={{ borderColor: "var(--red)", background: "var(--red-soft)" }}
        >
          <div className="mb-2 flex items-center gap-2">
            <Eye size={15} className="text-red" />
            <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-red">
              Les yeux
            </span>
          </div>
          <p className="font-display text-[13.5px] font-bold uppercase leading-snug tracking-wide text-red">
            Des yeux qui regardent du porno ne verront jamais un tel
            accomplissement.
          </p>
          <p className="mt-2.5 flex items-start gap-1.5 text-[12.5px] font-semibold leading-snug text-text-secondary">
            <span className="text-red">→</span>
            <span>Si tu veux vraiment les voir, respecte tes yeux.</span>
          </p>
        </section>
      </div>

      {/* Décret de provision — Dieu est la source */}
      <p
        className="mt-3 rounded-xl px-4 py-2.5 text-center font-display text-[13px] font-bold uppercase leading-snug tracking-wide"
        style={{ background: "var(--gold-soft)", color: "var(--gold)" }}
      >
        Dieu est ma source · Sa provision est illimitée · à Dieu rien
        n&apos;est impossible — tout est possible avec Lui.
      </p>
    </aside>
  );
}
