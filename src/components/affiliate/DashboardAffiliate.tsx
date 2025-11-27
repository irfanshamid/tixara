"use client";

import React from "react";
// import { getJakartaTime } from "@/utils/helper";
// import { useExport } from "@/hooks/useExport";
import DateTab from "../common/DateTab";
import { useFilterDate } from "@/hooks/useFilterDate";
import SalesList from "./SalesList";
import { useAffiliate } from "@/hooks/useAffiliate";

export default function DashboardAffiliate() {
  const { dateFilter, setDateFilter } = useFilterDate();
  const { loadingStat, dataStat } = useAffiliate(dateFilter);
  // const { exportExcel } = useExport();

  const handleDownload = () => {
    console.log(dataStat);
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Chart Tab */}
      <div className="col-span-12">
        <DateTab
          onFilterChange={setDateFilter}
          onDownload={handleDownload}
        />
      </div>

      <div className="col-span-12 xl:col-span-12">
        <SalesList data={dataStat} loading={loadingStat} fullHeight/>
      </div>
    </div>
  );
}
