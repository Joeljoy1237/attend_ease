import React from "react";
import { useLocation } from "react-router-dom";

export default function SideBarMenuItem({ menu }) {
  const location = useLocation();
  console.log(location.pathname)
  console.log(menu);
  return (
    <button className={`flex items-center justify-start gap-2 text-lg p-3 min-w-[12rem] max-w-[12rem] rounded-lg hover:bg-primary-100 ${location?.pathname === menu?.url && 'bg-primary-100 text-primary font-medium'}`}>
      {menu?.icon}
      <span className="">{menu?.title}</span>
    </button>
  );
}
