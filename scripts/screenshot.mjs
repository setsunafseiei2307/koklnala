/**
 * 目視レビュー用スクリーンショット + 自動チェック。
 *
 *   npm run preview &            (http://localhost:4321)
 *   node scripts/screenshot.mjs  [--full] [path ...]
 *
 * 併せて以下を検証する:
 *  - console error / ページエラー
 *  - 横スクロールの発生（documentElement.scrollWidth > clientWidth）
 *  - 画像の読み込み失敗
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const OUT = path.resolve('screenshots');
const args = process.argv.slice(2);
const full = args.includes('--full');
const routes = args.filter((arg) => !arg.startsWith('--'));

const PAGES = routes.length
  ? routes
  : ['/', '/stay/', '/stay/forest-villa/', '/sauna/', '/experience/', '/access/', '/booking/', '/project/', '/404'];

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 },
  { name: 'tablet', width: 768, height: 1024, isMobile: false, deviceScaleFactor: 1 },
  { name: 'desktop', width: 1440, height: 900, isMobile: false, deviceScaleFactor: 1 },
];

const problems = [];

await mkdir(OUT, { recursive: true });
// 環境に配置済みの Chromium を使う（PLAYWRIGHT_CHROMIUM_PATH で上書き可）
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
const browser = await chromium.launch(executablePath ? { executablePath } : {});

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor,
    isMobile: viewport.isMobile,
    hasTouch: viewport.isMobile,
    reducedMotion: 'no-preference',
  });

  for (const route of PAGES) {
    const page = await context.newPage();
    const messages = [];
    page.on('console', (message) => {
      if (message.type() === 'error') messages.push(`console: ${message.text()}`);
    });
    page.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`));
    page.on('requestfailed', (request) => messages.push(`requestfailed: ${request.url()}`));

    const response = await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    if (response && response.status() >= 400 && !route.includes('404')) {
      messages.push(`status ${response.status()}`);
    }

    // 遅延読み込みの画像と出現アニメーションを起こすため、最下部まで実際に送る。
    // scroll-behavior: smooth が効くと目的地に届かないため instant を明示する。
    await page.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const max = () => document.documentElement.scrollHeight - window.innerHeight;
      for (let y = 0; y <= max(); y += window.innerHeight * 0.7) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await wait(60);
      }
      window.scrollTo({ top: max(), behavior: 'instant' });
      await wait(200);
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(1400);

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;
      const overflow = doc.scrollWidth - doc.clientWidth;
      const wide = [...document.querySelectorAll('body *')]
        .filter((element) => {
          const rect = element.getBoundingClientRect();
          return rect.width > 0 && rect.right > doc.clientWidth + 2;
        })
        .slice(0, 5)
        .map((element) => `${element.tagName.toLowerCase()}.${element.className?.toString().split(' ')[0] ?? ''}`);
      // 読み込みが完了しているのに寸法が 0 のものだけを失敗として扱う
      // （画面外の lazy 画像は未読み込みが正しい状態のため除外）
      const brokenImages = [...document.images]
        .filter((image) => image.src !== '' && image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src);
      return { overflow, wide, brokenImages, title: document.title };
    });

    if (audit.overflow > 1) {
      messages.push(`horizontal overflow ${audit.overflow}px → ${audit.wide.join(', ')}`);
    }
    if (audit.brokenImages.length) messages.push(`broken images: ${audit.brokenImages.join(', ')}`);

    const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    await page.screenshot({
      path: path.join(OUT, `${slug}--${viewport.name}.png`),
      fullPage: full,
    });

    const status = messages.length ? `⚠ ${messages.join(' | ')}` : 'ok';
    console.log(`${viewport.name.padEnd(8)} ${route.padEnd(24)} ${status}`);
    if (messages.length) problems.push(`${viewport.name} ${route}: ${messages.join(' | ')}`);
    await page.close();
  }
  await context.close();
}

await browser.close();

console.log(problems.length ? `\n${problems.length} issue(s) found.` : '\nno issues found.');
process.exitCode = problems.length ? 1 : 0;
