import type { Metadata } from "next";
import DashboardProduct from "@/components/product/DashboardProduct";

export const metadata: Metadata = {
  title:
    "KKTOP Dashboard | Products",
  description: "This is products performance",
};

export default function Products() {
  return <DashboardProduct />;
}
