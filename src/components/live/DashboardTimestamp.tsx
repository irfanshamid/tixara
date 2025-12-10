"use client";

import React from "react";
import { useFilter } from "../../hooks/useFilter";
import LiveOrders from "./LiveOrders";
import { useLive } from "../../hooks/useLive";
import LiveTab from "../common/LiveTab";

export default function DashboardTimestamp() {
  const { roomId, setRoomId, dateFilter, setDateFilter } = useFilter();
  const { loadingStat, dataListStatOrigin } = useLive(roomId, dateFilter);

  const handleDownload = () => {
    console.log('download')
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Chart Tab */}
      <div className="col-span-12">
        <LiveTab
          selectedRoom={roomId}
          onSelectRoom={setRoomId}
          onFilterChange={setDateFilter}
          onDownload={handleDownload}
        />
      </div>

      <div className="col-span-12 xl:col-span-12">
        <LiveOrders data={dataListStatOrigin} loading={loadingStat} />
      </div>
    </div>
  );
}
