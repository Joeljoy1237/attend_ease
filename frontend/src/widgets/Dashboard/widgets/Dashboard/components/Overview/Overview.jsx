import React from "react";
import { PiUsersThreeLight } from "react-icons/pi";
import { LiaUserCheckSolid } from "react-icons/lia";
import { LiaUserMinusSolid } from "react-icons/lia";

export default function Overview() {
  return (
    <div className="w-full flex gap-3 items-center justify-between">
        <div className="flex-1 shadow-sm border-l-[5px] border-primary bg-white rounded-lg p-3 relative ml-1 mb-[-1px]">
          <div className="flex flex-col gap-4">
            <span className="text-3xl font-medium">453</span>
            <span className="">Total students</span>
          </div>
          <div className="absolute bottom-3 right-3">
            <PiUsersThreeLight className="h-[2rem] w-[2rem] font-light" />
          </div>
        </div>
      <div className="flex-1 shadow-sm border-l-[5px] border-primary bg-white rounded-lg p-3 relative">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-medium">441</span>
          <span className="">Present</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <LiaUserCheckSolid className="h-[2rem] w-[2rem] font-light" />
        </div>
      </div>
      <div className="flex-1 shadow-sm border-l-[5px] border-primary bg-white rounded-lg p-3 relative">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-medium">12</span>
          <span className="">Absent</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <LiaUserMinusSolid className="h-[2rem] w-[2rem] font-light" />
        </div>
      </div>
    </div>
  );
}
