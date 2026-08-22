// CONVERSION DES IMAGES — dédoublonnage puis compression.
//
// Deux dossiers de son disque, 1775 images, 2,5 Go de PNG bruts. Tels quels
// ils sont inutilisables : ni un dépôt Git ni un téléphone ne les acceptent.
//
// Deux passes, dans cet ordre, et l'ordre compte.
//
// 1. DÉDOUBLONNAGE par empreinte du contenu. Les noms « 001 (1).png »,
//    « 001 (2).png » trahissent des copies successives d'un même
//    téléchargement. On compare le contenu, pas le nom : deux fichiers de noms
//    différents mais d'octets identiques ne sont qu'une image.
//
// 2. COMPRESSION en WebP, 1500 pixels au plus grand côté. Il les regarde sur
//    un téléphone et sur un moniteur, jamais imprimées : au-delà de 1500 px
//    il paie de la bande passante pour des pixels que personne ne voit.
//
// Le nom de sortie est l'empreinte elle-même — huit caractères hexadécimaux.
// C'est stable entre deux exécutions, donc relancer le script ne recrée rien
// et ne casse aucune URL déjà servie.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const SOURCES = [
  { de: "C:/Users/stanl/Documents/The inevitable", vers: "inevitable" },
  { de: "C:/Users/stanl/Documents/AFRICA", vers: "afrique" },
];

const RACINE = path.join(process.cwd(), "public", "galerie");
const LARGEUR = 1500;
const QUALITE = 72;

const mo = (o) => (o / 1048576).toFixed(1) + " Mo";

for (const { de, vers } of SOURCES) {
  const sortie = path.join(RACINE, vers);
  fs.mkdirSync(sortie, { recursive: true });

  const fichiers = fs
    .readdirSync(de)
    .filter((f) => /\.(png|jpe?g|webp|gif)$/i.test(f))
    .map((f) => path.join(de, f));

  const vues = new Set();
  const noms = [];
  let avant = 0;
  let apres = 0;
  let doublons = 0;
  let echecs = 0;

  for (const p of fichiers) {
    let brut;
    try {
      brut = fs.readFileSync(p);
    } catch {
      echecs++;
      continue;
    }
    const empreinte = crypto
      .createHash("sha1")
      .update(brut)
      .digest("hex")
      .slice(0, 8);

    if (vues.has(empreinte)) {
      doublons++;
      continue;
    }
    vues.add(empreinte);
    avant += brut.length;

    const cible = path.join(sortie, `${empreinte}.webp`);
    if (fs.existsSync(cible)) {
      apres += fs.statSync(cible).size;
      noms.push(`${empreinte}.webp`);
      continue;
    }

    try {
      const out = await sharp(brut)
        .rotate()
        .resize({
          width: LARGEUR,
          height: LARGEUR,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: QUALITE })
        .toBuffer();
      fs.writeFileSync(cible, out);
      apres += out.length;
      noms.push(`${empreinte}.webp`);
    } catch {
      echecs++;
    }
  }

  // Le manifeste : la page lit ce fichier plutôt que de balayer le disque, ce
  // qui serait impossible sur Vercel où le système de fichiers est en lecture
  // seule et où rien ne garantit l'ordre.
  fs.writeFileSync(
    path.join(RACINE, `${vers}.json`),
    JSON.stringify(noms.sort()),
  );

  console.log(`${vers}`);
  console.log(`  sources     : ${fichiers.length}`);
  console.log(`  doublons    : ${doublons}`);
  console.log(`  retenues    : ${noms.length}`);
  console.log(`  echecs      : ${echecs}`);
  console.log(`  avant       : ${mo(avant)}`);
  console.log(`  apres       : ${mo(apres)}`);
  console.log(
    `  moyenne     : ${noms.length ? Math.round(apres / noms.length / 1024) : 0} Ko`,
  );
  console.log();
}
