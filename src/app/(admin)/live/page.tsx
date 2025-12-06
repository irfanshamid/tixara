import type { Metadata } from "next";
import React from "react";
import DashboardTimestamp from "@/components/live/DashboardTimestamp";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | Live performances",
  description: "This is live portal performances",
};

export default function Live() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-12">
        <DashboardTimestamp />
      </div>
    </div>
  );
}
