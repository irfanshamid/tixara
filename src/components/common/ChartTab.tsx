"use client";

import React, { useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useRoom } from "@/hooks/useRoom";

interface ChartTabProps {
  selectedRoom: string;
  onSelectRoom: (roomId: string) => void;
  onFilterChange: (filter: {
    type: "today" | "last3day" | "monthly" | "range";
    start: number | null;
    end: number | null;
  }) => void;
  onDownload:() => void; 
}

const ChartTab: React.FC<ChartTabProps> = ({
  selectedRoom,
  onSelectRoom,
  onFilterChange,
  onDownload,
}) => {
  const { roomList, loadingRoom } = useRoom();

  console.log('roomList', roomList);

  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree" | "optionFour"
  >("optionOne");

  const [rangeStart, setRangeStart] = useState<string>("");
  const [rangeEnd, setRangeEnd] = useState<string>("");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree" | "optionFour") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectRoom = (roomId: string) => {
    onSelectRoom(roomId);
    setIsOpen(false);
  };

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
    start.setHours(0, 0, 0, 0);

    const end = new Date(endStr);
    end.setHours(23, 59, 59, 999);

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

    if (option === "optionOne") applyToday();
    if (option === "optionTwo") applyLast3Day();
    if (option === "optionThree") applyMonthly();
  };

  useEffect(() => {
    handleSelectRoom(roomList[0]?.username)
  },[roomList])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 relative gap-6">
      {/* SELECT ROOM */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white flex items-center justify-between dropdown-toggle shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      >
        <span>
          {loadingRoom
            ? "Loading rooms..."
            : selectedRoom
              // ? roomList.find((r) => r.username === selectedRoom)?.username
              ? selectedRoom === 'kktop.dailyfit' ? 'Store 1' : selectedRoom === 'kktop.official' ? 'Store 2' : 'Store 3'
              : "Select store"}
        </span>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* DROPDOWN */}
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute left-0 top-8 flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <ul className="flex flex-col gap-1">
          {roomList?.map((item, i) => (
            <li key={item.roomId}>
              <DropdownItem
                onItemClick={() => handleSelectRoom(item.username)}
                className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Store {i + 1}
              </DropdownItem>
            </li>
          ))}

          {!loadingRoom && roomList?.length === 0 && (
            <li className="text-gray-500 text-sm px-3 py-2">No rooms found</li>
          )}
        </ul>
      </Dropdown>

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

export default ChartTab;
