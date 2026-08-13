"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Timer, X } from "lucide-react";
import { fermerVisionAction } from "@/app/serment-actions";

/**
 * La fenêtre sur la Vision — quelques minutes gagnées par une déclaration.
 *
 * Elle se referme de trois façons, et c'est voulu :
 *
 *   — « J'ai fini » : le geste explicite, celui qui compte.
 *   — Quitter l'app : l'onglet passe en arrière-plan, on ferme. Sans ça, un
 *     téléphone posé écran allumé laisserait la Vision ouverte indéfiniment.
 *   — L'expiration : le dernier filet, si rien des deux premiers n'arrive.
 *
 * Le décompte est affiché : il doit voir le temps filer, pas s'installer.
 */
export default function FenetreVision({ jusqua }: { jusqua: string }) {
  const router = useRouter();
  const fin = new Date(jusqua).getTime();
  const [reste, setReste] = useState(() =>
    Math.max(0, Math.round((fin - Date.now()) / 1000)),
  );
  const ferme = useRef(false);

  function fermer() {
    if (ferme.current) return;
    ferme.current = true;
    void fermerVisionAction().finally(() => router.replace("/miroir"));
  }

  // Le décompte, et la fermeture à zéro.
  useEffect(() => {
    const t = setInterval(() => {
      const r = Math.max(0, Math.round((fin - Date.now()) / 1000));
      setReste(r);
      if (r === 0) fermer();
    }, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fin]);

  // Sortir de l'app referme. `pagehide` couvre la fermeture d'onglet et le
  // retour à l'écran d'accueil sur iPhone ; `visibilitychange` couvre le
  // passage à une autre app. keepalive permet à la requête d'aboutir même si
  // la page est en train de disparaître.
  useEffect(() => {
    const sortie = () => {
      if (ferme.current) return;
      ferme.current = true;
      void fermerVisionAction();
    };
    const surVisibilite = () => {
      if (document.visibilityState === "hidden") sortie();
    };
    window.addEventListener("pagehide", sortie);
    document.addEventListener("visibilitychange", surVisibilite);
    return () => {
      window.removeEventListener("pagehide", sortie);
      document.removeEventListener("visibilitychange", surVisibilite);
    };
  }, []);

  const mm = String(Math.floor(reste / 60)).padStart(2, "0");
  const ss = String(reste % 60).padStart(2, "0");

  return (
    <div className="sticky top-0 z-40 mb-4 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
      <Timer size={17} className="flex-shrink-0 text-text-muted" />
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-semibold leading-tight text-text-primary">
          Fenêtre ouverte — <span className="tnum">{mm}:{ss}</span>
        </p>
        <p className="text-[11px] leading-tight text-text-secondary">
          Tu as gagné ces minutes. Elles se referment si tu quittes l&apos;app.
        </p>
      </div>
      <button
        type="button"
        onClick={fermer}
        className="flex flex-shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-bold text-white transition active:scale-[0.97]"
        style={{ background: "var(--navy)" }}
      >
        <X size={14} />
        J&apos;ai fini
      </button>
    </div>
  );
}
