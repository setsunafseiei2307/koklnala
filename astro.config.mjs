// @ts-check
import { defineConfig } from 'astro/config';

/**
 * EMBER & MOSS — static build.
 *
 * `site` を設定することで canonical と OG / Twitter の画像・URL が絶対パスで
 * 出力され、SNS カードが正しく展開される。
 * 既定は本番の公開 URL。別ドメインへ載せ替えるときはビルド環境変数 SITE_URL を
 * 設定すれば、そちらが優先される。
 */
const PRODUCTION_URL = 'https://koklnala.shushushu1990.workers.dev';

// @types/node は入れていないため、グローバル経由で読む
const siteUrl =
  /** @type {string | undefined} */ (/** @type {any} */ (globalThis).process?.env?.SITE_URL)?.trim() ||
  PRODUCTION_URL;

export default defineConfig({
  site: siteUrl,
  output: 'static',
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  build: {
    // クリティカルCSSはインライン化してレンダーブロッキングを減らす
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  devToolbar: { enabled: false },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
