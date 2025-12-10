export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import DashboardLive from "../../components/ecommerce/DashboardLive";

export const metadata: Metadata = {
  title: "Live SentinelDashboard",
};

export default function Ecommerce() {
  return <DashboardLive />;
}
