import React from "react";
import { FiClock } from "react-icons/fi";
import { IoIosCheckmarkCircle } from "react-icons/io";

interface AttendanceProps {
  present: number;
  isPresentFull: boolean;
  date: string; // Expecting a date string in a format parsable by Date
  absent: number;
}

const AttendanceItem: React.FC<AttendanceProps> = ({
  present,
  isPresentFull,
  date,
  absent,
}) => {
  // Format the date as DD/MM/YYYY - (Day)
  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(dateObj);
    const dayName = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(dateObj);
    return `${formattedDate} - ${dayName}`;
  };
  console.log(isPresentFull)

  return (
    <div className="attendance-item p-4 rounded-md shadow-sm w-[280px] bg-white bg-opacity-20 border-[1px] border-azure-100 h-[160px] flex flex-col justify-between">
      <div className="flex flex-row items-center space-x-2">
        <FiClock className="text-gray-600" />
        <span className="text-gray-600">{formatDate(date)}</span>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <span className="text-azure-600 font-bold text-2xl">{present}</span>
        <span className="capitalize text-gray-500">Students present</span>
      </div>
      <div className="w-full flex flex-row items-center justify-between">
        {!isPresentFull && (
          <div className="flex flex-row items-center space-x-2">
            <span className="text-red-600 font-bold text-base">{absent}</span>
            <span className="capitalize text-red-600">absent</span>
          </div>
        )}
        {isPresentFull && (
          <div className="px-2 py-1 bg-azure-100 rounded-[5px]">
            <span className="text-azure-600 font-semibold text-xs flex items-center gap-1">
              <IoIosCheckmarkCircle className="text-base" />
              {isPresentFull ? "All Present" : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceItem;
