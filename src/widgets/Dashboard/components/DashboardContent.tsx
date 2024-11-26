"use client";
import React, { useEffect, useState } from "react";
import AttendanceItem from "@components/AttendanceItem";
import TitleBar from "@components/TitleBar";

export default function DashboardContent() {
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]); // Store fetched attendance data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [totalStudent, setTotalStudent] = useState<number>(0);
  const [error, setError] = useState<string | null>(null); // Error state
  const [todayPresent, setTodayPresent] = useState<number>(0); // Today's present count
  const [yesterdayPresent, setYesterdayPresent] = useState<number>(0); // Yesterday's present count
  const [presentChange, setPresentChange] = useState<number>(0); // Percentage change for present
  const [absentChange, setAbsentChange] = useState<number>(0); // Percentage change for absent

  const fetchAttendanceHistory = async () => {
    try {
      const response = await fetch("/api/attendance/getAllAttendanceCounts", {
        method: "POST",
      }); // Make the API request
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

          // Calculate percentage change for present
          const presentDiff = todayAttendance
            ? ((todayAttendance.presentCount -
                yesterdayAttendance.presentCount) /
                yesterdayAttendance.presentCount) *
              100
            : 0;

          // Calculate absent counts
          const yesterdayAbsent =
            totalStudent - yesterdayAttendance.presentCount;
          const todayAbsent = todayAttendance
            ? totalStudent - todayAttendance.presentCount
            : totalStudent;

          // Calculate percentage change for absent
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
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  useEffect(() => {
    fetchAttendanceHistory();
  }, []);

  return (
    <div className="h-full rounded-[8px] flex flex-col space-y-8">
      {/* Top Present/Absent Section */}
      <div className="flex flex-row w-full space-x-4">
        <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <span className="text-xl text-azure-600 font-semibold">
                Present
              </span>
            </div>
            <div className="w-[2px] h-[2rem] bg-gray-400"></div>
            <div className="flex items-center justify-center">
              <span className="mt-1 text-gray-500">Today</span>
            </div>
          </div>
          <div className="">
            <span className="text-4xl text-azure-600 font-semibold">
              {todayPresent}
            </span>
          </div>
          <div className="">
            <span className="text-gray-500 text-sm">
              {presentChange >= 0
                ? `${Math.abs(presentChange).toFixed(1)}% increase`
                : `${Math.abs(presentChange).toFixed(1)}% decrease`}{" "}
              than yesterday
            </span>
          </div>
        </div>
        <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <span className="text-xl text-azure-600 font-semibold">
                Absent
              </span>
            </div>
            <div className="w-[2px] h-[2rem] bg-gray-400"></div>
            <div className="flex items-center justify-center">
              <span className="mt-1 text-gray-500">Today</span>
            </div>
          </div>
          <div className="">
            <span className="text-4xl text-red-600 font-semibold">
              {totalStudent - todayPresent}
            </span>
          </div>
          <div className="">
            <span className="text-gray-500 text-sm">
              {absentChange >= 0
                ? `${Math.abs(absentChange).toFixed(1)}% increase`
                : `${Math.abs(absentChange).toFixed(1)}% decrease`}{" "}
              than yesterday
            </span>
          </div>
        </div>
        <div className="w-[300px] h-[180px] bg-white rounded-[5px] shadow-sm flex flex-col p-4 justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <div className="">
              <span className="text-xl text-azure-600 font-semibold">
                Total Students
              </span>
            </div>
          </div>
          <div className="">
            <span className="text-4xl text-azure-600 font-semibold">
              {totalStudent}
            </span>
          </div>
          <div className="">
            <span className="text-gray-500 text-sm">Including all batches</span>
          </div>
        </div>
      </div>

      {/* Attendance History Section */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading ? (
              <div className="text-center text-gray-500">Loading...</div>
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
