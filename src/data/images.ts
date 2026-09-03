/**
 * 画像アセット定義（サイト全体で 1 本の撮影として設計している）。
 *
 * - id       : ファイル名（src/assets/images/<id>.webp）と参照キー
 * - ratio    : レイアウト上の比率。プレースホルダ生成と CSS の aspect-ratio に使う
 * - width    : 納品時の推奨長辺（px）
 * - tone     : プレースホルダの色設計（実写差し替え後は未使用）
 * - priority : 1 = 最優先（HERO 等）/ 2 = 主要 / 3 = 補助
 */

export type ImageId =
  | 'hero'
  | 'forest-villa-exterior'
  | 'forest-villa-interior'
  | 'stone-villa-exterior'
  | 'stone-villa-interior'
  | 'mist-villa-exterior'
  | 'mist-villa-interior'
  | 'sauna-interior'
  | 'sauna-stove'
  | 'cold-bath'
  | 'outdoor-rest'
  | 'dinner'
  | 'breakfast'
  | 'bonfire'
  | 'forest-morning'
  | 'architecture-detail'
  | 'tea-detail'
  | 'bath'
  | 'night-exterior'
  | 'og-image';

export type ImageTone =
  | 'blue-hour'
  | 'forest'
  | 'mist'
  | 'stone'
  | 'interior'
  | 'ember'
  | 'sauna'
  | 'water'
  | 'food'
  | 'night';

export interface ImageAsset {
  id: ImageId;
  ratio: [number, number];
  width: number;
  tone: ImageTone;
  priority: 1 | 2 | 3;
  /** 既定の代替テキスト。文脈で上書きしてよい */
  alt: string;
  usage: string;
}

export const IMAGES: readonly ImageAsset[] = [
  {
    id: 'hero',
    ratio: [16, 9],
    width: 2560,
    tone: 'blue-hour',
    priority: 1,
    alt: '夕暮れの森に建つヴィラ。室内の暖色の光が大きな窓から漏れている。',
    usage: 'TOP / HERO',
  },
  {
    id: 'forest-villa-exterior',
    ratio: [3, 2],
    width: 1920,
    tone: 'forest',
    priority: 1,
    alt: '森の斜面から張り出したフォレストヴィラの外観。',
    usage: 'TOP / STAY, STAY 一覧・詳細',
  },
  {
    id: 'forest-villa-interior',
    ratio: [3, 2],
    width: 1920,
    tone: 'interior',
    priority: 2,
    alt: 'フォレストヴィラの室内。無垢材の床と土壁、窓の外の森。',
    usage: 'STAY 詳細',
  },
  {
    id: 'stone-villa-exterior',
    ratio: [3, 2],
    width: 1920,
    tone: 'stone',
    priority: 1,
    alt: 'ストーンヴィラの外観。安山岩の壁と深い軒。',
    usage: 'TOP / STAY, STAY 一覧・詳細',
  },
  {
    id: 'stone-villa-interior',
    ratio: [3, 2],
    width: 1920,
    tone: 'ember',
    priority: 2,
    alt: 'ストーンヴィラの室内。石壁と土間、中央の薪ストーブ。',
    usage: 'STAY 詳細',
  },
  {
    id: 'mist-villa-exterior',
    ratio: [3, 2],
    width: 1920,
    tone: 'mist',
    priority: 1,
    alt: '朝霧のなかのミストヴィラ外観。尾根の先端に建つ低い建築。',
    usage: 'TOP / STAY, STAY 一覧・詳細',
  },
  {
    id: 'mist-villa-interior',
    ratio: [3, 2],
    width: 1920,
    tone: 'mist',
    priority: 2,
    alt: 'ミストヴィラの室内。三方の窓と低いベッド、霧に沈む谷。',
    usage: 'STAY 詳細',
  },
  {
    id: 'sauna-interior',
    ratio: [3, 2],
    width: 1920,
    tone: 'sauna',
    priority: 1,
    alt: '天然木のプライベートサウナ。間接照明のみの静かな室内。',
    usage: 'TOP / SAUNA, SAUNA ページ',
  },
  {
    id: 'sauna-stove',
    ratio: [2, 3],
    width: 1400,
    tone: 'ember',
    priority: 2,
    alt: 'サウナストーブに積まれた石と、木の柄杓。',
    usage: 'SAUNA ページ, GALLERY',
  },
  {
    id: 'cold-bath',
    ratio: [3, 2],
    width: 1920,
    tone: 'water',
    priority: 2,
    alt: '石造りの水風呂。朝の光が水面に落ちている。',
    usage: 'SAUNA ページ, GALLERY',
  },
  {
    id: 'outdoor-rest',
    ratio: [2, 3],
    width: 1400,
    tone: 'forest',
    priority: 2,
    alt: '森のなかの外気浴スペース。木のチェアとブランケット。',
    usage: 'SAUNA ページ, GALLERY',
  },
  {
    id: 'dinner',
    ratio: [3, 2],
    width: 1920,
    tone: 'food',
    priority: 1,
    alt: '炭火で仕上げた夕食の一皿。落ち着いた器と余白のある盛り付け。',
    usage: 'TOP / EXPERIENCE, EXPERIENCE ページ',
  },
  {
    id: 'breakfast',
    ratio: [3, 2],
    width: 1920,
    tone: 'food',
    priority: 2,
    alt: '和朝食の膳。土鍋のごはんと汁物、焼き魚。',
    usage: 'EXPERIENCE ページ',
  },
  {
    id: 'bonfire',
    ratio: [3, 2],
    width: 1920,
    tone: 'ember',
    priority: 1,
    alt: '夜のテラスの焚き火。背後にヴィラの灯りと森。',
    usage: 'TOP / EXPERIENCE, EXPERIENCE ページ',
  },
  {
    id: 'forest-morning',
    ratio: [2, 3],
    width: 1400,
    tone: 'mist',
    priority: 2,
    alt: '朝霧のなかの静かな森。',
    usage: 'EXPERIENCE, ACCESS, GALLERY',
  },
  {
    id: 'architecture-detail',
    ratio: [1, 1],
    width: 1400,
    tone: 'stone',
    priority: 3,
    alt: '焼き杉と石の取り合いに落ちる光。',
    usage: 'INTRODUCTION, GALLERY',
  },
  {
    id: 'tea-detail',
    ratio: [1, 1],
    width: 1400,
    tone: 'interior',
    priority: 3,
    alt: '客室の茶器。鉄瓶と湯呑み、木のトレー。',
    usage: 'GALLERY, STAY',
  },
  {
    id: 'bath',
    ratio: [3, 2],
    width: 1920,
    tone: 'water',
    priority: 2,
    alt: '森に面した露天風呂。湯気と樹木のシルエット。',
    usage: 'STAY, GALLERY',
  },
  {
    id: 'night-exterior',
    ratio: [3, 2],
    width: 1920,
    tone: 'night',
    priority: 2,
    alt: '夜のヴィラ外観。窓から漏れる暖色の光と暗い森。',
    usage: 'FINAL CTA, GALLERY',
  },
  {
    id: 'og-image',
    ratio: [1200, 630],
    width: 1200,
    tone: 'blue-hour',
    priority: 3,
    alt: 'EMBER & MOSS のシェア用画像。',
    usage: 'OGP / SNS シェア',
  },
] as const;

export function getImage(id: ImageId): ImageAsset {
  const asset = IMAGES.find((image) => image.id === id);
  if (!asset) throw new Error(`Unknown image asset: ${id}`);
  return asset;
}

export function aspectRatio(id: ImageId): string {
  const [w, h] = getImage(id).ratio;
  return `${w} / ${h}`;
}
