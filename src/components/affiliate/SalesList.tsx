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
import { AffiliateList } from "../../types/performance";
import { useMemo, useState } from "react";

export default function SalesList({
  data,
  loading,
  fullHeight,
}: {
  data: AffiliateList | undefined;
  loading: boolean;
  fullHeight?: boolean;
}) {
  const [search, setSearch] = useState("");
  console.log(data);

  const products = data?.stats ?? [];

  const filteredList = useMemo(() => {
    let list = products;
    console.log(list);

    // Filter
    if (search) {
      list = list.filter((item) =>
        item.creator_base.handle_name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort descending by amount
    list.sort(
      (a, b) =>
        Number(b.creator_metrics.creator_gmv.amount) - Number(a.creator_metrics.creator_gmv.amount)
    );

    return list;
  }, [search, products]);


  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Affiliate Performance
          </h3>
        </div>
         <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search affiliate..."
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
                Affiliate
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                GMV
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Refunds
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Orders
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Item sold
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Item refunded
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Video
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Live streams
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product with sales
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Est. commission
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <td colSpan={9} className="py-5">
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
                          src={product.creator_base.avatar.thumb_url_list[0]}
                          className="h-[50px] w-[50px] object-cover rounded"
                          alt="Avatar"
                        />
                        <div>
                          <p
                            className="font-medium text-gray-800 text-theme-sm dark:text-white/90"
                          >
                            {product.creator_base.handle_name}
                          </p>
                          <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                            ID : {product.creator_base.nick_name}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(Number(product.creator_metrics.creator_gmv.amount))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      Rp{formatCurrency(Number(product.creator_metrics.creator_refunded_gmv.amount))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                        {formatCurrency(Number(product.creator_metrics.creator_orders_cnt.value))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                        {formatCurrency(Number(product.creator_metrics.creator_items_sold_cnt.value))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(Number(product.creator_metrics.creator_refunded_items_cnt.value))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(Number(product.creator_metrics.creator_video_cnt.value))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(Number(product.creator_metrics.creator_live_cnt.value))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(Number(product.creator_metrics.creator_products_with_sales_cnt.value))}
                    </TableCell>
                    <TableCell className="py-3 min-w-[100px] text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatCurrency(Number(product.creator_metrics.creator_estimated_commission.amount))}
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
