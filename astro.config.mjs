// @ts-check
import { defineConfig } from 'astro/config';

/**
 * EMBER & MOSS — static build.
 * `site` は公開ドメイン確定後に差し替える。未確定のため canonical / OG の
 * 絶対URLはビルド時に自動生成せず、相対パスで運用する（docs/README 参照）。
 */
export default defineConfig({
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
