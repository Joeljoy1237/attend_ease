import React from "react";
import SideBarBody from "./components/SideBarBody";
import { IoLogOutOutline } from "react-icons/io5";

export default function SideBar({ sideBarMenu }) {
  console.log(sideBarMenu);
  return (
    <div className="px-[1vw] py-4 h-[100vh] max-w-[15vw] relative flex flex-col">
      <div className="flex items-center justify-center flex-col py-3">
        <div className="text-2xl font-semibold text-primary">Attend Ease</div>
      </div>
      <div className="mt-[10vh] w-full">
        <SideBarBody sideBarMenu={sideBarMenu} />
      </div>
      <div className="absolute bottom-5 left-0 w-[100%] self-center flex items-center justify-center">
        <button className="bg-primary-100 gap-3 py-3 flex items-center self-center justify-center w-[90%] rounded-lg font-semibold text-primary">
          <IoLogOutOutline className="text-xl font-semibold"/> LOGOUT
        </button>
      </div>
    </div>
  );
}
