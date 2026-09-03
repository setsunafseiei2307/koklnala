import type { ImageId } from './images';
import { VILLA_BASE_RATE, type VillaId } from './pricing';

export interface VillaSpec {
  label: string;
  value: string;
}

export interface Villa {
  id: VillaId;
  slug: string;
  /** 英字表記（装飾・見出し用） */
  name: string;
  /** 日本語の呼称 */
  nameJa: string;
  /** 一覧・詳細の導入コピー（1行） */
  tagline: string;
  /** 詳細ページ用の本文 */
  body: string[];
  capacity: { min: number; max: number; standard: number };
  area: string;
  terrace: string;
  bed: string;
  bath: string;
  sauna: string;
  view: string;
  /** 一覧で並べる主要スペック */
  specs: VillaSpec[];
  amenities: string[];
  /** 他の部屋との違いを一言で */
  bestFor: string;
  exterior: { id: ImageId; alt: string };
  interior: { id: ImageId; alt: string };
  /** 簡易間取り図（グリッド 12 × 8 上の矩形） */
  plan: {
    rooms: { x: number; y: number; w: number; h: number; label: string; tone?: 'deck' | 'water' | 'heat' }[];
    note: string;
  };
}

export const VILLAS: readonly Villa[] = [
  {
    id: 'forest',
    slug: 'forest-villa',
    name: 'FOREST VILLA',
    nameJa: 'フォレスト ヴィラ',
    tagline: '樹冠の高さに、床がある。',
    body: [
      '斜面から張り出した木造のヴィラです。床の高さは地面から約 4 メートル。窓の外に見えるのは幹ではなく、ブナとモミの枝先になります。',
      '内装は杉の無垢材と土壁。音を吸う素材だけで構成しているため、屋内は驚くほど静かです。夕方以降は照明を落とし、デッキの薪グリルに火を入れてください。',
      '3 棟のなかで最も汎用性が高く、はじめての滞在に向いています。',
    ],
    capacity: { min: 1, max: 4, standard: 2 },
    area: '78㎡',
    terrace: 'ウッドデッキ 18㎡',
    bed: 'キング 1 台 + デイベッド 2 台',
    bath: '檜の露天風呂（源泉ではない加温泉／掛け流し想定）',
    sauna: '電気ストーブ・セルフロウリュ（薪へのアップグレード可）',
    view: '東向き・樹冠',
    specs: [
      { label: '定員', value: '1 – 4 名' },
      { label: '広さ', value: '78㎡ + デッキ 18㎡' },
      { label: 'ベッド', value: 'キング 1 / デイベッド 2' },
      { label: '風呂', value: '檜の露天風呂' },
      { label: 'サウナ', value: '電気・セルフロウリュ' },
    ],
    amenities: [
      '薪グリル付きデッキ',
      'ミニキッチン（IH・冷蔵庫・製氷）',
      '土鍋・鉄瓶・急須',
      'レコードプレーヤー',
      '床暖房',
      'Wi-Fi 6',
    ],
    bestFor: '森を高い位置から眺めたい方、家族や 4 名までのグループに。',
    exterior: { id: 'forest-villa-exterior', alt: '森の斜面から張り出したフォレストヴィラの外観。杉材の外壁と大きなガラス面。' },
    interior: { id: 'forest-villa-interior', alt: 'フォレストヴィラの室内。無垢材の床と土壁、窓の外に広がる森。' },
    plan: {
      rooms: [
        { x: 0, y: 0, w: 7, h: 5, label: 'LIVING / DINING' },
        { x: 7, y: 0, w: 5, h: 3, label: 'BEDROOM' },
        { x: 7, y: 3, w: 3, h: 2, label: 'SAUNA', tone: 'heat' },
        { x: 10, y: 3, w: 2, h: 2, label: 'BATH', tone: 'water' },
        { x: 0, y: 5, w: 12, h: 3, label: 'DECK', tone: 'deck' },
      ],
      note: '東側全面がデッキ。サウナと風呂はデッキから直接行き来できます。',
    },
  },
  {
    id: 'stone',
    slug: 'stone-villa',
    name: 'STONE VILLA',
    nameJa: 'ストーン ヴィラ',
    tagline: '石が、昼の熱を夜まで持っている。',
    body: [
      '安山岩の壁と土間で構成した、3 棟でいちばん重い建物です。石は日中の熱を蓄え、夜になってゆっくり放します。暖房を強くしなくても、朝まで温度が落ちません。',
      '天井高は 4.2 メートル。中央に薪ストーブを据え、まわりに座れるようにしています。5 名まで泊まれるため、友人同士の滞在にも向きます。',
      'サウナは薪ストーブが標準。水風呂は屋外にあり、湯上がりに石の上へ直接寝転べます。',
    ],
    capacity: { min: 1, max: 5, standard: 2 },
    area: '96㎡',
    terrace: '石畳のテラス 24㎡',
    bed: 'キング 1 台 + ツイン 2 台 + 布団 1 組',
    bath: '石造りの露天風呂 + 屋外水風呂',
    sauna: '薪ストーブ・セルフロウリュ（標準装備）',
    view: '南向き・谷',
    specs: [
      { label: '定員', value: '1 – 5 名' },
      { label: '広さ', value: '96㎡ + テラス 24㎡' },
      { label: 'ベッド', value: 'キング 1 / ツイン 2 / 布団 1' },
      { label: '風呂', value: '石の露天風呂 + 水風呂' },
      { label: 'サウナ', value: '薪・セルフロウリュ' },
    ],
    amenities: [
      '薪ストーブ（室内）',
      '土間のダイニング 8 席',
      'フルキッチン',
      '屋外水風呂（通年 12–15℃想定）',
      'ワインセラー',
      '床暖房',
    ],
    bestFor: '人数が多い滞在、そして薪サウナを本命に来る方へ。',
    exterior: { id: 'stone-villa-exterior', alt: 'ストーンヴィラの外観。安山岩の壁と深い軒、石畳のテラス。' },
    interior: { id: 'stone-villa-interior', alt: 'ストーンヴィラの室内。石壁と土間、中央の薪ストーブ、高い天井。' },
    plan: {
      rooms: [
        { x: 0, y: 0, w: 6, h: 5, label: 'DOMA / LIVING' },
        { x: 6, y: 0, w: 6, h: 3, label: 'BEDROOM 1' },
        { x: 6, y: 3, w: 3, h: 2, label: 'BEDROOM 2' },
        { x: 9, y: 3, w: 3, h: 2, label: 'SAUNA', tone: 'heat' },
        { x: 0, y: 5, w: 8, h: 3, label: 'STONE TERRACE', tone: 'deck' },
        { x: 8, y: 5, w: 4, h: 3, label: 'BATH / COLD', tone: 'water' },
      ],
      note: 'サウナ → 屋外水風呂 → テラスの外気浴が一直線に並びます。',
    },
  },
  {
    id: 'mist',
    slug: 'mist-villa',
    name: 'MIST VILLA',
    nameJa: 'ミスト ヴィラ',
    tagline: '朝、霧が部屋の高さまで上がってくる。',
    body: [
      '尾根の先端に建つ 2 名専用のヴィラです。三方が窓で、晴れた日は谷の向こうまで見えます。ただし本当に良いのは、視界が白く閉じる朝です。',
      '面積は 3 棟でいちばん小さく、その代わり浴槽とサウナに面積を振っています。湯船は外気に接した縁で終わり、霧が出ると境目が分からなくなります。',
      '静けさを最優先した棟のため、定員は 2 名までとしています。',
    ],
    capacity: { min: 1, max: 2, standard: 2 },
    area: '64㎡',
    terrace: '張り出しテラス 20㎡',
    bed: 'キング 1 台',
    bath: '縁の見えない露天風呂 + 冷水シャワー',
    sauna: '薪ストーブ・パノラマ窓付き',
    view: '西向き・谷と稜線',
    specs: [
      { label: '定員', value: '1 – 2 名' },
      { label: '広さ', value: '64㎡ + テラス 20㎡' },
      { label: 'ベッド', value: 'キング 1' },
      { label: '風呂', value: '縁の見えない露天風呂' },
      { label: 'サウナ', value: '薪・パノラマ窓' },
    ],
    amenities: [
      'パノラマ窓のサウナ',
      '外気浴用チェア 2 脚',
      'ミニバー（ノンアルコール含む）',
      '茶器一式',
      '寝具はリネンとウールのみ',
      '室内照明はすべて調光式',
    ],
    bestFor: '2 名で、いちばん静かな時間を選びたい方へ。',
    exterior: { id: 'mist-villa-exterior', alt: '朝霧のなかに浮かぶミストヴィラの外観。尾根の先端に建つ低い建築。' },
    interior: { id: 'mist-villa-interior', alt: 'ミストヴィラの室内。三方の窓と低いベッド、霧に沈む谷の眺め。' },
    plan: {
      rooms: [
        { x: 0, y: 0, w: 7, h: 5, label: 'BED / LIVING' },
        { x: 7, y: 0, w: 5, h: 2, label: 'SAUNA', tone: 'heat' },
        { x: 7, y: 2, w: 5, h: 3, label: 'BATH', tone: 'water' },
        { x: 0, y: 5, w: 12, h: 3, label: 'TERRACE', tone: 'deck' },
      ],
      note: 'ベッドから浴槽まで 6 歩。夜は照明を落として湯に入れます。',
    },
  },
] as const;

export function getVilla(id: VillaId): Villa {
  const villa = VILLAS.find((item) => item.id === id);
  if (!villa) throw new Error(`Unknown villa: ${id}`);
  return villa;
}

export function getVillaBySlug(slug: string): Villa | undefined {
  return VILLAS.find((villa) => villa.slug === slug);
}

/** 「68,000円〜」表示に使う */
export function villaFromRate(id: VillaId): number {
  return VILLA_BASE_RATE[id];
}
