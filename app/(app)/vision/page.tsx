import Link from "next/link";
import { Lock } from "lucide-react";
import { requireUserId } from "@/lib/auth";
import { getVision } from "@/lib/vision";
import { getSerment } from "@/lib/serments";
import { CIBLE_JOURS } from "@/lib/serment";
import { todayHaiti, daysBetween } from "@/lib/dates";
import VisionEditor from "@/components/VisionEditor";

export const dynamic = "force-dynamic";

/**
 * La Vision se mérite.
 *
 * Il a décidé lui-même de ne plus regarder ses objectifs tant qu'il n'aurait
 * pas prouvé pendant trente jours qu'il les veut. Cette page applique sa
 * décision — sinon elle n'aurait été qu'une intention de plus, et le miroir
 * dit précisément ce que deviennent ses intentions.
 */
export default async function VisionPage() {
  const userId = await requireUserId();
  const serment = await getSerment(userId);

  if (!serment.debloque) {
    const restants = Math.max(1, CIBLE_JOURS - serment.jourActuel + 1);
    return (
      <main className="px-4 pb-16 pt-10">
        <div
          className="mx-auto max-w-lg rounded-2xl px-6 py-8 text-center"
          style={{ background: "#0c0c0c", border: "1.5px solid #292524" }}
        >
          <Lock size={26} className="mx-auto mb-4 text-white/25" />
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            Fermée
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-[13.5px] leading-relaxed text-white/55">
            Tu as décidé de ne rouvrir tes objectifs qu&apos;après avoir prouvé
            pendant trente jours que tu les veux. Ce n&apos;est pas moi qui l&apos;ai
            décidé — c&apos;est toi.
          </p>

          <p className="mt-7 flex items-baseline justify-center gap-2">
            <span className="tnum font-display text-[46px] font-bold leading-none text-white">
              {serment.jourActuel}
            </span>
            <span className="text-[16px] font-semibold text-white/40">
              / {CIBLE_JOURS}
            </span>
          </p>
          <div className="mx-auto mt-4 h-[6px] max-w-xs overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, Math.round((serment.jourActuel / CIBLE_JOURS) * 100))}%`,
                background: "var(--gold-border)",
              }}
            />
          </div>

          <p className="mt-4 text-[12.5px] leading-relaxed text-white/40">
            Encore {restants} {restants > 1 ? "jours" : "jour"}. Ouverture prévue
            le {serment.dateOuverture}.
            {serment.record > serment.jourActuel && (
              <>
                {" "}
                Ta plus longue série : {serment.record} jours.
              </>
            )}
          </p>

          <Link
            href="/miroir"
            className="mt-7 block rounded-xl px-4 py-3.5 text-[14px] font-bold uppercase tracking-wide text-black"
            style={{ background: "var(--gold-border)" }}
          >
            Aller déclarer
          </Link>

          <p className="mt-5 text-[12px] italic leading-relaxed text-white/30">
            Rien ne changera tant que je ne changerai pas.
          </p>
        </div>
      </main>
    );
  }

  const v = await getVision(userId);
  return (
    <VisionEditor
      initialContent={v.content}
      initialCreed={v.creed}
      daysToJan={daysBetween(todayHaiti(), "2027-01-01")}
      daysTo30={daysBetween(todayHaiti(), "2033-05-16")}
    />
  );
}
