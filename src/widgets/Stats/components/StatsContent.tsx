import AttendanceItem from "@components/AttendanceItem";
import TitleBar from "@components/TitleBar";
import React from "react";

export default function StatsContent() {
  return (
    <div className="h-full rounded-[8px] flex flex-col space-y-8">
      <div className="flex flex-col w-full space-y-8 bg-white p-6">
        <div className="">
          <TitleBar title="All Batches" subTile="C1 - Computer Science" />
        </div>
        <div className="flex flex-row items-center justify-start space-x-8">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-azure-600">120</span>
            <span className="text-gray-500 text-sm">Total students</span>
          </div>
          <div className="w-[1px] h-[3rem] bg-gray-500"></div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-azure-600">110</span>
            <span className="text-gray-500 text-sm">Present Today</span>
          </div>
          <div className="w-[1px] h-[3rem] bg-gray-500"></div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-red-600">10</span>
            <span className="text-gray-500 text-sm">Absent Today</span>
          </div>
        </div>
      </div>
      <div className="h-auto bg-white w-full shadow-sm p-4 rounded-[5px]">
        <div className="flex flex-col w-full space-y-6">
          <div className="flex flex-row items-center justify-between">
            <TitleBar title="Attendance history" />
            <div className="">
              <button className="">
                <span className="font-semibold text-azure-600">View all</span>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AttendanceItem
              present={25}
              absent={5}
              isPresentFull={true}
              date="09 October 2024"
            />
            <AttendanceItem
              present={25}
              absent={5}
              isPresentFull={false}
              date="09 October 2024"
            />
            <AttendanceItem
              present={25}
              absent={5}
              isPresentFull={true}
              date="09 October 2024"
            />
            <AttendanceItem
              present={25}
              absent={5}
              isPresentFull={true}
              date="09 October 2024"
            />
            <AttendanceItem
              present={25}
              absent={5}
              isPresentFull={true}
              date="09 October 2024"
            />
            <AttendanceItem
              present={25}
              absent={5}
              isPresentFull={true}
              date="09 October 2024"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
