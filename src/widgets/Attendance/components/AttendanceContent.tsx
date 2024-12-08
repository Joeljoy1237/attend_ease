"use client";
import BatchItem from "@components/BatchItem";
import customToast from "@components/CustomToast";
import TitleBar from "@components/TitleBar";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";

type Batch = {
  division: string;
  branch: string;
};

export default function AttendanceContent() {
  const [count, setCount] = useState(0);
  const [batchData, setBatchData] = useState<Batch[]>([]);
  const [filteredBatchData, setFilteredBatchData] = useState<Batch[]>([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBatchCount();
  }, [sortOrder]);

  const fetchBatchCount = async () => {
    try {
      const requestBody = {
        sortOrder, // or "desc" depending on the required sorting order
      };

      const res = await fetch("/api/batch/count", {
        method: "POST", // Changed to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Include the request body
      });

      if (res.ok) {
        const data = await res.json();
        setBatchData(data.data); // Update state with the fetched data
        setFilteredBatchData(data.data); // Update filtered data as well
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filtered = batchData.filter(
      (batch) =>
        batch.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
        batch.branch.toLowerCase().includes(searchQuery.toLowerCase())
      // batch.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // batch.rollNo.toString().includes(searchQuery)
    );
    setFilteredBatchData(filtered);
  }, [searchQuery]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };
  return (
    <div className="bg-white w-full h-full rounded-[5px] p-6">
      <div className="flex flex-col space-y-5">
        <div className="">
          <TitleBar title="Attendance Marking" subTile="Choose Batches" />
        </div>
        <div className="flex flex-row">
          <div className="flex-1">
            <div className="bg-azure-50 flex flex-row items-center rounded-[50px] px-2">
              <IoSearchOutline className="text-2xl text-azure-600" />
              <input
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                type="text"
                className="w-full bg-azure-50 py-3 px-2 rounded-[50px] outline-none border-none placeholder:text-azure-600"
                placeholder="Search by batch code, name ...."
              />
            </div>
          </div>
          <div className="flex-[2] flex items-center justify-end gap-5">
            <div className="bg-azure-50 rounded-[10px] p-2">
              <span className="text-azure-600">
                Items count: {filteredBatchData?.length}
              </span>
            </div>
            {/* Dropdown for Sorting */}
            <div className="relative">
              <select
                onChange={handleSortChange}
                className="px-4 py-2 text-white bg-azure-600 rounded-md outline-none appearance-none cursor-pointer"
              >
                <option value="asc">Sort: Ascending</option>
                <option value="desc">Sort: Descending</option>
              </select>
            </div>

            {/* Another Button */}
            <button
              className="px-2 outline-none border-none"
              onClick={() => {
                fetchBatchCount();
              }}
            >
              <LuRefreshCcw className="text-azure-600 text-2xl" />
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="relative w-[285px] h-[245px] p-4 rounded-md shadow-sm bg-white bg-opacity-20 border-[1px] border-azure-100 flex flex-col justify-between"
                >
                  <div className="animate-pulse w-3/4 h-9 bg-gray-200 rounded-md"></div>
                  <div className="animate-pulse w-3/5 h-9 bg-gray-200 rounded-md"></div>
                  <div className="w-full h-[1px] bg-gray-200"></div>
                  <div className="flex flex-col space-y-3">
                    <div className="animate-pulse w-full h-9 bg-gray-200 rounded-md"></div>
                    <div className="animate-pulse w-full h-9 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              ))
            : filteredBatchData!.map((batch: any, index) => (
                <BatchItem
                  key={index}
                  batchCode={batch.division}
                  batchName={batch.branch}
                  totalStudents={batch.totalStudents}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
