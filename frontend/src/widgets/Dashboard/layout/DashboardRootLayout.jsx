import { Suspense, useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import TopBar from "../components/TopBar/TopBar";
import { Outlet } from "react-router-dom";

export default function DashboardRootLayout() {
  return (
    <div className="flex">
      <SideBar />
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
