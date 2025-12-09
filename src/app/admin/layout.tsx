import AdminClient from "./layout.client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  console.log(children)
  return <AdminClient>
    <div>hehe</div>
  </AdminClient>;
}
