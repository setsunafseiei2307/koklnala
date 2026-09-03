export interface SaunaElement {
  key: string;
  label: string;
  labelJa: string;
  value: string;
  body: string;
}

/** 体験を 4 つの要素に分解して見せる */
export const SAUNA_ELEMENTS: readonly SaunaElement[] = [
  {
    key: 'heat',
    label: 'HEAT',
    labelJa: '熱',
    value: '90 – 100℃',
    body: 'ストーブの上に石を高く積み、輻射熱で温めます。空気で焼くのではなく、石から返ってくる熱で身体の芯を温める設計です。',
  },
  {
    key: 'water',
    label: 'WATER',
    labelJa: '水',
    value: '12 – 15℃',
    body: '井戸から汲み上げた水を、循環させずに掛け流します。夏でも 15℃ を超えません。肩まで沈めても呼吸が乱れない温度です。',
  },
  {
    key: 'air',
    label: 'AIR',
    labelJa: '外気',
    value: '標高 700m',
    body: '水風呂を出て 3 歩でチェアに座れます。仙石原の夜は夏でも 20℃前後。濡れた身体に風が当たると、体温が一段ずつ下りていきます。',
  },
  {
    key: 'silence',
    label: 'SILENCE',
    labelJa: '静けさ',
    value: '貸切 / 1 棟 1 組',
    body: '共用のサウナはありません。誰かが入ってくることも、順番を待つこともない。整えるための条件を、静けさから逆算しています。',
  },
] as const;

export interface RitualStep {
  no: string;
  title: string;
  time: string;
  body: string;
}

export const SAUNA_RITUAL: readonly RitualStep[] = [
  {
    no: '01',
    title: '火を入れる',
    time: '– 60 min',
    body: '薪サウナの場合、室温が上がるまで約 1 時間。焚きつけと薪はヴィラに用意しています。火を育てる時間そのものが、滞在のはじまりです。',
  },
  {
    no: '02',
    title: 'ロウリュ',
    time: '8 – 12 min',
    body: '柄杓一杯の水を石へ。湿度が上がると体感温度が変わります。香りを足したい方には、この土地のヒノキとクロモジの水を置いています。',
  },
  {
    no: '03',
    title: '水風呂',
    time: '1 – 2 min',
    body: '掛け湯をしてから、ゆっくり沈む。息を止めず、長く吐くことだけを意識してください。',
  },
  {
    no: '04',
    title: '外気浴',
    time: '10 – 15 min',
    body: 'いちばん長く取ってほしい時間です。目を閉じても、開けても構いません。森の音が戻ってくる瞬間があります。',
  },
  {
    no: '05',
    title: '繰り返す',
    time: '× 2 – 3',
    body: '2 巡目からは温度も水も身体に馴染みます。無理に回数を重ねる必要はありません。',
  },
  {
    no: '06',
    title: '眠る',
    time: '',
    body: '最後の外気浴のあと、そのまま部屋へ。照明はすべて調光式です。落としきってから横になってください。',
  },
] as const;

export const SAUNA_SPECS: readonly { label: string; value: string }[] = [
  { label: 'タイプ', value: '1 棟 1 組の完全貸切（共用サウナなし）' },
  { label: 'ストーブ', value: '薪ストーブ（STONE / MIST）、電気ストーブ（FOREST・薪へ変更可）' },
  { label: 'ロウリュ', value: 'セルフロウリュ可。柄杓・桶・アロマ水を常備' },
  { label: '室温', value: '90 – 100℃（薪は火の入れ方で調整可能）' },
  { label: '定員', value: '3 – 4 名（棟により異なる）' },
  { label: '水風呂', value: '井戸水掛け流し・12 – 15℃。STONE / MIST は屋外' },
  { label: '外気浴', value: 'デッキまたはテラスにチェア。ブランケット常備' },
  { label: '利用時間', value: '15:00 – 24:00 / 翌 6:00 – 10:00' },
  { label: '料金', value: '宿泊料金に含む（FOREST の薪アップグレードのみ +8,000円 / 泊）' },
] as const;
