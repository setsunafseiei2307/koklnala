/**
 * 宿泊条件（人数・泊数・ヴィラ・食事・オプション）の保持。
 *
 * TOP のシミュレーターと BOOKING ページで同じ状態を共有するため、
 * URL クエリ（共有・戻る操作に強い）と localStorage（再訪時の復元）の
 * 両方へ書き出す。localStorage が使えない環境でも動作を止めない。
 */
import { normalizeStay, type StayInput } from '../lib/pricing';
import type { MealPlanId, VillaId } from '../data/pricing';

const STORAGE_KEY = 'ember-moss:stay';

export interface StoredStay extends StayInput {
  /** チェックイン日（YYYY-MM-DD）。未定のままでも見積もりは出せる */
  checkIn?: string;
}

export function readStay(search: string = window.location.search): StoredStay {
  const params = new URLSearchParams(search);
  const fromQuery = {
    villaId: params.get('villa') as VillaId | null,
    guests: params.get('guests'),
    nights: params.get('nights'),
    mealPlanId: params.get('meal') as MealPlanId | null,
    optionIds: params.get('options')?.split(',').filter(Boolean),
    checkIn: params.get('date'),
  };

  const hasQuery = [...params.keys()].some((key) =>
    ['villa', 'guests', 'nights', 'meal', 'options', 'date'].includes(key),
  );

  const stored = hasQuery ? null : readStorage();
  const source = hasQuery
    ? {
        villaId: fromQuery.villaId ?? undefined,
        guests: fromQuery.guests ? Number(fromQuery.guests) : undefined,
        nights: fromQuery.nights ? Number(fromQuery.nights) : undefined,
        mealPlanId: fromQuery.mealPlanId ?? undefined,
        optionIds: fromQuery.optionIds,
      }
    : (stored ?? {});

  const stay = normalizeStay(source);
  const checkIn = hasQuery ? (fromQuery.checkIn ?? undefined) : stored?.checkIn;
  return { ...stay, checkIn: isValidDate(checkIn) ? checkIn : undefined };
}

export function persistStay(stay: StoredStay): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stay));
  } catch {
    // プライベートブラウジング等では保存を諦める（機能は継続）
  }
}

export function toQuery(stay: StoredStay): string {
  const params = new URLSearchParams({
    villa: stay.villaId,
    guests: String(stay.guests),
    nights: String(stay.nights),
    meal: stay.mealPlanId,
  });
  if (stay.optionIds.length > 0) params.set('options', stay.optionIds.join(','));
  if (stay.checkIn) params.set('date', stay.checkIn);
  return params.toString();
}

/** 履歴を汚さずに現在の条件を URL へ反映する */
export function syncUrl(stay: StoredStay): void {
  const url = `${window.location.pathname}?${toQuery(stay)}${window.location.hash}`;
  window.history.replaceState(null, '', url);
}

function readStorage(): StoredStay | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredStay>;
    return { ...normalizeStay(parsed), checkIn: parsed.checkIn };
  } catch {
    return null;
  }
}

function isValidDate(value: string | null | undefined): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime());
}
