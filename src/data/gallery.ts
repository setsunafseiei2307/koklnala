import type { ImageId } from './images';

export interface GalleryImage {
  id: ImageId;
  alt: string;
  caption: string;
  /** レイアウト上の比率。CSS の aspect-ratio と srcset 生成に使う */
  ratio: '3/2' | '2/3' | '1/1' | '16/9';
}

export const GALLERY: readonly GalleryImage[] = [
  { id: 'night-exterior', alt: '夜のヴィラ外観。窓から漏れる暖色の光と、暗い森。', caption: '20:40 / FOREST VILLA', ratio: '3/2' },
  { id: 'sauna-stove', alt: 'サウナストーブに積まれたサウナストーンと柄杓。', caption: 'ロウリュ / STONE VILLA', ratio: '2/3' },
  { id: 'bath', alt: '森に面した露天風呂。湯気と樹木のシルエット。', caption: '露天風呂 / MIST VILLA', ratio: '3/2' },
  { id: 'forest-morning', alt: '朝霧に沈む森。細い幹が奥へ続く。', caption: '6:15 / 敷地の裏手', ratio: '2/3' },
  { id: 'tea-detail', alt: '客室の茶器。鉄瓶と湯呑み、木のトレー。', caption: '茶の道具 / 客室', ratio: '1/1' },
  { id: 'cold-bath', alt: '石造りの水風呂。水面に朝の光。', caption: '水風呂 / 12–15℃', ratio: '3/2' },
  { id: 'outdoor-rest', alt: '森のなかの外気浴スペース。木のチェアとブランケット。', caption: '外気浴 / テラス', ratio: '2/3' },
  { id: 'architecture-detail', alt: '焼き杉と石の取り合い。素材の境目に落ちる影。', caption: 'ディテール / 焼き杉と石', ratio: '1/1' },
] as const;
