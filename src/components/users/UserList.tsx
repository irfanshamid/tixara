import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Define the TypeScript interface for the table rows
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  lastLogin: string;
  lastUpdated: string;
  status: "Active" | "Blocked";
}

// Define the table data using the interface
const tableData: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastLogin: "2025-11-12 14:30",
    lastUpdated: "2025-11-13 10:15",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastLogin: "2025-11-11 09:20",
    lastUpdated: "2025-11-12 18:42",
    status: "Blocked",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    lastLogin: "2025-11-10 21:00",
    lastUpdated: "2025-11-11 07:30",
    status: "Active",
  },
];

export default function UserTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Users
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Last Login
              </TableCell>
              <TableCell
                isHeader
                className="w-[280px] min-w-[240px] py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Last Updated
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((user) => (
              <TableRow key={user.id}>
                {/* User Info */}
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    <div className="h-[50px] w-[50px] overflow-hidden rounded-full">
                      <Image
                        width={50}
                        height={50}
                        src={user.avatar}
                        className="h-[50px] w-[50px] object-cover"
                        alt={user.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {user.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Last Login */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.lastLogin}
                </TableCell>

                {/* Last Updated */}
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.lastUpdated}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3">
                  <Badge
                    size="sm"
                    color={user.status === "Active" ? "success" : "error"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
