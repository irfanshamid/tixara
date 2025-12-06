export const dynamic = "force-dynamic";

import type { Metadata } from "next";
// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
// import DemographicCard from "@/components/ecommerce/DemographicCard";
// import Performance from "@/components/affiliate/Performance";
import DashboardAffiliate from "@/components/affiliate/DashboardAffiliate";
// import SalesChart from "@/components/affiliate/SalesChart";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | Affiliate list",
  description: "This is the affiliate list data",
};

export default function Affiliate() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />

        <SalesChart />
      </div> */}
{/* 
      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div> */}

      <div className="col-span-12 xl:col-span-12">
        <DashboardAffiliate />
      </div>
    </div>
  );
}
