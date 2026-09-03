/**
 * 予約フローの通しテスト（Playwright）。
 *   npm run preview & → node scripts/e2e-booking.mjs
 * 料金の期待値は src/lib/pricing の計算結果と突き合わせる。
 */
import { chromium } from 'playwright';
import { estimate, yen } from '../src/lib/pricing.ts';
import { availabilityFor, availabilityForAll } from '../src/lib/availability.ts';

/** 条件に合う日付を、明後日以降から探す */
function findDate(predicate) {
  for (let offset = 2; offset < 400; offset += 1) {
    const iso = new Date(Date.now() + offset * 864e5).toISOString().slice(0, 10);
    if (predicate(iso)) return iso;
  }
  throw new Error('条件に合う日付が見つかりませんでした');
}

const BASE = process.env.BASE_URL ?? 'http://localhost:4321';
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH;
const results = [];

function check(name, condition, detail = '') {
  results.push({ name, ok: Boolean(condition), detail });
  console.log(`${condition ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`);
}

const browser = await chromium.launch(executablePath ? { executablePath } : {});

// ---- モバイル：ステップを最後まで進める --------------------------------
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});

await page.goto(`${BASE}/booking/`, { waitUntil: 'networkidle' });

// STEP 01: 日付未入力のまま進もうとするとエラー
await page.click('[data-next-mobile]');
check('日付未入力でバリデーションが出る', (await page.textContent('[data-error="checkIn"]'))?.includes('チェックイン日'));
check('ステップは 01 のまま', await page.isVisible('[data-panel="dates"]'));

// 過去日を弾く
await page.fill('#check-in', '2020-01-01');
await page.click('[data-next-mobile]');
check('過去日を弾く', (await page.textContent('[data-error="checkIn"]'))?.includes('以降'));

// STONE VILLA に 2 泊できる日を探す（空室状況は日付から決定的に決まる）
const future = findDate((iso) => availabilityFor(iso, 'stone', 2) !== 'full');
await page.fill('#check-in', future);
await page.fill('[data-input="nights"]', '2');
await page.waitForTimeout(150);
check('チェックアウト日が表示される', (await page.textContent('[data-checkout-note]'))?.includes('チェックアウト'));

check('空室サマリーが表示される', (await page.textContent('[data-vacancy-summary]'))?.includes('空室'));

// 3 棟とも満室の日はステップを進めない
const fullDate = findDate((iso) => availabilityForAll(iso, 1).every((entry) => entry.status === 'full'));
await page.fill('#check-in', fullDate);
await page.fill('[data-input="nights"]', '1');
await page.click('[data-next-mobile]');
check('全棟満室の日程は先へ進めない', (await page.textContent('[data-error="vacancy"]'))?.includes('満室'));

await page.fill('#check-in', future);
await page.fill('[data-input="nights"]', '2');
await page.click('[data-next-mobile]');
check('空室のある日程なら進める', await page.isVisible('[data-panel="guests"]'));

// STEP 02: 4名へ
await page.click('[data-step-control="guests"][data-delta="1"]');
await page.click('[data-step-control="guests"][data-delta="1"]');
check('人数が 4 名になる', (await page.inputValue('[data-input="guests"]')) === '4');
await page.click('[data-next-mobile]');

// STEP 03: 定員 2 名の MIST が選べない
check('STEP 03 へ進む', await page.isVisible('[data-panel="villa"]'));
check('定員超過のヴィラが無効化される', await page.isDisabled('input[name="villa"][value="mist"]'));
check('定員超過の注意書きが出る', await page.isVisible('[data-villa-card="mist"] [data-villa-warning]'));
await page.check('input[name="villa"][value="stone"]');
await page.click('[data-next-mobile]');

// STEP 04: 食事とオプション
check('STEP 04 へ進む', await page.isVisible('[data-panel="meals"]'));
check('対象外オプションが無効化される', await page.isDisabled('input[name="option"][value="wood-sauna"]'));
await page.check('input[name="meal"][value="half-board"]');
await page.check('input[name="option"][value="bonfire"]');

const expected = estimate({
  villaId: 'stone',
  guests: 4,
  nights: 2,
  mealPlanId: 'half-board',
  optionIds: ['bonfire'],
});
const shownTotal = await page.textContent('[data-summary="total"]');
check('合計が pricing の計算と一致する', shownTotal?.trim() === yen(expected.total), `${shownTotal} / ${yen(expected.total)}`);

await page.click('[data-next-mobile]');

// STEP 05: 確認と入力チェック
check('STEP 05 へ進む', await page.isVisible('[data-panel="confirm"]'));
check('確認欄にヴィラ名が入る', (await page.textContent('[data-review="villa"]'))?.includes('STONE'));
await page.click('[data-next-mobile]');
check('氏名未入力でエラー', (await page.textContent('[data-error="name"]'))?.includes('お名前'));
check('メール未入力でエラー', (await page.textContent('[data-error="email"]'))?.includes('メールアドレス'));
check('同意チェックでエラー', (await page.textContent('[data-error="agree"]'))?.includes('同意'));

await page.fill('#name', '箱根 太郎');
await page.fill('#email', 'invalid-mail');
await page.click('[data-next-mobile]');
check('不正なメール形式を弾く', (await page.textContent('[data-error="email"]'))?.includes('形式'));

await page.fill('#email', 'taro@example.com');
await page.check('input[name="agree"]');
await page.click('[data-next-mobile]');
check('完了パネルが表示される', await page.isVisible('[data-done]'));
check('完了パネルに合計が出る', (await page.textContent('[data-done-review]'))?.includes(yen(expected.total)));
check('完了後は固定バーが消える', !(await page.isVisible('[data-mobile-bar]')));

// ---- TOP のシミュレーターから条件が引き継がれるか ----------------------
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const home = await desktop.newPage();
home.on('pageerror', (error) => errors.push(error.message));
await home.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await home.check('input[name="villa"][value="mist"]');
await home.click('[data-step="nights"][data-delta="1"]');
const cta = await home.getAttribute('[data-estimator-cta]', 'href');
check('CTA に条件が引き継がれる', cta?.includes('villa=mist') && cta.includes('nights=2'), cta ?? '');

await home.goto(`${BASE}${cta}`, { waitUntil: 'networkidle' });
check('予約ページが URL の条件を復元する', (await home.inputValue('[data-input="nights"]')) === '2');
check('予約ページがヴィラを復元する', await home.isChecked('input[name="villa"][value="mist"]'));

check('JS エラーが発生していない', errors.length === 0, errors.join(' | '));

await browser.close();

const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exitCode = failed.length ? 1 : 0;
