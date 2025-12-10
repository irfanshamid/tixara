export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import React from "react";
import UserTable from "../../../components/users/UserList";

export const metadata: Metadata = {
  title:
    "Live SentinelDashboard | User management",
  description: "This is user portal for user manage",
};

export default function Users() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-12">
        <UserTable />
      </div>
    </div>
  );
}
