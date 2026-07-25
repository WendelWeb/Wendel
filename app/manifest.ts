import type { MetadataRoute } from "next";

// Installable PWA — "Ajouter à l'écran d'accueil" on iPhone opens FORGED
// fullscreen, without Safari's chrome eating the top and bottom of the screen.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FORGED — Preuve d'identité",
    short_name: "FORGED",
    description:
      "Le noyau non-négociable, la rétention, et l'alliance — chaque jour.",
    start_url: "/today",
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
