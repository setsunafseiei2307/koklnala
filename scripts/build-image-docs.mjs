/**
 * 画像制作ドキュメントの生成。
 *   node scripts/build-image-docs.mjs
 *
 * src/data/images.ts と src/data/image-briefs.ts を唯一の情報源として
 *   docs/image-production.md      … 画像アセット設計（社内用の詳細仕様）
 *   docs/chatgpt-image-prompts.md … ChatGPT へそのまま貼れるプロンプト集
 *   docs/image-prompts.md         … 一覧表（ファイル名・比率・サイズ・用途）
 * を書き出す。手で md を編集せず、このスクリプトを更新すること。
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { IMAGES } from '../src/data/images.ts';
import { ART_DIRECTION, GLOBAL_NEGATIVE, IMAGE_BRIEFS } from '../src/data/image-briefs.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');

const asset = (id) => IMAGES.find((image) => image.id === id);
const ratioText = (a) => `${a.ratio[0]}:${a.ratio[1]}`;
const sizeText = (a) => `${a.width} × ${Math.round((a.width * a.ratio[1]) / a.ratio[0])}px`;

/** ChatGPT へ貼る完成プロンプト */
function buildPrompt(brief) {
  const a = asset(brief.id);
  return [
    ART_DIRECTION,
    '',
    `SUBJECT\n${brief.subject}`,
    '',
    `ENVIRONMENT\n${brief.environment}`,
    '',
    `COMPOSITION\n${brief.composition}`,
    '',
    `CAMERA\n${brief.camera}`,
    '',
    `LIGHTING\n${brief.lighting}`,
    '',
    `MATERIAL & COLOR\n${brief.material}`,
    '',
    `MOOD\n${brief.mood}`,
    '',
    `OUTPUT\nAspect ratio ${ratioText(a)}. Long edge at least ${a.width}px. Photograph, not illustration.`,
    '',
    `NEGATIVE REQUIREMENTS\n${GLOBAL_NEGATIVE} ${brief.avoid}.`,
  ].join('\n');
}

const header = (title, note) =>
  `# ${title}\n\n> ${note}\n>\n> このファイルは \`node scripts/build-image-docs.mjs\` で自動生成されます。編集する場合は \`src/data/image-briefs.ts\` を更新してください。\n`;

// ---- docs/image-production.md ------------------------------------------
function productionDoc() {
  const parts = [
    header(
      'IMAGE PRODUCTION — EMBER & MOSS',
      'サイト全体を「1 本のブランド撮影」として設計した画像アセット仕様書。ChatGPT の画像生成で制作し、`src/assets/images/<id>.webp` に配置します。',
    ),
    `## 共通アートディレクション\n\n\`\`\`\n${ART_DIRECTION}\n\`\`\`\n`,
    `## 全カット共通の禁止事項\n\n\`\`\`\n${GLOBAL_NEGATIVE}\n\`\`\`\n`,
    `## 制作フェーズ\n\nHERO を最初に確定させ、そのトーンに残りを合わせます。\n`,
  ];

  for (const phase of [1, 2, 3]) {
    const items = IMAGE_BRIEFS.filter((brief) => brief.phase === phase);
    parts.push(
      `- **PHASE ${phase}** … ${items.map((brief) => brief.id).join(', ')}`,
    );
  }

  parts.push('\n---\n');

  for (const [index, brief] of IMAGE_BRIEFS.entries()) {
    const a = asset(brief.id);
    parts.push(`## ${String(index + 1).padStart(2, '0')}. ${brief.id}.webp

| 項目 | 内容 |
| --- | --- |
| ID | \`${brief.id}\` |
| ファイル | \`src/assets/images/${brief.id}.webp\` |
| 使用ページ | ${brief.page} |
| 使用セクション | ${brief.section} |
| 役割 | ${brief.role} |
| アスペクト比 | ${ratioText(a)} |
| 推奨生成サイズ | ${sizeText(a)} |
| 重要度 | PHASE ${brief.phase}（priority ${a.priority}） |
| PC トリミング | ${brief.cropPc} |
| スマホ トリミング | ${brief.cropSp} |
| alt（既定） | ${a.alt} |

**被写体**：${brief.subject}

**環境**：${brief.environment}

**構図**：${brief.composition}

**カメラ**：${brief.camera}

**光**：${brief.lighting}

**素材・色**：${brief.material}

**空気感**：${brief.mood}

**このカットで特に避けること**：${brief.avoid}

**生成後のチェック**：
${brief.checks.map((check) => `- ${check}`).join('\n')}
`);
  }

  parts.push(`---

## 採点基準（1 枚 100 点）

| 観点 | 配点 | 見るところ |
| --- | ---: | --- |
| Photorealism | 25 | 実写に見えるか。CG / 3D 感がないか |
| Composition | 20 | Web で使える構図か。文字を置く余白があるか |
| Brand Fit | 20 | 他カットと色・素材・照明が揃っているか |
| Web Usability | 15 | PC / スマホ両方でトリミングできるか |
| Technical Integrity | 10 | 建築・家具・器の破綻がないか |
| Luxury Impression | 10 | 20〜30 万円規模の案件で使える品位か |

- **85 点以上** … PASS（そのまま採用）
- **70 – 84 点** … FIX（用途変更、またはトリミングで対応）
- **69 点以下** … REGENERATE（原因を特定してプロンプトを修正）

HERO は 90 点未満なら原則として再生成します。
`);

  return parts.join('\n');
}

