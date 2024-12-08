"use client";
import React, { useEffect, useState } from "react";
import AttendanceItem from "@components/AttendanceItem";
import TitleBar from "@components/TitleBar";
import { useRouter } from "next/navigation";

type TodaysStats = {
  attendanceChange: string;
  absenteeChange: string;
  todaysAbsentCount: number;
  todaysPresentCount: number;
  totalStudentsCount: number;
  yesterdaysAbsentCount: number;
  yesterdaysPresentCount: number;
};

export default function DashboardContent() {
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]); // Store fetched attendance data
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true); // Track loading state for attendance history
  const [totalStudent, setTotalStudent] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // Error state
  const [todayPresent, setTodayPresent] = useState<number>(0); // Today's present count
  const [yesterdayPresent, setYesterdayPresent] = useState<number>(0); // Yesterday's present count
  const [presentChange, setPresentChange] = useState<number>(0); // Percentage change for present
  const [absentChange, setAbsentChange] = useState<number>(0); // Percentage change for absent
  const [todaysStats, setTodaysStats] = useState<TodaysStats | undefined>(
    undefined
  );
  const [loadingStats, setLoadingStats] = useState<boolean>(true); // Track loading state for today's stats

  const router = useRouter();

  const fetchAttendanceHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch("/api/attendance/getAllAttendanceCounts", {
        method: "POST",
        body: JSON.stringify({ limit: 16 }),
      });
      const data = await response.json();

      if (response.ok) {
        setAttendanceHistory(data.attendanceCounts);
        setTotalStudent(data.studentCount);

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .split("T")[0];

        const todayAttendance = data.attendanceCounts.find(
          (item: any) =>
            new Date(item.date).toISOString().split("T")[0] === today
        );
        const yesterdayAttendance = data.attendanceCounts.find(
          (item: any) =>
            new Date(item.date).toISOString().split("T")[0] === yesterday
        );

        if (todayAttendance) {
          setTodayPresent(todayAttendance.presentCount);
        }
        if (yesterdayAttendance) {
          setYesterdayPresent(yesterdayAttendance.presentCount);

          const presentDiff = todayAttendance
            ? ((todayAttendance.presentCount -
                yesterdayAttendance.presentCount) /
                yesterdayAttendance.presentCount) *
              100
            : 0;

          const yesterdayAbsent =
            totalStudent - yesterdayAttendance.presentCount;
          const todayAbsent = todayAttendance
            ? totalStudent - todayAttendance.presentCount
            : totalStudent;

          const absentDiff = yesterdayAbsent
            ? ((todayAbsent - yesterdayAbsent) / yesterdayAbsent) * 100
            : 0;

          setPresentChange(presentDiff);
          setAbsentChange(absentDiff);
        }
      } else {
        setError(data.message || "Failed to fetch attendance history");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchTodaysStats = async () => {
    setLoadingStats(true);
    try {
      const response = await fetch("/api/attendance/getTodaysStats", {
        method: "POST",
      });
      const data = await response.json();
      setTodaysStats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
    fetchTodaysStats();
  }, []);

  return (
    <div className="h-full rounded-[8px] flex flex-col space-y-8">
      {/* Top Present/Absent Section */}
      <div className="flex flex-row w-full space-x-4">
        {loadingStats ? (
          <>
            <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
              <div className=" animate-pulse w-2/3 h-8 bg-gray-200 rounded-md"></div>
              <div className=" animate-pulse w-2/12 h-14 bg-gray-200 rounded-md"></div>
              <div className=" animate-pulse w-full h-5 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
              <div className=" animate-pulse w-2/3 h-8 bg-gray-200 rounded-md"></div>
              <div className=" animate-pulse w-2/12 h-14 bg-gray-200 rounded-md"></div>
              <div className=" animate-pulse w-full h-5 bg-gray-200 rounded-md"></div>
            </div>
            <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
              <div className=" animate-pulse w-2/3 h-8 bg-gray-200 rounded-md"></div>
              <div className=" animate-pulse w-2/12 h-14 bg-gray-200 rounded-md"></div>
              <div className=" animate-pulse w-full h-5 bg-gray-200 rounded-md"></div>
            </div>
          </>
        ) : (
          <>
            <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
              <div className="flex flex-row space-x-4 items-center">
                <span className="text-xl text-azure-600 font-semibold">
                  Present
                </span>
                <div className="w-[2px] h-[2rem] bg-gray-400"></div>
                <span className="mt-1 text-gray-500">Today</span>
              </div>
              <span className="text-4xl text-azure-600 font-semibold">
                {todaysStats?.todaysPresentCount}
              </span>
              <span className="text-gray-500 text-sm">
                {todaysStats?.attendanceChange}
              </span>
            </div>
            <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
              <div className="flex flex-row space-x-4 items-center">
                <span className="text-xl text-azure-600 font-semibold">
                  Absent
                </span>
                <div className="w-[2px] h-[2rem] bg-gray-400"></div>
                <span className="mt-1 text-gray-500">Today</span>
              </div>
              <span className="text-4xl text-red-600 font-semibold">
                {todaysStats?.todaysAbsentCount}
              </span>
              <span className="text-gray-500 text-sm">
                {todaysStats?.absenteeChange}
              </span>
            </div>
            <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
              <span className="text-xl text-azure-600 font-semibold">
                Total Students
              </span>
              <span className="text-4xl text-azure-600 font-semibold">
                {totalStudent}
              </span>
              <span className="text-gray-500 text-sm">
                Including all batches
              </span>
            </div>
          </>
        )}
      </div>

      {/* Attendance History Section */}
      <div className="h-auto bg-white w-full shadow-sm p-4 rounded-[5px]">
        <div className="flex flex-col w-full space-y-6">
          <div className="flex flex-row items-center justify-between">
            <TitleBar title="Attendance history" />
            <button
              onClick={() => {
                router.push("/dashboard/attendance/history");
              }}
              className=""
            >
              <span className="font-semibold text-azure-600">View all</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loadingHistory ? (
              Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="attendance-item p-4 rounded-md shadow-sm w-[280px] bg-white bg-opacity-20 border-[1px] border-azure-100 h-[160px] flex flex-col justify-between"
                >
                   <div className=" animate-pulse w-3/4 h-6 bg-gray-200 rounded-md"></div>
                   <div className=" animate-pulse w-3/5 h-7 bg-gray-200 rounded-md"></div>
                   <div className=" animate-pulse w-3/6 h-5 bg-gray-200 rounded-md"></div>
                </div>
              ))
            ) : error ? (
              <div className="text-center text-red-500">{error}</div>
            ) : (
              attendanceHistory.map((attendanceItem, index) => (
                <AttendanceItem
                  key={index}
                  present={attendanceItem.presentCount}
                  absent={totalStudent - attendanceItem.presentCount}
                  isPresentFull={
                    totalStudent - attendanceItem.presentCount <= 0
                  }
                  date={new Date(attendanceItem.date).toLocaleDateString()}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
