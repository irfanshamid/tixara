"use client";

import React, { useState } from "react";
import ChartTab from "@/components/common/ChartTab";
import { EcommerceMetrics } from "./EcommerceMetrics";
import MonthlySalesChart from "./MonthlySalesChart";
import DailyStat from "./DailyStat";
import StatisticsChart from "./StatisticsChart";
import RecentOrders from "./RecentOrders";

export default function DashboardLive() {
  const [roomId, setRoomId] = useState<string>('7571036699610893067');

  // filter: today, last3day, monthly, range
  const [dateFilter, setDateFilter] = useState<{
    type: "today" | "last3day" | "monthly" | "range";
    start: Date | null;
    end: Date | null;
  }>({
    type: "today",
    start: new Date(),
    end: new Date(),
  });

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* CHART TAB */}
      <div className="col-span-12">
        <ChartTab
          selectedRoom={roomId}
          onSelectRoom={setRoomId}
          onFilterChange={setDateFilter}
        />
      </div>

      {/* Semua chart bisa menerima roomId & dateFilter */}
      <div className="col-span-12 space-y-6 xl:col-span-6">
        <EcommerceMetrics />
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DailyStat />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-12">
        <RecentOrders roomId={roomId} dateFilter={dateFilter} />
      </div>
    </div>
  );
}
