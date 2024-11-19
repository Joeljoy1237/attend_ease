import AttendanceItem from "@components/AttendanceItem";
import TitleBar from "@components/TitleBar";
import React from "react";

export default function DashboardContent() {
  return (
    <div className="h-full rounded-[8px] flex flex-col space-y-8">
      <div className="flex flex-row w-full space-x-4">
        <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <span className="text-xl text-azure-600 font-semibold">
                Present
              </span>
            </div>
            <div className="w-[2px] h-[2rem] bg-gray-400"></div>
            <div className="flex items-center justify-center">
              <span className="mt-1 text-gray-500">Today</span>
            </div>
          </div>
          <div className="">
            <span className="text-4xl text-azure-600 font-semibold">124</span>
          </div>
          <div className="">
            <span className="text-gray-500 text-sm">12% increse than yesterday</span>
          </div>
        </div>
        <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <span className="text-xl text-azure-600 font-semibold">
                Absent
              </span>
            </div>
            <div className="w-[2px] h-[2rem] bg-gray-400"></div>
            <div className="flex items-center justify-center">
              <span className="mt-1 text-gray-500">Today</span>
            </div>
          </div>
          <div className="">
            <span className="text-4xl text-red-600 font-semibold">20</span>
          </div>
          <div className="">
            <span className="text-gray-500 text-sm">2% decrese than yesterday</span>
          </div>
        </div>
        <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <span className="text-xl text-azure-600 font-semibold">
                Total Students
              </span>
            </div>
          </div>
          <div className="">
            <span className="text-4xl text-azure-600 font-semibold">144</span>
          </div>
          <div className="">
            <span className="text-gray-500 text-sm">Including all batches</span>
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
