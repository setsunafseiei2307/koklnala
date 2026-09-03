# EMBER & MOSS

箱根・仙石原の森に建つ **架空の**プライベートヴィラ「EMBER & MOSS」のコンセプトサイトです。

![CONCEPT PROJECT](https://img.shields.io/badge/type-concept%20project-B87643?style=flat-square) ![Astro](https://img.shields.io/badge/Astro-7-0C0E0D?style=flat-square) ![TypeScript](https://img.shields.io/badge/TypeScript-strict-16201A?style=flat-square)

> ### CONCEPT PROJECT
> EMBER & MOSS は実在しない宿泊施設です。Web サイトの設計・デザイン・実装力を示すために制作した自主制作であり、掲載している料金・設備・所在地はすべて架空の設定です。予約フォームは UI の実装例として動作しますが、送信・保存は行われません。実績、受賞歴、利用者数などの数値は一切掲載していません。

---

## 概要

| | |
| --- | --- |
| コンセプト | 熱と静寂に泊まる。 |
| 想定エリア | 神奈川県 箱根・仙石原（架空） |
| ページ数 | 11（TOP / STAY 一覧・詳細 3 棟 / SAUNA / EXPERIENCE / ACCESS & FAQ / BOOKING / ABOUT THIS PROJECT / 404） |
| 制作範囲 | ディレクション / 情報設計 / UI・UX デザイン / アートディレクション / コピーライティング / フロントエンド実装 |

設計意図の詳細は [`docs/portfolio-case-study.md`](docs/portfolio-case-study.md) にまとめています。

## 技術スタック

| 領域 | 採用 | 理由 |
| --- | --- | --- |
| フレームワーク | [Astro](https://astro.build/)（静的出力） | 静的 HTML を出力でき、必要な箇所にだけ JS を配れるため |
| 言語 | TypeScript（strict） | 料金計算を型で守るため |
| スタイル | 素の CSS + カスタムプロパティ | デザイントークンを 1 か所に集約。UI フレームワーク由来の見た目を避けるため |
| 画像 | `astro:assets`（AVIF / WebP 自動生成） | srcset・寸法・遅延読み込みを自動化するため |
| フォント | Jost / Zen Kaku Gothic New / しっぽり明朝（自己ホスト・サブセット） | 日本語フォントの転送量を約 1/8 に抑えるため |
| テスト | Vitest（料金ロジック）/ Playwright（予約フロー・表示検証） | 金額とフォームは自動で守る必要があるため |
| ホスティング | Cloudflare Workers（静的アセット配信）| `wrangler.jsonc` の `assets.directory` に `dist/` を指定し、GitHub 連携で自動ビルド・公開 |

UI ライブラリ・アニメーションライブラリは使用していません。ページあたりの JavaScript は gzip 約 13〜16KB（うち約 5KB は Astro のページ遷移機能）です。

## セットアップ

```bash
node -v          # v20 以上（開発は v22 で確認）
npm install
npm run dev      # http://localhost:4321
```

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | 型チェック（`astro check`）＋ 静的ビルド → `dist/` |
| `npm run preview` | ビルド結果をローカルで確認 |
| `npm run check` | TypeScript / Astro の型チェックのみ |
| `npm test` | 料金ロジックのユニットテスト（Vitest） |
| `npm run test:e2e` | 予約フローの通しテスト（要 `npm run preview`） |
| `npm run qa:screenshots` | 全ページ × 3 ビューポートのスクリーンショットと自動検証 |
| `npm run images:placeholders` | 仮画像を生成（実写が入っているファイルは上書きしない） |
| `npm run images:import` | `images-src/` の写真を取り込み、比率調整して WebP 化 |
| `npm run docs:images` | 画像ドキュメント 3 種を再生成 |
| `npm run fonts` | 日本語フォントをサイト内で使う文字だけにサブセット化 |
| `npm run assets:brand` | favicon / apple-touch-icon / OGP 画像 / webmanifest を生成 |

`npm run test:e2e` と `npm run qa:screenshots` は Playwright を使います。環境にインストール済みの Chromium を使う場合は `PLAYWRIGHT_CHROMIUM_PATH` を指定してください。

```bash
npm run preview &
PLAYWRIGHT_CHROMIUM_PATH=/path/to/chrome npm run test:e2e
```

## ディレクトリ構成

```
.
├── docs/
│   ├── portfolio-case-study.md     … ケーススタディ（設計意図・工夫）
│   ├── image-production.md         … 画像アセット設計（自動生成）
│   ├── chatgpt-image-prompts.md    … ChatGPT 用プロンプト集（自動生成）
│   └── image-prompts.md            … 画像一覧（自動生成）
├── images-src/                     … 生成した写真の置き場（ビルド対象外）
├── public/
│   ├── fonts/                      … サブセット済み woff2
│   ├── favicon.svg / favicon.ico / apple-touch-icon.png
│   ├── og-image.jpg / site.webmanifest
├── scripts/
│   ├── build-fonts.mjs             … 日本語フォントのサブセット生成
│   ├── generate-placeholders.mjs   … 仮画像の生成
│   ├── import-images.mjs           … 写真の取り込み（比率調整 + WebP 化）
│   ├── generate-brand-assets.mjs   … favicon / OGP / manifest
│   ├── build-image-docs.mjs        … 画像ドキュメントの生成
│   ├── screenshot.mjs              … 表示検証とスクリーンショット
│   └── e2e-booking.mjs             … 予約フローの通しテスト
├── src/
│   ├── assets/images/              … サイトで使う写真（差し替え対象）
│   ├── components/                 … UI コンポーネント
│   │   └── home/                   … TOP のセクション
│   ├── data/                       … 料金・客室・FAQ などのデータ定義
│   ├── layouts/Base.astro          … 共通レイアウトとメタ情報
│   ├── lib/pricing.ts              … 料金計算ロジック
│   ├── pages/                      … ルーティング
│   ├── scripts/                    … クライアント側の TypeScript
│   └── styles/                     … デザイントークンとグローバル CSS
└── tests/pricing.test.ts           … 料金ロジックのテスト
```

## 主要機能

- **料金シミュレーター（TOP）** — 人数・泊数・ヴィラ・食事プランを変えると概算がその場で更新されます。条件は URL と localStorage に保存され、予約ページへ引き継がれます。
- **5 ステップの予約 UI（/booking/）** — 日程 → 人数 → ヴィラ → 食事 → 確認。ステップごとのバリデーション、定員に合わないヴィラの自動無効化、常時表示の料金サマリー。送信は行われません。
- **空室状況（デモ）** — 日付を選ぶと 3 棟の空室状況（空室あり / 残りわずか / 満室）が変わり、満室の棟は選べなくなります。データは日付から決定的に生成した架空のものです（`src/lib/availability.ts`）。
- **客室比較（/stay/）** — 3 棟の定員・広さ・設備・料金を並べて比較。スマホでは 1 列目を固定した横スクロール。
- **ギャラリー** — 高さを揃えた横スクロールと、`<dialog>` によるライトボックス（矢印キー・Esc 対応）。
- **アクセシビリティ** — セマンティック HTML、`focus-visible`、44px 以上のタップ領域、フォーカストラップ、`prefers-reduced-motion` 対応。
- **SEO** — ページ固有の title / description / OGP、favicon 一式、`CreativeWork` の構造化データ（架空施設を事業体として登録しない方針）。

## 画像の差し替え方法

写真は AI 生成画像への差し替えを前提に設計しています。現在入っているのは、比率とトーンだけを合わせた仮画像です。

```bash
# 1. docs/chatgpt-image-prompts.md のプロンプトで画像を生成する
# 2. 画像 ID と同じ名前で images-src/ に保存する（例: images-src/hero.png）
npm run images:import        # 比率調整 + WebP 変換 → src/assets/images/hero.webp
npm run assets:brand         # og-image を差し替えたときのみ
npm run build                # AVIF / WebP と srcset を再生成
```

- 使用する画像の一覧・比率・推奨サイズは [`docs/image-prompts.md`](docs/image-prompts.md)。
- 構図や光まで含めた仕様は [`docs/image-production.md`](docs/image-production.md)。
- 実写を配置したファイルは `src/assets/images/.placeholders.json` の管理対象から外れ、`npm run images:placeholders` で上書きされません。
- コピーを大きく書き換えたときは `npm run fonts` を実行し、フォントのサブセットを作り直してください（未収録の文字は代替フォントで表示されます）。

## デプロイ

静的サイトのため、`npm run build` で生成される `dist/` をそのまま配信できます。

**Cloudflare Pages の場合**

| 設定 | 値 |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 以上 |

Netlify / Vercel / GitHub Pages なども同じ設定で公開できます。

独自ドメインが決まったら `astro.config.mjs` の `site` に公開 URL を設定してください。canonical と OGP の URL が絶対パスで出力されるようになります（未設定のあいだは、存在しない URL を出さないよう相対パスで運用しています）。

## ライセンスと注意

- 本リポジトリは自主制作のポートフォリオ作品です。ブランド、施設、料金、設備、所在地はすべて架空のものです。
- フォントはそれぞれの提供元のライセンス（SIL Open Font License）に従います。
