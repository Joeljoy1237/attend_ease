"use client";

import TitleBar from "@components/TitleBar";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

export default function DateChartContent() {
  const currentDate = new Date(); // Get the current date
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate(); // Last day of the month
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  // Get the starting day of the month (0 for Sunday, 1 for Monday, etc.)
  const getStartDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const startDay = getStartDayOfMonth(currentYear, currentMonth);

  const handleMonthChange = (direction: "prev" | "next") => {
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (direction === "prev") {
      newMonth -= 1;
      if (newMonth < 0) {
        newMonth = 11; // Go to December of the previous year
        newYear -= 1;
      }
    } else {
      newMonth += 1;
      if (newMonth > 11) {
        newMonth = 0; // Go to January of the next year
        newYear += 1;
      }
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Create a placeholder array to structure the calendar grid
  const calendarDays: Array<number | null> = Array(startDay)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, day) => day + 1));

  // Fill remaining cells to complete the grid (7 columns per week)
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  // Check if a day is today
  const isToday = (day: number | null) => {
    return (
      day === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    );
  };

//   const isWeekend = index % 7 === 0 || index % 7 === 6; // 0 for Sunday, 6 for Saturday


  return (
    <div className="p-6 bg-white rounded-[8px] flex flex-col space-y-10">
      <TitleBar
        title={`Attendance for ${months[currentMonth]} ${currentYear}`}
      />
      <div className="flex justify-between items-center mt-4">
        <button
          className="flex flex-row items-center justify-center space-x-3 gap-3 px-4 py-2 bg-white text-azure-600 border border-azure-600 rounded-md hover:bg-azure-600 hover:text-white"
          onClick={() => handleMonthChange("prev")}
        >
          <FaArrowLeft /> Previous
        </button>
        <span className="text-lg font-semibold text-gray-700">
          {months[currentMonth]} {currentYear}
        </span>
        <button
          className="flex flex-row items-center justify-center space-x-3 gap-3 px-4 py-2 bg-white text-azure-600 border border-azure-600 rounded-md hover:bg-azure-600 hover:text-white"
          onClick={() => handleMonthChange("next")}
        >
          <FaArrowRightLong />
          Next
        </button>
      </div>

      {/* Calendar */}
      <div className="mt-4">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-2 text-center font-medium text-sm">
          {dayNames.map((day, index) => (
            <div key={index} className="text-azure-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 mt-6">
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-[160px] cursor-pointer h-[100px] rounded-md border relative hover:bg-azure-100 transition duration-200 ease-in-out transform hover:scale-105 ${
                day
                  ? isToday(day)
                    ? "border-azure-200 bg-azure-200"
                    : "border-azure-200 bg-azure-50 bg-opacity-15"
                  : "bg-transparent"
              }`}
            >
              {day ? (
                <>
                  {/* Day Label */}
                  <span
                    className={`text-lg font-semibold ${
                      isToday(day) ? "text-azure-600" : "text-azure-600"
                    }`}
                  >
                    {day}
                  </span>

                  {/* Attendance Info */}
                  <div className="w-full text-xs absolute bottom-1 left-2">
                    {/* Not Marked */}
                    <div className="flex justify-start items-center">
                      <span className="text-red-600 text-opacity-45 text-[10px]">
                        Not Marked
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <span className="text-gray-400 text-sm">No Data</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
