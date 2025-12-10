export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import DashboardProduct from "../../../components/product/DashboardProduct";

export const metadata: Metadata = {
  title:
    "Live SentinelDashboard | Products",
  description: "This is products performance",
};

export default function Products() {
  return <DashboardProduct />;
}
