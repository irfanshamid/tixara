"use client";

import { formatCurrency } from "../../utils/helper";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { ProductList } from "../../types/affiliate";
import { useMemo, useState } from "react";

export default function RecentOrders({
  data,
  loading,
  fullHeight,
}: {
  data: ProductList | undefined;
  loading: boolean;
  fullHeight?: boolean;
}) {
  const [search, setSearch] = useState("");

  const products = data?.stats.data?.segments[0]?.stats ?? [];

  const filteredList = useMemo(() => {
    let list = [...products];

    // Filter
    if (search) {
      list = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort descending by amount
    list.sort(
      (a, b) =>
        Number(b.direct_gmv_local.amount) - Number(a.direct_gmv_local.amount)
    );

    return list;
  }, [search, products]);


  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Product Sales
          </h3>
        </div>
         <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search product..."
            className="h-11 w-full sm:w-1/4 rounded-lg border border-gray-200 bg-transparent py-2.5 px-4 text-sm text-gray-800 dark:text-white dark:bg-gray-900"
          />
      </div>
      <div className={`max-w-full overflow-x-auto ${fullHeight ? 'h-full' : 'max-h-[700px] overflow-y-auto'}`}>
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Products
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Direct GMV
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Impressions
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Click-through rate
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Items sold
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product click
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Add to cart count
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={7} className="py-5">
                    <div className="animate-pulse h-5 bg-gray-300 rounded-full w-full"></div>
                  </td>
                </TableRow>
              ))}
            </>
          ):(
            <>
            {filteredList.length > 0 ? 
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredList.map((product, key) => (
                  <TableRow key={key} className="">
                    <TableCell className="py-3 max-w-[300px]">
                      <div className="flex items-center gap-3 pr-10">
                        <Image
                          width={50}
                          height={50}
                          src={product.cover_url}
                          className="h-[50px] w-[50px] object-cover rounded"
                          alt={product.name}
                        />
                        <div>
                          <p
                            className="font-medium text-gray-800 text-theme-sm dark:text-white/90"
                            title={product.name}
                          >
                            {product.name.length > 70
                              ? product.name.slice(0, 70) + "..."
                              : product.name}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            ID : {product.id}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      Rp{formatCurrency(Number(product.direct_gmv_local.amount))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(product.exposure_cnt)}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.click_through_rate}%
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(product.direct_sales)}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(product.total_click_cnt)}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(product.add_shop_cart_cnt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> :
              <TableBody>
                <TableRow>
                  <td colSpan={7} className="text-center py-10">
                    <div className="text-gray-400">No Data Sync</div>
                  </td>
                </TableRow>
              </TableBody>
              }
            </>
          )}

        </Table>
      </div>
    </div>
  );
}
