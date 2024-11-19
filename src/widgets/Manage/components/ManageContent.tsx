import BatchItem from "@components/BatchItem";
import TitleBar from "@components/TitleBar";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";

export default function ManageContent() {
  return (
    <div className="bg-white w-full h-full rounded-[5px] p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row items-center justify-between">
          <TitleBar title="All batches" />
          <div className="">
            <button className="p-3 text-white bg-azure-600 outline-none border-none rounded-[8px] flex items-center justify-center gap-2">
              <FaCirclePlus className="text-2xl text-white" />
              Add New Batch
            </button>
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
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-azure-50 h-[50px]">
              <tr>
                <th className="px-4 py-2 text-left text-base font-medium text-azure-600">
                  Sl No.
                </th>
                <th className="px-4 py-2 text-left text-base font-medium text-azure-600">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-base font-medium text-azure-600">
                  Admission No.
                </th>
                <th className="px-4 py-2 text-left text-base font-medium text-azure-600">
                  Class
                </th>
                <th className="px-4 py-2 text-center text-base font-medium text-azure-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <tr key={index} className="h-[2rem]">
                    <td className="px-4 py-2 text-base text-gray-700">1</td>
                    <td className="px-4 py-2 text-base text-gray-700">
                      Abhishek
                    </td>
                    <td className="px-4 py-2 text-base text-gray-700">1522</td>
                    <td className="px-4 py-2 text-base text-gray-700">
                      Computer Science
                    </td>
                    <td className="px-4 py-2 text-center flex items-center justify-center">
                      <button className="text-blue-500 hover:text-blue-700">
                        <FiEdit className="text-xl"/>
                      </button>
                      <button className="text-red-500 hover:text-red-700 ml-2">
                        <MdOutlineDelete className="text-2xl"/>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
