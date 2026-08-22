"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, EyeOff, Undo2 } from "lucide-react";

/**
 * LA GALERIE — une image, plein écran, tirée au sort.
 *
 * Il a dit pourquoi il la veut : « aucun prétexte pour ne pas les regarder ».
 * Toute la conception découle de cette phrase.
 *
 * Une seule image à la fois, en grand. Une grille de vignettes donnerait le
 * sentiment d'avoir vu sans avoir regardé — c'est exactement le mécanisme du
 * survol qu'il combat partout ailleurs dans l'app.
 *
 * L'ordre est tiré au sort, jamais alphabétique. Mille six cents images dans
 * l'ordre du disque, ce sont mille six cents fois les mêmes cent premières :
 * il n'irait jamais au-delà.
 *
 * Le tirage a lieu APRÈS le montage, jamais au rendu serveur. Deux tirages
 * différents entre le serveur et le client feraient hurler React à
 * l'hydratation — c'est le même piège que pour les bandeaux, et la même parade.
 *
 * MASQUER remplace le SUPPRIMER de sa visionneuse Python. Sur Vercel le disque
 * est en lecture seule : rien ne peut être effacé. Mais masquer est meilleur
 * ici — c'est réversible, et son historique de décisions irréversibles prises
 * d'un doigt qui glisse est déjà assez long. La liste vit dans le navigateur,
 * donc elle lui est propre et ne voyage pas.
 */
