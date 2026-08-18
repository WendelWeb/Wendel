"use client";

import type { ReactNode } from "react";
import { Hand, Eye } from "lucide-react";
import { INTERROGATION, SI_TU_CEDES, DECLARATIONS } from "@/lib/sting";
import { BINARY, BINARY_FRAME_EN } from "@/lib/binary";
import { QUOTES, categoryMeta } from "@/lib/quotes";
import { DELAYED } from "@/lib/delayed";
import { MANTRA_LINES } from "@/lib/mantra-lines";
import { sampled, picked, shuffled, branch, visitSeed } from "@/lib/rotate";
import { useSeed } from "./useSeed";

// LE MANTRA — en haut ET en bas de CHAQUE page (rendu dans le layout).
//
// Tout tourne, à trois exceptions près :
//
//   • la promesse de la montagne ouvre toujours — il l'a demandé lui-même,
//     elle prime sur tout ;
//   • « MAINTENANT » et « prier sans cesse » ferment toujours — c'est le
//     marteau et le sceau, ils ne valent qu'en dernier.
//
// Entre les deux, l'ORDRE DES BLOCS est tiré au sort à chaque visite, et le
// contenu de chaque liste aussi : l'interrogatoire, ce qu'il devient s'il cède,
// les questions binaires, les lignes anglaises. Un mur qu'on relit à l'identique
// dix fois par jour n'est plus lu au bout d'une semaine — l'œil reconnaît la
// forme et saute. En déplaçant les blocs, il ne peut plus anticiper.
//
// Composant serveur : le tirage a lieu ici, à chaque requête. Les deux mantras
// d'une même page reçoivent des graines différentes, donc le haut et le bas ne
// se ressemblent jamais.
export default function Mantra({
  placement = "bottom",
  seed,
}: {
  placement?: "top" | "bottom";
  seed?: number;
}) {
  // Le conteneur porte l'espacement, comme pour les trois autres.
  const spacing = "";
  const s = useSeed(seed ?? visitSeed());

  const cedes = sampled(SI_TU_CEDES, branch(s, "cedes"), 6);
  const marteau = picked(
    [
      "Tu n'es pas un roi. Tu es un chien qui rêve d'être roi.",
      "Un empereur en pensée, un esclave en pratique.",
      "A dog with a dream is still a dog.",
    ],
    branch(s, "marteau"),
  );
  const binaire = sampled(BINARY, branch(s, "binaire"), 4);
  const feu = sampled(
    [
      "God kept His word. Now keep yours.",
      "A dog with a dream is still a dog.",
      "Ten years. Zero receipts.",
      "You'll either be the story or the audience.",
      "Nobody is coming. That's the whole point.",
      ...QUOTES.filter((q) => q.c === "fire" || q.c === "puissance").map(
        (q) => q.t,
      ),
    ],
    branch(s, "feu"),
    5,
  );
  const citation = picked(QUOTES, branch(s, "cit"));
  const retard = picked(DELAYED, branch(s, "retard"));
  const phrase = picked(MANTRA_LINES, branch(s, "phrase"));
  const declaration = picked(DECLARATIONS, branch(s, "decl"));

  // ——————————————————————————————————————————————————————————
  // LA PROMESSE — toujours en tête, elle prime sur tout
  // ——————————————————————————————————————————————————————————
  const promesse = (
    <div
      className="rounded-2xl px-5 py-4 text-center"
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
        Dieu me l&apos;a dit : si je ne gaspille pas mon énergie, tout ce que je
        conçois se réalisera.
      </p>
    </div>
  );

  // ——————————————————————————————————————————————————————————
  // Les blocs mobiles — leur ordre change à chaque visite
  // ——————————————————————————————————————————————————————————

  // LA ROTATION — le seul bloc dont rien n'est écrit d'avance. Il puise dans
  // les 2 086 citations, les 351 retards, les phrases et les déclarations.
  const rotation = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4"
      style={{ background: "#1C1917", border: "1.5px solid #44403C" }}
    >
      <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-white/40">
        À chaque visite · jamais deux fois pareil
      </p>

      <blockquote
        className="border-l-[3px] pl-3 font-display text-[14px] font-semibold leading-snug text-white"
        style={{ borderColor: categoryMeta(citation.c).color }}
      >
        « {citation.t} »
      </blockquote>
      {citation.s && (
        <p className="mt-1 pl-3 text-[10.5px] text-white/40">{citation.s}</p>
      )}

      <div className="mt-3.5 border-t border-white/12 pt-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
          Ce que tu retardes
        </p>
        <p className="mt-1 text-[12.5px] font-medium leading-snug text-white/85">
          {retard.t}
        </p>
      </div>

      <div className="mt-3 border-t border-white/12 pt-3">
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
          Ta loi
        </p>
        <p className="mt-1 text-[12.5px] font-medium leading-snug text-white/85">
          {phrase}
        </p>
      </div>

      <p
        className="mt-3.5 border-t border-white/12 pt-3 text-center font-display text-[13.5px] font-bold uppercase leading-snug"
        style={{ color: "var(--gold-border)" }}
      >
        {declaration}
      </p>
    </div>
  );

  // LE TEST DE LA FOI — la promesse n'a de valeur que suivie d'actes. Ce bloc
  // retourne contre lui son propre étalon : il dit haïr l'hypocrisie.
  const testFoi = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4"
      style={{ background: "#450A0A", border: "1.5px solid #7F1D1D" }}
    >
      <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">
        Le test de la foi
      </p>
      <p className="font-display text-[15px] font-bold uppercase leading-snug text-white">
        If you really believed in God, you would do exactly what He told you to
        do.
      </p>
      <p className="mt-2 text-[12.5px] leading-snug text-white/70">
        Tu croirais Sa promesse et tu agirais dessus. Tu obéirais. Sans
        négocier, sans reporter, sans clause.
      </p>

      <div className="mt-3 border-t border-white/15 pt-3">
        <p className="text-[13px] font-semibold leading-snug text-white">
          Mais tu dis une chose et tu prouves le contraire par tes actes.
        </p>
        <p
          className="mt-1.5 font-display text-[15px] font-bold uppercase leading-snug"
          style={{ color: "var(--gold-border)" }}
        >
          C&apos;est exactement ce que Jésus appelait un hypocrite.
        </p>
        <p className="mt-2 text-[12px] italic leading-snug text-white/60">
          « Ce peuple m&apos;honore des lèvres, mais son cœur est loin de moi. »
          · « La foi sans les œuvres est morte » (Jacques 2:17).
        </p>
      </div>

      <p className="mt-3 text-center text-[12.5px] font-bold leading-snug text-white">
        Tu dis haïr l&apos;hypocrisie plus que tout.
        <br />
        <span style={{ color: "var(--gold-border)" }}>
          Voilà la tienne. Elle est dans ta main.
        </span>
      </p>
    </div>
  );

  // POURQUOI TU EXISTES
  const couronne = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-5 text-center"
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
  );

  // CE DONT JE SUIS FAIT — Gn 2:7. Le reste de la création est né d'une parole ;
  // l'homme, de Ses mains et de Son souffle. La typographie monte du murmure au
  // décret pour dire cette différence.
  const matiere = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-5 text-center"
      style={{ background: "#0C0A09" }}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/40">
        Ce dont je suis fait
      </p>
      <p className="text-[12px] font-medium leading-snug text-white/50">
        Pour tout le reste de la création, Il a parlé — et ce fut.
      </p>
      <p
        className="mt-1.5 font-display text-[19px] font-bold uppercase leading-tight"
        style={{ color: "var(--gold-border)" }}
      >
        Mon corps, Il l&apos;a formé de Ses mains.
      </p>
      <p className="mt-2 text-[12.5px] font-semibold leading-snug text-white/80">
        Il a collé Sa bouche contre moi et y a insufflé Son propre souffle.
      </p>

      <div className="mt-3.5 border-t border-white/15 pt-3">
        <p className="text-[12.5px] font-semibold leading-snug text-white">
          J&apos;ai droit à cet orgueil. À cette arrogance divine.
        </p>
        <p
          className="mt-1.5 font-display text-[13.5px] font-bold uppercase leading-snug"
          style={{ color: "var(--gold-border)" }}
        >
          Je refuse d&apos;être un lâche. Je refuse d&apos;être un masturbateur.
          Je refuse d&apos;être soumis.
        </p>
      </div>
    </div>
  );

  // LA MAIN · LES YEUX
  const mainYeux = (
    <div className="grid items-start gap-3 sm:grid-cols-2">
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
  );

  // LA LOI DE CAUSE À EFFET — répétée trois fois, en écho qui grossit :
  // la conséquence ne s'efface pas, elle s'amplifie.
  const loiConsequence = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4 text-center"
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
  );

  // LA LOI DE L'ÉCHANGE — rien n'est gratuit, tout se troque.
  const loiEchange = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4 text-center"
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
  );

  // LA LOI DU PACTE — tout acte est une signature.
  const loiPacte = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4 text-center"
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
  );

  // LE JUGEMENT CHOISI — s'il faut être jugé, que ce soit pour l'excès de
  // puissance, jamais pour l'avoir enterrée. (Parabole des talents.)
  const jugement = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4"
      style={{ background: "#7F1D1D" }}
    >
      <p className="mb-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">
        Le jugement que je choisis
      </p>

      {[
        {
          keep: "Qu'Il me juge pour l'ARROGANCE du pouvoir qu'Il m'a donné, et pour la manière dont je l'exerce",
          reject: "jamais pour l'avoir enterré",
        },
        {
          keep: "Qu'Il me juge pour la DOMINATION, l'excès, la démesure",
          reject:
            "jamais comme un masturbateur sans contrôle, un chien en laisse mené par la luxure, un homme qui gaspille tout ce qu'Il lui confie",
        },
        {
          keep: "Qu'Il me juge CONQUÉRANT",
          reject: "jamais lâche",
        },
      ].map((p) => (
        <div key={p.keep} className="mb-2 last:mb-0">
          <p className="text-[12.5px] font-semibold leading-snug text-white">
            {p.keep}
          </p>
          <p className="mt-0.5 flex gap-1.5 text-[12px] leading-snug text-white/55">
            <span aria-hidden>—</span>
            <span>{p.reject}.</span>
          </p>
        </div>
      ))}

      {/* Le miroir sale — ce qu'il DEVIENT à l'instant où il cède. */}
      <div
        className="mt-3.5 rounded-xl px-4 py-3.5"
        style={{ background: "rgba(0,0,0,0.45)" }}
      >
        <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
          Et si tu cèdes — voilà ce que tu es, à cet instant
        </p>
        <ul className="flex flex-col gap-1.5">
          {cedes.map((line) => (
            <li key={line} className="flex gap-2">
              <span
                className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full"
                style={{ background: "var(--red)" }}
              />
              <span className="text-[12px] font-medium leading-snug text-white/85">
                {line}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center font-display text-[13.5px] font-bold uppercase leading-snug text-white">
          {marteau}
        </p>
      </div>

      <div className="mt-3.5 border-t border-white/20 pt-3 text-center">
        <p
          className="font-display text-[16px] font-bold uppercase leading-snug tracking-wide"
          style={{ color: "var(--gold-border)" }}
        >
          Je suis héritier de Dieu.
        </p>
        <p className="mt-1 font-display text-[13px] font-bold uppercase leading-snug text-white">
          Je refuse d&apos;être un putain de rien.
        </p>
      </div>
    </div>
  );

  // DÉCRET DE PROVISION — Dieu est la source
  const source = (
    <p
      className="rounded-xl px-4 py-2.5 text-center font-display text-[13px] font-bold uppercase leading-snug tracking-wide"
      style={{ background: "var(--gold-soft)", color: "var(--gold)" }}
    >
      Dieu est ma source · Sa provision est illimitée · à Dieu rien n&apos;est
      impossible — tout est possible avec Lui.
    </p>
  );

  // LA LOI DU COÛT — un oui dépense mille non.
  const loiCout = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4 text-center"
      style={{ background: "#9D174D" }}
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        La loi du coût
      </p>
      <p className="font-display text-[17px] font-bold uppercase leading-snug text-white">
        Every yes is a thousand no.
      </p>
      <p className="mt-1.5 text-[12.5px] font-semibold leading-snug text-white/75">
        Chaque oui est mille non.
      </p>

      <div className="mt-3.5 flex items-center justify-center gap-4">
        <div>
          <p className="font-display text-[30px] font-bold leading-none text-white">
            1
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">
            oui
          </p>
        </div>
        <span className="text-[18px] text-white/40">→</span>
        <div>
          <p
            className="font-display text-[30px] font-bold leading-none"
            style={{ color: "var(--gold-border)" }}
          >
            1000
          </p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white/55">
            non
          </p>
        </div>
      </div>

      <p className="mt-3 text-[12px] leading-snug text-white/70">
        Ce que tu acceptes maintenant refuse en silence tout le reste. Regarde
        bien ce que tu viens de refuser.
      </p>
    </div>
  );

  // L'INTERROGATOIRE — le miroir tendu au moment de l'acte.
  const interrogatoire = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4"
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
      {INTERROGATION.map((group) => (
        <div key={group.step} className="mb-2.5 last:mb-0">
          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/35">
            {group.step}
          </p>
          <ul className="flex flex-col gap-1.5">
            {sampled(group.lines, branch(s, `int:${group.step}`), 3).map((q) => (
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

      <div
        className="mt-3.5 rounded-xl px-4 py-3 text-center"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/40">
          Ma réponse
        </p>
        <p className="mt-1.5 font-display text-[14px] font-bold uppercase leading-snug text-white">
          Je ne vais pas sur TikTok.
        </p>
        <p
          className="mt-1 font-display text-[14px] font-bold uppercase leading-snug"
          style={{ color: "var(--gold-border)" }}
        >
          Je suis le sujet dont on parle — et qui ne fane jamais.
        </p>
      </div>
    </div>
  );

  // LA RESPONSABILITÉ TOTALE — Dieu s'est retiré de la liste en promettant
  // d'être avec lui. Il ne reste qu'un nom.
  const responsabilite = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4"
      style={{ background: "#78350F" }}
    >
      <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.26em] text-white/45">
        Qui peut t&apos;arrêter
      </p>
      <p className="text-center font-display text-[15px] font-bold uppercase leading-snug text-white">
        Only God and you can stop you.
      </p>
      <p className="mt-1.5 text-center text-[12.5px] leading-snug text-white/70">
        Et Dieu a dit qu&apos;Il serait avec toi.
      </p>

      <div className="mt-3.5 flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5 rounded-lg bg-black/25 px-3 py-2">
          <span className="text-[13px] font-bold text-white/40 line-through">
            Dieu
          </span>
          <span className="text-[11px] text-white/50">
            — Il a promis d&apos;être avec toi. Rayé de la liste.
          </span>
        </div>
        <div
          className="flex items-center gap-2.5 rounded-lg px-3 py-2"
          style={{ background: "var(--gold-border)" }}
        >
          <span className="font-display text-[15px] font-bold uppercase text-black">
            Toi
          </span>
          <span className="text-[11.5px] font-semibold text-black/70">
            — il ne reste que ce nom.
          </span>
        </div>
      </div>

      <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white/45">
        Tu ne peux plus accuser
      </p>
      <p className="mt-1 text-[13px] leading-snug text-white/60 line-through">
        les démons · le diable · la politique · le système · ton pays · ta
        famille · l&apos;économie · le manque d&apos;argent · les autres
      </p>

      <p className="mt-3 text-center font-display text-[14px] font-bold uppercase leading-snug tracking-wide text-white">
        Aucun alibi ne te reste. Seulement toi.
      </p>
    </div>
  );

  // LE BINAIRE — « peux-tu » est réglé. Reste « veux-tu ». Aucune 3e porte.
  const binaireBloc = (
    <div
      className="overflow-hidden rounded-2xl px-5 py-4"
      style={{ background: "#0A0A0A", border: "1.5px solid #3F3F46" }}
    >
      <p className="text-center text-[11.5px] font-semibold italic leading-snug text-white/55">
        {BINARY_FRAME_EN}
      </p>
      <p
        className="mt-2 text-center font-display text-[13px] font-bold uppercase tracking-wide"
        style={{ color: "var(--gold-border)" }}
      >
        La seule question qui reste
      </p>

      <ul className="mt-3 flex flex-col gap-2">
        {binaire.map((q) => (
          <li key={q.en} className="border-l-2 border-white/20 pl-3">
            <p className="text-[13px] font-bold leading-snug text-white">
              {q.en}
            </p>
            <p className="mt-0.5 text-[12px] leading-snug text-white/55">
              {q.fr}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-3.5 text-center font-display text-[14px] font-bold uppercase leading-snug tracking-wide text-white">
        Il n&apos;y a pas de troisième porte.
      </p>
    </div>
  );

  // FIRE — volontairement nu. Après des blocs denses, cinq lignes seules sur du
  // noir frappent plus fort que n'importe quelle mise en page.
  const fire = (
    <div className="rounded-2xl px-5 py-6" style={{ background: "#000000" }}>
      {feu.map((l, i) => (
        <p
          key={`${i}-${l}`}
          className="text-center font-display text-[16px] font-bold uppercase leading-tight tracking-wide"
          style={{
            color: i === 0 ? "var(--gold-border)" : "#fff",
            marginTop: i === 0 ? 0 : "0.85rem",
          }}
        >
          {l}
        </p>
      ))}
    </div>
  );

  // ——————————————————————————————————————————————————————————
  // L'EXÉCUTION puis LE SCEAU — toujours en dernier
  // ——————————————————————————————————————————————————————————
  const execution = (
    <div
      className="rounded-2xl px-5 py-4 text-center"
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
  );

  // Les blocs qui bougent. L'ordre est retiré au sort à chaque requête ; deux
  // visites de suite ne présentent jamais la même succession.
  const mobiles: { id: string; node: ReactNode }[] = [
    { id: "rotation", node: rotation },
    { id: "testFoi", node: testFoi },
    { id: "couronne", node: couronne },
    { id: "matiere", node: matiere },
    { id: "mainYeux", node: mainYeux },
    { id: "loiConsequence", node: loiConsequence },
    { id: "loiEchange", node: loiEchange },
    { id: "loiPacte", node: loiPacte },
    { id: "jugement", node: jugement },
    { id: "source", node: source },
    { id: "loiCout", node: loiCout },
    { id: "interrogatoire", node: interrogatoire },
    { id: "responsabilite", node: responsabilite },
    { id: "binaire", node: binaireBloc },
    { id: "fire", node: fire },
  ];

  return (
    // Le mantra n est pas une carte unique mais une pile de blocs. Dans la
    // grille des bandeaux il occupe une cellule, et ses blocs internes se
    // repartissent a leur tour sur les ecrans tres larges.
    <aside className="h-full">
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-text-muted">
        Loi du vaisseau
      </p>

      <div className="flex flex-col gap-3">
        {promesse}
        {shuffled(mobiles, branch(s, "ordre")).map((b) => (
          <div key={b.id}>{b.node}</div>
        ))}
        {execution}
      </div>

      {/* Le fil continu — la prière ne s'interrompt pas entre les blocs.
          Volontairement silencieuse : après tous ces blocs qui crient, celui-ci
          scelle sans élever la voix. */}
      <p
        className="mt-4 flex items-center justify-center gap-2.5 text-center font-display text-[12px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "var(--gold)" }}
      >
        <span className="h-px w-7" style={{ background: "var(--gold-border)" }} />
        Prier sans cesse
        <span className="h-px w-7" style={{ background: "var(--gold-border)" }} />
      </p>
      <p className="mt-1 text-center text-[11.5px] italic leading-snug text-text-secondary">
        Cette victoire entrera par la main de Dieu.
      </p>
    </aside>
  );
}
