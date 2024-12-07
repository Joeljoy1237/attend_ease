"use client";
import AttendanceItem from "@components/AttendanceItem";
import TitleBar from "@components/TitleBar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface AttendanceStats {
  studentCount: number;
  date: string; // Format: "YYYY-MM-DD"
  presentCount: number;
  absentCount: number;
}

interface TodaysAttendance {
  present: number;
  absent: number;
  total: number;
}

interface AttendanceResponse {
  attendanceCounts: AttendanceStats[];
  studentCount: number;
  todaysAttendance: TodaysAttendance;
}

export default function StatsContent() {
  const { division } = useParams();
  const [batchName, setBatchName] = useState("");
  const [attendanceData, setAttendanceData] =
    useState<AttendanceResponse | null>(null);

  useEffect(() => {
    if (division === "b1") {
      setBatchName("First Year Biology Science");
    } else if (division === "b2") {
      setBatchName("Second Year Biology Science");
    } else if (division === "c2") {
      setBatchName("Second Year Computer Science");
    } else if (division === "c1") {
      setBatchName("First Year Computer Science");
    } else if (division === "e1") {
      setBatchName("First Year Commerce");
    } else if (division === "e2") {
      setBatchName("Second Year Commerce");
    } else if (division === "h1") {
      setBatchName("First Year Humanities");
    } else if (division === "h2") {
      setBatchName("Second Year Humanities");
    }
  }, [division]);

  const fetchStats = async () => {
    try {
      const requestBody = {
        division, // or "desc" depending on the required sorting order
      };
      const res = await fetch("/api/batch/stats", {
        method: "POST",
        body: JSON.stringify(requestBody),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }
      const data: AttendanceResponse = await res.json();
      console.log(data);
      setAttendanceData(data);
    } catch (error) {
      console.log(error);
    }
  };
console.log(attendanceData)
  useEffect(() => {
    fetchStats();
  }, [division]);

  return (
    <div className="h-full rounded-[8px] flex flex-col space-y-8">
      <div className="flex flex-col w-full space-y-8 bg-white p-6">
        <div className="">
          <TitleBar
            title="All Batches"
            subTile={`${division} - ${batchName}`}
          />
        </div>
        <div className="flex flex-row items-center justify-start space-x-8">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-azure-600">
              {attendanceData ? attendanceData.studentCount : 0}
            </span>
            <span className="text-gray-500 text-sm">Total students</span>
          </div>
          <div className="w-[1px] h-[3rem] bg-gray-500"></div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-azure-600">
              {attendanceData ? attendanceData.todaysAttendance.present : 0}
            </span>
            <span className="text-gray-500 text-sm">Present Today</span>
          </div>
          <div className="w-[1px] h-[3rem] bg-gray-500"></div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-semibold text-red-600">
              {attendanceData ? attendanceData.todaysAttendance.absent : 0}
            </span>
            <span className="text-gray-500 text-sm">Absent Today</span>
          </div>
        </div>
      </div>
      <div className="h-auto bg-white w-full shadow-sm p-4 rounded-[5px]">
        <div className="flex flex-col w-full space-y-6">
          <div className="flex flex-row items-center justify-between">
            <TitleBar title="Attendance history" />
            <div className="">
              <button className="">
                <span className="font-semibold text-azure-600">View all</span>
              </button>
            </div>
          </div>
          {attendanceData === null || attendanceData?.attendanceCounts.length === 0 ? (
            <div className="w-full flex items-center justify-center h-[40vh]">
              <span className="text-azure-600">No records to display!</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {attendanceData?.attendanceCounts.map((attendance, index) => (
                <AttendanceItem
                  key={index}
                  present={attendance.presentCount}
                  absent={attendance.absentCount}
                  isPresentFull={
                    attendance.presentCount === attendance.studentCount
                  }
                  date={attendance.date}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
