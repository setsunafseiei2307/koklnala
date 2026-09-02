import { describe, expect, it } from 'vitest';
import {
  DEFAULT_STAY,
  availableOptions,
  estimate,
  normalizeStay,
  yen,
} from '../src/lib/pricing';
import {
  BATHING_TAX_PER_GUEST_NIGHT,
  EXTRA_GUEST_RATE,
  MEAL_RATE,
  STAY_LIMITS,
  VILLA_BASE_RATE,
} from '../src/data/pricing';

describe('estimate / 宿泊料金', () => {
  it('1泊2名・食事なしは基本料金と入湯税のみ', () => {
    const result = estimate({ villaId: 'forest', guests: 2, nights: 1, mealPlanId: 'none', optionIds: [] });
    expect(result.accommodationBase).toBe(VILLA_BASE_RATE.forest);
    expect(result.accommodationDiscount).toBe(0);
    expect(result.mealTotal).toBe(0);
    expect(result.optionTotal).toBe(0);
    expect(result.bathingTax).toBe(BATHING_TAX_PER_GUEST_NIGHT * 2);
    expect(result.total).toBe(VILLA_BASE_RATE.forest + BATHING_TAX_PER_GUEST_NIGHT * 2);
  });

  it('3名目以降は追加料金が加算される', () => {
    const two = estimate({ villaId: 'forest', guests: 2, nights: 1, mealPlanId: 'none' });
    const four = estimate({ villaId: 'forest', guests: 4, nights: 1, mealPlanId: 'none' });
    expect(four.accommodationBase - two.accommodationBase).toBe(EXTRA_GUEST_RATE * 2);
  });

  it('食事は 1名 × 1泊 単位で計算される', () => {
    const result = estimate({ villaId: 'stone', guests: 3, nights: 2, mealPlanId: 'half-board' });
    expect(result.mealTotal).toBe((MEAL_RATE.dinner + MEAL_RATE.breakfast) * 3 * 2);
    expect(result.mealLines).toHaveLength(2);
    expect(result.mealLines[0]?.amount).toBe(MEAL_RATE.dinner * 3 * 2);
    expect(result.mealLines[1]?.amount).toBe(MEAL_RATE.breakfast * 3 * 2);
  });

  it('朝食のみプランは夕食を含まない', () => {
    const result = estimate({ villaId: 'mist', guests: 2, nights: 1, mealPlanId: 'breakfast' });
    expect(result.mealTotal).toBe(MEAL_RATE.breakfast * 2);
    expect(result.mealLines.map((line) => line.id)).toEqual(['breakfast']);
  });

  it('2泊で 8%、3泊で 12% の連泊割引が宿泊料金にかかる', () => {
    const twoNights = estimate({ villaId: 'mist', guests: 2, nights: 2, mealPlanId: 'none' });
    expect(twoNights.accommodationDiscount).toBe(-Math.round(VILLA_BASE_RATE.mist * 2 * 0.08));
    expect(twoNights.accommodationTotal).toBe(twoNights.accommodationBase + twoNights.accommodationDiscount);

    const threeNights = estimate({ villaId: 'mist', guests: 2, nights: 3, mealPlanId: 'none' });
    expect(threeNights.accommodationDiscount).toBe(-Math.round(VILLA_BASE_RATE.mist * 3 * 0.12));
  });

  it('割引は食事・オプションには適用されない', () => {
    const result = estimate({
      villaId: 'stone',
      guests: 2,
      nights: 3,
      mealPlanId: 'half-board',
      optionIds: ['bonfire'],
    });
    expect(result.mealTotal).toBe((MEAL_RATE.dinner + MEAL_RATE.breakfast) * 2 * 3);
    expect(result.optionTotal).toBe(6_000);
  });

  it('per-night オプションは泊数分、per-stay は 1 回だけ加算される', () => {
    const result = estimate({
      villaId: 'forest',
      guests: 2,
      nights: 3,
      mealPlanId: 'none',
      optionIds: ['wood-sauna', 'pickup'],
    });
    expect(result.optionLines.find((line) => line.id === 'wood-sauna')?.amount).toBe(8_000 * 3);
    expect(result.optionLines.find((line) => line.id === 'pickup')?.amount).toBe(12_000);
    expect(result.optionTotal).toBe(8_000 * 3 + 12_000);
  });

  it('対象外ヴィラのオプションは無視される', () => {
    const result = estimate({ villaId: 'mist', guests: 2, nights: 1, optionIds: ['wood-sauna'] });
    expect(result.optionLines).toHaveLength(0);
    expect(result.input.optionIds).toEqual([]);
    expect(availableOptions('mist').map((option) => option.id)).not.toContain('wood-sauna');
  });

  it('合計は各項目の和と一致する', () => {
    const result = estimate({
      villaId: 'stone',
      guests: 4,
      nights: 2,
      mealPlanId: 'half-board',
      optionIds: ['bonfire', 'pickup'],
    });
    expect(result.total).toBe(
      result.accommodationTotal + result.mealTotal + result.optionTotal + result.bathingTax,
    );
    expect(result.perGuestPerNight).toBe(Math.round(result.total / 8));
  });
});

describe('normalizeStay / 入力値の丸め込み', () => {
  it('定員を超える人数はヴィラの上限に丸められる', () => {
    expect(normalizeStay({ villaId: 'mist', guests: 5 }).guests).toBe(2);
    expect(normalizeStay({ villaId: 'stone', guests: 9 }).guests).toBe(5);
  });

  it('泊数は 1〜7 に収まる', () => {
    expect(normalizeStay({ nights: 0 }).nights).toBe(STAY_LIMITS.minNights);
    expect(normalizeStay({ nights: 99 }).nights).toBe(STAY_LIMITS.maxNights);
  });

  it('未知の値はデフォルトへフォールバックする', () => {
    const result = normalizeStay({ villaId: 'penthouse' as never, mealPlanId: 'brunch' as never });
    expect(result.villaId).toBe(DEFAULT_STAY.villaId);
    expect(result.mealPlanId).toBe(DEFAULT_STAY.mealPlanId);
  });

  it('null / undefined でも既定値を返す', () => {
    expect(normalizeStay(null)).toEqual(DEFAULT_STAY);
    expect(normalizeStay(undefined)).toEqual(DEFAULT_STAY);
  });

  it('数値文字列（URL パラメータ）を受け付ける', () => {
    const result = normalizeStay({ guests: '3' as never, nights: '2' as never, villaId: 'stone' });
    expect(result.guests).toBe(3);
    expect(result.nights).toBe(2);
  });

  it('オプションの重複は取り除かれる', () => {
    expect(normalizeStay({ villaId: 'forest', optionIds: ['bonfire', 'bonfire'] }).optionIds).toEqual(['bonfire']);
  });
});

describe('yen / 表示フォーマット', () => {
  it('3桁区切りと通貨記号を付ける', () => {
    expect(yen(68000)).toBe('¥68,000');
    expect(yen(0)).toBe('¥0');
    expect(yen(-1200)).toBe('¥-1,200');
  });
});
