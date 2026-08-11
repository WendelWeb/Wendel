import { SlidersHorizontal } from "lucide-react";
import { requireUserId } from "@/lib/auth";
import { getPlan } from "@/lib/plans";
import { isDefaultPlan } from "@/lib/plan";
import PlanEditor from "@/components/PlanEditor";

export const dynamic = "force-dynamic";

export default async function ReglagesPage() {
  const userId = await requireUserId();
  const plan = await getPlan(userId);
  const defaut = isDefaultPlan(plan);

  return (
    <main className="px-4 pb-12 pt-6">
      <div className="mb-1 flex items-center gap-2">
        <SlidersHorizontal size={22} className="text-navy" />
        <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-navy">
          Réglages
        </h1>
      </div>
      <p className="mb-6 text-[13.5px] leading-relaxed text-text-secondary">
        Ton plan journalier. Ce que tu écris ici commande la page du jour, le
        score, le noyau, la série — et les emails.{" "}
        {defaut && (
          <span className="text-text-muted">
            Tu utilises le plan par défaut pour l&apos;instant.
          </span>
        )}
      </p>

      <PlanEditor initial={plan} />
    </main>
  );
}