// ---- docs/chatgpt-image-prompts.md --------------------------------------
function promptDoc() {
  const parts = [
    header(
      'CHATGPT IMAGE PROMPTS — EMBER & MOSS',
      'ChatGPT の画像生成へそのままコピーして使えるプロンプト集です。PHASE 1 → 2 → 3 の順に進め、HERO を基準にトーンを揃えてください。',
    ),
    `## 使い方

1. PHASE 1 の \`hero\` から生成します。納得のいく 1 枚が出るまで、ここは繰り返してください。
2. 採用した HERO を次の生成に添付し、「この写真と同じ色・光・空気感で」と添えると全体が揃います。
3. 生成した画像は \`images-src/<id>.png\`（または .jpg）として保存し、\`npm run images:import\` を実行すると、比率調整と WebP 変換が行われ \`src/assets/images/<id>.webp\` に入ります。
4. 差し替え後に \`npm run build\` を実行すれば、AVIF / WebP と srcset が再生成されます。
`,
  ];

  for (const phase of [1, 2, 3]) {
    parts.push(`\n---\n\n# PHASE ${phase}\n`);
    for (const brief of IMAGE_BRIEFS.filter((item) => item.phase === phase)) {
      const a = asset(brief.id);
      parts.push(`## IMAGE — ${brief.id}

**File**: \`${brief.id}.webp\`
**Usage**: ${brief.page} / ${brief.section}
**Aspect Ratio**: ${ratioText(a)}（${sizeText(a)}）

**Prompt**:

\`\`\`text
${buildPrompt(brief)}
\`\`\`

**Quality Check Points**:

${brief.checks.map((check) => `- ${check}`).join('\n')}
`);
    }
  }

  parts.push(`\n---\n\n## 再生成のコツ

同じプロンプトをもう一度投げても結果は良くなりません。**何が悪かったか**を先に言語化し、その一点だけを強く指定し直してください。

| 失敗 | 修正の指示例 |
| --- | --- |
| 建物が中央すぎてコピーが置けない | Move the building to the right third. Keep the left 40% as dark forest and fog with nothing in it. |
| CG っぽい | Add natural imperfection: dust on the glass, uneven wood grain, slight lens vignetting. Photograph, not render. |
| 色が派手 | Desaturate. Limit the palette to green-black, slate blue and one warm amber accent. No orange-and-teal grading. |
| 窓や柱が歪む | Keep all verticals perfectly straight. Architectural photography with a tilt-shift lens, no perspective distortion. |
| 料理が崩れる | Simplify the plate: one protein, one vegetable, one sauce. Leave 40% of the plate empty. |
| 湯気・炎が不自然 | Make the steam thin and translucent. Small controlled fire, no sparks, no glow spilling over the whole scene. |
`);

  return parts.join('\n');
}

// ---- docs/image-prompts.md ----------------------------------------------
function indexDoc() {
  const rows = IMAGE_BRIEFS.map((brief) => {
    const a = asset(brief.id);
    return `| ${brief.id} | \`src/assets/images/${brief.id}.webp\` | ${brief.page} | ${ratioText(a)} | ${sizeText(a)} | PHASE ${brief.phase} |`;
  });

  return `${header(
    'IMAGE LIST — EMBER & MOSS',
    '必要な画像の一覧です。詳細な仕様は docs/image-production.md、コピーして使えるプロンプトは docs/chatgpt-image-prompts.md にあります。',
  )}
## 一覧（全 ${IMAGE_BRIEFS.length} 枚）

| ID | ファイル | 使用ページ | 比率 | 推奨サイズ | 制作フェーズ |
| --- | --- | --- | --- | --- | --- |
${rows.join('\n')}

## 差し替え手順

\`\`\`bash
# 1. 生成した画像を images-src/ に置く（拡張子は png / jpg / webp のいずれか）
#    例: images-src/hero.png
npm run images:import     # 比率調整 + WebP 変換 → src/assets/images/hero.webp
npm run assets:brand      # OGP 画像を作り直す（og-image を差し替えたとき）
npm run build             # AVIF / WebP と srcset を再生成
\`\`\`

未生成のファイルは、比率とトーンだけ合わせた仮画像（\`npm run images:placeholders\` で生成）が入っています。実写を配置したファイルは \`src/assets/images/.placeholders.json\` の管理対象から外れ、上書きされません。
`;
}

await mkdir(docs, { recursive: true });
await writeFile(path.join(docs, 'image-production.md'), productionDoc());
await writeFile(path.join(docs, 'chatgpt-image-prompts.md'), promptDoc());
await writeFile(path.join(docs, 'image-prompts.md'), indexDoc());
console.log('docs/image-production.md, docs/chatgpt-image-prompts.md, docs/image-prompts.md written');
