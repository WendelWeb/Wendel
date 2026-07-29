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

      {/* LA LOI DE CAUSE À EFFET — répétée trois fois, en écho qui grossit :
          la conséquence ne s'efface pas, elle s'amplifie. */}
      <div
        className="mt-3 overflow-hidden rounded-2xl px-5 py-4 text-center"
        style={{ background: "var(--navy)" }}
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
          La loi — aucune exception
        </p>
        <p className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-white/40">
          Every action has consequences
        </p>
        <p className="mt-1 font-display text-[16px] font-bold uppercase tracking-[0.12em] text-white/70">
          Every action has consequences
        </p>
        <p
          className="mt-1 font-display text-[21px] font-bold uppercase leading-none tracking-[0.06em]"
          style={{ color: "var(--orange)" }}
        >
          Every action has consequences
        </p>
      </div>

      {/* LA LOI DE L'ÉCHANGE — le grand livre : rien n'est gratuit, tout se
          troque. Le bloc se scinde en deux colonnes : ce qu'on prend, ce qu'on
          donne. */}
      <div
        className="mt-3 overflow-hidden rounded-2xl px-5 py-4 text-center"
        style={{ background: "#0F766E" }}
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
          La loi de l&apos;échange
        </p>
        <p className="font-display text-[15px] font-bold uppercase leading-snug text-white">
          Chaque action, aussi petite soit-elle, est un échange.
        </p>
        <p className="mt-1.5 text-[12px] font-semibold leading-snug text-white/70">
          Calcule bien ce que tu prends et ce que tu donnes.
        </p>

        <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-white/20">
          <div className="bg-[#0F766E] px-2 py-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
              Ce que tu prends
            </p>
          </div>
          <div className="bg-[#0F766E] px-2 py-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
              Ce que tu donnes
            </p>
          </div>
        </div>
      </div>

      {/* Décret de provision — Dieu est la source */}
      <p
        className="mt-3 rounded-xl px-4 py-2.5 text-center font-display text-[13px] font-bold uppercase leading-snug tracking-wide"
        style={{ background: "var(--gold-soft)", color: "var(--gold)" }}
      >
        Dieu est ma source · Sa provision est illimitée · à Dieu rien
        n&apos;est impossible — tout est possible avec Lui.
      </p>

      {/* L'exécution — le marteau qui referme la loi */}
      <div
        className="mt-3 rounded-2xl px-5 py-4 text-center"
        style={{ background: "var(--black)" }}
      >
        <p className="font-display text-[15px] font-bold uppercase leading-snug tracking-wide text-white">
          Je suis celui qui fait tout ça.
        </p>
        <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/55">
          Pas dans 5 minutes · pas plus tard · pas lundi prochain
        </p>
        <p
          className="mt-2 font-display text-[26px] font-bold uppercase leading-none tracking-[0.2em]"
          style={{ color: "var(--gold-border)" }}
        >
          Maintenant
        </p>
      </div>
    </aside>
  );
}
