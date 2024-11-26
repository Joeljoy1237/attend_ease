import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function TopBar() {
  // Get current date in the desired format
  const formatDate = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    return new Intl.DateTimeFormat("en-US", options).format(today);
  };

  return (
    <div className="flex w-[85vw] px-[2vw] py-[1rem] h-[13vh] fixed bg-white ml-[15vw] z-10">
      <div className="flex flex-row w-full">
        <div className="flex-1 flex items-center justify-start">
          <span className="text-xl font-medium text-azure-600">
            Hello, Abhishek Santhosh👋
          </span>
        </div>
        <div className="flex-1 flex flex-row items-center justify-end space-x-4">
          <div className="text-lg text-azure-600">{formatDate()}</div>
          <div className="p-1 border-2 border-azure-600 rounded-full hover:shadow-lg transition-shadow">
            <IoPersonCircleOutline className="text-4xl text-azure-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
