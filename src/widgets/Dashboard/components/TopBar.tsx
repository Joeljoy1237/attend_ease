import Image from "next/image";
import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function TopBar() {
  return (
    <div className="flex w-[85vw] px-[2vw] py-[1rem] h-[13vh] fixed bg-white ml-[15vw] z-10">
      <div className="flex flex-row w-full">
        <div className="flex-1 flex items-center justify-start">
          <span className="text-xl font-medium text-azure-600">
            Hello, Abhishek Santhosh👋
          </span>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end">
          <div className="p-1 border-2 border-azure-600 rounded-full hover:shadow-lg transition-shadow">
            <IoPersonCircleOutline className="text-4xl text-azure-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
