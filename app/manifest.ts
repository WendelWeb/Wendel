import type { MetadataRoute } from "next";

// Installable PWA — "Ajouter à l'écran d'accueil" on iPhone opens FORGED
// fullscreen, without Safari's chrome eating the top and bottom of the screen.
//
// start_url pointe sur /miroir : l'icône de l'écran d'accueil ouvre l'app
// DIRECTEMENT, sans passer par la racine ni par sa redirection. C'est pour ça
// que changer app/page.tsx ne suffisait pas — l'app installée ne voit jamais
// « / ». Ouvrir FORGED doit ouvrir le miroir, pas la liste des cases.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FORGED — Preuve d'identité",
    short_name: "FORGED",
    description:
      "Ce que je suis maintenant — et ce que je prouve vouloir à chaque seconde.",
    start_url: "/miroir",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#fafafa",
    theme_color: "#0f172a",
    lang: "fr",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
