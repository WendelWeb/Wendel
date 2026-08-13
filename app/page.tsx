import { redirect } from "next/navigation";

// Ouvrir l'app, c'est voir le miroir — et rien d'autre. Il l'a demandé après
// avoir écrit lui-même que les outils qu'il fabrique lui servent surtout à ne
// pas s'en servir. La page du jour reste à un tap, dans la navigation.
export default function RootPage() {
  redirect("/miroir");
}
