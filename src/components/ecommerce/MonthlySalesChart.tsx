"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { ProductList } from "@/types/affiliate";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart({
    data,
    loading,
  }: {
    data: ProductList[];
    loading: boolean;
  }) {

  // --- Generate categories & series ----
  const categories =
    data?.map((item) => {
      const date = new Date(item.syncTime);
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }) ?? [];

  const salesSeries =
    data?.map((item) => item.stats.data.stats.direct_sales) ?? [];


  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Sales",
      data: salesSeries,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Sales Chart
        </h3>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className={`${loading ? 'w-full' : '-ml-5 min-w-[650px] xl:min-w-full pl-2'} min-h-48`}>
          {loading ? (
            <div className="animate-pulse grid grid-cols-12 gap-4 py-3">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="min-h-38 bg-gray-300 rounded-full"></div>
              ))}
            </div>
          ):(
            <ReactApexChart
              options={options}
              series={series}
              type="bar"
              height={180}
            />
          )}
        </div>
      </div>
    </div>
  );
}
