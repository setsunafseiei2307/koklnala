# IMAGE LIST — EMBER & MOSS

> 必要な画像の一覧です。詳細な仕様は docs/image-production.md、コピーして使えるプロンプトは docs/chatgpt-image-prompts.md にあります。
>
> このファイルは `node scripts/build-image-docs.mjs` で自動生成されます。編集する場合は `src/data/image-briefs.ts` を更新してください。

## 一覧（全 20 枚）

| ID | ファイル | 使用ページ | 比率 | 推奨サイズ | 制作フェーズ |
| --- | --- | --- | --- | --- | --- |
| hero | `src/assets/images/hero.webp` | TOP | 16:9 | 2560 × 1440px | PHASE 1 |
| forest-villa-exterior | `src/assets/images/forest-villa-exterior.webp` | TOP / STAY / STAY 詳細 | 3:2 | 1920 × 1280px | PHASE 1 |
| forest-villa-interior | `src/assets/images/forest-villa-interior.webp` | STAY 詳細 | 3:2 | 1920 × 1280px | PHASE 1 |
| stone-villa-exterior | `src/assets/images/stone-villa-exterior.webp` | TOP / STAY / STAY 詳細 | 3:2 | 1920 × 1280px | PHASE 1 |
| stone-villa-interior | `src/assets/images/stone-villa-interior.webp` | STAY 詳細 | 3:2 | 1920 × 1280px | PHASE 2 |
| mist-villa-exterior | `src/assets/images/mist-villa-exterior.webp` | TOP / STAY / STAY 詳細 | 3:2 | 1920 × 1280px | PHASE 1 |
| mist-villa-interior | `src/assets/images/mist-villa-interior.webp` | STAY 詳細 | 3:2 | 1920 × 1280px | PHASE 2 |
| sauna-interior | `src/assets/images/sauna-interior.webp` | TOP / SAUNA | 3:2 | 1920 × 1280px | PHASE 1 |
| sauna-stove | `src/assets/images/sauna-stove.webp` | SAUNA / GALLERY | 2:3 | 1400 × 2100px | PHASE 2 |
| cold-bath | `src/assets/images/cold-bath.webp` | SAUNA / GALLERY | 3:2 | 1920 × 1280px | PHASE 2 |
| outdoor-rest | `src/assets/images/outdoor-rest.webp` | SAUNA / GALLERY | 2:3 | 1400 × 2100px | PHASE 2 |
| dinner | `src/assets/images/dinner.webp` | TOP / EXPERIENCE | 3:2 | 1920 × 1280px | PHASE 2 |
| breakfast | `src/assets/images/breakfast.webp` | EXPERIENCE | 3:2 | 1920 × 1280px | PHASE 2 |
| bonfire | `src/assets/images/bonfire.webp` | TOP / EXPERIENCE | 3:2 | 1920 × 1280px | PHASE 2 |
| forest-morning | `src/assets/images/forest-morning.webp` | EXPERIENCE / ACCESS / GALLERY | 2:3 | 1400 × 2100px | PHASE 3 |
| architecture-detail | `src/assets/images/architecture-detail.webp` | TOP / GALLERY | 1:1 | 1400 × 1400px | PHASE 3 |
| tea-detail | `src/assets/images/tea-detail.webp` | GALLERY / STAY | 1:1 | 1400 × 1400px | PHASE 3 |
| bath | `src/assets/images/bath.webp` | STAY / GALLERY | 3:2 | 1920 × 1280px | PHASE 2 |
| night-exterior | `src/assets/images/night-exterior.webp` | FINAL CTA / GALLERY | 3:2 | 1920 × 1280px | PHASE 2 |
| og-image | `src/assets/images/og-image.webp` | OGP | 1200:630 | 1200 × 630px | PHASE 3 |

## 差し替え手順

```bash
# 1. 生成した画像を images-src/ に置く（拡張子は png / jpg / webp のいずれか）
#    例: images-src/hero.png
npm run images:import     # 比率調整 + WebP 変換 → src/assets/images/hero.webp
npm run assets:brand      # OGP 画像を作り直す（og-image を差し替えたとき）
npm run build             # AVIF / WebP と srcset を再生成
```

未生成のファイルは、比率とトーンだけ合わせた仮画像（`npm run images:placeholders` で生成）が入っています。実写を配置したファイルは `src/assets/images/.placeholders.json` の管理対象から外れ、上書きされません。
