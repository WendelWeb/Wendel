// LA ROTATION — pour que rien ne se répète d'une visite à l'autre.
//
// Un texte qu'on relit à l'identique dix fois par jour cesse d'être lu au bout
// d'une semaine : l'œil le reconnaît et saute. C'est ce qui tue les mantras. La
// parade est simple : la structure ne bouge pas, le contenu tourne.
//
// Deux contraintes techniques dictent la forme de ce module.
//
//   1. Les pages sont en `force-dynamic`, donc le serveur re-rend à chaque
//      visite : `visitSeed()` y donne bien du neuf à chaque fois.
//   2. Un composant client ne doit JAMAIS tirer au sort lui-même. Le serveur
//      rendrait un ordre, le client en calculerait un autre, et React hurlerait
//      au décalage d'hydratation. Le serveur tire donc la graine, la passe en
//      prop, et le client s'en sert de façon déterministe : les deux tombent
//      exactement sur le même résultat.
//
// Client-safe.

/** Générateur déterministe (mulberry32) : même graine, même suite. */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Une graine neuve à chaque visite. À n'appeler que côté serveur, dans une
 * page dynamique — puis à passer en prop aux composants client.
 */
export function visitSeed(): number {
  return (Math.random() * 0x7fffffff) >>> 0;
}

/** Le tableau mélangé (Fisher-Yates), sans toucher à l'original. */
export function shuffled<T>(arr: readonly T[], seed: number): T[] {
  const r = rng(seed);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** n éléments distincts, tirés au sort. Rend tout si n dépasse la taille. */
export function sampled<T>(arr: readonly T[], seed: number, n: number): T[] {
  if (n >= arr.length) return shuffled(arr, seed);
  return shuffled(arr, seed).slice(0, n);
}

/** Un seul élément. */
export function picked<T>(arr: readonly T[], seed: number): T {
  return arr[Math.floor(rng(seed)() * arr.length) % arr.length];
}

/**
 * Décale une graine, pour tirer plusieurs listes indépendantes à partir d'une
 * seule. Sans ça, deux listes de même longueur sortiraient dans le même ordre.
 */
export function branch(seed: number, key: string): number {
  let h = seed >>> 0;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}
