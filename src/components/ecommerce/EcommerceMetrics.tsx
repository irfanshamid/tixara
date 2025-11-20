"use client";
import React, { useEffect, useState } from "react";
import { BoxIconLine, GroupIcon } from "@/icons";
import { formatCurrency } from "@/utils/helper";
import { ProductList } from "@/types/affiliate";

export default function EcommerceMetrics({
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
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Direct GMV
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {data?.stats.data.stats.direct_gmv_local.amount_delimited || 0}
            </h4>
          </div>
          {/* <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Sold Item 
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatCurrency(data?.stats.data.stats.direct_sales || 0)}
            </h4>
          </div>

          {/* <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge> */}
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
