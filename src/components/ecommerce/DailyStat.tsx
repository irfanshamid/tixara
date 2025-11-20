"use client";

import { ProductList } from "@/types/affiliate";
import { formatCurrency } from "@/utils/helper";
import { useEffect, useState } from "react";

export default function DailyStat({
  roomId,
  dateFilter,
}: {
  roomId: string;
  dateFilter: {
    type: string;
    start: number | null;
    end: number | null;
  };
}) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<ProductList>();

    useEffect(() => {
    setLoading(true);
    if (!roomId) return;

    fetch(`/api/sales?room_id=${roomId}&start_date=${dateFilter.start}&end_date=${dateFilter.end}`)
        .then(res => res.json())
        .then((data: ProductList[]) => {
            getLatestSyncPerDay(data);
            console.log(data);
            setLoading(false);
        })
        .catch(err => {
            console.error('Fetch error:', err);
            setLoading(false);
        });
    }, [roomId, dateFilter]);

    const generateList = (list: ProductList[]) => {
        console.log(list);
        setData(list[0]);
    }

    function getLatestSyncPerDay(data: ProductList[]) {
        // Map untuk menampung {roomId|date → object dengan syncTime terbesar}
        const map = new Map();

        data.forEach(item => {
            const date = item.syncTime.split("T")[0]; // ambil YYYY-MM-DD
            const key = `${item.roomId}-${date}`;

            if (!map.has(key)) {
                map.set(key, item);
            } else {
                const existing = map.get(key);

                // bandingkan syncTime, ambil yang terbesar
                if (new Date(item.syncTime) > new Date(existing.syncTime)) {
                    map.set(key, item);
                }
            }
        });

        return generateList(Array.from(map.values()));
    }

    const statistic = [
        { title: "Impressions", value: formatCurrency(data?.stats.data.stats.client_show_cnt || 0) },          // 1.02M
        { title: "Views", value: formatCurrency(data?.stats.data.stats.watch_pv || 0) },                  // 56.22K
        { title: "GMV per hour", value: data?.stats.data.stats.direct_gmv_local_per_hour.amount_delimited || 0},          // 628.08K
        { title: "Impressions per hour", value: formatCurrency(data?.stats.data.stats.show_pv_per_hour || 0) },   // 10.65K

        { title: "Show GPM", value: data?.stats.data.stats.live_show_gpm_local.amount_delimited || 0 },               // 58.98K
        { title: "Avg. viewing duration per view", value: Number(data?.stats.data.stats.avg_view_duration || 0 ).toFixed(2), suffix: "s" },  // 30s
        { title: "Enter room rate (via LIVE page)", value: (Number(data?.stats.data.stats.enter_room_rate_live_preview) * 100 || 0 ).toFixed(2), suffix: "%" },
        { title: "Enter room rate", value: (Number(data?.stats.data.stats.enter_room_rate) * 100 || 0 ).toFixed(2), suffix: "%" },

        { title: "Click-Through Rate", value: (Number(data?.stats.data.stats.click_through_rate) * 100 || 0 ).toFixed(2), suffix: "%" },
        { title: "Order rate (SKU orders)", value: (Number(data?.stats.data.stats.sku_order_rate) * 100 || 0 ).toFixed(2), suffix: "%" },
        { title: "> 1 min. views", value: formatCurrency(data?.stats.data.stats.watch_uv || 0) },           // 3.65K
        { title: "Product Impressions", value: formatCurrency(data?.stats.data.stats.product_view_cnt || 0) },    // 380.28K

        { title: "Watch GPM", value: data?.stats.data.stats.watch_gpm_local.amount_delimited || 0 },             // 1.07M
        { title: "Avg. viewing duration", value: data?.stats.data.stats.avg_watching_time || 0, suffix: "s" },
        { title: "Product clicks", value: formatCurrency(data?.stats.data.stats.product_reach_cnt || 0) },          // 14.79K
        { title: "Product click rate", value: (Number(data?.stats.data.stats.product_click_rate) * 100 || 0 ).toFixed(2), suffix: "%"  }
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-end justify-center gap-5 px-6 py-5 sm:gap-6 sm:py-3">
                {statistic.map((item, key) => {
                    return (
                        <div key={key} className="py-2 md:py-4">
                              <p
                                className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm truncate"
                                title={item.title}
                            >
                                {item.title}
                            </p>
                            {loading ? (
                                <div className="animate-pulse h-5 bg-gray-300 rounded-full w-full"></div>
                            ):(
                                <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                                    {item.value} {item?.suffix}
                                </p>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
