import type { Metadata } from "next";
import DashboardLive from "@/components/ecommerce/DashboardLive";

export const metadata: Metadata = {
  title: "Next.js E-commerce Dashboard",
};

export default function Ecommerce() {
  return <DashboardLive />;
}
