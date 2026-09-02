/**
 * 生成した写真をサイトへ取り込む。
 *
 *   images-src/hero.png → src/assets/images/hero.webp
 *   node scripts/import-images.mjs [id ...]
 *
 * - ファイル名（拡張子を除く）を画像 ID として扱う
 * - 定義済みのアスペクト比に中央基準でトリミングし、推奨サイズへ縮小
 * - WebP へ変換し、仮画像の管理リストから外す（以後は上書きされない）
 */
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { IMAGES } from '../src/data/images.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const inputDir = path.join(root, 'images-src');
const outDir = path.join(root, 'src/assets/images');
const manifestPath = path.join(outDir, '.placeholders.json');
const only = process.argv.slice(2).filter((argument) => !argument.startsWith('--'));
const SUPPORTED = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.tif', '.tiff']);

async function main() {
  await mkdir(outDir, { recursive: true });

  let files;
  try {
    files = await readdir(inputDir);
  } catch {
    console.log(`images-src/ が見つかりません。生成した画像を ${path.relative(root, inputDir)}/ に置いてから実行してください。`);
    console.log('例) images-src/hero.png → src/assets/images/hero.webp');
    return;
  }

  const manifest = await readManifest();
  const generated = new Set(manifest.generated ?? []);
  let imported = 0;

  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    if (!SUPPORTED.has(extension)) continue;

    const id = path.basename(file, extension);
    if (only.length > 0 && !only.includes(id)) continue;

    const asset = IMAGES.find((image) => image.id === id);
    if (!asset) {
      console.warn(`skip: ${file} — 未定義の画像 ID です（src/data/images.ts を確認してください）`);
      continue;
    }

    const [rw, rh] = asset.ratio;
    const width = asset.width;
    const height = Math.round((width * rh) / rw);
    const source = path.join(inputDir, file);
    const meta = await sharp(source).metadata();

    if (meta.width && meta.width < width * 0.75) {
      console.warn(
        `warn: ${file} は ${meta.width}px です。推奨は長辺 ${width}px 以上（拡大されるため画質が落ちます）`,
      );
    }

    await sharp(source)
      .resize(width, height, { fit: 'cover', position: 'attention' })
      .webp({ quality: 82, effort: 6 })
      .toFile(path.join(outDir, `${id}.webp`));

    generated.delete(id);
    imported += 1;
    console.log(`imported: ${file} → src/assets/images/${id}.webp  ${width}×${height}`);
  }

  await writeFile(manifestPath, `${JSON.stringify({ generated: [...generated].sort() }, null, 2)}\n`);
  console.log(
    imported === 0
      ? '取り込む画像がありませんでした。'
      : `\n${imported} 枚を取り込みました。残りの仮画像: ${generated.size} 枚。npm run build で再最適化されます。`,
  );
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch {
    return { generated: [] };
  }
}

await main();
