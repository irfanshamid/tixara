"use client";

import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const ChartTab: React.FC = () => {
  const [selected, setSelected] = useState<
    "optionOne" | "optionTwo" | "optionThree" | "optionFour"
  >("optionOne");

  const getButtonClass = (option: "optionOne" | "optionTwo" | "optionThree" | "optionFour") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  const roomList = [
    {id: 1, name: 'kktops'},
    {id: 2, name: 'kktop.dailyfit'},
    {id: 3, name: 'kktop.official'},
  ]

  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = (idx: number) => {
    // setRoom(idx);
    console.log(idx);
    setIsOpen(false);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 relative">
      <button
        onClick={() => setIsOpen(!isOpen)} 
        className="px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900 dark:hover:text-white flex items-center justify-between dropdown-toggle shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      >
        <span className="block mr-1 font-medium text-theme-sm">Select store</span>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
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
      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="absolute left-0 top-8 flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <ul className="flex flex-col gap-1">
          {roomList.map((item, key) => (
            <li key={key}>
              <DropdownItem
                onItemClick={() => selectedItem(item.id)}
                className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                {item.name}
              </DropdownItem>
            </li>
          ))}
        </ul>
      </Dropdown>
      <div></div>

      <div className="col-span-4 md:col-span-2">
        <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          <button
            onClick={() => setSelected("optionOne")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "optionOne"
            )}`}
          >
            Today
          </button>
          <button
            onClick={() => setSelected("optionTwo")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "optionTwo"
            )}`}
          >
            Last 3 Day
          </button>
          <button
            onClick={() => setSelected("optionThree")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "optionThree"
            )}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setSelected("optionFour")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "optionFour"
            )}`}
          >
            Range Date
          </button>
        </div>
        <div className={selected === 'optionFour' ? 'flex gap-2 items-center mt-3' : 'hidden'}>
          <div className="text-gray-500">Select your range: </div>
          <input
            type="date"
            className="dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
          <div className="text-gray-500">-</div>
          <input
            type="date"
            className="dark:bg-dark-900 h-11 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
          />
        </div>
      </div>
    </div>
  );
};

export default ChartTab;
