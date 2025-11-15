export interface ProductList {
  id: string;
  roomId: string;
  syncTime: string; // ISO datetime string
  stats: Stats;
}

export interface Stats {
  code: number;
  data: StatsData;
}

export interface StatsData {
  segments: Segment[];
}

export interface Segment {
  stats: Stat[];
}

export interface Stat {
  add_shop_cart_cnt: number;
  click_through_rate: string; // String karena ada angka desimal dalam bentuk string
  cover_url: string;
  direct_gmv_local: DirectGmvLocal;
  direct_sales: number;
  exposure_cnt: number;
  id: string;
  inventory_left_cnt: number;
  is_live: boolean;
  is_pinned: boolean;
  name: string;
  platform_type: number;
  sellable_country: string;
  source: string;
  tags: number[];
  total_click_cnt: number;
}

export interface DirectGmvLocal {
  amount: string;
  amount_delimited: string;
  amount_formatted: string;
  currency_code: string;
  currency_symbol: string;
}