export default function GalerieView({
  titre,
  sousTitre,
  dossier,
  images,
  accent,
}: {
  titre: string;
  sousTitre: string;
  /** Le sous-dossier sous /galerie/ — sert aussi de clé de stockage. */
  dossier: string;
  images: string[];
  accent: string;
}) {
  const cle = `forged-galerie-masquees-${dossier}`;

  const [masquees, setMasquees] = useState<string[]>([]);
  const [ordre, setOrdre] = useState<string[]>([]);
  const [i, setI] = useState(0);
  const [charge, setCharge] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Le mélange de Fisher-Yates, sur une copie.
  const melanger = useCallback((liste: string[]) => {
    const a = [...liste];
    for (let k = a.length - 1; k > 0; k--) {
      const j = Math.floor(Math.random() * (k + 1));
      [a[k], a[j]] = [a[j], a[k]];
    }
    return a;
  }, []);

  // Au montage seulement : c'est ici que le hasard entre, une fois le rendu
  // serveur déjà accepté par React.
  useEffect(() => {
    let cachees: string[] = [];
    try {
      cachees = JSON.parse(localStorage.getItem(cle) ?? "[]");
    } catch {
      /* stockage indisponible : on affiche tout, ce n'est pas une erreur */
    }
    setMasquees(cachees);
    setOrdre(melanger(images.filter((n) => !cachees.includes(n))));
    setI(0);
  }, [cle, images, melanger]);

  const toast = useCallback((t: string) => {
    setMessage(t);
    if (minuteur.current) clearTimeout(minuteur.current);
    minuteur.current = setTimeout(() => setMessage(null), 2200);
  }, []);

  const suivant = useCallback(() => {
    if (ordre.length === 0) return;
    setCharge(false);
    setI((n) => (n + 1) % ordre.length);
  }, [ordre.length]);

  const precedent = useCallback(() => {
    if (ordre.length === 0) return;
    setCharge(false);
    setI((n) => (n - 1 + ordre.length) % ordre.length);
  }, [ordre.length]);

  const rebattre = useCallback(() => {
    setCharge(false);
    setOrdre((o) => melanger(o));
    setI(0);
    toast("Nouvel ordre");
  }, [melanger, toast]);

  const masquer = useCallback(() => {
    const nom = ordre[i];
    if (!nom) return;
    const suite = [...masquees, nom];
    setMasquees(suite);
    try {
      localStorage.setItem(cle, JSON.stringify(suite));
    } catch {
      /* rien à faire : l'image reste masquée pour cette session */
    }
    setOrdre((o) => {
      const reste = o.filter((n) => n !== nom);
      setI((n) => (reste.length ? n % reste.length : 0));
      return reste;
    });
    setCharge(false);
    toast("Masquée");
  }, [cle, i, masquees, ordre, toast]);

  const toutRemontrer = useCallback(() => {
    setMasquees([]);
    try {
      localStorage.removeItem(cle);
    } catch {
      /* idem */
    }
    setOrdre(melanger(images));
    setI(0);
    setCharge(false);
    toast("Tout est revenu");
  }, [cle, images, melanger, toast]);

  // Le clavier, comme dans sa visionneuse : flèches, espace, S pour rebattre.
  useEffect(() => {
    function touche(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        suivant();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        precedent();
      } else if (e.key.toLowerCase() === "s") {
        rebattre();
      } else if (e.key.toLowerCase() === "h" || e.key === "Delete") {
        masquer();
      }
    }
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [suivant, precedent, rebattre, masquer]);

  // Le glissé du pouce : c'est ainsi qu'il les regardera sur son téléphone.
  const depart = useRef<number | null>(null);
  function toucheDebut(e: React.TouchEvent) {
    depart.current = e.touches[0]?.clientX ?? null;
  }
  function toucheFin(e: React.TouchEvent) {
    const d = depart.current;
    const f = e.changedTouches[0]?.clientX;
    depart.current = null;
    if (d == null || f == null || Math.abs(f - d) < 55) return;
    if (f < d) suivant();
    else precedent();
  }

  const courante = ordre[i];
  const restantes = useMemo(() => ordre.length, [ordre]);

  return (
    <main
      className="flex min-h-[100dvh] flex-col bg-black"
      onTouchStart={toucheDebut}
      onTouchEnd={toucheFin}
    >
      <header className="flex items-baseline justify-between gap-3 px-4 pb-3 pt-5">
        <div className="min-w-0">
          <h1
            className="font-display text-[22px] font-bold uppercase leading-none tracking-tight"
            style={{ color: accent }}
          >
            {titre}
          </h1>
          <p className="mt-1.5 text-[11px] leading-snug text-white/35">
            {sousTitre}
          </p>
        </div>
        <span className="tnum flex-shrink-0 text-[12px] font-bold text-white/45">
          {restantes ? i + 1 : 0} / {restantes}
        </span>
      </header>

      {/* L'image. Le fond garde sa place pendant le chargement, sinon la page
          sauterait à chaque passage et le geste deviendrait imprécis. */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2">
        {courante ? (
          <img
            key={courante}
            src={`/galerie/${dossier}/${courante}`}
            alt=""
            onLoad={() => setCharge(true)}
            className="max-h-[72dvh] w-auto max-w-full rounded-xl object-contain transition-opacity duration-200"
            style={{ opacity: charge ? 1 : 0 }}
          />
        ) : (
          <div className="px-8 text-center">
            <p className="text-[14px] leading-relaxed text-white/50">
              Tout est masqué.
            </p>
            <button
              type="button"
              onClick={toutRemontrer}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2.5 text-[13px] font-semibold text-white/80"
            >
              <Undo2 size={15} /> Tout remontrer
            </button>
          </div>
        )}

        {message && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-semibold text-white/80 backdrop-blur">
            {message}
          </div>
        )}
      </div>

      {/* Les commandes, en bas : c'est là que se trouve le pouce. */}
      <div
        className="mx-auto flex w-full max-w-lg items-center justify-between gap-2 px-4 pb-5 pt-4"
        style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
      >
        <button
          type="button"
          onClick={precedent}
          aria-label="Précédente"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/70 transition active:scale-95"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={masquer}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 text-[13px] font-semibold text-white/60 transition active:scale-[0.98]"
        >
          <EyeOff size={16} /> Masquer
        </button>

        <button
          type="button"
          onClick={rebattre}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-[13px] font-bold uppercase tracking-wide text-black transition active:scale-[0.98]"
          style={{ background: accent }}
        >
          <Shuffle size={16} /> Au hasard
        </button>

        <button
          type="button"
          onClick={suivant}
          aria-label="Suivante"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/70 transition active:scale-95"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <p className="pb-4 text-center text-[10px] text-white/25">
        Flèches ou glisse pour avancer · S pour rebattre · H pour masquer
        {masquees.length > 0 && (
          <>
            {" · "}
            <button
              type="button"
              onClick={toutRemontrer}
              className="underline underline-offset-2"
            >
              {masquees.length} masquée{masquees.length > 1 ? "s" : ""}
            </button>
          </>
        )}
      </p>
    </main>
  );
}
