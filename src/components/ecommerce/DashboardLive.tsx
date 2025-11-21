"use client";

import React from "react";
import ChartTab from "@/components/common/ChartTab";
import MonthlySalesChart from "./MonthlySalesChart";
import DailyStat from "./DailyStat";
import StatisticsChart from "./StatisticsChart";
import RecentOrders from "./RecentOrders";
import EcommerceMetrics from "./EcommerceMetrics";
import { useFilter } from "@/hooks/useFilter";
import { useStat } from "@/hooks/useStat";
import { useProduct } from "@/hooks/useProduct";
import { getJakartaTime } from "@/utils/helper";
import { useExport } from "@/hooks/useExport";

export default function DashboardLive() {
  const { roomId, setRoomId, dateFilter, setDateFilter } = useFilter();
  const { loadingStat, dataStat, dataListStat } = useStat(roomId, dateFilter);
  const { dataProduct, loadingProduct, dataListProduct } = useProduct(roomId, dateFilter);
  const { exportExcel } = useExport();

  const handleDownload = () => {
    exportExcel({
      dataStat: dataListStat,
      dataProduct: dataListProduct,
      roomId: roomId,
      dateFilter: getJakartaTime(),
    })
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Chart Tab */}
      <div className="col-span-12">
        <ChartTab
          selectedRoom={roomId}
          onSelectRoom={setRoomId}
          onFilterChange={setDateFilter}
          onDownload={handleDownload}
        />
      </div>

      <div className="col-span-12 space-y-6 xl:col-span-6">
        <EcommerceMetrics data={dataStat} loading={loadingStat} />
        <MonthlySalesChart data={dataListStat} loading={loadingStat}/>
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DailyStat data={dataStat} loading={loadingStat} />
      </div>

      <div className="col-span-12">
        <StatisticsChart data={dataListStat} loading={loadingStat}/>
      </div>

      <div className="col-span-12 xl:col-span-12">
        <RecentOrders data={dataProduct} loading={loadingProduct} />
      </div>
    </div>
  );
}
