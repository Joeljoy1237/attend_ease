"use client"

import AttendanceItem from "@components/AttendanceItem";
import TitleBar from "@components/TitleBar";
import React, { useEffect, useState } from "react";

export default function AttendanceHistoryContent() {
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
        body: JSON.stringify({ limit: 0 }),
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
    <div className="h-auto bg-white w-full shadow-sm p-4 rounded-[5px]">
      <div className="flex flex-col w-full space-y-6">
        <div className="flex flex-row items-center justify-between">
          <TitleBar title="Attendance history" />
          
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
                isPresentFull={totalStudent - attendanceItem.presentCount <= 0}
                date={new Date(attendanceItem.date).toLocaleDateString()}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
