"use client";

import React from "react";
import { getJakartaTime } from "../../utils/helper";
import { useExport } from "../../hooks/useExport";
import RecentOrders from "../ecommerce/RecentOrders";
import DateTab from "../common/DateTab";
import { useFilterDate } from "../../hooks/useFilterDate";
import { useMarket } from "../../hooks/useMarket";

export default function DashboardProduct() {
  const { dateFilter, setDateFilter } = useFilterDate();
  const { dataProduct, loadingProduct, dataListProduct } = useMarket(dateFilter);
  const { exportExcel } = useExport();

  const handleDownload = () => {
    exportExcel({
      dataStat: [],
      dataProduct: dataListProduct,
      roomId: 'All',
      dateFilter: getJakartaTime(),
    })
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
        <RecentOrders data={dataProduct} loading={loadingProduct} fullHeight/>
      </div>
    </div>
  );
}
