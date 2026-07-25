// Generates the FORGED app icons as real PNGs — no dependencies, no rasterizer.
// The mark is a geometric "F" (three bars) in the covenant's gold on the app's
// navy: structural, forged, no fuss. Run: node scripts/make-icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";

const NAVY = [15, 23, 42]; // #0f172a
const NAVY_LIGHT = [30, 41, 59]; // #1e293b
const GOLD = [245, 158, 11]; // #f59e0b

// ——— PNG encoding ———
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td), 0);
  return Buffer.concat([len, td, crc]);
}

function encodePNG(width, height, rgba) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // 10..12 = compression, filter, interlace = 0

  // Scanlines, each prefixed with filter byte 0.
  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }

  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ——— The mark ———
function drawIcon(size) {
  const px = Buffer.alloc(size * size * 4);
  const set = (x, y, [r, g, b]) => {
    const i = (y * size + x) * 4;
    px[i] = r;
    px[i + 1] = g;
    px[i + 2] = b;
    px[i + 3] = 255;
  };

  // Diagonal navy gradient background.
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const t = (x + y) / (2 * size);
      set(x, y, [
        Math.round(NAVY[0] + (NAVY_LIGHT[0] - NAVY[0]) * t),
        Math.round(NAVY[1] + (NAVY_LIGHT[1] - NAVY[1]) * t),
        Math.round(NAVY[2] + (NAVY_LIGHT[2] - NAVY[2]) * t),
      ]);
    }
  }

  // Gold "F" — proportions defined on a 512 grid, scaled to `size`.
  const s = size / 512;
  const rect = (x0, y0, x1, y1) => {
    for (let y = Math.round(y0 * s); y < Math.round(y1 * s); y++)
      for (let x = Math.round(x0 * s); x < Math.round(x1 * s); x++)
        if (x >= 0 && y >= 0 && x < size && y < size) set(x, y, GOLD);
  };
  rect(176, 128, 240, 384); // stem
  rect(176, 128, 356, 190); // top bar
  rect(176, 224, 322, 284); // middle bar

  return encodePNG(size, size, px);
}

mkdirSync("public", { recursive: true });
for (const [name, size] of [
  ["icon-512.png", 512],
  ["icon-192.png", 192],
  ["apple-icon.png", 180],
  ["favicon-32.png", 32],
]) {
  writeFileSync(`public/${name}`, drawIcon(size));
  console.log("wrote public/" + name, size + "x" + size);
}
