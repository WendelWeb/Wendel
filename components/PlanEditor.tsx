"use client";

import { useMemo, useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  Key,
  Clock,
  Save,
  RotateCcw,
  Dumbbell,
  ShieldBan,
  CheckCircle2,
} from "lucide-react";
import {
  planMinutes,
  slugify,
  type Plan,
  type PlanItem,
  type PlanKind,
} from "@/lib/plan";
import { savePlanAction, resetPlanAction } from "@/app/plan-actions";

/**
 * L'éditeur du plan journalier.
 *
 * Deux listes : les objectifs (avec une heure) et les règles (des interdits
 * permanents). Chaque entrée peut être marquée « noyau » — et c'est la
 * décision qui compte le plus, parce que le noyau seul décide si la journée
 * entre dans la série. L'écran le rappelle en permanence, avec le compte.
 */
export default function PlanEditor({ initial }: { initial: Plan }) {
  const [items, setItems] = useState<PlanItem[]>(initial.items);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  const objectifs = useMemo(
    () =>
      items
        .map((it, idx) => ({ it, idx }))
        .filter((x) => x.it.kind === "objectif")
        .sort((a, b) => planMinutes(a.it.time) - planMinutes(b.it.time)),
    [items],
  );
  const regles = useMemo(
    () => items.map((it, idx) => ({ it, idx })).filter((x) => x.it.kind === "regle"),
    [items],
  );
  const noyau = items.filter((i) => i.core).length;

  function patch(idx: number, champ: Partial<PlanItem>) {
    setItems((l) => l.map((it, n) => (n === idx ? { ...it, ...champ } : it)));
    setSaved(false);
  }

  function retirer(idx: number) {
    setItems((l) => l.filter((_, n) => n !== idx));
    setSaved(false);
  }

  function ajouter(kind: PlanKind) {
    const base = kind === "regle" ? "Nouvelle règle" : "Nouvel objectif";
    let id = slugify(base);
    let n = 2;
    while (items.some((i) => i.id === id)) id = `${slugify(base)}_${n++}`;
    setItems((l) => [
      ...l,
      {
        id,
        label: "",
        time: kind === "regle" ? "permanent" : "jour",
        kind,
        core: false,
      },
    ]);
    setSaved(false);
  }

  function enregistrer() {
    const propres = items.filter((i) => i.label.trim());
    start(async () => {
      await savePlanAction({ items: propres });
      setItems(propres);
      setSaved(true);
    });
  }

  function reinitialiser() {
    start(async () => {
      await resetPlanAction();
      window.location.reload();
    });
  }

  const Ligne = ({ it, idx }: { it: PlanItem; idx: number }) => (
    <li className="rounded-xl border border-border bg-surface p-3">
      <div className="flex items-start gap-2">
        <input
          value={it.label}
          onChange={(e) => patch(idx, { label: e.target.value })}
          placeholder={
            it.kind === "regle" ? "0 quelque chose…" : "Ce que je fais…"
          }
          className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-[14px] text-text-primary outline-none focus:border-navy"
        />
        <button
          type="button"
          onClick={() => retirer(idx)}
          aria-label="Supprimer"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-text-muted transition hover:bg-red-soft hover:text-red"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {it.kind === "objectif" && (
          <label className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 py-1.5">
            <Clock size={13} className="text-text-muted" />
            <input
              value={it.time}
              onChange={(e) => patch(idx, { time: e.target.value })}
              placeholder="5h00"
              className="w-[86px] bg-transparent text-[13px] text-text-primary outline-none"
            />
          </label>
        )}

        <button
          type="button"
          onClick={() => patch(idx, { core: !it.core })}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-bold transition"
          style={
            it.core
              ? { background: "var(--gold-soft)", color: "var(--gold)" }
              : { background: "var(--surface-raised)", color: "var(--text-muted)" }
          }
        >
          <Key size={13} />
          {it.core ? "Noyau" : "Secondaire"}
        </button>

        {it.kind === "objectif" && (
          <button
            type="button"
            onClick={() => patch(idx, { trainingOnly: !it.trainingOnly })}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition"
            style={
              it.trainingOnly
                ? { background: "var(--navy)", color: "#fff" }
                : { background: "var(--surface-raised)", color: "var(--text-muted)" }
            }
          >
            <Dumbbell size={13} />
            {it.trainingOnly ? "Jours d'entraînement" : "Tous les jours"}
          </button>
        )}
      </div>
    </li>
  );

  return (
    <div className="pb-4">
      {/* Ce que le noyau décide — la seule info qui compte vraiment ici */}
      <div
        className="mb-5 rounded-2xl px-5 py-4"
        style={{ background: "var(--gold-soft)", border: "1.5px solid var(--gold-border)" }}
      >
        <div className="flex items-center gap-2">
          <Key size={16} style={{ color: "var(--gold)" }} />
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "var(--gold)" }}
          >
            Le noyau — {noyau} case{noyau > 1 ? "s" : ""}
          </p>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
          Une journée n&apos;entre dans ta série que si <strong>toutes</strong> les
          cases du noyau sont cochées. Un rituel secondaire raté ne casse rien ;
          une case du noyau ratée casse tout. Choisis-les comme si tu devais les
          tenir un an — parce que c&apos;est le cas.
        </p>
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold uppercase tracking-tight text-navy">
          Objectifs du jour
        </h2>
        <button
          type="button"
          onClick={() => ajouter("objectif")}
          className="flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-[12.5px] font-semibold text-white transition active:scale-[0.97]"
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>
      <p className="mb-3 text-[12px] leading-relaxed text-text-muted">
        L&apos;heure range la journée du matin au soir. Écris <code>jour</code> ou{" "}
        <code>permanent</code> pour ce qui n&apos;a pas d&apos;horaire fixe.
      </p>
      <ul className="mb-7 flex flex-col gap-2">
        {objectifs.map(({ it, idx }) => (
          <Ligne key={it.id} it={it} idx={idx} />
        ))}
      </ul>

      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tight text-red">
          <ShieldBan size={18} /> Règles absolues
        </h2>
        <button
          type="button"
          onClick={() => ajouter("regle")}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold text-white transition active:scale-[0.97]"
          style={{ background: "var(--red)" }}
        >
          <Plus size={14} /> Ajouter
        </button>
      </div>
      <p className="mb-3 text-[12px] leading-relaxed text-text-muted">
        Des interdits, pas des tâches. Cocher une règle veut dire « je confirme
        l&apos;avoir tenue aujourd&apos;hui ».
      </p>
      <ul className="mb-7 flex flex-col gap-2">
        {regles.map(({ it, idx }) => (
          <Ligne key={it.id} it={it} idx={idx} />
        ))}
      </ul>

      {/* Barre d'enregistrement — collée en bas, toujours atteignable */}
      <div className="sticky bottom-20 z-10 flex items-center gap-2 rounded-2xl border border-border bg-surface p-3 shadow-lg md:bottom-4">
        <button
          type="button"
          onClick={enregistrer}
          disabled={pending}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-bold uppercase tracking-wide text-white transition active:scale-[0.98] disabled:opacity-60"
          style={{ background: saved ? "var(--green)" : "var(--navy)" }}
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {pending ? "…" : saved ? "Enregistré" : "Enregistrer le plan"}
        </button>
        <button
          type="button"
          onClick={() => (confirmReset ? reinitialiser() : setConfirmReset(true))}
          disabled={pending}
          className="flex items-center gap-1.5 rounded-xl border border-border px-3 py-3 text-[12.5px] font-semibold text-text-secondary transition active:scale-[0.98]"
          style={confirmReset ? { borderColor: "var(--red)", color: "var(--red)" } : undefined}
        >
          <RotateCcw size={15} />
          {confirmReset ? "Confirmer" : "Défaut"}
        </button>
      </div>
    </div>
  );
}
