import { ProductList, MoneyValue } from "@/types/affiliate";

const defaultState: ProductList = {
  id: "",
  roomId: "",
  syncTime: new Date().toISOString(),
  stats: {
    code: 0,
    data: {
      stats: {
        ads_roi2_effective_time: 0,
        avg_view_duration: "0",
        avg_watching_time: 0,
        click_through_rate: "0",
        client_show_cnt: 0,
        current_visitor_cnt: 0,

        direct_gmv_local: {
           amount: '0',
            amount_delimited: '0',
            amount_formatted: '0',
            currency_code: '0',
            currency_symbol: '0',
        },
        direct_gmv_local_per_hour: {
           amount: '0',
            amount_delimited: '0',
            amount_formatted: '0',
            currency_code: '0',
            currency_symbol: '0',
        },

        direct_sales: 0,
        enter_room_rate: "0",
        enter_room_rate_live_preview: "0",
        is_ads_roi2: false,

        live_show_gpm_local: {
           amount: '0',
            amount_delimited: '0',
            amount_formatted: '0',
            currency_code: '0',
            currency_symbol: '0',
        },

        product_click_rate: "0",
        product_reach_cnt: 0,
        product_view_cnt: 0,

        sales: 0,
        show_pv_per_hour: 0,
        sku_order_rate: "0",

        watch_gpm_local: {
           amount: '0',
            amount_delimited: '0',
            amount_formatted: '0',
            currency_code: '0',
            currency_symbol: '0',
        },

        watch_pv: 0,
        watch_pv_one_min_plus: 0,
        watch_uv: 0,
      },

      stats_benchmark_data: {
        market_cmp_data: [],
        self_cmp_data: [],
      },

      segments: []
    }
  }
};

export function mergeCoreStats(list: ProductList[]): ProductList {
  if (list.length === 0) throw new Error("Empty list");

  // Clone element pertama sebagai base
  const result: ProductList = structuredClone(list[0]?.stats?.data?.stats?.direct_sales ? list[0] : defaultState);

  const base = result?.stats?.data?.stats;

  let count = 1;

  list.slice(1).forEach(item => {
    const stat = item?.stats?.data?.stats;
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
      parseFloat(base?.avg_view_duration) + parseFloat(stat.avg_view_duration)
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
    (parseFloat(base.avg_view_duration || '0') / count).toFixed(2)
  );

  base.avg_watching_time = 
    Number((base.avg_watching_time || 0 / count).toFixed(2));

  return result;
}


export function mergeCoreProduct(list: ProductList[]): ProductList {
  if (list.length === 0) throw new Error("Empty list");

  // Clone element pertama sebagai base
  const result: ProductList = structuredClone(list[0]);

  const baseSegments = result?.stats?.data?.segments || [];

  list.slice(1).forEach(item => {
    const segments = item?.stats?.data?.segments;

    segments.forEach((seg, segIndex) => {
      if (!baseSegments[segIndex]) {
        baseSegments[segIndex] = structuredClone(seg);
        return;
      }

      const baseSeg = baseSegments[segIndex];

      // --- Kita buat map ID untuk mempercepat pencarian ---
      const baseMap = new Map(baseSeg.stats.map(p => [p.id, p]));

      seg.stats.forEach(prodStat => {
        const baseProd = baseMap.get(prodStat.id);

        // Jika produk belum ada di base → push langsung
        if (!baseProd) {
          baseSeg.stats.push(structuredClone(prodStat));
          return;
        }

        // =============================
        //  Numeric Fields
        // =============================
        baseProd.add_shop_cart_cnt += prodStat.add_shop_cart_cnt || 0;
        baseProd.direct_sales += prodStat.direct_sales || 0;
        baseProd.total_click_cnt += prodStat.total_click_cnt || 0;
        baseProd.exposure_cnt += prodStat.exposure_cnt || 0;

        // Untuk inventory_left_cnt → ambil *minimum* (logika realistis)
        baseProd.inventory_left_cnt = Math.min(
          baseProd.inventory_left_cnt || 0,
          prodStat.inventory_left_cnt || 0
        );

        // =============================
        //  Rate Fields → dihitung rata-rata
        // =============================
        const a = parseFloat(baseProd.click_through_rate || "0");
        const b = parseFloat(prodStat.click_through_rate || "0");

        baseProd.click_through_rate = ((a + b) / 2).toFixed(6);

        // =============================
        //  Money Fields (GMV)
        // =============================
        mergeMoney(baseProd.direct_gmv_local, prodStat.direct_gmv_local);
      });
    });
  });

  return result;
}


// Helper untuk merge MoneyValue
function mergeMoney(base: MoneyValue, add: MoneyValue) {
  const total = Number(base.amount) + Number(add.amount);

  base.amount = String(total);
  base.amount_delimited = total.toLocaleString("id-ID");
  base.amount_formatted = `Rp${total.toLocaleString("id-ID")}`;
}
