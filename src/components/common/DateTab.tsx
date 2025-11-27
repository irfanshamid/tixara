"use client";

import React, { useState } from "react";

interface DateTabProps {
  onFilterChange: (filter: {
    type: "today" | "last3day" | "monthly" | "range";
    start: number | null;
    end: number | null;
  }) => void;
  onDownload:() => void; 
}

const DateTab: React.FC<DateTabProps> = ({
  onFilterChange,
  onDownload,
}) => {

  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree" | "optionFour"
  >("optionOne");

  const [rangeStart, setRangeStart] = useState<string>("");
  const [rangeEnd, setRangeEnd] = useState<string>("");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree" | "optionFour") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  // -----------------------------
  // FILTER HANDLERS
  // -----------------------------
  const WIB_OFFSET = 7 * 60 * 60 * 1000; // 7 jam

  const applyToday = () => {
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

    onFilterChange({
      type: "today",
      start,
      end,
    });
  };

  const applyLast3Day = () => {
    const now = new Date();

    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - 2,
      0, 0, 0, 0
    ).getTime() + WIB_OFFSET;

    const end = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23, 59, 59, 999
    ).getTime() + WIB_OFFSET;

    onFilterChange({
      type: "last3day",
      start,
      end,
    });
  };

  const applyMonthly = () => {
    const now = new Date();

    const start = new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
      0, 0, 0, 0
    ).getTime() + WIB_OFFSET;

    const end = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23, 59, 59, 999
    ).getTime() + WIB_OFFSET;

    onFilterChange({
      type: "monthly",
      start,
      end,
    });
  };

  const applyRange = (startStr: string, endStr: string) => {
    if (!startStr || !endStr) return;

    const start = new Date(startStr);

    const end = new Date(endStr);

    onFilterChange({
      type: "range",
      start: start.getTime() + WIB_OFFSET,
      end: end.getTime() + WIB_OFFSET,
    });
  };


  // -----------------------------
  // ON TAB CHANGE
  // -----------------------------
  const handleSelectTab = (option: "optionOne" | "optionTwo" | "optionThree" | "optionFour") => {
    setSelected(option);
    setRangeStart('');
    setRangeEnd('');
    if (option === "optionOne") applyToday();
    if (option === "optionTwo") applyLast3Day();
    if (option === "optionThree") applyMonthly();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 relative gap-6">

      {/* FILTER TABS */}
      <div className="col-span-4 md:col-span-2">
        <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          <button
            onClick={() => handleSelectTab("optionOne")}
            className={`px-3 py-2 w-full rounded-md ${getButtonClass(
              "optionOne"
            )}`}
          >
            Today
          </button>
          <button
            onClick={() => handleSelectTab("optionTwo")}
            className={`px-3 py-2 w-full rounded-md ${getButtonClass(
              "optionTwo"
            )}`}
          >
            Last 3 Day
          </button>
          <button
            onClick={() => handleSelectTab("optionThree")}
            className={`px-3 py-2 w-full rounded-md ${getButtonClass(
              "optionThree"
            )}`}
          >
            Monthly
          </button>
          <button
            onClick={() => handleSelectTab("optionFour")}
            className={`px-3 py-2 w-full rounded-md ${getButtonClass(
              "optionFour"
            )}`}
          >
            Range Date
          </button>
        </div>

        {/* RANGE DATE */}
        {selected === "optionFour" && (
          <div className="flex gap-2 items-center mt-3">
            <input
              type="date"
              value={rangeStart}
              onChange={(e) => {
                setRangeStart(e.target.value);
                applyRange(e.target.value, rangeEnd);
              }}
              className="h-11 w-1/2 rounded-lg border border-gray-200 bg-transparent py-2.5 px-4 text-sm text-gray-800 dark:text-white dark:bg-gray-900"
            />
            <span className="text-gray-500">-</span>
            <input
              type="date"
              value={rangeEnd}
              onChange={(e) => {
                setRangeEnd(e.target.value);
                applyRange(rangeStart, e.target.value);
              }}
              className="h-11 w-1/2 rounded-lg border border-gray-200 bg-transparent py-2.5 px-4 text-sm text-gray-800 dark:text-white dark:bg-gray-900"
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={onDownload}
        className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-theme-sm hover:bg-brand-600"
      >
        Export Statistics
      </button>
    </div>
  );
};

export default DateTab;
