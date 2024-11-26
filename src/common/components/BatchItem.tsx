"use client";
import { usePathname, useRouter } from "next/navigation";
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
  const router = useRouter();
  const location = usePathname();

  // Mapping for batch names
  const batchNameMap: { [key: string]: string } = {
    cs: "Computer Science",
    hu: "Humanities",
    co: "Commerce",
    bio: "Biology Science",
  };

  // Convert batchName using mapping or use the original
  const fullBatchName = batchNameMap[batchName] || batchName;
console.log(batchName)
  return (
    <div className="flex flex-col bg-white shadow-md p-4 rounded-lg border border-gray-200 w-[285px] gap-5">
      <div className="flex flex-row items-center gap-4">
        <span className="text-2xl font-semibold text-azure-600 uppercase">
          {batchCode}
        </span>
        <div className="w-[1px] h-[2rem] bg-gray-400"></div>
        <span className="text-base font-normal text-gray-700">
          {fullBatchName}
        </span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <span className="text-gray-800">Total students:</span>
        <span className="text-xl font-semibold text-azure-600">
          {totalStudents}
        </span>
      </div>
      <div className="h-[1px] w-full bg-gray-300"></div>
      <div className="w-full flex flex-col space-y-2">
        <button
          onClick={() => {
            if (location === "/dashboard/attendance") {
              router.push(`/dashboard/attendance/${batchCode}/mark-attendance/today`);
            } else {
              router.push("/dashboard/batches/stats/c1");
            }
          }}
          className="bg-azure-600 w-full text-white font-medium p-2 outline-none border-none rounded-[7px]"
        >
          {location === "/dashboard/attendance"
            ? " Mark Todays Attendance"
            : " View Attendance Stats"}
        </button>
        <button
          onClick={() => {
            if (location === "/dashboard/attendance") {
              router.push(`/dashboard/attendance/${batchCode}/mark-attendance/custom-date`);
            } else {
              router.push("/dashboard/batches/stats/c1");
            }
          }}
          className="bg-azure-50 w-full text-azure-600 font-medium p-2 outline-none border-none rounded-[7px]"
        >
          {location === "/dashboard/attendance"
            ? "Custom date"
            : " View Attendance Stats"}
        </button>
      </div>
    </div>
  );
}
