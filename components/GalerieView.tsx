"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, Trash2, Undo2 } from "lucide-react";

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
 * SUPPRIMER, comme dans sa visionneuse Python — avec une différence qu'il faut
 * dire : sur Vercel le disque est en lecture seule, donc le fichier reste. Ce
 * qui est supprimé, c'est le fait de la revoir. La liste vit dans le
 * navigateur : elle est propre à cet appareil, et elle survit à la fermeture.
 * Le bouton « tout remontrer » existe parce qu'une suppression irréversible
 * faite d'un doigt qui glisse lui a déjà coûté un compteur.
 *
 * LA CITATION accompagne chaque image et change avec elle. Une image seule se
 * regarde trois secondes ; une image avec une ligne à lire retient le temps de
 * la lecture. C'est le même dispositif que la phrase du jour, appliqué ici.
 */
export default function GalerieView({
  titre,
  sousTitre,
  dossier,
  images,
  accent,
  citations,
}: {
  titre: string;
  sousTitre: string;
  /** Le sous-dossier sous /galerie/ — sert aussi de clé de stockage. */
  dossier: string;
  images: string[];
  accent: string;
  /**
   * Une reserve de citations tiree cote serveur.
   *
   * Le corpus complet fait deux mille entrees : l embarquer dans le paquet
   * client alourdirait la page de centaines de kilo-octets pour une seule
   * ligne affichee a la fois. Le serveur en tire quelques centaines, le client
   * s en sert. Il ne verra jamais la difference.
   */
  citations: string[];
}) {
  const cle = `forged-galerie-masquees-${dossier}`;

  const [masquees, setMasquees] = useState<string[]>([]);
  const [ordre, setOrdre] = useState<string[]>([]);
  const [i, setI] = useState(0);
  const [charge, setCharge] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  // La confirmation ne concerne QUE le bouton de l ecran.
  //
  // Il a deja perdu un compteur parce que sa main avait touche un bouton par
  // erreur ; ici le bouton se trouve sous le pouce, juste a cote de « suivant »,
  // donc le meme accident se reproduirait. La touche Suppr du clavier, elle,
  // ne se presse pas par megarde : elle part sans rien demander.
  const [aConfirmer, setAConfirmer] = useState(false);
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
    setAConfirmer(false);
    setCharge(false);
    setI((n) => (n + 1) % ordre.length);
  }, [ordre.length]);

  const precedent = useCallback(() => {
    if (ordre.length === 0) return;
    setAConfirmer(false);
    setCharge(false);
    setI((n) => (n - 1 + ordre.length) % ordre.length);
  }, [ordre.length]);

  const rebattre = useCallback(() => {
    setCharge(false);
    setOrdre((o) => melanger(o));
    setI(0);
    toast("Nouvel ordre");
  }, [melanger, toast]);

  const supprimer = useCallback(() => {
    const nom = ordre[i];
    if (!nom) return;
    setAConfirmer(false);
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
    toast("Supprimée");
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
      } else if (e.key === "Delete" || e.key.toLowerCase() === "h") {
        // Directement, sans confirmation : le clavier est un geste voulu.
        supprimer();
      } else if (e.key === "Escape") {
        setAConfirmer(false);
      }
    }
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [suivant, precedent, rebattre, supprimer]);

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

  // Une citation par image, et elle suit l'image plutôt que le compteur : deux
  // passages sur la même image donnent la même phrase, ce qui finit par les
  // associer l'une à l'autre.
  const citation = useMemo(() => {
    if (!courante || citations.length === 0) return null;
    let h = 0;
    for (let k = 0; k < courante.length; k++)
      h = (h * 31 + courante.charCodeAt(k)) >>> 0;
    return citations[h % citations.length];
  }, [courante, citations]);

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
              Tout est supprimé.
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

      {/* La citation de cette image-là. */}
      {citation && (
        <p className="mx-auto mt-3 max-w-2xl px-6 text-center text-[13px] font-medium leading-relaxed text-white/60">
          « {citation} »
        </p>
      )}

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

        {aConfirmer ? (
          <div className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => setAConfirmer(false)}
              className="flex h-12 flex-1 items-center justify-center rounded-xl border border-white/25 text-[13px] font-semibold text-white/80 transition active:scale-[0.98]"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={supprimer}
              className="flex h-12 flex-shrink-0 items-center justify-center gap-1.5 rounded-xl px-4 text-[12px] font-bold uppercase tracking-wide text-white transition active:scale-[0.98]"
              style={{ background: "var(--red)" }}
            >
              <Trash2 size={15} /> Supprimer
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAConfirmer(true)}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 text-[13px] font-semibold text-white/60 transition active:scale-[0.98]"
          >
            <Trash2 size={16} /> Supprimer
          </button>
        )}

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
        Flèches ou glisse pour avancer · S pour rebattre · Suppr pour supprimer
        sans confirmation
        {masquees.length > 0 && (
          <>
            {" · "}
            <button
              type="button"
              onClick={toutRemontrer}
              className="underline underline-offset-2"
            >
              {masquees.length} supprimée{masquees.length > 1 ? "s" : ""} —
              tout remontrer
            </button>
          </>
        )}
      </p>
    </main>
  );
}
