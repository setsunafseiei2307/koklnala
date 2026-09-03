/**
 * 静的品質チェック（アクセシビリティ・リンク・メタ情報）。
 *   npm run preview & → node scripts/audit.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const ROUTES = [
  '/',
  '/stay/',
  '/stay/forest-villa/',
  '/stay/stone-villa/',
  '/stay/mist-villa/',
  '/sauna/',
  '/experience/',
  '/access/',
  '/booking/',
  '/project/',
  '/404',
];

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {},
);
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const problems = [];
const internalLinks = new Set();

for (const route of ROUTES) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' });

  const report = await page.evaluate(() => {
    const issues = [];
    const push = (message) => issues.push(message);

    // --- 見出し階層 ---
    const headings = [...document.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    const h1s = headings.filter((element) => element.tagName === 'H1');
    if (h1s.length !== 1) push(`h1 が ${h1s.length} 個`);
    let previous = 0;
    for (const heading of headings) {
      const level = Number(heading.tagName[1]);
      if (previous && level > previous + 1) {
        push(`見出しが飛んでいる: h${previous} → h${level}（${heading.textContent?.trim().slice(0, 24)}）`);
      }
      previous = level;
    }

    // --- ランドマーク ---
    if (!document.querySelector('main')) push('main がない');
    if (!document.querySelector('header')) push('header がない');
    if (!document.querySelector('footer')) push('footer がない');

    // --- 重複 id ---
    const ids = new Map();
    for (const element of document.querySelectorAll('[id]')) {
      ids.set(element.id, (ids.get(element.id) ?? 0) + 1);
    }
    for (const [id, count] of ids) if (count > 1) push(`id が重複: ${id} × ${count}`);

    // --- aria 参照切れ ---
    for (const attribute of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
      for (const element of document.querySelectorAll(`[${attribute}]`)) {
        for (const reference of element.getAttribute(attribute).split(/\s+/)) {
          if (reference && !document.getElementById(reference)) {
            push(`${attribute} の参照先がない: ${reference}`);
          }
        }
      }
    }

    // --- 画像 alt ---
    for (const image of document.images) {
      if (!image.hasAttribute('alt')) push(`alt 属性がない画像: ${image.src.split('/').pop()}`);
      // CLS 対策として width / height 属性が入っているかを見る（未読み込みでも判定できる）
      if (image.src && !(image.hasAttribute('width') && image.hasAttribute('height'))) {
        push(`width / height 属性がない画像: ${image.src.split('/').pop()}`);
      }
    }

    // --- リンク・ボタンのアクセシブルネーム ---
    const accessibleName = (element) =>
      (element.getAttribute('aria-label') || element.textContent || '').trim();
    for (const link of document.querySelectorAll('a[href]')) {
      if (accessibleName(link) === '') push(`テキストのないリンク: ${link.getAttribute('href')}`);
    }
    for (const button of document.querySelectorAll('button')) {
      if (accessibleName(button) === '') push('テキストのないボタン');
    }

    // --- フォーム ---
    for (const field of document.querySelectorAll('input, select, textarea')) {
      if (field.type === 'hidden') continue;
      const labelled =
        field.labels?.length > 0 || field.getAttribute('aria-label') || field.getAttribute('aria-labelledby');
      if (!labelled) push(`ラベルのない入力: ${field.name || field.type}`);
    }

    // --- タップ領域（44px 未満のインタラクティブ要素）---
    const small = [];
    for (const element of document.querySelectorAll('a[href], button, input, summary')) {
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      // ラベルで包んだ視覚的非表示のラジオ / チェックボックスは、ラベル側が操作領域
      if (element.tagName === 'INPUT' && rect.height <= 2 && element.closest('label')) continue;
      if (rect.height < 40) {
        small.push(`${element.tagName.toLowerCase()}.${(element.className || '').toString().split(' ')[0]}(${Math.round(rect.height)}px)`);
      }
    }
    if (small.length) push(`高さ 40px 未満の操作要素: ${[...new Set(small)].slice(0, 6).join(', ')}`);

    // --- メタ情報 ---
    const meta = (name) =>
      document.querySelector(`meta[name="${name}"]`)?.content ||
      document.querySelector(`meta[property="${name}"]`)?.content;
    if (!document.title) push('title がない');
    if ((document.title || '').length > 70) push(`title が長い（${document.title.length} 文字）`);
    if (!meta('description')) push('description がない');
    if ((meta('description') || '').length > 160) push(`description が長い（${meta('description').length} 文字）`);
    if (!meta('og:title')) push('og:title がない');
    if (!meta('og:image')) push('og:image がない');
    if (document.documentElement.lang !== 'ja') push('html lang が ja でない');

    const links = [...document.querySelectorAll('a[href]')]
      .map((link) => link.getAttribute('href'))
      .filter((href) => href && href.startsWith('/'));

    return { issues, links, title: document.title };
  });

  for (const link of report.links) internalLinks.add(link.split('#')[0]);
  if (report.issues.length) {
    problems.push({ route, issues: report.issues });
    console.log(`\n${route}`);
    for (const issue of report.issues) console.log(`  ⚠ ${issue}`);
  } else {
    console.log(`ok  ${route}  「${report.title.slice(0, 40)}」`);
  }
}

// --- 内部リンク切れ ---
console.log('\n--- internal links ---');
const broken = [];
for (const link of [...internalLinks].sort()) {
  const response = await page.goto(`${BASE}${link}`, { waitUntil: 'commit' });
  const status = response?.status() ?? 0;
  if (status >= 400) {
    broken.push(`${link} → ${status}`);
    console.log(`  ⚠ ${link} → ${status}`);
  }
}
console.log(`${internalLinks.size} links checked, ${broken.length} broken`);

await browser.close();
console.log(`\n${problems.length} page(s) with issues`);
process.exitCode = problems.length || broken.length ? 1 : 0;
