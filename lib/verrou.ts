import "server-only";
import { redirect } from "next/navigation";
import { getSerment } from "./serments";

/**
 * LE VERROU DES 30 JOURS.
 *
 * Tant que les trente jours ne sont pas tenus, l'app n'a qu'un seul écran : le
 * miroir. Il l'a demandé après avoir écrit lui-même que les outils qu'il
 * fabrique lui servent surtout à ne pas s'en servir — ouvrir la page du jour,
 * les citations ou le programme de muscu, c'était encore une façon d'éviter.
 *
 * UNE SEULE EXCEPTION : /urgence. C'est l'écran qu'il ouvre au moment précis où
 * il est sur le point de céder. Le verrouiller ne prouverait rien et coûterait
 * cher — un mécanisme de discipline ne doit jamais fermer la sortie de secours.
 */
export async function verrouille(userId: string): Promise<boolean> {
  const s = await getSerment(userId);
  return !s.debloque;
}

/** À appeler en tête de chaque page verrouillée. */
export async function exigerDebloque(userId: string): Promise<void> {
  if (await verrouille(userId)) redirect("/miroir");
}
