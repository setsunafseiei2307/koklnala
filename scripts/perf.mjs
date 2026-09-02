/**
 * 表示パフォーマンスの計測（LCP / CLS / 転送量）と、主要な配色のコントラスト比検証。
 *   npm run preview & → node scripts/perf.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const ROUTES = ['/', '/stay/', '/sauna/', '/booking/'];

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {},
);

console.log('route            transfer     js      css    images   fonts    LCP     CLS');
for (const route of ROUTES) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const bytes = { total: 0, js: 0, css: 0, image: 0, font: 0 };

  page.on('response', async (response) => {
    try {
      const buffer = await response.body();
      const type = response.request().resourceType();
      bytes.total += buffer.length;
      if (type === 'script') bytes.js += buffer.length;
      else if (type === 'stylesheet') bytes.css += buffer.length;
      else if (type === 'image') bytes.image += buffer.length;
      else if (type === 'font') bytes.font += buffer.length;
    } catch {
      /* 本文を取得できないレスポンスは無視する */
    }
  });

  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  const vitals = await page.evaluate(
    () =>
      new Promise((resolve) => {
        let lcp = 0;
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) lcp = entry.startTime;
        }).observe({ type: 'largest-contentful-paint', buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) if (!entry.hadRecentInput) cls += entry.value;
        }).observe({ type: 'layout-shift', buffered: true });
        setTimeout(() => resolve({ lcp, cls }), 1200);
      }),
  );

  const kb = (value) => `${(value / 1024).toFixed(0)}KB`.padStart(7);
  console.log(
    `${route.padEnd(16)}${kb(bytes.total)}${kb(bytes.js)}${kb(bytes.css)}${kb(bytes.image)}${kb(bytes.font)}  ${`${vitals.lcp.toFixed(0)}ms`.padStart(6)}  ${vitals.cls.toFixed(3)}`,
  );
  await context.close();
}

// ---- コントラスト比 -----------------------------------------------------
const luminance = (hex) => {
  const channels = [1, 3, 5].map((index) => {
    const value = Number.parseInt(hex.slice(index, index + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const ratio = (a, b) => {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
};

const PAIRS = [
  ['本文（ダーク面）', '#ECE7DD', '#0C0E0D', 4.5],
  ['補助テキスト（ダーク面）', '#A3A99F', '#0C0E0D', 4.5],
  ['微細テキスト（ダーク面）', '#767C73', '#0C0E0D', 3.0],
  ['アクセント文字（ダーク面）', '#D18D55', '#0C0E0D', 4.5],
  ['本文（アイボリー面）', '#1A1F1B', '#F1EDE5', 4.5],
  ['補助テキスト（アイボリー面）', '#555C53', '#F1EDE5', 4.5],
  ['微細テキスト（アイボリー面）', '#7C8279', '#F1EDE5', 3.0],
  ['アクセント文字（アイボリー面）', '#9A5C2E', '#F1EDE5', 4.5],
  ['CTA ボタン文字', '#FFFFFF', '#A3612E', 4.5],
  ['CTA ボタン（アイボリー面との境）', '#A3612E', '#F1EDE5', 3.0],
  ['本文（フォレスト面）', '#ECE7DD', '#16201A', 4.5],
];

console.log('\ncontrast                          ratio   required  result');
let failed = 0;
for (const [label, fg, bg, required] of PAIRS) {
  const value = ratio(fg, bg);
  const ok = value >= required;
  if (!ok) failed += 1;
  console.log(
    `${label.padEnd(30)}${value.toFixed(2).padStart(7)}${String(required).padStart(10)}   ${ok ? 'PASS' : 'FAIL'}`,
  );
}

await browser.close();
console.log(failed ? `\n${failed} contrast pair(s) failed` : '\nall contrast pairs pass');
process.exitCode = failed ? 1 : 0;
