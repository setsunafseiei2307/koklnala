import { VILLAS } from '../data/villas';
import type { VillaId } from '../data/pricing';

/**
 * 空室状況（架空のデモ用データ）。
 *
 * 実サービスでは在庫 API を叩く部分です。ここでは日付とヴィラ ID から
 * 決定的に状態を生成し、いつ・誰が開いても同じ結果になるようにしています
 * （ランダムだと再現できず、UI の検証もできないため）。
 * 週末は埋まりやすいなど、実際の予約サイトに近い偏りを持たせています。
 */

export type Availability = 'available' | 'few' | 'full';

export interface VillaAvailability {
  villaId: VillaId;
  status: Availability;
}

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: '空室あり',
  few: '残りわずか',
  full: '満室',
};

/** 1 泊分の状態 */
function statusForNight(dateIso: string, villaId: VillaId): Availability {
  const score = hash(`${dateIso}:${villaId}`) % 100;
  const day = new Date(`${dateIso}T00:00:00`).getDay();
  // 金・土は埋まりやすくする
  const weekendPressure = day === 5 || day === 6 ? 16 : 0;
  // MIST は 1 日 1 組しか泊まれない想定で、もっとも埋まりやすい
  const scarcity = villaId === 'mist' ? 8 : villaId === 'stone' ? 4 : 0;
  const adjusted = score - weekendPressure - scarcity;

  if (adjusted < 16) return 'full';
  if (adjusted < 42) return 'few';
  return 'available';
}

/** 連泊時は、期間内で最も厳しい状態を返す */
export function availabilityFor(dateIso: string, villaId: VillaId, nights = 1): Availability {
  const start = new Date(`${dateIso}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 'available';

  let worst: Availability = 'available';
  for (let index = 0; index < Math.max(1, nights); index += 1) {
    const date = new Date(start);
    date.setDate(date.getDate() + index);
    const status = statusForNight(toIso(date), villaId);
    if (status === 'full') return 'full';
    if (status === 'few') worst = 'few';
  }
  return worst;
}

export function availabilityForAll(dateIso: string, nights = 1): VillaAvailability[] {
  return VILLAS.map((villa) => ({
    villaId: villa.id,
    status: availabilityFor(dateIso, villa.id, nights),
  }));
}

/** 予約可能な棟（満室以外）の数 */
export function vacantCount(dateIso: string, nights = 1): number {
  return availabilityForAll(dateIso, nights).filter((entry) => entry.status !== 'full').length;
}

function toIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** FNV-1a。短い文字列を安定した数値へ変換する */
function hash(value: string): number {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result ^= value.charCodeAt(index);
    result = Math.imul(result, 16777619);
  }
  return result >>> 0;
}
