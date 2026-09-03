export const SITE = {
  brand: 'EMBER & MOSS',
  brandJa: 'エンバー アンド モス',
  tagline: '熱と静寂に泊まる。',
  descriptor: 'PRIVATE VILLA / SAUNA / HAKONE',
  /** 全ページ共通の説明文の骨格 */
  description:
    '箱根・仙石原の森に、1日3組だけ。プライベートサウナと露天風呂を備えた一棟貸しのヴィラ EMBER & MOSS。',
  /**
   * 架空案件であることの明示。
   * 宿の世界観を途中で切らないよう、出す場所を絞っている。
   *  - short : フッター（全ページ）
   *  - long  : ABOUT THIS PROJECT
   *  - booking : 予約の最終確認（送信の直前で 1 回だけ）
   */
  conceptNotice: {
    label: 'CONCEPT PROJECT',
    short: '架空の宿泊施設を想定した自主制作です。',
    long: 'EMBER & MOSS は実在しない宿泊施設です。Web サイトの設計・デザイン・実装力を示すために制作した自主制作（コンセプトプロジェクト）であり、掲載している料金・設備・所在地はすべて架空の設定です。予約は成立しません。',
    booking:
      'このサイトは自主制作のデモのため、実際の予約・決済は行われません。入力内容が送信・保存されることもありません。',
  },
  /** .example は文書用に予約されたドメイン。実在の連絡先は記載しない。 */
  contactEmail: 'reservations@ember-moss.example',
  area: '神奈川県 足柄下郡箱根町 仙石原',
  checkIn: '15:00 – 19:00',
  checkOut: '11:00',
  rooms: '全 3 棟 / 1 日 3 組',
} as const;

export interface NavItem {
  href: string;
  label: string;
  labelJa: string;
}

export const NAV: readonly NavItem[] = [
  { href: '/stay/', label: 'STAY', labelJa: '客室' },
  { href: '/sauna/', label: 'SAUNA', labelJa: 'サウナ' },
  { href: '/experience/', label: 'EXPERIENCE', labelJa: '滞在' },
  { href: '/access/', label: 'ACCESS', labelJa: 'アクセス・FAQ' },
] as const;

export const FOOTER_NAV: readonly NavItem[] = [
  ...NAV,
  { href: '/booking/', label: 'BOOKING', labelJa: '予約' },
  { href: '/project/', label: 'ABOUT THIS PROJECT', labelJa: 'この制作について' },
] as const;
