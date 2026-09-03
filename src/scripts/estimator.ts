/**
 * TOP のかんたん料金シミュレーター。
 * 入力を pricing ロジックへ渡し、合計と各明細をその場で更新する。
 * 状態は URL / localStorage に保存し、BOOKING ページへ引き継ぐ。
 */
import { estimate, normalizeStay, yen, type StayInput } from '../lib/pricing';
import { getVilla } from '../data/villas';
import type { MealPlanId, VillaId } from '../data/pricing';
import { persistStay, readStay, syncUrl, toQuery } from './stay-state';

export function initEstimator(): void {
  const form = document.querySelector<HTMLFormElement>('[data-estimator]');
  if (!form) return;

  const guestsInput = form.querySelector<HTMLInputElement>('[data-input="guests"]');
  const nightsInput = form.querySelector<HTMLInputElement>('[data-input="nights"]');
  const cta = form.querySelector<HTMLAnchorElement>('[data-estimator-cta]');
  const guestHint = form.querySelector<HTMLElement>('[data-guest-hint]');
  if (!guestsInput || !nightsInput || !cta) return;

  const stored = readStay();
  let state: StayInput = normalizeStay(stored);
  const checkIn = stored.checkIn;

  const applyToForm = (): void => {
    guestsInput.value = String(state.guests);
    nightsInput.value = String(state.nights);
    guestsInput.max = String(getVilla(state.villaId).capacity.max);
    for (const input of form.querySelectorAll<HTMLInputElement>('input[name="villa"]')) {
      input.checked = input.value === state.villaId;
    }
    for (const input of form.querySelectorAll<HTMLInputElement>('input[name="meal"]')) {
      input.checked = input.value === state.mealPlanId;
    }
    for (const button of form.querySelectorAll<HTMLButtonElement>('[data-step]')) {
      const field = button.dataset.step === 'guests' ? guestsInput : nightsInput;
      const delta = Number(button.dataset.delta);
      const next = Number(field.value) + delta;
      button.disabled = next < Number(field.min) || next > Number(field.max);
    }
  };

  const render = (): void => {
    const result = estimate(state);
    setText('[data-line="accommodation"]', yen(result.accommodationTotal));
    setText('[data-line="meals"]', yen(result.mealTotal));
    setText('[data-line="tax"]', yen(result.bathingTax));
    setText('[data-total]', yen(result.total));
    setText('[data-per-night]', `1 名 1 泊あたり ${yen(result.perGuestPerNight)}`);

    const discountRow = form.querySelector<HTMLElement>('[data-line-row="discount"]');
    if (discountRow) {
      discountRow.hidden = result.accommodationDiscount === 0;
      setText('[data-line="discount"]', yen(result.accommodationDiscount));
      setText('[data-line="discount-label"]', result.accommodationDiscountLabel ?? '連泊割引');
    }

    const villa = getVilla(state.villaId);
    if (guestHint) {
      guestHint.textContent =
        state.guests >= villa.capacity.max
          ? `${villa.name} の定員は ${villa.capacity.max} 名です`
          : '3 名以降は +12,000円 / 名・泊';
    }

    cta.href = `/booking/?${toQuery({ ...state, checkIn })}`;
    persistStay({ ...state, checkIn });
    syncUrl({ ...state, checkIn });
  };

  const update = (patch: Partial<StayInput>): void => {
    state = normalizeStay({ ...state, ...patch });
    applyToForm();
    render();
  };

  const setText = (selector: string, value: string): void => {
    const element = form.querySelector<HTMLElement>(selector);
    if (element) element.textContent = value;
  };

  form.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'villa') update({ villaId: target.value as VillaId });
    if (target.name === 'meal') update({ mealPlanId: target.value as MealPlanId });
    if (target === guestsInput) update({ guests: Number(target.value) });
    if (target === nightsInput) update({ nights: Number(target.value) });
  });

  form.addEventListener('input', (event) => {
    const target = event.target as HTMLInputElement;
    if (target === guestsInput || target === nightsInput) {
      if (target.value === '') return;
      update(target === guestsInput ? { guests: Number(target.value) } : { nights: Number(target.value) });
    }
  });

  for (const button of form.querySelectorAll<HTMLButtonElement>('[data-step]')) {
    button.addEventListener('click', () => {
      const delta = Number(button.dataset.delta);
      if (button.dataset.step === 'guests') update({ guests: state.guests + delta });
      else update({ nights: state.nights + delta });
    });
  }

  // フォーム送信は使わない（見積もりのみ）
  form.addEventListener('submit', (event) => event.preventDefault());

  applyToForm();
  render();
}
