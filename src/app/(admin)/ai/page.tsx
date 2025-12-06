export const dynamic = "force-dynamic";

import type { Metadata } from "next";
// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
// import RecentOrders from "@/components/ecommerce/RecentOrders";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | AI Analitycs",
  description: "AI ft. KKTOPS",
};

export default function AI() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        {/* <EcommerceMetrics /> */} Coming soon
      </div>
      <div className="col-span-12 xl:col-span-12">
        {/* <RecentOrders /> */}
      </div>
    </div>
  );
}
