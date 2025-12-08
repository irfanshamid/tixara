import AdminClient from "./layout.client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClient>{children}</AdminClient>;
}
