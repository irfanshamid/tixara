import { useState } from "react";

export function useFilterDate() {
  const WIB_OFFSET = 7 * 60 * 60 * 1000; // 7 jam

  // default today (WIB)
  const now = new Date();

  const start = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0, 0, 0, 0
  ).getTime() + WIB_OFFSET;

  const end = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23, 59, 59, 999
  ).getTime() + WIB_OFFSET;

  const [dateFilter, setDateFilter] = useState<{
    type: "today" | "last3day" | "monthly" | "range";
    start: number | null;
    end: number | null;
  }>({
    type: "today",
    start,
    end,
  });

  return {
    dateFilter,
    setDateFilter,
  };
}
