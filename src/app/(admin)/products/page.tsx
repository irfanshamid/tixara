import type { Metadata } from "next";
// import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
// import RecentOrders from "@/components/ecommerce/RecentOrders";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | Product performance",
  description: "This is product performance list",
};

export default function Products() {
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
