"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { ProductList } from "@/types/affiliate";
import { formatCurrency } from "@/utils/helper";
import { useState } from "react";

export default function LiveOrders({
  data,
  loading,
  fullHeight,
}: {
  data: ProductList[];
  loading: boolean;
  fullHeight?: boolean;
}) {
  const [search, setSearch] = useState("");

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      
      {/* HEADER */}
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Live Performance
        </h3>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search host..."
          className="h-11 w-full sm:w-1/4 rounded-lg border border-gray-200 bg-transparent py-2.5 px-4 text-sm text-gray-800 dark:text-white dark:bg-gray-900"
        />
      </div>

      {/* TABLE */}
      <div
        className={`max-w-full overflow-x-auto ${
          fullHeight ? "h-full" : "max-h-[700px] overflow-y-auto"
        }`}
      >
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">
                Account
              </TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">
                Date
              </TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">
                Time
              </TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">
                Host
              </TableCell>

              {/* HARD CODED HEADERS */}
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Direct GMV (Rp)</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Items sold</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Current viewers</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Impressions</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Show GPM</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Click-Through Rate</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Watch GPM</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Views</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Avg. viewing duration per view</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Order rate (SKU orders)</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Avg. viewing duration</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">GMV per hour</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Enter room rate (via LIVE pre-)</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">1 min. views</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Product clicks</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Impressions per hour</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Enter room rate</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Product impressions</TableCell>
              <TableCell isHeader className="py-3 w-[120px] md:min-w-[200px] text-start text-gray-500 text-theme-xs">Product click rate</TableCell>
            </TableRow>
          </TableHeader>

          {/* LOADING */}
          {loading ? (
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={21} className="py-5">
                    <div className="animate-pulse h-5 bg-gray-300 rounded-full w-full"></div>
                  </td>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <>
              {data.length > 0 ? (
                <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {data.map((item, i) => (
                    <TableRow key={i}>
                      
                      {/* Account */}
                      <TableCell className="py-3 font-medium text-gray-700 dark:text-gray-200">
                        {item.roomId}
                      </TableCell>
                      <TableCell className="py-3 font-medium text-gray-700 dark:text-gray-200">
                        {item.syncTime.substring(0, 10)}
                      </TableCell>
                      <TableCell className="py-3 font-medium text-gray-700 dark:text-gray-200">
                        {item.syncTime.substring(11, 16)}
                      </TableCell>
                      <TableCell className="py-3 font-medium text-gray-700 dark:text-gray-200">
                        {item.roomId}
                      </TableCell>

                      {/* HARD CODED VALUES */}
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.direct_gmv_local.amount))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.direct_sales))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.current_visitor_cnt))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.client_show_cnt))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.live_show_gpm_local.amount_delimited))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.click_through_rate))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.watch_gpm_local.amount_delimited))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.watch_pv))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.avg_view_duration))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.sku_order_rate))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.avg_watching_time))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.direct_gmv_local_per_hour.amount_delimited))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.enter_room_rate_live_preview))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.watch_uv))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.product_reach_cnt))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.show_pv_per_hour))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.enter_room_rate))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.product_view_cnt))}</TableCell>
                      <TableCell className="py-3">{formatCurrency(Number(item.stats.data.stats.product_click_rate))}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                    <td colSpan={21} className="text-center py-10">
                      <div className="text-gray-400">No Data Sync</div>
                    </td>
                  </TableRow>
                </TableBody>
              )}
            </>
          )}
        </Table>
      </div>
    </div>
  );
}
