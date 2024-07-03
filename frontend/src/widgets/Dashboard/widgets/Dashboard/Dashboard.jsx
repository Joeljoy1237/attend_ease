import React from "react";
import TimeBar from "./components/TimeBar";
import Overview from "./components/Overview/Overview";

export default function Dashboard() {
  return (
    <div className="h-full w-full rounded-lg flex flex-col gap-4">
      <div className="shadow-sm bg-white p-3 rounded-lg">
        <TimeBar />
      </div>
      <Overview />
    </div>
  );
}
