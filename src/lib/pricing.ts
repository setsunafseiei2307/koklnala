import {
  BATHING_TAX_PER_GUEST_NIGHT,
  EXTRA_GUEST_RATE,
  MEAL_PLANS,
  MULTI_NIGHT_DISCOUNT,
  STAY_LIMITS,
  STAY_OPTIONS,
  VILLA_BASE_RATE,
  type MealPlanId,
  type StayOption,
  type VillaId,
} from '../data/pricing';
import { VILLAS, getVilla } from '../data/villas';

export interface StayInput {
  villaId: VillaId;
  guests: number;
  nights: number;
  mealPlanId: MealPlanId;
  optionIds: readonly string[];
}

export interface PriceLine {
  id: string;
  label: string;
  detail: string;
  amount: number;
}

export interface PriceBreakdown {
  input: StayInput;
  /** 割引前の宿泊料金 */
  accommodationBase: number;
  /** 連泊割引（負の値） */
  accommodationDiscount: number;
  accommodationDiscountLabel: string | null;
  accommodationTotal: number;
  mealTotal: number;
  mealLines: PriceLine[];
  optionTotal: number;
  optionLines: PriceLine[];
  /** 現地精算の入湯税（total に含む） */
  bathingTax: number;
  total: number;
  perGuestPerNight: number;
}

export const DEFAULT_STAY: StayInput = {
  villaId: 'forest',
  guests: 2,
  nights: 1,
  mealPlanId: 'half-board',
  optionIds: [],
};

/** 指定ヴィラで有効なオプションのみを返す */
export function availableOptions(villaId: VillaId): StayOption[] {
  return STAY_OPTIONS.filter((option) => !option.onlyFor || option.onlyFor.includes(villaId));
}

export function findMealPlan(id: MealPlanId) {
  return MEAL_PLANS.find((plan) => plan.id === id) ?? MEAL_PLANS[0]!;
}

/** 入力値をヴィラの定員・宿泊数の上下限に丸める（UI とロジックで共通利用） */
export function normalizeStay(input: Partial<StayInput> | null | undefined): StayInput {
  const villaId: VillaId = input?.villaId && villaExists(input.villaId) ? input.villaId : DEFAULT_STAY.villaId;
  const villa = getVilla(villaId);
  const guests = clamp(
    Math.round(toNumber(input?.guests, DEFAULT_STAY.guests)),
    STAY_LIMITS.minGuests,
    villa.capacity.max,
  );
  const nights = clamp(
    Math.round(toNumber(input?.nights, DEFAULT_STAY.nights)),
    STAY_LIMITS.minNights,
    STAY_LIMITS.maxNights,
  );
  const mealPlanId: MealPlanId = MEAL_PLANS.some((plan) => plan.id === input?.mealPlanId)
    ? (input!.mealPlanId as MealPlanId)
    : DEFAULT_STAY.mealPlanId;
  const allowed = new Set(availableOptions(villaId).map((option) => option.id));
  const optionIds = [...new Set(input?.optionIds ?? [])].filter((id) => allowed.has(id));

  return { villaId, guests, nights, mealPlanId, optionIds };
}

export function estimate(rawInput: Partial<StayInput>): PriceBreakdown {
  const input = normalizeStay(rawInput);
  const { villaId, guests, nights, mealPlanId, optionIds } = input;

  const baseRate = VILLA_BASE_RATE[villaId];
  const extraGuests = Math.max(0, guests - 2);
  const accommodationBase = (baseRate + extraGuests * EXTRA_GUEST_RATE) * nights;

  const discount = MULTI_NIGHT_DISCOUNT.find((tier) => nights >= tier.minNights);
  const accommodationDiscount = discount ? -Math.round(accommodationBase * discount.rate) : 0;
  const accommodationTotal = accommodationBase + accommodationDiscount;

  const plan = findMealPlan(mealPlanId);
  const mealLines: PriceLine[] = [];
  if (plan.includes.dinner) {
    mealLines.push(mealLine('dinner', '夕食', guests, nights));
  }
  if (plan.includes.breakfast) {
    mealLines.push(mealLine('breakfast', '朝食', guests, nights));
  }
  const mealTotal = sum(mealLines);

  const optionLines: PriceLine[] = availableOptions(villaId)
    .filter((option) => optionIds.includes(option.id))
    .map((option) => {
      const quantity = option.unit === 'per-night' ? nights : 1;
      return {
        id: option.id,
        label: option.label,
        detail: option.unit === 'per-night' ? `${yen(option.price)} × ${nights}泊` : '滞在につき',
        amount: option.price * quantity,
      };
    });
  const optionTotal = sum(optionLines);

  const bathingTax = BATHING_TAX_PER_GUEST_NIGHT * guests * nights;
  const total = accommodationTotal + mealTotal + optionTotal + bathingTax;

  return {
    input,
    accommodationBase,
    accommodationDiscount,
    accommodationDiscountLabel: discount?.label ?? null,
    accommodationTotal,
    mealTotal,
    mealLines,
    optionTotal,
    optionLines,
    bathingTax,
    total,
    perGuestPerNight: Math.round(total / (guests * nights)),
  };
}

/** 「68,000円〜」のような最低料金表示用 */
export function fromRate(villaId: VillaId): number {
  return VILLA_BASE_RATE[villaId];
}

export function yen(value: number): string {
  return `¥${Math.round(value).toLocaleString('ja-JP')}`;
}

export function yenPlain(value: number): string {
  return Math.round(value).toLocaleString('ja-JP');
}

function mealLine(id: 'dinner' | 'breakfast', label: string, guests: number, nights: number): PriceLine {
  const rate = id === 'dinner' ? MEAL_RATE_MAP.dinner : MEAL_RATE_MAP.breakfast;
  return {
    id,
    label,
    detail: `${yen(rate)} × ${guests}名 × ${nights}泊`,
    amount: rate * guests * nights,
  };
}

const MEAL_RATE_MAP = {
  dinner: findMealRate('dinner'),
  breakfast: findMealRate('breakfast'),
};

function findMealRate(kind: 'dinner' | 'breakfast'): number {
  const halfBoard = MEAL_PLANS.find((plan) => plan.id === 'half-board')!;
  const breakfastOnly = MEAL_PLANS.find((plan) => plan.id === 'breakfast')!;
  return kind === 'breakfast'
    ? breakfastOnly.perGuestPerNight
    : halfBoard.perGuestPerNight - breakfastOnly.perGuestPerNight;
}

function sum(lines: PriceLine[]): number {
  return lines.reduce((total, line) => total + line.amount, 0);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function toNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === 'string' ? Number.parseInt(value, 10) : Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function villaExists(id: string): id is VillaId {
  return VILLAS.some((villa) => villa.id === id);
}
