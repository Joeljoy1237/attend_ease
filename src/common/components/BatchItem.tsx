"use client"
import { useRouter } from "next/navigation";
import React from "react";

interface BatchItemProps {
  batchCode: string;
  batchName: string;
  totalStudents: number;
}

export default function BatchItem({
  batchCode,
  batchName,
  totalStudents,
}: BatchItemProps) {
  const router = useRouter()
  return (
    <div className="flex flex-col bg-white shadow-md p-4 rounded-lg border border-gray-200 w-[285px] gap-5">
      <div className="flex flex-row items-center gap-4">
        <span className="text-2xl font-semibold text-azure-600">{batchCode}</span>
        <div className="w-[1px] h-[2rem] bg-gray-400"></div>
        <span className="text-base font-normal text-gray-700">{batchName}</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <span className="">Total students:</span>
        <span className="text-xl font-semibold text-azure-600">{totalStudents}</span>
      </div>
      <div className="h-[1px] w-full bg-gray-300"></div>
      <div className="w-full">
        <button onClick={()=>{
          router.push('/dashboard/batches/stats/c1')
        }} className="bg-azure-600 w-full text-white font-medium p-2 outline-none border-none rounded-[7px]">
          View Attendance Stats
        </button>
      </div>
    </div>
  );
}
