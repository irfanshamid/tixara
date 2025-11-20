"use client";
import React from "react";
import { BoxIconLine, DollarLineIcon } from "@/icons";
import { formatCurrency } from "@/utils/helper";
import { ProductList } from "@/types/affiliate";

export default function EcommerceMetrics({
  data,
  loading,
}: {
  data: ProductList | undefined;
  loading: boolean;
}) {

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Direct GMV
            </span>
            {loading ? (
              <div className="animate-pulse h-9 bg-gray-300 rounded-full w-full"></div>
            ):(
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {data?.stats.data.stats.direct_gmv_local.amount_delimited || 0}
              </h4>
            )}
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
            {loading ? (
              <div className="animate-pulse h-9 bg-gray-300 rounded-full w-full"></div>
            ):(
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatCurrency(data?.stats.data.stats.direct_sales || 0)}
              </h4>
            )}
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
