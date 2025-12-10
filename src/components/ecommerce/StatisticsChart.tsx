"use client";
import React from "react";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { ProductList } from "../../types/affiliate";
import { MONTHS } from "../../utils/helper";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function StatisticsChart({
  data,
  loading,
}: {
  data: ProductList[];
  loading: boolean;
}) {

  const categories =
    data?.map((item) => {
      const date = new Date(item.syncTime);
      return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  }) ?? [];

  const directGMV = data.map((item) => {
    const val = item?.stats?.data?.stats?.direct_gmv_local?.amount_delimited;
    if (!val) return 0;

    // hilangkan koma / titik -> convert ke number
    const num = Number(String(val).replace(/[,.]/g, ""));
    return isNaN(num) ? 0 : num;
  });

  const impressions = data.map(
    (item) => item?.stats?.data?.stats?.client_show_cnt ?? 0
  );

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#465FFF", "#f0b278"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: { show: false },
    },

    stroke: {
      curve: "straight",
      width: [2, 2],
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },

    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: { size: 6 },
    },

    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },

    dataLabels: { enabled: false },

    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      x: { format: "dd MMM yyyy" },
    },

    xaxis: {
      type: "category",
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },

    // 🔥 Dual Y-Axis Start Here
    yaxis: [
      {
        seriesName: "Direct GMV",
        title: { text: "GMV" },
        labels: {
          style: { fontSize: "12px", colors: ["#6B7280"] },
        },
      },
      {
        seriesName: "Impressions",
        opposite: true,
        title: { text: "Impressions" },
        labels: {
          style: { fontSize: "12px", colors: ["#6B7280"] },
        },
      },
    ],
  };

  const series = [
    {
      name: "Direct GMV",
      data: directGMV,
    },
    {
      name: "Impressions",
      data: impressions,
    },
  ];
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Performance Trends
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Each data point on this chart is aggregated in 15-minute intervals.
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar min-h-90">
        {loading ? (
          <div className="animate-pulse w-full">
            <div className="h-80 bg-gray-300 rounded-xl"></div>
          </div>
        ):(
          <div className="min-w-[1000px] xl:min-w-full">
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height={310}
            />
          </div>
        )}
      </div>
    </div>
  );
}
