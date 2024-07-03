import React from "react";
import sun from "../../../../../assets/sun.svg";
import Clock from "./Clock";
import DateComponent from "./Date";

export default function TimeBar() {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="">
          <img src={sun} alt="" className="h-[3rem] w-[3rem]" />
        </div>
        <div className="">
          <Clock />
        </div>
      </div>
      <div className="flex items-end justify-end">
        <DateComponent/>
      </div>
    </div>
  );
}
