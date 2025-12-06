export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import GeneralInformationCard from "@/components/others/GeneralContent";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | User Info",
  description: "This is user info and manual guide",
};

export default function Token() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-12">
        <GeneralInformationCard />
      </div>
    </div>
  );
}
