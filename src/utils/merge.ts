import { ProductList, MoneyValue } from "@/types/affiliate";

export function mergeCoreStats(list: ProductList[]): ProductList {
  if (list.length === 0) throw new Error("Empty list");

  // Clone element pertama sebagai base
  const result: ProductList = structuredClone(list[0]);

  const base = result.stats.data.stats;

  let count = 1;

  list.slice(1).forEach(item => {
    const stat = item.stats.data.stats;
    count++;
    
    // --- Number fields ---
    base.ads_roi2_effective_time += stat.ads_roi2_effective_time;
    base.avg_watching_time += stat.avg_watching_time;
    base.client_show_cnt += stat.client_show_cnt;
    base.current_visitor_cnt += stat.current_visitor_cnt;
    base.direct_sales += stat.direct_sales;
    base.product_reach_cnt += stat.product_reach_cnt;
    base.product_view_cnt += stat.product_view_cnt;
    base.sales += stat.sales;
    base.show_pv_per_hour += stat.show_pv_per_hour;
    base.watch_pv += stat.watch_pv;
    base.watch_pv_one_min_plus += stat.watch_pv_one_min_plus;
    base.watch_uv += stat.watch_uv;

    // --- String numeric fields ---
    base.avg_view_duration = String(
      parseFloat(base.avg_view_duration) + parseFloat(stat.avg_view_duration)
    );

    base.click_through_rate = String(
      parseFloat(base.click_through_rate) + parseFloat(stat.click_through_rate)
    );

    base.enter_room_rate = String(
      parseFloat(base.enter_room_rate) + parseFloat(stat.enter_room_rate)
    );

    base.enter_room_rate_live_preview = String(
      parseFloat(base.enter_room_rate_live_preview) +
      parseFloat(stat.enter_room_rate_live_preview)
    );

    base.product_click_rate = String(
      parseFloat(base.product_click_rate) +
      parseFloat(stat.product_click_rate)
    );

    base.sku_order_rate = String(
      parseFloat(base.sku_order_rate) + parseFloat(stat.sku_order_rate)
    );

    // --- Money fields ---
    mergeMoney(base.direct_gmv_local, stat.direct_gmv_local);
    mergeMoney(base.direct_gmv_local_per_hour, stat.direct_gmv_local_per_hour);
    mergeMoney(base.live_show_gpm_local, stat.live_show_gpm_local);
    mergeMoney(base.watch_gpm_local, stat.watch_gpm_local);

    // boolean
    base.is_ads_roi2 = base.is_ads_roi2 || stat.is_ads_roi2;
  });

  base.avg_view_duration = String(
    (parseFloat(base.avg_view_duration) / count).toFixed(2)
  );

  base.avg_watching_time = 
    Number((base.avg_watching_time / count).toFixed(2));

  return result;
}

// Helper untuk merge MoneyValue
function mergeMoney(base: MoneyValue, add: MoneyValue) {
  const total = Number(base.amount) + Number(add.amount);

  base.amount = String(total);
  base.amount_delimited = total.toLocaleString("id-ID");
  base.amount_formatted = `Rp${total.toLocaleString("id-ID")}`;
}
