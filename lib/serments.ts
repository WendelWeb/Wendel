import "server-only";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { sermentChecks, sermentBreaches } from "./schema";
import { todayHaiti, haitiHour } from "./dates";
import {
  etatSerment,
  creneauOuvert,
  auditComplet,
  type Choix,
  type Confirmations,
  type Creneau,
  type Declaration,
  type EtatSerment,
  type Rechute,
  type RechuteDeclaree,
} from "./serment";

/** L'état complet du serment, calculé sur tout l'historique. */
export async function getSerment(userId: string): Promise<EtatSerment> {
  const [checks, breaches] = await Promise.all([
    db.select().from(sermentChecks).where(eq(sermentChecks.userId, userId)),
    db.select().from(sermentBreaches).where(eq(sermentBreaches.userId, userId)),
  ]);

  const declarations: Declaration[] = checks.map((c) => ({
    date: c.date,
    creneau: c.creneau as Creneau,
    choix: c.choix as Choix,
  }));
  const rechutes: RechuteDeclaree[] = breaches.map((b) => ({
    date: b.date,
    kind: b.kind as Rechute,
  }));

  return etatSerment(declarations, rechutes, todayHaiti(), haitiHour());
}

export interface Refus {
  ok: false;
  raison: string;
}

/**
 * Enregistre une déclaration.
 *
 * Le serveur revérifie tout — la fenêtre horaire et l'audit — parce que c'est
 * le seul endroit où la vérification compte. Un compteur qu'on peut contourner
 * depuis la console du navigateur ne prouve rien.
 */
export async function declarer(
  userId: string,
  choix: Choix,
  confirmations: Confirmations,
): Promise<{ ok: true } | Refus> {
  const heure = haitiHour();
  const creneau = creneauOuvert(heure);
  if (!creneau)
    return {
      ok: false,
      raison: "Aucun créneau n'est ouvert à cette heure-ci.",
    };

  if (choix === "vouloir" && !auditComplet(confirmations))
    return {
      ok: false,
      raison:
        "Les quatre cases doivent être cochées. Si tu ne peux pas, ce n'est pas une déclaration — c'est une rechute.",
    };

  await db
    .insert(sermentChecks)
    .values({
      userId,
      date: todayHaiti(),
      creneau,
      choix,
      confirmations: confirmations as unknown as Record<string, boolean>,
    })
    // Une déclaration ne se refait pas : le premier mot est le bon.
    .onConflictDoNothing();

  return { ok: true };
}

/** Déclare une rechute. Irréversible, et le compteur retombe à zéro. */
export async function declarerRechute(
  userId: string,
  kind: Rechute,
): Promise<void> {
  await db.insert(sermentBreaches).values({ userId, date: todayHaiti(), kind });
}
