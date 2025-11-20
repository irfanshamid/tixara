export interface ProductList {
  id: string;
  roomId: string;
  syncTime: string; // ISO datetime string
  stats: Stats;
}

export interface ProductListFind {
  id?: string;
  roomId?: string;
  syncTime?: {
    gte: Date;
    lte: Date;
  }
  stats?: Stats;
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


export interface ProductStatsResponse {
  id: string;
  roomId: string;
  syncTime: string; // ISO timestamp
  stats: StatsRoot;
}

export interface StatsRoot {
  code: number;
  data: StatsData;
  message: string;
}

export interface StatsData {
  stats: LiveStats;
  stats_benchmark_data: StatsBenchmarkData;
}

export interface LiveStats {
  ads_roi2_effective_time: number;
  avg_view_duration: string;
  avg_watching_time: number;
  click_through_rate: string;
  client_show_cnt: number;
  current_visitor_cnt: number;

  direct_gmv_local: MoneyValue;
  direct_gmv_local_per_hour: MoneyValue;

  direct_sales: number;
  enter_room_rate: string;
  enter_room_rate_live_preview: string;
  is_ads_roi2: boolean;

  live_show_gpm_local: MoneyValue;

  product_click_rate: string;
  product_reach_cnt: number;
  product_view_cnt: number;

  sales: number;
  show_pv_per_hour: number;
  sku_order_rate: string;

  watch_gpm_local: MoneyValue;

  watch_pv: number;
  watch_pv_one_min_plus: number;
  watch_uv: number;
}

export interface MoneyValue {
  amount: string;
  amount_delimited: string;
  amount_formatted: string;
  currency_code: string;
  currency_symbol: string;
}

export interface StatsBenchmarkData {
  market_cmp_data: MarketCmpData[];
  self_cmp_data: SelfCmpData[];
}

export interface MarketCmpData {
  cmp: string;
  stats_type: number;
}

export interface SelfCmpData {
  cmp: string;
  current_live_value: LiveValue;
  median: string;
  median_formatted: string;
  past_live_values: LiveValue[];
  stats_type: number;
}

export interface LiveValue {
  end_ts: number;
  start_ts: number;
  value: string;
  value_formatted: string;
}
