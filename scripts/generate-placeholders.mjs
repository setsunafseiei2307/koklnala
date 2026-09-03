/**
 * 仮画像（プレースホルダ）生成。
 *
 * AI 生成写真が入るまでのあいだ、正しい比率・トーンで全ページを検証できるように
 * ブランドカラーから手続き的に画像を生成する。実写を配置したファイルは
 * src/assets/images/.placeholders.json で管理し、絶対に上書きしない。
 *
 *   node scripts/generate-placeholders.mjs [--force]
 */
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { IMAGES } from '../src/data/images.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src/assets/images');
const manifestPath = path.join(outDir, '.placeholders.json');
const force = process.argv.includes('--force');

/** トーンごとの配色。実写に置き換わるまでの暫定表現 */
const TONES = {
  'blue-hour': { sky: [24, 38, 46], ground: [8, 13, 14], glow: [206, 132, 63], glowAt: [0.66, 0.6], glowPower: 1, trees: 0.55 },
  forest: { sky: [30, 45, 34], ground: [10, 17, 13], glow: [120, 138, 112], glowAt: [0.4, 0.28], glowPower: 0.45, trees: 0.85 },
  mist: { sky: [186, 190, 182], ground: [122, 132, 124], glow: [235, 235, 228], glowAt: [0.5, 0.34], glowPower: 0.7, trees: 0.5 },
  stone: { sky: [66, 65, 60], ground: [24, 24, 22], glow: [176, 161, 140], glowAt: [0.3, 0.3], glowPower: 0.5, trees: 0.15 },
  interior: { sky: [46, 36, 26], ground: [16, 12, 9], glow: [214, 156, 94], glowAt: [0.34, 0.46], glowPower: 0.95, trees: 0.1 },
  ember: { sky: [30, 20, 13], ground: [8, 6, 5], glow: [214, 112, 42], glowAt: [0.5, 0.64], glowPower: 1.15, trees: 0.3 },
  sauna: { sky: [48, 32, 19], ground: [18, 11, 6], glow: [206, 142, 74], glowAt: [0.72, 0.42], glowPower: 0.9, trees: 0.08 },
  water: { sky: [38, 52, 53], ground: [11, 18, 20], glow: [168, 188, 182], glowAt: [0.42, 0.3], glowPower: 0.55, trees: 0.35 },
  food: { sky: [42, 34, 26], ground: [14, 11, 8], glow: [212, 176, 126], glowAt: [0.5, 0.32], glowPower: 0.7, trees: 0 },
  night: { sky: [16, 22, 19], ground: [5, 7, 7], glow: [226, 152, 76], glowAt: [0.56, 0.56], glowPower: 0.85, trees: 0.6 },
};

const MAX_WIDTH = 1800;

