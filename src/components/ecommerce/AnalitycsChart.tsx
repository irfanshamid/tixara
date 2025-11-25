"use client";

import { ProductList } from "@/types/affiliate";
import { formatCurrency } from "@/utils/helper";

export default function AnalitycsChart({
  data,
  loading,
}: {
  data: ProductList | undefined;
  loading: boolean;
}) {

    const statistic = [
        { title: "GMV Efficiency", value: Math.round(Number(data?.stats.data.stats.direct_gmv_local.amount || 0) / Number(data?.stats.data.stats.client_show_cnt || 0) *1000), preffix: '~', suffix: 'GMV/1000 impressions'  },
        { title: "Conversion Funnel", value: formatCurrency(Number(data?.stats.data.stats.direct_gmv_local.amount || 0) / Number(data?.stats.data.stats.direct_sales || 0)), preffix: 'Rp', suffix: 'approving per item'  },
        { title: "Product Engagement Ratio", value: (Number(data?.stats.data.stats.product_reach_cnt || 0) / Number(data?.stats.data.stats.product_view_cnt || 0)).toFixed(2), preffix: '', suffix: 'click/impressions'  },
        {
            title: "Quality Scoring Index",
            value: Number(
                (
                    (
                        Number(data?.stats.data.stats.click_through_rate) +
                        Number(data?.stats.data.stats.product_click_rate) +
                        Number(data?.stats.data.stats.enter_room_rate) +
                        Number(data?.stats.data.stats.sku_order_rate)
                    ) / 4
                ).toFixed(3)
            ),
            suffix: ' index (avg 4 core metrics)'
        }

    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 items-end justify-center gap-5 sm:gap-6">
            {statistic.map((item, key) => {
                return (
                    <div key={key} className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03] py-2 md:py-4">
                            <p
                            className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm truncate"
                            title={item.title}
                        >
                            {item.title}
                        </p>
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-pulse h-8 bg-gray-300 rounded-full w-1/3"></div>
                            </div>
                        ):(
                            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                                {item.preffix}{item.value}
                            </p>
                        )}
                        <p className="flex items-center justify-center gap-1 text-sm text-gray-600 dark:text-white/90">
                            {item.suffix}
                        </p>
                    </div>
                )
            })}
        </div>
    );
}
