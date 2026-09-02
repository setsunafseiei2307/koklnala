import type { ImageId } from './images';

export interface Experience {
  id: string;
  label: string;
  labelJa: string;
  time: string;
  lead: string;
  body: string[];
  detail: { label: string; value: string }[];
  image: { id: ImageId; alt: string };
}

export const EXPERIENCES: readonly Experience[] = [
  {
    id: 'dinner',
    label: 'DINNER',
    labelJa: '夕食',
    time: '18:30 –',
    lead: '月替わりのコースを、ヴィラのダイニングで。',
    body: [
      '料理人が棟に入り、6 品を順に出します。食材は小田原の港と、御殿場・裾野の畑から。珍しいものを並べるより、火の入れ方で差が出る構成にしています。',
      'ダイニングは 8 席。他のお客様と同席することはありません。時間は 18:30 を基本に、30 分単位で前後できます。',
    ],
    detail: [
      { label: '料金', value: '12,000円 / 名' },
      { label: '構成', value: '前菜 / 椀 / 炭火 / 主菜 / 食事 / 甘味' },
      { label: '提供', value: 'ヴィラ内ダイニング' },
      { label: '対応', value: 'アレルギー・苦手食材は 3 日前まで' },
    ],
    image: { id: 'dinner', alt: '炭火で仕上げた主菜。落ち着いた器と余白のある盛り付け。' },
  },
  {
    id: 'breakfast',
    label: 'BREAKFAST',
    labelJa: '朝食',
    time: '8:00 – 10:00',
    lead: '土鍋の飯と、汁と、焼いた魚。',
    body: [
      '朝は届けるだけにしています。給仕は入りません。土鍋はそのまま火にかけられる状態で、炊き上がりまで 15 分。',
      '起きる時間が決まっていない朝のために、8 時から 10 時のあいだで指定できます。',
    ],
    detail: [
      { label: '料金', value: '4,000円 / 名' },
      { label: '構成', value: '土鍋ごはん / 汁 / 焼き魚 / 小鉢三種 / 香の物' },
      { label: '提供', value: 'ヴィラへお届け' },
      { label: '時間', value: '8:00 – 10:00 のあいだで指定' },
    ],
    image: { id: 'breakfast', alt: '和朝食の膳。土鍋のごはん、汁物、焼き魚、小鉢。' },
  },
  {
    id: 'bonfire',
    label: 'BONFIRE',
    labelJa: '焚き火',
    time: '日没後 3 時間',
    lead: '火が小さくなるまで、話すことは特にない。',
    body: [
      'テラスの火床に薪を組み、火を入れておきます。着火剤は使いません。針葉樹から広葉樹へ移る匂いの変化まで含めて、そういう時間です。',
      '薪、火ばさみ、ブランケット、ホットワイン用の鍋を用意します。消火は宿の担当が行うので、眠くなったらそのまま部屋へ戻ってください。',
    ],
    detail: [
      { label: '料金', value: '6,000円 / 滞在' },
      { label: '時間', value: '日没後から 3 時間' },
      { label: '内容', value: '薪・火床・ブランケット・火の番' },
      { label: '雨天', value: '軒下の火床へ移動（強風時は中止）' },
    ],
    image: { id: 'bonfire', alt: '夜のテラスの焚き火。背後にヴィラの灯りと森。' },
  },
  {
    id: 'forest-walk',
    label: 'FOREST WALK',
    labelJa: '森の散歩',
    time: '6:30 – / 約 50 分',
    lead: '霧が上がる前の時間に、尾根まで。',
    body: [
      '敷地から続く道を、ガイドと歩きます。距離は 2 キロ弱、高低差は 90 メートルほど。速く歩く必要はありません。',
      '春はミツバツツジ、夏は霧、秋はススキ、冬は霜柱。同じ道でも見えるものが変わります。',
    ],
    detail: [
      { label: '料金', value: '無料（宿泊者）' },
      { label: '所要', value: '約 50 分' },
      { label: '距離', value: '約 1.8km / 高低差 90m' },
      { label: '装備', value: '長靴・レインシェルは貸出' },
    ],
    image: { id: 'forest-morning', alt: '朝霧のなかの静かな森。細い道と苔むした地面。' },
  },
  {
    id: 'seasonal',
    label: 'SEASONAL',
    labelJa: '季節の体験',
    time: '通年',
    lead: '季節ごとに、ひとつだけ。',
    body: [
      '数を増やさず、その時期にしかできないことをひとつだけ用意します。予約時にご案内します。',
      '春 : 山菜を摘んで、夜の一品に。／ 夏 : 日没後の沢歩き。／ 秋 : 薪割りと、翌朝の火入れ。／ 冬 : 雪の日の外気浴と、甘酒。',
    ],
    detail: [
      { label: '料金', value: '内容により 0 – 8,000円' },
      { label: '予約', value: '宿泊予約時に希望をお伝えください' },
      { label: '定員', value: '1 組（他組との相席なし）' },
      { label: '備考', value: '天候により中止となる場合があります' },
    ],
    image: { id: 'architecture-detail', alt: '杉材、石、金属の取り合いに落ちる光。素材の質感。' },
  },
] as const;
