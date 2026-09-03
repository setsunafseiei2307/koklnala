// @ts-check
import { defineConfig } from 'astro/config';

/**
 * EMBER & MOSS — static build.
 *
 * `site` はビルド環境変数 SITE_URL から受け取る。設定されていれば canonical と
 * OG / Twitter の画像・URL が絶対パスで出力され、SNS カードが正しく展開される。
 * 未設定なら従来どおり相対パスのままで、架空の URL は出力しない（docs/README 参照）。
 */
// @types/node は入れていないため、グローバル経由で読む
const siteUrl =
  /** @type {string | undefined} */ (/** @type {any} */ (globalThis).process?.env?.SITE_URL)?.trim() ||
  undefined;

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
