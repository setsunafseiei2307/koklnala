/**
 * BOOKING ページのステップ UI。
 *
 * - 5 ステップの表示制御とバリデーション
 * - 料金の即時計算（src/lib/pricing）
 * - 入力内容の URL / localStorage への保存
 * - 送信はせず、完了パネルを表示する（CONCEPT PROJECT のため）
 */
import { estimate, normalizeStay, yen, type StayInput } from '../lib/pricing';
import { getVilla, VILLAS } from '../data/villas';
import { MEAL_PLANS, STAY_OPTIONS, type MealPlanId, type VillaId } from '../data/pricing';
import { persistStay, readStay, syncUrl } from './stay-state';
import {
  AVAILABILITY_LABEL,
  availabilityFor,
  availabilityForAll,
  type Availability,
} from '../lib/availability';

type StepId = 'dates' | 'guests' | 'villa' | 'meals' | 'confirm';

const STEPS: StepId[] = ['dates', 'guests', 'villa', 'meals', 'confirm'];
const STEP_META = [
  { no: '01', label: 'DATES', ja: '日程' },
  { no: '02', label: 'GUESTS', ja: '人数' },
  { no: '03', label: 'VILLA', ja: 'ヴィラ' },
  { no: '04', label: 'MEALS', ja: '食事' },
  { no: '05', label: 'CONFIRM', ja: '確認' },
];
/** 予約受付は宿泊日の 2 日前まで */
const LEAD_DAYS = 2;
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function initBooking(): void {
  const rootEl = document.querySelector<HTMLElement>('[data-booking]');
  const formEl = rootEl?.querySelector<HTMLFormElement>('[data-booking-form]');
  if (!rootEl || !formEl) return;
  // 以降で null 判定を繰り返さないよう、絞り込み済みの参照を固定する
  const root = rootEl;
  const form = formEl;

  const guestsInput = form.querySelector<HTMLInputElement>('[data-input="guests"]')!;
  const nightsInput = form.querySelector<HTMLInputElement>('[data-input="nights"]')!;
  const checkInInput = form.querySelector<HTMLInputElement>('#check-in')!;
  const prevButton = form.querySelector<HTMLButtonElement>('[data-prev]')!;
  const nextButton = form.querySelector<HTMLButtonElement>('[data-next]')!;
  const submitButton = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const mobileNext = root.querySelector<HTMLButtonElement>('[data-next-mobile]')!;
  const donePanel = form.querySelector<HTMLElement>('[data-done]')!;
  const navRow = form.querySelector<HTMLElement>('[data-nav]')!;
  const mobileBar = root.querySelector<HTMLElement>('[data-mobile-bar]')!;

  const stored = readStay();
  let stay: StayInput = normalizeStay(stored);
  let checkIn = stored.checkIn ?? '';
  let currentIndex = 0;
  let furthest = 0;

  // --- 初期化 -------------------------------------------------------------
  const minDate = addDays(startOfToday(), LEAD_DAYS);
  checkInInput.min = toIsoDate(minDate);
  if (checkIn && new Date(`${checkIn}T00:00:00`) < minDate) checkIn = '';
  checkInInput.value = checkIn;

  applyStateToForm();
  render();
  showStep(0);

  // --- イベント -----------------------------------------------------------
  form.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'villa') update({ villaId: target.value as VillaId });
    else if (target.name === 'meal') update({ mealPlanId: target.value as MealPlanId });
    else if (target.name === 'option') update({ optionIds: readOptions() });
    else if (target === guestsInput) update({ guests: Number(target.value) });
    else if (target === nightsInput) update({ nights: Number(target.value) });
    else if (target === checkInInput) {
      checkIn = target.value;
      clearError('checkIn');
      clearError('vacancy');
      // 日程が変わると空室状況も変わるため、棟の選択肢を評価し直す
      switchAwayFromFullVilla();
      applyStateToForm();
      render();
    } else if (target.name === 'agree') clearError('agree');
  });

  form.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    if ((target === guestsInput || target === nightsInput) && target.value !== '') {
      update(target === guestsInput ? { guests: Number(target.value) } : { nights: Number(target.value) });
    }
    if (target.name === 'name' || target.name === 'email') clearError(target.name);
  });

  for (const button of form.querySelectorAll<HTMLButtonElement>('[data-step-control]')) {
    button.addEventListener('click', () => {
      const delta = Number(button.dataset.delta);
      if (button.dataset.stepControl === 'guests') update({ guests: stay.guests + delta });
      else update({ nights: stay.nights + delta });
    });
  }

  nextButton.addEventListener('click', goNext);
  mobileNext.addEventListener('click', goNext);
  prevButton.addEventListener('click', () => showStep(currentIndex - 1));

  for (const button of root.querySelectorAll<HTMLButtonElement>('[data-step-jump]')) {
    button.addEventListener('click', () => {
      const target = STEPS.indexOf(button.dataset.stepJump as StepId);
      // 到達済みのステップにだけ戻れる
      if (target >= 0 && target <= furthest) showStep(target);
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateStep('confirm')) return;
    complete();
  });

  form.querySelector<HTMLButtonElement>('[data-restart]')?.addEventListener('click', () => {
    donePanel.hidden = true;
    navRow.hidden = false;
    mobileBar.hidden = false;
    root.querySelector<HTMLElement>('[data-step-nav]')!.hidden = false;
    const progress = root.querySelector<HTMLElement>('[data-progress]');
    if (progress) progress.hidden = false;
    furthest = 0;
    showStep(0);
  });

  // --- 関数 ---------------------------------------------------------------
  function update(patch: Partial<StayInput>): void {
    stay = normalizeStay({ ...stay, ...patch });
    switchAwayFromFullVilla();
    applyStateToForm();
    render();
  }

  /** 選択中の棟が満室になったら、空いている棟へ寄せる */
  function switchAwayFromFullVilla(): void {
    if (!checkIn) return;
    if (availabilityFor(checkIn, stay.villaId, stay.nights) !== 'full') return;
    const alternative = availabilityForAll(checkIn, stay.nights).find(
      (entry) => entry.status !== 'full' && getVilla(entry.villaId).capacity.max >= stay.guests,
    );
    if (alternative) stay = normalizeStay({ ...stay, villaId: alternative.villaId });
  }

  /** STEP 01 の空室サマリーを描画する */
  function renderVacancy(): void {
    const panel = form.querySelector<HTMLElement>('[data-vacancy]');
    const list = form.querySelector<HTMLElement>('[data-vacancy-list]');
    const summary = form.querySelector<HTMLElement>('[data-vacancy-summary]');
    if (!panel || !list || !summary) return;

    if (!checkIn) {
      panel.hidden = true;
      return;
    }

    const entries = availabilityForAll(checkIn, stay.nights);
    const open = entries.filter((entry) => entry.status !== 'full').length;
    summary.textContent =
      open === 0
        ? 'この日程は 3 棟とも満室です'
        : `${formatDate(parseDate(checkIn))} から ${stay.nights} 泊 — 空室 ${open} 棟`;

    list.replaceChildren(
      ...entries.map((entry) => {
        const item = document.createElement('li');
        const name = document.createElement('span');
        name.className = 'font-en';
        name.textContent = getVilla(entry.villaId).name;
        const badge = document.createElement('span');
        badge.className = 'bk__card-status';
        badge.dataset.status = entry.status;
        badge.textContent = AVAILABILITY_LABEL[entry.status as Availability];
        item.append(name, badge);
        return item;
      }),
    );
    panel.hidden = false;
  }

  function readOptions(): string[] {
    return [...form.querySelectorAll<HTMLInputElement>('input[name="option"]:checked')].map(
      (input) => input.value,
    );
  }

  function applyStateToForm(): void {
    guestsInput.value = String(stay.guests);
    nightsInput.value = String(stay.nights);

    for (const input of form.querySelectorAll<HTMLInputElement>('input[name="villa"]')) {
      const villaId = input.value as VillaId;
      const villa = getVilla(villaId);
      const fits = villa.capacity.max >= stay.guests;
      const status = checkIn ? availabilityFor(checkIn, villaId, stay.nights) : null;
      const bookable = fits && status !== 'full';

      input.disabled = !bookable;
      input.checked = input.value === stay.villaId;

      const card = input.closest<HTMLElement>('[data-villa-card]');
      card?.querySelector<HTMLElement>('[data-villa-warning]')?.toggleAttribute('hidden', fits);

      const badge = card?.querySelector<HTMLElement>('[data-villa-status]');
      if (badge) {
        badge.hidden = status === null;
        if (status) {
          badge.dataset.status = status;
          badge.textContent = status === 'full' ? 'この日程は満室です' : AVAILABILITY_LABEL[status];
        }
      }
    }

    for (const input of form.querySelectorAll<HTMLInputElement>('input[name="meal"]')) {
      input.checked = input.value === stay.mealPlanId;
    }

    for (const input of form.querySelectorAll<HTMLInputElement>('input[name="option"]')) {
      const option = STAY_OPTIONS.find((item) => item.id === input.value);
      const available = !option?.onlyFor || option.onlyFor.includes(stay.villaId);
      input.disabled = !available;
      input.checked = available && stay.optionIds.includes(input.value);
      const card = input.closest<HTMLElement>('[data-option-card]');
      card?.querySelector<HTMLElement>('[data-option-warning]')?.toggleAttribute('hidden', available);
    }

    for (const button of form.querySelectorAll<HTMLButtonElement>('[data-step-control]')) {
      const field = button.dataset.stepControl === 'guests' ? guestsInput : nightsInput;
      const next = Number(field.value) + Number(button.dataset.delta);
      button.disabled = next < Number(field.min) || next > Number(field.max);
    }
  }

  function render(): void {
    const result = estimate(stay);
    const villa = getVilla(stay.villaId);

    setText('[data-summary="stay-label"]', `宿泊（${stay.nights} 泊 / ${stay.guests} 名）`);
    setText('[data-summary="accommodation"]', yen(result.accommodationTotal));
    setText('[data-summary="meals"]', yen(result.mealTotal));
    setText('[data-summary="tax"]', yen(result.bathingTax));
    setText('[data-summary="total"]', yen(result.total));
    setText('[data-summary="total-mobile"]', yen(result.total));
    setText('[data-summary="per-night"]', `1 名 1 泊あたり ${yen(result.perGuestPerNight)}`);

    toggleRow('discount', result.accommodationDiscount !== 0);
    setText('[data-summary="discount"]', yen(result.accommodationDiscount));
    setText('[data-summary="discount-label"]', result.accommodationDiscountLabel ?? '連泊割引');
    toggleRow('options', result.optionTotal > 0);
    setText('[data-summary="options"]', yen(result.optionTotal));

    const note = form.querySelector<HTMLElement>('[data-checkout-note]');
    if (note) {
      note.textContent = checkIn
        ? `チェックアウトは ${formatDate(addDays(parseDate(checkIn), stay.nights))}（11:00）です。`
        : 'チェックイン日を選ぶと、チェックアウト日が表示されます。';
    }

    setText('[data-review="checkIn"]', checkIn ? `${formatDate(parseDate(checkIn))} 15:00 – 19:00` : '—');
    setText(
      '[data-review="checkOut"]',
      checkIn ? `${formatDate(addDays(parseDate(checkIn), stay.nights))} 11:00` : '—',
    );
    setText('[data-review="party"]', `${stay.nights} 泊 / ${stay.guests} 名`);
    setText('[data-review="villa"]', `${villa.name}（${villa.nameJa}）`);
    setText(
      '[data-review="meal"]',
      MEAL_PLANS.find((plan) => plan.id === stay.mealPlanId)?.label ?? '—',
    );
    setText(
      '[data-review="options"]',
      result.optionLines.length > 0 ? result.optionLines.map((line) => line.label).join(' / ') : 'なし',
    );

    renderVacancy();

    persistStay({ ...stay, checkIn: checkIn || undefined });
    syncUrl({ ...stay, checkIn: checkIn || undefined });
  }

  function showStep(index: number): void {
    currentIndex = Math.min(Math.max(index, 0), STEPS.length - 1);
    furthest = Math.max(furthest, currentIndex);

    for (const [position, id] of STEPS.entries()) {
      const panel = form.querySelector<HTMLElement>(`[data-panel="${id}"]`);
      if (panel) panel.hidden = position !== currentIndex;

      const item = root.querySelector<HTMLElement>(`[data-step-item="${id}"]`);
      if (!item) continue;
      item.dataset.state = position === currentIndex ? 'current' : position < currentIndex ? 'done' : 'todo';
      const button = item.querySelector<HTMLButtonElement>('[data-step-jump]');
      if (button) {
        if (position === currentIndex) button.setAttribute('aria-current', 'step');
        else button.removeAttribute('aria-current');
        button.disabled = position > furthest;
      }
    }

    const meta = STEP_META[currentIndex]!;
    setText('[data-progress-no]', meta.no);
    setText('[data-progress-label]', meta.label);
    setText('[data-progress-ja]', meta.ja);
    root
      .querySelector<HTMLElement>('[data-progress-bar]')
      ?.style.setProperty('--progress', `${((currentIndex + 1) / STEPS.length) * 100}%`);

    const isLast = currentIndex === STEPS.length - 1;
    prevButton.hidden = currentIndex === 0;
    nextButton.hidden = isLast;
    submitButton.hidden = !isLast;
    mobileNext.textContent = isLast ? 'この内容で予約する' : '次へ進む';

    // ステップが変わったら、そのパネルの先頭が追従ナビの下に来るようスクロールする
    form.querySelector<HTMLElement>(`[data-panel="${STEPS[currentIndex]}"]`)?.scrollIntoView({
      block: 'start',
    });
  }

  function goNext(): void {
    const id = STEPS[currentIndex]!;
    if (!validateStep(id)) return;
    if (currentIndex === STEPS.length - 1) {
      form.requestSubmit();
      return;
    }
    showStep(currentIndex + 1);
  }

  function validateStep(id: StepId): boolean {
    clearErrors();
    if (id === 'dates') {
      if (!checkInInput.value) return fail('checkIn', checkInInput, 'チェックイン日を選んでください。');
      const selected = parseDate(checkInInput.value);
      if (Number.isNaN(selected.getTime())) {
        return fail('checkIn', checkInInput, '日付の形式が正しくありません。');
      }
      if (selected < minDate) {
        return fail('checkIn', checkInInput, `${formatDate(minDate)} 以降の日付をお選びください。`);
      }
      const open = availabilityForAll(checkInInput.value, stay.nights).filter(
        (entry) => entry.status !== 'full',
      );
      if (open.length === 0) {
        return fail('vacancy', null, 'この日程は 3 棟とも満室です。日付か泊数を変更してください。');
      }
      return true;
    }

    if (id === 'villa') {
      const villa = getVilla(stay.villaId);
      if (villa.capacity.max < stay.guests) {
        return fail('villa', null, `${stay.guests} 名で宿泊できる棟をお選びください。`);
      }
      if (checkIn && availabilityFor(checkIn, stay.villaId, stay.nights) === 'full') {
        return fail('villa', null, 'この日程で空いている棟をお選びください。');
      }
      return true;
    }

    if (id === 'confirm') {
      const name = form.querySelector<HTMLInputElement>('#name')!;
      const email = form.querySelector<HTMLInputElement>('#email')!;
      const agree = form.querySelector<HTMLInputElement>('input[name="agree"]')!;
      let valid = true;

      if (name.value.trim() === '') valid = fail('name', name, 'お名前を入力してください。');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        valid = fail('email', email, 'メールアドレスの形式をご確認ください。');
      }
      if (!agree.checked) valid = fail('agree', agree, 'キャンセルポリシーへの同意が必要です。');

      if (!valid) {
        form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      }
      return valid;
    }

    return true;
  }

  function complete(): void {
    const result = estimate(stay);
    const villa = getVilla(stay.villaId);
    const review = form.querySelector<HTMLElement>('[data-done-review]');
    if (review) {
      const rows: [string, string][] = [
        ['チェックイン', checkIn ? formatDate(parseDate(checkIn)) : '—'],
        ['チェックアウト', checkIn ? formatDate(addDays(parseDate(checkIn), stay.nights)) : '—'],
        ['ヴィラ', villa.name],
        ['泊数・人数', `${stay.nights} 泊 / ${stay.guests} 名`],
        ['合計', yen(result.total)],
      ];
      review.innerHTML = '';
      for (const [label, value] of rows) {
        const wrapper = document.createElement('div');
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        wrapper.append(dt, dd);
        review.append(wrapper);
      }
    }

    for (const id of STEPS) {
      const panel = form.querySelector<HTMLElement>(`[data-panel="${id}"]`);
      if (panel) panel.hidden = true;
    }
    root.querySelector<HTMLElement>('[data-step-nav]')!.hidden = true;
    const progressBar = root.querySelector<HTMLElement>('[data-progress]');
    if (progressBar) progressBar.hidden = true;
    navRow.hidden = true;
    mobileBar.hidden = true;
    donePanel.hidden = false;
    donePanel.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  function fail(key: string, field: HTMLElement | null, message: string): false {
    const target = form.querySelector<HTMLElement>(`[data-error="${key}"]`);
    if (target) target.textContent = message;
    field?.setAttribute('aria-invalid', 'true');
    return false;
  }

  function clearError(key: string): void {
    const target = form.querySelector<HTMLElement>(`[data-error="${key}"]`);
    if (target) target.textContent = '';
    form.querySelector(`[name="${key}"], #${key}`)?.removeAttribute('aria-invalid');
  }

  function clearErrors(): void {
    for (const element of form.querySelectorAll<HTMLElement>('[data-error]')) element.textContent = '';
    for (const element of form.querySelectorAll<HTMLElement>('[aria-invalid]')) {
      element.removeAttribute('aria-invalid');
    }
  }

  function setText(selector: string, value: string): void {
    const element = root.querySelector<HTMLElement>(selector);
    if (element) element.textContent = value;
  }

  function toggleRow(name: string, visible: boolean): void {
    const row = root.querySelector<HTMLElement>(`[data-summary-row="${name}"]`);
    if (row) row.hidden = !visible;
  }
}

/** URL から届いたヴィラ指定を検証するためのヘルパー */
export function isVillaId(value: string): value is VillaId {
  return VILLAS.some((villa) => villa.id === value);
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function parseDate(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

function toIsoDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${WEEKDAYS[date.getDay()]}）`;
}
