"use client";
import { sideBarMenu } from "@utils/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import customToast from "@components/CustomToast";
import { signOut } from "next-auth/react";

export default function SideBar() {
  const userRole = "admin"; // Example role, dynamically fetched in real use
  const location = usePathname();
  const router = useRouter();
  const filteredMenu = sideBarMenu.filter((item) =>
    item.rightsToView.includes(userRole)
  );

  return (
    <div className="w-[15vw] h-screen pt-[2rem] fixed bg-white">
      <div className="w-full h-full relative">
        <Link
          href={"/dashboard/home"}
          className="flex-[0.5] flex items-center justify-center"
        >
          <Image src={"/logo/logo.svg"} alt="" width={130} height={150} />
        </Link>
        <div className="sidebar mt-[60px] space-y-2">
          {filteredMenu.map((menu) => {
            // Determine if the current menu is active
            const isActive =
              (location === "/dashboard" && menu.link === "/") || // Special case for root /dashboard
              location.includes(`/dashboard${menu.link}`);

            return (
              <Link
                key={menu.link}
                href={`/dashboard${menu.link}`}
                className={`sidebar-item flex items-center gap-2 hover:bg-azure-50 h-[3.4rem] relative px-[2vw] transition-all duration-300 ease-in-out ${
                  isActive ? "bg-azure-50" : ""
                }`}
              >
                {/* Left indicator for active state */}
                {isActive && (
                  <div className="w-[7px] h-full bg-azure-600 absolute left-0 top-0 rounded-r-[8px] transition-all duration-300 ease-in-out"></div>
                )}

                {/* Icon with smooth color transition */}
                <menu.icon
                  className={`text-2xl transition-colors duration-300 ease-in-out ${
                    isActive ? "text-azure-600" : "text-grayFont-700"
                  }`}
                />

                {/* Menu name with smooth text color transition */}
                <span
                  className={`transition-colors duration-300 ease-in-out ${
                    isActive
                      ? "text-azure-600 font-semibold"
                      : "text-grayFont-700"
                  }`}
                >
                  {menu.name}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="absolute bottom-0 w-full px-[1vw] pb-[2vh] flex flex-col gap-2 items-center justify-center">
          <button
            onClick={() => {
              signOut();
              customToast({
                message: "Logout successfull",
                type: "success",
                desc: "Redirecting to login page",
              });
            }}
            className="rounded-[10px] flex items-center justify-center gap-3 bg-red-100 w-full p-3 text-red-600 font-semibold"
          >
            <FiLogOut className="font-semibold text-2xl" />
            Logout
          </button>
          <div className="text-xs flex flex-col items-center justify-center gap-1 text-gray-500">
            <span className="">All rights reserved</span>
            <span className="">Developed by Abhishek</span>
          </div>
        </div>
      </div>
    </div>
  );
}
