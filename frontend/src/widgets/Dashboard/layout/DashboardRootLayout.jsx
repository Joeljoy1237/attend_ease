import { Suspense, useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import { Outlet } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";

export default function DashboardRootLayout() {
  const buttons = [
    {
        url: "/dashboard",
        title: "Dashboard",
        hasView: true,
        icon: <MdSpaceDashboard />
    },
    {
      url: "/students",
      title: "Students",
      hasView: true,
      icon: <HiUserGroup />
  },
  ]
  return (
    <div className="flex">
      <SideBar sideBarMenu={buttons}/>
      <div className="">
        <TopBar />
        <div className="">
          <Suspense fallback={<>hey please wait loading</>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
