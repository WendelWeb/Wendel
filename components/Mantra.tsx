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

      {/* LA LOI DU PACTE — tout acte est une signature. Le bloc se termine par
          une ligne de signature vide : à toi de savoir ce que tu y inscris. */}
      <div
        className="mt-3 overflow-hidden rounded-2xl px-5 py-4 text-center"
        style={{ background: "#4C1D95" }}
      >
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
          La loi du pacte
        </p>
        <p className="font-display text-[15px] font-bold uppercase leading-snug text-white">
          Chaque action est un pacte.
        </p>
        <p className="mt-1.5 text-[12px] font-semibold italic leading-snug text-white/70">
          Every second on TikTok is an agreement to hand over your energy.
        </p>

        <div className="mt-3 flex items-end justify-center gap-2">
          <span className="font-display text-[13px] font-bold text-white/50">
            ✕
          </span>
          <span
            className="h-px w-40 max-w-full"
            style={{ background: "rgba(255,255,255,0.35)" }}
          />
        </div>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">
          Avec qui tu viens de signer ?
        </p>
      </div>

      {/* Décret de provision — Dieu est la source */}
      <p
        className="mt-3 rounded-xl px-4 py-2.5 text-center font-display text-[13px] font-bold uppercase leading-snug tracking-wide"
        style={{ background: "var(--gold-soft)", color: "var(--gold)" }}
      >
        Dieu est ma source · Sa provision est illimitée · à Dieu rien
        n&apos;est impossible — tout est possible avec Lui.
      </p>

      {/* L'INTERROGATOIRE — le miroir tendu au moment de l'acte. Chaque ligne
          confronte le geste présent à l'homme qu'il prétend être. */}
      <div
        className="mt-3 overflow-hidden rounded-2xl px-5 py-4"
        style={{ background: "#1C1917", border: "1.5px solid #44403C" }}
      >
        <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
          L&apos;interrogatoire · à chaque action
        </p>
        <p className="mb-3 text-center font-display text-[14px] font-bold uppercase leading-snug text-white">
          Ce que tu fais là, maintenant — est-ce que ça reflète…
        </p>

        {/* Trois étages : ce qu'il bâtit dehors, ce qu'il est dedans, à qui il
            répond. L'ordre va du visible vers la racine. */}
        {[
          {
            step: "L'empire",
            lines: [
              "un homme qui bâtit des hôpitaux à 1 Md, des ports à 10 Mds, des aéroports à 15 Mds ?",
              "celui qui déplace les frontières de l'Afrique, bâtit un empire neuf et domine mondialement ?",
              "celui qui contrôle la finance, la bourse, la politique, les ressources naturelles ?",
              "un maître en géopolitique — ferme et sans pitié ?",
              "un homme plus important qu'un président ou un roi — considéré comme tout-puissant, admiration totale et intimidation ?",
              "celui qui peut développer un continent entier rien qu'en le décidant ?",
            ],
          },
          {
            step: "L'homme",
            lines: [
              "la vie d'un CONQUÉRANT ?",
              "un homme qui triomphe d'abord de lui-même ?",
              "un homme qui contrôle les conséquences de chaque action ?",
              "un homme dont la parole tenue à lui-même n'a jamais plié ?",
              "un homme au vaisseau plein, qui monte l'escalier marche après marche ?",
              "un homme qui ne parle pas et qui livre — qu'on découvre au fait accompli ?",
            ],
          },
          {
            step: "Dieu",
            lines: [
              "un homme FIDÈLE À DIEU, qui garde intacte l'alliance de la montagne ?",
            ],
          },
        ].map((group) => (
          <div key={group.step} className="mb-2.5 last:mb-0">
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
              {group.step}
            </p>
            <ul className="flex flex-col gap-1.5">
              {group.lines.map((q) => (
                <li key={q} className="flex gap-2.5">
                  <span
                    className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                    style={{ background: "var(--orange)" }}
                  />
                  <span className="text-[12.5px] font-medium leading-snug text-white/80">
                    {q}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <p
          className="mt-3.5 text-center font-display text-[15px] font-bold uppercase leading-snug tracking-wide"
          style={{ color: "var(--orange)" }}
        >
          Ou tu vas passer ta vie à rêver ?
        </p>
      </div>

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
