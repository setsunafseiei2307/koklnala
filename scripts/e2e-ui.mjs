/**
 * キーボード操作とインタラクションの検証。
 *   npm run preview & → node scripts/e2e-ui.mjs
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const results = [];
const check = (name, condition, detail = '') => {
  results.push(Boolean(condition));
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch(
  process.env.PLAYWRIGHT_CHROMIUM_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } : {},
);

// ---- デスクトップ：スキップリンク / FAQ / ライトボックス ----------------
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await desktop.newPage();
await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });

await page.keyboard.press('Tab');
check(
  '最初の Tab でスキップリンクにフォーカスが入る',
  (await page.evaluate(() => document.activeElement?.className)) === 'skip-link',
);
await page.waitForTimeout(350);
check(
  'フォーカス時にスキップリンクが画面内に出る',
  await page.evaluate(() => {
    const link = document.querySelector('.skip-link');
    return link.getBoundingClientRect().top >= 0;
  }),
);

// FAQ アコーディオン
const firstFaq = page.locator('.faq__item').first();
await firstFaq.locator('summary').focus();
await page.keyboard.press('Enter');
check('FAQ が Enter で開く', await firstFaq.evaluate((element) => element.open));
await page.keyboard.press('Enter');
check('FAQ が Enter で閉じる', await firstFaq.evaluate((element) => !element.open));

// ライトボックス
await page.locator('[data-gallery-item]').first().click();
check('ライトボックスが開く', await page.locator('[data-lightbox]').evaluate((element) => element.open));
check(
  'ライトボックスに画像が入る',
  (await page.getAttribute('[data-lightbox-img]', 'src'))?.includes('/_astro/'),
);
const firstCounter = await page.textContent('[data-lightbox-counter]');
await page.keyboard.press('ArrowRight');
check('矢印キーで次の写真へ進む', (await page.textContent('[data-lightbox-counter]')) !== firstCounter);
await page.keyboard.press('Escape');
await page.waitForTimeout(200);
check('Esc で閉じる', await page.locator('[data-lightbox]').evaluate((element) => !element.open));

// フォーカスリング
await page.locator('.header__book').focus();
check(
  'フォーカスリングが表示される',
  await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement, null);
    return style.outlineStyle !== 'none' && Number.parseFloat(style.outlineWidth) > 0;
  }),
);

// ---- モバイル：フルスクリーンメニュー -----------------------------------
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const small = await mobile.newPage();
await small.goto(`${BASE}/`, { waitUntil: 'networkidle' });

await small.click('[data-menu-toggle]');
await small.waitForTimeout(300);
check('メニューが開く', await small.isVisible('[data-menu]'));
check('aria-expanded が true になる', (await small.getAttribute('[data-menu-toggle]', 'aria-expanded')) === 'true');
check(
  '背面スクロールがロックされる',
  await small.evaluate(() => document.documentElement.classList.contains('is-locked')),
);
check(
  '最初のメニュー項目にフォーカスが移る',
  await small.evaluate(() => document.activeElement?.classList.contains('menu__link')),
);

// フォーカストラップ（末尾から Tab で先頭へ戻る）
for (let index = 0; index < 12; index += 1) await small.keyboard.press('Tab');
check(
  'フォーカスがメニュー内に留まる',
  await small.evaluate(() => Boolean(document.activeElement?.closest('[data-menu]'))),
);

await small.keyboard.press('Escape');
await small.waitForTimeout(600);
check('Esc でメニューが閉じる', !(await small.isVisible('[data-menu]')));
check(
  'スクロールロックが解除される',
  await small.evaluate(() => !document.documentElement.classList.contains('is-locked')),
);

// 固定 CTA バー
await small.evaluate(() => window.scrollTo(0, window.innerHeight * 1.2));
await small.waitForTimeout(400);
check('スクロールで固定 CTA が現れる', await small.evaluate(() => document.querySelector('[data-booking-bar]')?.hasAttribute('data-visible')));

// ---- ページ遷移（View Transitions）後の再初期化 -------------------------
const nav = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const soft = await nav.newPage();
const softErrors = [];
soft.on('pageerror', (error) => softErrors.push(error.message));
await soft.goto(`${BASE}/stay/`, { waitUntil: 'networkidle' });
await soft.click('.header__brand');
await soft.waitForSelector('[data-estimator]', { state: 'attached' });
await soft.waitForTimeout(600);
check('ソフト遷移でトップに戻れる', new URL(soft.url()).pathname === '/');

await soft.check('input[name="villa"][value="stone"]');
await soft.waitForTimeout(200);
check(
  '遷移後もシミュレーターが動く',
  (await soft.textContent('[data-line="accommodation"]'))?.includes('82,000') === true,
  (await soft.textContent('[data-total]')) ?? '',
);

await soft.click('.header__book');
await soft.waitForSelector('[data-booking-form]', { state: 'attached' });
await soft.waitForTimeout(600);
check('遷移後も予約フォームが初期化される', await soft.isVisible('[data-panel="dates"]'));
await soft.click('[data-next]');
check(
  '遷移後もバリデーションが動く',
  (await soft.textContent('[data-error="checkIn"]'))?.includes('チェックイン日') === true,
);

await soft.evaluate(() => window.scrollTo(0, 400));
await soft.waitForTimeout(300);
check(
  '遷移後もヘッダーのスクロール状態が更新される',
  (await soft.getAttribute('[data-header]', 'data-state')) === 'scrolled',
);
check('ソフト遷移で JS エラーが出ない', softErrors.length === 0, softErrors.join(' | '));

// ---- prefers-reduced-motion --------------------------------------------
const reduced = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
const still = await reduced.newPage();
await still.goto(`${BASE}/stay/`, { waitUntil: 'networkidle' });
check(
  'reduced-motion では出現アニメーションを適用しない',
  await still.evaluate(() => {
    const targets = [...document.querySelectorAll('[data-reveal], [data-reveal-mask]')];
    return targets.length > 0 && targets.every((element) => {
      const style = getComputedStyle(element);
      return style.opacity === '1' && style.clipPath === 'none';
    });
  }),
);

await browser.close();
const failed = results.filter((ok) => !ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exitCode = failed ? 1 : 0;
