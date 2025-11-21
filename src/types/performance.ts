export interface AffiliateResponse {
  code: number;
  message: string;
  data: AffiliateData;
}

export interface AffiliateData {
  creator_list_segments: CreatorListSegment[];
}

export interface CreatorListSegment {
  time_descriptor: TimeDescriptor;
  creator_performances: CreatorPerformance[];
  total: number;
}

export interface TimeDescriptor {
  start_time: number;
  end_time: number;
  timezone_offset: number;
  granularity_type: number;
}

export interface CreatorPerformance {
  creator_base: CreatorBase;
  creator_extra: CreatorExtra;
  creator_metrics: CreatorMetrics;
}

export interface CreatorBase {
  oec_id: string;
  handle_name: string;
  nick_name: string;
  avatar: {
    thumb_url_list: string[];
  };
  follower_cnt: string;
}

export interface CreatorExtra {
  creator_quota_info: {
    creator_id: string;
    is_connect: boolean;
    is_pair_connect: boolean;
  };
  shop_creator_crm_status: number;
}

export interface CurrencyMetric {
  amount_formatted: string;
  amount_delimited: string;
  amount: string;
  currency_code: string;
  currency_symbol: string;
  amount_kmb_formatted: string;
}

export interface CountMetric {
  value: string;
  value_delimited: string;
  value_kmb_formatted: string;
}

export interface CreatorMetrics {
  creator_gmv: CurrencyMetric;
  creator_refunded_gmv: CurrencyMetric;
  creator_estimated_commission: CurrencyMetric;

  creator_orders_cnt: CountMetric;
  creator_items_sold_cnt: CountMetric;
  creator_refunded_items_cnt: CountMetric;
  creator_video_cnt: CountMetric;
  creator_live_cnt: CountMetric;

  creator_average_order_value: CurrencyMetric;

  creator_products_with_sales_cnt: CountMetric;
  creator_samples_shipped_cnt: CountMetric;
}