function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashId(id) {
  let hash = 2166136261;
  for (let i = 0; i < id.length; i += 1) {
    hash ^= id.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

const smoothstep = (t) => t * t * (3 - 2 * t);
const clamp01 = (value) => Math.min(1, Math.max(0, value));

function render(asset) {
  const tone = TONES[asset.tone];
  const [rw, rh] = asset.ratio;
  const width = Math.min(asset.width, MAX_WIDTH);
  const height = Math.round((width * rh) / rw);
  const random = mulberry32(hashId(asset.id));

  // 木立のシルエット（森・夜のトーンのみ）
  const trunks = [];
  const trunkCount = Math.round(tone.trees * 26);
  for (let i = 0; i < trunkCount; i += 1) {
    trunks.push({
      x: random(),
      w: 0.004 + random() * 0.02,
      depth: 0.25 + random() * 0.75,
      top: random() * 0.25,
      lean: (random() - 0.5) * 0.03,
    });
  }

  // 霧の帯
  const bands = Array.from({ length: 5 }, () => ({
    y: random(),
    h: 0.06 + random() * 0.22,
    strength: 0.06 + random() * 0.16,
  }));

  const data = Buffer.allocUnsafe(width * height * 3);

  for (let y = 0; y < height; y += 1) {
    const v = y / (height - 1);
    const gradient = smoothstep(clamp01(v * 1.05));
    for (let x = 0; x < width; x += 1) {
      const u = x / (width - 1);

      // 1. 縦グラデーション
      let r = tone.sky[0] + (tone.ground[0] - tone.sky[0]) * gradient;
      let g = tone.sky[1] + (tone.ground[1] - tone.sky[1]) * gradient;
      let b = tone.sky[2] + (tone.ground[2] - tone.sky[2]) * gradient;

      // 2. 木立（奥ほど暗く、輪郭をぼかす）
      for (const trunk of trunks) {
        const cx = trunk.x + trunk.lean * v;
        const d = Math.abs(u - cx);
        if (d < trunk.w * 2.4 && v > trunk.top) {
          const edge = 1 - smoothstep(clamp01((d - trunk.w) / (trunk.w * 1.4)));
          // 上端は空へ溶け、下へ行くほど濃くなる
          const fade = smoothstep(clamp01((v - trunk.top) / 0.22));
          const shade = edge * trunk.depth * fade * 0.6;
          r *= 1 - shade;
          g *= 1 - shade * 0.94;
          b *= 1 - shade * 0.9;
        }
      }

      // 3. 光源（窓明かり・火・朝の光）
      const dx = (u - tone.glowAt[0]) * 1.35;
      const dy = v - tone.glowAt[1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      const glow = Math.exp(-(dist * dist) / 0.055) * tone.glowPower;
      r += tone.glow[0] * glow * 0.55;
      g += tone.glow[1] * glow * 0.5;
      b += tone.glow[2] * glow * 0.42;

      // 4. 霧の帯
      for (const band of bands) {
        const d = Math.abs(v - band.y);
        if (d < band.h) {
          const f = (1 - d / band.h) * band.strength * (0.6 + 0.4 * Math.sin(u * 7.3 + band.y * 12));
          r += (tone.glow[0] * 0.5 - r) * f * 0.5;
          g += (tone.glow[1] * 0.5 - g) * f * 0.5;
          b += (tone.glow[2] * 0.5 - b) * f * 0.5;
        }
      }

      // 5. ヴィネット
      const vignette =
        1 - 0.42 * smoothstep(clamp01((Math.hypot((u - 0.5) * 1.15, (v - 0.5) * 1.05) - 0.28) / 0.5));
      r *= vignette;
      g *= vignette;
      b *= vignette;

      // 6. 粒子
      const grain = (random() - 0.5) * 9;
      const index = (y * width + x) * 3;
      data[index] = clampByte(r + grain);
      data[index + 1] = clampByte(g + grain);
      data[index + 2] = clampByte(b + grain);
    }
  }

  return { data, width, height };
}

function clampByte(value) {
  return value < 0 ? 0 : value > 255 ? 255 : Math.round(value);
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function readManifest() {
  try {
    return JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch {
    return { generated: [] };
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const manifest = await readManifest();
  const generated = new Set(manifest.generated ?? []);
  let created = 0;
  let skipped = 0;

  for (const asset of IMAGES) {
    const file = path.join(outDir, `${asset.id}.webp`);
    const isReal = (await exists(file)) && !generated.has(asset.id);
    if (isReal && !force) {
      skipped += 1;
      console.log(`skip (real photo) : ${asset.id}.webp`);
      continue;
    }

    const { data, width, height } = render(asset);
    await sharp(data, { raw: { width, height, channels: 3 } })
      .blur(0.6)
      .webp({ quality: 78, effort: 5 })
      .toFile(file);
    generated.add(asset.id);
    created += 1;
    console.log(`placeholder      : ${asset.id}.webp  ${width}×${height}`);
  }

  await writeFile(manifestPath, `${JSON.stringify({ generated: [...generated].sort() }, null, 2)}\n`);
  console.log(`\n${created} placeholders written, ${skipped} real photos kept.`);
}

await main();
