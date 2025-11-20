"use client";

import React, { useState } from "react";
import ChartTab from "@/components/common/ChartTab";
import MonthlySalesChart from "./MonthlySalesChart";
import DailyStat from "./DailyStat";
import StatisticsChart from "./StatisticsChart";
import RecentOrders from "./RecentOrders";
import EcommerceMetrics from "./EcommerceMetrics";

export default function DashboardLive() {
  const [roomId, setRoomId] = useState<string>('7573979822407027468');
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  // filter: today, last3day, monthly, range
  const [dateFilter, setDateFilter] = useState<{
    type: "today" | "last3day" | "monthly" | "range";
    start: number | null;
    end: number | null;
  }>({
    type: "today",
    start: start.getTime(),
    end: end.getTime(),
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

      <div className="col-span-12 space-y-6 xl:col-span-6">
        <EcommerceMetrics roomId={roomId} dateFilter={dateFilter}/>
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-6">
        <DailyStat roomId={roomId} dateFilter={dateFilter}/>
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
