import { ProductList, Stat } from "@/types/affiliate";

export function mergeProductStats(list: ProductList[]): ProductList {
  console.log("per day in merge", list);

  if (list.length === 0) throw new Error("Empty product list");

  // Clone item pertama
  const result: ProductList = structuredClone(list[0]);

  // --- FIX: kalau segments tidak ada, buat empty segment ---
  if (!result.stats.data.segments || result.stats.data.segments.length === 0) {
    result.stats.data.segments = [{ stats: [] }];
  }

  const productMap = new Map<string, Stat>();

  list.forEach((item) => {
    const segments = item.stats.data.segments;

    // --- FIX: skip item kalau segments tidak valid ---
    if (!segments || segments.length === 0) return;

    const seg = segments[0];
    if (!seg || !seg.stats) return;

    seg.stats.forEach((prod) => {
      const existing = productMap.get(prod.id);

      if (!existing) {
        productMap.set(prod.id, structuredClone(prod));
      } else {
        // merge values
        existing.exposure_cnt += prod.exposure_cnt;
        existing.direct_sales += prod.direct_sales;
        existing.total_click_cnt += prod.total_click_cnt;
        existing.add_shop_cart_cnt += prod.add_shop_cart_cnt;

        // merge GMV
        const g1 = Number(existing.direct_gmv_local.amount);
        const g2 = Number(prod.direct_gmv_local.amount);
        const total = g1 + g2;

        existing.direct_gmv_local.amount = String(total);
        existing.direct_gmv_local.amount_delimited = total.toLocaleString("id-ID");
        existing.direct_gmv_local.amount_formatted = `Rp${total.toLocaleString("id-ID")}`;

        // merge CTR (string)
        const ctr1 = parseFloat(existing.click_through_rate);
        const ctr2 = parseFloat(prod.click_through_rate);
        existing.click_through_rate = String(ctr1 + ctr2);
      }
    });
  });

  // Replace final stats list
  const mergedList = Array.from(productMap.values());

  // --- FIX: Must ensure segments[0] always exists ---
  result.stats.data.segments![0] = {
    stats: mergedList,
  };

  console.log("merged result", result);
  return result;
}
