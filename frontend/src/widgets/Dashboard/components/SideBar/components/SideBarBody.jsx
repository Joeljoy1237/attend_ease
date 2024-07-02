import React from "react";
import SideBarMenuItem from "./SideBarMenuItem";

export default function SideBarBody({ sideBarMenu }) {
    console.log(sideBarMenu)
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-fit">
      {sideBarMenu?.map((menu) => (
        <SideBarMenuItem menu={menu} />
      ))}
    </div>
  );
}
