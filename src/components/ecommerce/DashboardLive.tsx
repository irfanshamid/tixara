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

export default function DashboardLive() {
  const { roomId, setRoomId, dateFilter, setDateFilter } = useFilter();
  const { loadingStat, dataStat, dataListStat } = useStat(roomId, dateFilter);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Chart Tab */}
      <div className="col-span-12">
        <ChartTab
          selectedRoom={roomId}
          onSelectRoom={setRoomId}
          onFilterChange={setDateFilter}
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
        <RecentOrders roomId={roomId} dateFilter={dateFilter} />
      </div>
    </div>
  );
}
