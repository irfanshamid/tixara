export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import TokenList from "@/components/others/TokenList";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | Secret list",
  description: "This is token management for sales data",
};

export default function Token() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-12">
        <TokenList />
      </div>
    </div>
  );
}
