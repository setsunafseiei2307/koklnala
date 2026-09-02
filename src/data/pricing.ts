/**
 * 料金定義（すべて架空 / CONCEPT PROJECT）
 * 表示価格は税・サービス料込み。入湯税のみ現地精算として別建てで計算する。
 * UI 側に金額をベタ書きせず、必ずこの定数を参照すること。
 */

export const CURRENCY = 'JPY' as const;

/** ヴィラ 1 棟 1 泊あたりの基本料金（2名まで） */
export const VILLA_BASE_RATE = {
  forest: 68_000,
  stone: 82_000,
  mist: 96_000,
} as const;

export type VillaId = keyof typeof VILLA_BASE_RATE;

/** 3 名以降 1 名 1 泊あたりの追加料金 */
export const EXTRA_GUEST_RATE = 12_000;

/** 食事（1 名 1 泊あたり） */
export const MEAL_RATE = {
  dinner: 12_000,
  breakfast: 4_000,
} as const;

export type MealPlanId = 'none' | 'breakfast' | 'half-board';

export interface MealPlan {
  id: MealPlanId;
  label: string;
  labelEn: string;
  note: string;
  /** 1 名 1 泊あたりの合計 */
  perGuestPerNight: number;
  includes: { dinner: boolean; breakfast: boolean };
}

export const MEAL_PLANS: readonly MealPlan[] = [
  {
    id: 'none',
    label: '食事なし',
    labelEn: 'ROOM ONLY',
    note: '客室のキッチンと薪グリルは自由にお使いいただけます。',
    perGuestPerNight: 0,
    includes: { dinner: false, breakfast: false },
  },
  {
    id: 'breakfast',
    label: '朝食付き',
    labelEn: 'BREAKFAST',
    note: '朝はヴィラへお届けします。時間は前夜にお決めください。',
    perGuestPerNight: MEAL_RATE.breakfast,
    includes: { dinner: false, breakfast: true },
  },
  {
    id: 'half-board',
    label: '夕食・朝食付き',
    labelEn: 'HALF BOARD',
    note: '夕食は月替わりのコース。ヴィラのダイニングで供します。',
    perGuestPerNight: MEAL_RATE.dinner + MEAL_RATE.breakfast,
    includes: { dinner: true, breakfast: true },
  },
] as const;

export type OptionUnit = 'per-stay' | 'per-night';

export interface StayOption {
  id: string;
  label: string;
  labelEn: string;
  note: string;
  price: number;
  unit: OptionUnit;
  /** 対象ヴィラを限定する場合に指定 */
  onlyFor?: readonly VillaId[];
}

export const STAY_OPTIONS: readonly StayOption[] = [
  {
    id: 'wood-sauna',
    label: '薪サウナ アップグレード',
    labelEn: 'WOOD-FIRED SAUNA',
    note: '電気ストーブを薪ストーブへ。火入れは滞在の 1 時間前から。',
    price: 8_000,
    unit: 'per-night',
    onlyFor: ['forest'],
  },
  {
    id: 'bonfire',
    label: 'プライベート焚き火',
    labelEn: 'BONFIRE',
    note: '薪、火床、ブランケット、火の番。日没後 3 時間。',
    price: 6_000,
    unit: 'per-stay',
  },
  {
    id: 'pickup',
    label: '小田原駅 送迎',
    labelEn: 'PICK-UP',
    note: '往復・1 台あたり。前日までにご連絡ください。',
    price: 12_000,
    unit: 'per-stay',
  },
] as const;

/** 連泊割引（宿泊料金にのみ適用） */
export const MULTI_NIGHT_DISCOUNT = [
  { minNights: 3, rate: 0.12, label: '3 泊以上 12% OFF' },
  { minNights: 2, rate: 0.08, label: '2 泊以上 8% OFF' },
] as const;

/** 入湯税（1 名 1 泊・現地精算） */
export const BATHING_TAX_PER_GUEST_NIGHT = 150;

export const STAY_LIMITS = {
  minNights: 1,
  maxNights: 7,
  minGuests: 1,
} as const;
