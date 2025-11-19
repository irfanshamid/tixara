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

    const [data, setData] = useState<ProductList>();

    useEffect(() => {
    if (!roomId) return;

    fetch(`/api/sales?room_id=${roomId}&start_date=${dateFilter.start}&end_date=${dateFilter.end}`)
        .then(res => res.json())
        .then((data: ProductList[]) => {
            getLatestSyncPerDay(data);
            console.log(data);
        })
        .catch(err => {
            console.error('Fetch error:', err);
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

    console.log(data);

    const statistic = [
        { title: "Impressions", value: 1020000 },          // 1.02M
        { title: "Views", value: 56220 },                  // 56.22K
        { title: "GMV per hour", value: 628080 },          // 628.08K
        { title: "Impressions per hour", value: 10650 },   // 10.65K

        { title: "Show GPM", value: 58980 },               // 58.98K
        { title: "Avg. viewing duration per view", value: 30, suffix: "s" },  // 30s
        { title: "Enter room rate (via LIVE page)", value: 2.82, suffix: "%" },
        { title: "Enter room rate", value: 5.5, suffix: "%" },               // + dynamic indicator
        { title: "Enter room rate change", value: -36.13, suffix: "%" },

        { title: "Click-Through Rate", value: 26.31, suffix: "%" },
        { title: "Order rate (SKU orders)", value: 0.73, suffix: "%" },
        { title: "> 1 min. views", value: 3650 },           // 3.65K
        { title: "Product Impressions", value: 380280 },    // 380.28K

        { title: "Watch GPM", value: 1070000 },             // 1.07M
        { title: "Avg. viewing duration", value: 42, suffix: "s" },
        { title: "Product clicks", value: 14790 },          // 14.79K
        { title: "Product click rate", value: 3.89, suffix: "%" }
    ];

    return (
        <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="grid grid-cols-1 md:grid-cols-4 items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
                {statistic.map((item, key) => {
                    return (
                        <div key={key}>
                            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
                                {item.title}
                            </p>
                            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
                                {formatCurrency(item.value)} {item?.suffix}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
