
"use client"
import BatchItem from "@components/BatchItem";
import TitleBar from "@components/TitleBar";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { FaCirclePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function BatchContent() {
  const router = useRouter();
  return (
    <div className="bg-white w-full h-full rounded-[5px] p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row items-center justify-between">
          <TitleBar title="All batches" />
          <div className="">
            <button onClick={()=>{
              router.push('/dashboard/batches/new-batch')
            }} className="p-3 text-white bg-azure-600 outline-none border-none rounded-[8px] flex items-center justify-center gap-2"><FaCirclePlus className="text-2xl text-white"/>Add New Batch</button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-1">
            <div className="bg-azure-50 flex flex-row items-center rounded-[50px] px-2">
              <IoSearchOutline className="text-2xl text-azure-600" />
              <input
                type="text"
                className="w-full bg-azure-50 py-3 px-2 rounded-[50px] outline-none border-none placeholder:text-azure-600"
                placeholder="Search by batch code, name ...."
              />
            </div>
          </div>
          <div className="flex-[2] flex items-center justify-end gap-5">
            <div className="bg-azure-50 rounded-[10px] p-2">
              <span className="text-azure-600">Items count: 13</span>
            </div>
            {/* Dropdown for Sorting */}
            <div className="relative">
              <select className="px-4 py-2 text-white bg-azure-600 rounded-md outline-none appearance-none cursor-pointer">
                <option value="asc">Sort: Ascending</option>
                <option value="desc">Sort: Descending</option>
              </select>
            </div>

            {/* Another Button */}
            <button className="px-2 outline-none border-none">
              <LuRefreshCcw className="text-azure-600 text-2xl" />
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <BatchItem
            batchCode="C1"
            batchName="Computer Science"
            totalStudents={42}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
          <BatchItem
            batchCode="B1"
            batchName="Biology Science"
            totalStudents={36}
          />
        </div>
      </div>
    </div>
  );
}
