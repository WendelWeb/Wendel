import { requireUserId } from "@/lib/auth";
import { getVision } from "@/lib/vision";
import { getSerment } from "@/lib/serments";
import { todayHaiti, daysBetween } from "@/lib/dates";
import VisionEditor from "@/components/VisionEditor";
import FenetreVision from "@/components/FenetreVision";
import { visionOuverte } from "@/lib/verrou";
import ConsequencePanel from "@/components/ConsequencePanel";
import { MONTEE } from "@/lib/consequence";

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
  const acces = await visionOuverte(userId);

  // La fenêtre gagnée par une déclaration : quelques minutes pour voir ce
  // qu'il vient de choisir, avec le décompte sous les yeux.
  //
  // Cette page vit hors du groupe (app) : pas de mantra en haut ni en bas. Il
  // l'a demandé — dans cette fenêtre il ne veut voir que sa Vision, et ce
  // qu'il vient de choisir en l'ouvrant.
  if (!serment.debloque && acces.ouverte && acces.jusqua) {
    const v = await getVision(userId);
    return (
      <>
        <FenetreVision jusqua={acces.jusqua.toISOString()} />
        <div className="mx-auto max-w-3xl px-4 pb-2 xl:max-w-6xl">
          <ConsequencePanel c={MONTEE} sens="montee" />
        </div>
        <VisionEditor
          initialContent={v.content}
          initialCreed={v.creed}
          daysToJan={daysBetween(todayHaiti(), "2027-01-01")}
          daysTo30={daysBetween(todayHaiti(), "2033-05-16")}
        />
      </>
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
