/**
 * ブランドアセット生成（favicon / apple-touch-icon / OGP 画像 / webmanifest）。
 *
 *   node scripts/generate-brand-assets.mjs
 *
 * OGP 画像は src/assets/images/og-image.webp を下地にする。写真を差し替えたら
 * 再実行すると public/og-image.jpg が更新される。
 */
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const OBSIDIAN = '#0C0E0D';
const EMBER = '#B87643';
const IVORY = '#F1EDE5';

const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="EMBER and MOSS">
  <rect width="64" height="64" fill="${OBSIDIAN}"/>
  <circle cx="32" cy="34" r="17" fill="none" stroke="${EMBER}" stroke-opacity="0.32" stroke-width="2"/>
  <circle cx="32" cy="34" r="8" fill="${EMBER}"/>
  <path d="M32 6v10" stroke="${IVORY}" stroke-opacity="0.55" stroke-width="2" stroke-linecap="square"/>
</svg>`;

async function main() {
  await mkdir(publicDir, { recursive: true });

  // --- favicon.svg ---
  await writeFile(path.join(publicDir, 'favicon.svg'), `${faviconSvg}\n`);

  // --- favicon.ico (16 / 32) + apple-touch-icon ---
  const png = async (size) =>
    sharp(Buffer.from(faviconSvg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

  await writeFile(path.join(publicDir, 'favicon.ico'), buildIco([await png(16), await png(32)]));

  const touch = await sharp(Buffer.from(faviconSvg)).resize(180, 180).png().toBuffer();
  await writeFile(path.join(publicDir, 'apple-touch-icon.png'), touch);

  // --- OG image ---
  const width = 1200;
  const height = 630;
  const base = await sharp(path.join(root, 'src/assets/images/og-image.webp'))
    .resize(width, height, { fit: 'cover' })
    .modulate({ brightness: 0.82 })
    .toBuffer();

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0C0E0D" stop-opacity="0.55"/>
        <stop offset="55%" stop-color="#0C0E0D" stop-opacity="0.72"/>
        <stop offset="100%" stop-color="#0C0E0D" stop-opacity="0.92"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#scrim)"/>
    <circle cx="96" cy="92" r="9" fill="${EMBER}"/>
    <text x="122" y="99" font-family="Jost" font-size="26" letter-spacing="7" fill="${IVORY}" fill-opacity="0.92">EMBER &amp; MOSS</text>
    <text x="96" y="336" font-family="Shippori Mincho" font-size="86" letter-spacing="8" fill="${IVORY}">熱と静寂に泊まる。</text>
    <text x="96" y="418" font-family="Jost" font-size="23" letter-spacing="10" fill="${IVORY}" fill-opacity="0.62">PRIVATE VILLA / SAUNA / HAKONE</text>
    <rect x="96" y="486" width="64" height="1" fill="${EMBER}"/>
    <text x="96" y="546" font-family="Jost" font-size="19" letter-spacing="5" fill="${EMBER}">CONCEPT PROJECT</text>
    <text x="96" y="580" font-family="Zen Kaku Gothic New" font-size="19" letter-spacing="2" fill="${IVORY}" fill-opacity="0.55">架空の宿泊施設を想定した自主制作です。</text>
  </svg>`;

  await sharp(base)
    .composite([{ input: Buffer.from(overlay) }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(path.join(publicDir, 'og-image.jpg'));

  // --- webmanifest ---
  const manifest = {
    name: 'EMBER & MOSS',
    short_name: 'EMBER & MOSS',
    description: '箱根・仙石原の森に建つプライベートヴィラ（コンセプトプロジェクト）',
    start_url: '/',
    display: 'standalone',
    background_color: OBSIDIAN,
    theme_color: OBSIDIAN,
    lang: 'ja',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
  await writeFile(path.join(publicDir, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

  console.log('favicon.svg / favicon.ico / apple-touch-icon.png / og-image.jpg / site.webmanifest written');
}

/** PNG を格納した ICO コンテナを組み立てる */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  const entries = [];
  let offset = 6 + pngs.length * 16;
  const sizes = [16, 32, 48, 64];

  pngs.forEach((png, index) => {
    const entry = Buffer.alloc(16);
    const size = sizes[index] ?? 32;
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    entries.push(entry);
  });

  return Buffer.concat([header, ...entries, ...pngs]);
}

await main();
