import Badge from "../ui/badge/Badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

interface Product {
  id: number;
  token: string;
  est_expire: string;
  status: number;
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    token: "123123123131231231231",
    est_expire: "30 November 2025",
    status: 1,
  },
  {
    id: 2,
    token: "312314313123123123123",
    est_expire: "8 November 2025",
    status: 2,
  },
    {
    id: 3,
    token: "324243242323242342322",
    est_expire: "15 November 2025",
    status: 3,
  },
];

export default function TokenList() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Token & Credential
            </h3>
          </div>

          <div className="flex items-center gap-3">
          </div>
        </div>
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Slot
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Unique credential
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Est. expire token
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}

            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {tableData.map((product, i) => (
                <TableRow key={product.id} className="">
                  <TableCell className="py-3">
                    #{i+1}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.token}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        product.status === 1
                          ? "success"
                          : product.status === 3
                          ? "warning"
                          : "error"
                      }
                    >
                      {product.status === 1 ? 'Active' : product.status === 3 ? '1 Day to go' : 'Expired'}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {product.est_expire}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
      <div className="text-gray-400">** All token is generated and sending from Tiktok X Tokopedia seller</div>
    </div>
  );
}
