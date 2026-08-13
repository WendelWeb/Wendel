import "server-only";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { db } from "./db";
import { visionAccess } from "./schema";
import { getSerment } from "./serments";

/**
 * LE VERROU DES 30 JOURS.
 *
 * Tant que les trente jours ne sont pas tenus, l'app n'a qu'un seul écran : le
 * miroir. Il l'a demandé après avoir écrit lui-même que les outils qu'il
 * fabrique lui servent surtout à ne pas s'en servir — ouvrir la page du jour,
 * les citations ou le programme de muscu, c'était encore une façon d'éviter.
 *
 * Aucune exception. Il a demandé que l'urgence soit fermée elle aussi.
 */
export async function verrouille(userId: string): Promise<boolean> {
  const s = await getSerment(userId);
  return !s.debloque;
}

/** À appeler en tête de chaque page verrouillée. */
export async function exigerDebloque(userId: string): Promise<void> {
  if (await verrouille(userId)) redirect("/miroir");
}

/**
 * Est-ce un ordinateur ?
 *
 * Deux pages restent ouvertes pendant les 30 jours, mais sur PC seulement :
 * la page du jour, pour cocher ce qu'il accomplit, et les réglages, pour
 * modifier son plan. Sur téléphone l'app reste le miroir et rien d'autre —
 * c'est là qu'il ouvre l'app par réflexe, et c'est ce réflexe qu'on ferme.
 *
 * Détection par user-agent : ce n'est pas inviolable, et ça n'a pas à l'être.
 * Ce verrou ne protège pas contre un attaquant, il protège contre un geste
 * machinal. Le seul à pouvoir le contourner est celui qu'il sert.
 */
export function estOrdinateur(): boolean {
  const ua = headers().get("user-agent") ?? "";
  return !/Android|iPhone|iPad|iPod|Mobile|Opera Mini|IEMobile/i.test(ua);
}

/** Verrouillée, sauf sur ordinateur. Pour la page du jour et les réglages. */
export async function exigerDebloqueOuPC(userId: string): Promise<void> {
  if (estOrdinateur()) return;
  if (await verrouille(userId)) redirect("/miroir");
}

// ——————————————————————————————————————————————————————————————
// La fenêtre sur la Vision
// ——————————————————————————————————————————————————————————————

/**
 * Combien de temps la Vision reste ouverte après une déclaration.
 *
 * C'est un filet, pas la règle : la fenêtre est censée se refermer quand il
 * dit « j'ai fini » ou qu'il quitte l'app. L'expiration existe pour le cas où
 * il pose son téléphone sans rien fermer — sinon un onglet oublié redeviendrait
 * un accès permanent, et le verrou ne vaudrait plus rien.
 */
export const FENETRE_MINUTES = 15;

/** Ouvre la fenêtre — appelée juste après une déclaration tenue. */
export async function ouvrirVision(userId: string): Promise<void> {
  const openUntil = new Date(Date.now() + FENETRE_MINUTES * 60_000);
  await db
    .insert(visionAccess)
    .values({ userId, openUntil })
    .onConflictDoUpdate({
      target: visionAccess.userId,
      set: { openUntil, updatedAt: new Date() },
    });
}

/** Referme la fenêtre : « j'ai fini », ou sortie de l'app. */
export async function fermerVision(userId: string): Promise<void> {
  await db
    .insert(visionAccess)
    .values({ userId, openUntil: new Date(0) })
    .onConflictDoUpdate({
      target: visionAccess.userId,
      set: { openUntil: new Date(0), updatedAt: new Date() },
    });
}

/** La Vision est-elle consultable maintenant — définitivement ou pour un moment. */
export async function visionOuverte(
  userId: string,
): Promise<{ ouverte: boolean; definitive: boolean; jusqua: Date | null }> {
  const s = await getSerment(userId);
  if (s.debloque) return { ouverte: true, definitive: true, jusqua: null };

  const rows = await db
    .select()
    .from(visionAccess)
    .where(eq(visionAccess.userId, userId))
    .limit(1);
  const jusqua = rows[0]?.openUntil ?? null;
  const ouverte = !!jusqua && jusqua.getTime() > Date.now();
  return { ouverte, definitive: false, jusqua: ouverte ? jusqua : null };
}
