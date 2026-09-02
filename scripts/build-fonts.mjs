/**
 * 日本語フォントのサブセット生成。
 *
 * 日本語のフルセットは 1 ファイル 1MB を超えるため、サイト内で実際に使用する
 * 文字だけを抽出して woff2 を作り直す。src 配下のテキストを走査し、
 * 予備としてかな・記号・英数の全域を足している。
 *
 *   node scripts/build-fonts.mjs
 *
 * 文言を大きく変更したら再実行して public/fonts/ をコミットすること。
 */
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import subsetFont from 'subset-font';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public/fonts');

const SOURCES = [
  {
    out: 'zen-kaku-gothic-new-400.woff2',
    src: 'node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-400-normal.woff2',
  },
  {
    out: 'zen-kaku-gothic-new-500.woff2',
    src: 'node_modules/@fontsource/zen-kaku-gothic-new/files/zen-kaku-gothic-new-japanese-500-normal.woff2',
  },
  {
    out: 'shippori-mincho-400.woff2',
    src: 'node_modules/@fontsource/shippori-mincho/files/shippori-mincho-japanese-400-normal.woff2',
  },
];

const LATIN_VARIABLE = {
  out: 'jost-latin-variable.woff2',
  src: 'node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2',
};

/** 走査対象の拡張子 */
const EXTENSIONS = new Set(['.astro', '.ts', '.tsx', '.md', '.mdx', '.html', '.css']);

async function collectFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(full);
      return EXTENSIONS.has(path.extname(entry.name)) ? [full] : [];
    }),
  );
  return files.flat();
}

function baselineCharacters() {
  const chars = new Set();
  const ranges = [
    [0x20, 0x7e], // ASCII
    [0xa0, 0xff], // Latin-1 supplement（記号・¥ など）
    [0x2000, 0x206f], // 一般句読点（—, ’, … など）
    [0x3000, 0x303f], // 和文記号（、。「」）
    [0x3041, 0x309f], // ひらがな
    [0x30a0, 0x30ff], // カタカナ
    [0xff01, 0xff60], // 全角英数・記号
    [0xffe0, 0xffe6],
  ];
  for (const [start, end] of ranges) {
    for (let code = start; code <= end; code += 1) chars.add(String.fromCodePoint(code));
  }
  for (const extra of ['℃', '±', '×', '–', '—', '→', '←', '↑', '↓', '¥', '№', '㎡', '・', '〜']) {
    chars.add(extra);
  }
  return chars;
}

async function main() {
  await mkdir(outDir, { recursive: true });

  const files = await collectFiles(path.join(root, 'src'));
  const chars = baselineCharacters();
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    for (const char of text) chars.add(char);
  }
  const text = [...chars].join('');
  console.log(`scanned ${files.length} files → ${chars.size} unique characters`);

  let total = 0;
  for (const font of [...SOURCES]) {
    const buffer = await readFile(path.join(root, font.src));
    const subset = await subsetFont(buffer, text, { targetFormat: 'woff2' });
    const dest = path.join(outDir, font.out);
    await writeFile(dest, subset);
    total += subset.length;
    console.log(
      `${font.out.padEnd(34)} ${kb(buffer.length).padStart(9)} → ${kb(subset.length).padStart(8)}`,
    );
  }

  // 可変フォント（ラテン）はすでに 27KB 程度のためそのまま複製する
  const latin = await readFile(path.join(root, LATIN_VARIABLE.src));
  await writeFile(path.join(outDir, LATIN_VARIABLE.out), latin);
  total += latin.length;
  console.log(`${LATIN_VARIABLE.out.padEnd(34)} ${kb(latin.length).padStart(9)} → (copy)`);
  console.log(`total web font payload: ${kb(total)}`);
}

function kb(bytes) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

await main();
