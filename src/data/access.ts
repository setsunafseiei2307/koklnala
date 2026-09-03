export interface AccessRoute {
  id: string;
  label: string;
  labelJa: string;
  duration: string;
  steps: { place: string; note: string }[];
  note: string;
}

export const ACCESS_ROUTES: readonly AccessRoute[] = [
  {
    id: 'car',
    label: 'BY CAR',
    labelJa: 'お車で',
    duration: '東京から約 90 分',
    steps: [
      { place: '東京 IC', note: '東名高速道路 下り' },
      { place: '御殿場 IC', note: '約 60 分 / 国道 138 号へ' },
      { place: '仙石原エリア', note: '約 25 分' },
      { place: 'EMBER & MOSS', note: '林道を 5 分。各棟に専用駐車場（2 台）' },
    ],
    note: '冬季（12 – 3 月）はスタッドレスタイヤまたはチェーンが必要です。',
  },
  {
    id: 'train',
    label: 'BY TRAIN',
    labelJa: '電車で',
    duration: '東京駅から約 100 分',
    steps: [
      { place: '東京駅', note: '東海道新幹線 こだま' },
      { place: '小田原駅', note: '約 35 分' },
      { place: '送迎車', note: '約 50 分 / 往復 12,000円・要予約' },
      { place: 'EMBER & MOSS', note: 'ヴィラの前まで' },
    ],
    note: '新宿駅からは小田急ロマンスカーで小田原駅まで約 75 分です。',
  },
] as const;

export const AREA_NOTES: readonly { label: string; value: string }[] = [
  { label: 'エリア', value: '神奈川県 箱根・仙石原（想定）' },
  { label: '標高', value: '約 700m' },
  { label: '棟数', value: '3 棟 / 1 日 3 組' },
  { label: 'チェックイン', value: '15:00 – 19:00' },
  { label: 'チェックアウト', value: '11:00' },
  { label: '駐車場', value: '各棟 2 台・無料' },
] as const;

/** 周辺の距離感（実在施設の営業情報は載せない） */
export const NEARBY: readonly { name: string; distance: string; note: string }[] = [
  { name: '仙石原のすすき草原', distance: '車で 8 分', note: '見頃は 10 月から 11 月' },
  { name: '芦ノ湖畔', distance: '車で 15 分', note: '朝いちばんが最も静かです' },
  { name: '大涌谷', distance: '車で 20 分', note: '天候により通行規制あり' },
  { name: '美術館が集まる一帯', distance: '車で 10 – 20 分', note: '仙石原には複数の美術館があります' },
] as const;
