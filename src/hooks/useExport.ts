import { ProductList, Stat } from "@/types/affiliate";
import { formatCurrency } from "@/utils/helper";
import * as XLSX from "xlsx";

type CellValue = string | number | boolean | null | undefined;

export function useExport() {
  const exportExcel = ({
    dataStat,
    dataProduct,
    roomId,
    dateFilter,
  }: {
    dataStat: ProductList[];
    dataProduct: ProductList[];
    roomId: string;
    dateFilter?: string;
  }) => {
    const wb = XLSX.utils.book_new();

    // ================================
    // STATISTICS SHEET
    // ================================

    const statFieldMap: Record<string, (r: ProductList) => CellValue> = {
      "Direct GMV (Rp)": (r) => r?.stats.data.stats.direct_gmv_local.amount,
      "Items sold": (r) => r?.stats.data.stats?.direct_sales,
      "Current viewers": (r) => r?.stats.data.stats?.current_visitor_cnt,
      "Impressions": (r) => r?.stats.data.stats?.client_show_cnt,
      "Show GPM": (r) => r?.stats.data.stats?.live_show_gpm_local.amount_delimited,
      "Click-Through Rate": (r) => r?.stats.data.stats?.click_through_rate,
      "Watch GPM": (r) => r?.stats.data.stats?.watch_gpm_local.amount_delimited,
      "Views": (r) => r?.stats.data.stats?.watch_pv,
      "Avg. viewing duration per view": (r) =>
        r?.stats.data.stats?.avg_view_duration,
      "Order rate (SKU orders)": (r) => r?.stats.data.stats?.sku_order_rate,
      "Avg. viewing duration": (r) =>
        r?.stats.data.stats?.avg_watching_time,
      "GMV per hour": (r) => r?.stats.data.stats?.direct_gmv_local_per_hour.amount_delimited,
      "Enter room rate (via LIVE pre-)": (r) =>
        r?.stats.data.stats?.enter_room_rate_live_preview,
      "> 1 min. views": (r) => r?.stats.data.stats?.watch_uv,
      "Product clicks": (r) => r?.stats.data.stats?.product_reach_cnt,
      "Impressions per hour": (r) =>
        r?.stats.data.stats?.show_pv_per_hour,
      "Enter room rate": (r) =>
        r?.stats.data.stats?.enter_room_rate,
      "Product impressions": (r) =>
        r?.stats.data.stats?.product_view_cnt,
      "Product click rate": (r) =>
        r?.stats.data.stats?.product_click_rate,
    };

    const statColumns = Object.keys(statFieldMap);

    const statDataArr = Array.isArray(dataStat) ? dataStat : [dataStat];

    const statSheetData = [
      statColumns,
      ...statDataArr.map((row) =>
        statColumns.map((col) => statFieldMap[col]?.(row) ?? "")
      ),
    ];

    const wsStat = XLSX.utils.aoa_to_sheet(statSheetData);
    XLSX.utils.book_append_sheet(wb, wsStat, "Statistics");

    // ================================
    // PRODUCTS SHEET
    // ================================

    // ================================
    // PRODUCTS SHEET (multiple rows per object)
    // ================================

    // Mapping kolom → value
    const productFieldMap: Record<
    string,
    (args: { parent: ProductList; product: Stat }) => CellValue
    > = {
    "Date": ({ parent }) =>
        `${new Date(parent?.syncTime).getUTCDate()}-${new Date(parent?.syncTime).getUTCMonth()}-${new Date(parent?.syncTime).getUTCFullYear()}`,

    "Hour": ({ parent }) =>
        `${new Date(parent?.syncTime).getUTCHours()}:${new Date(parent?.syncTime).getUTCMinutes()}`,

    "Product": ({ product }) => product?.name,
    "Impression": ({ product }) => product?.exposure_cnt,
    "Click through rate": ({ product }) => product?.click_through_rate,
    "Direct GMV": ({ product }) => product?.direct_gmv_local.amount_formatted,
    "Add to cart count": ({ product }) => formatCurrency(product?.add_shop_cart_cnt),
    "Product clicks": ({ product }) => formatCurrency(product.total_click_cnt),
    "Item sold": ({ product }) => formatCurrency(product.direct_sales),
    };

    const productColumns = Object.keys(productFieldMap);

    // Semua row excel
    const productSheetData: CellValue[][] = [];

    // Header
    productSheetData.push(productColumns);

    // Loop parent (dataProduct)
    (dataProduct || []).forEach((parent) => {
    const productList =
        parent?.stats?.data?.segments?.[0]?.stats || [];

    // Loop 33 product
    productList.forEach((product: Stat) => {
        const row = productColumns.map((col) =>
        productFieldMap[col]({ parent, product }) ?? ""
        );

        productSheetData.push(row);
    });
    });

    // Generate sheet
    const wsProduct = XLSX.utils.aoa_to_sheet(productSheetData);
    XLSX.utils.book_append_sheet(wb, wsProduct, "Products");

    // ================================
    // SAVE FILE
    // ================================
    const filename = `LIVE-${roomId}-${dateFilter || "all"}.xlsx`;
    XLSX.writeFile(wb, filename);
  };

  return { exportExcel };
}
