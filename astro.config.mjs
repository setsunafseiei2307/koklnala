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
const env = /** @type {Record<string, string | undefined>} */ (
  /** @type {any} */ (globalThis).process?.env ?? {}
);

const siteUrl = env.SITE_URL?.trim() || PRODUCTION_URL;

/**
 * 配信中のビルドを特定するための識別子を返す。
 *
 * 公開後に「どのコミットが配信されているか」を meta タグから確認できるようにする。
 * CI が渡すコミット SHA を優先し、無ければローカルの git から読む。
 */
async function resolveBuildRef() {
  const fromCi =
    env.WORKERS_CI_COMMIT_SHA || env.CF_PAGES_COMMIT_SHA || env.GITHUB_SHA || env.COMMIT_SHA;
  if (fromCi) return fromCi.trim().slice(0, 7);

  try {
    // 文字列変数を経由して、node の型定義なしでも解決を試みさせない
    const moduleName = 'node:child_process';
    const { execSync } = /** @type {any} */ (await import(/* @vite-ignore */ moduleName));
    return String(execSync('git rev-parse --short=7 HEAD')).trim();
  } catch {
    return 'unknown';
  }
}

const buildRef = await resolveBuildRef();
const buildTime = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

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
    define: {
      __BUILD_REF__: JSON.stringify(buildRef),
      __BUILD_TIME__: JSON.stringify(buildTime),
    },
  },
});
