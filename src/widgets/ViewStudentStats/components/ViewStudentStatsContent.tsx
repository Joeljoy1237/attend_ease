"use client";
import TitleBar from "@components/TitleBar";
import { useParams } from "next/navigation";
import { cache, useEffect, useState } from "react";

export default function ViewStudentStatsContent() {
  const { studentId } = useParams(); // Extracting the studentId from the URL params
  const [studentInfo, setStudentInfo] = useState<any>(null); // State to hold student details and attendance data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for the fetch request
  const [error, setError] = useState<string>(""); // Error state to handle API errors
  console.log(studentId);
  useEffect(() => {
    // Fetch student stats when studentId is available
    if (studentId) {
      const fetchStudentStats = async () => {
        setLoading(true); // Reset loading state on each fetch attempt
        setError(""); // Reset error state

        try {
          const response = await fetch(`/api/manage/getStudentStatsById`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Ensure that the request body is JSON
            },
            body: JSON.stringify({ studentId }),
          });

          if (!response.ok) {
            throw new Error("Failed to fetch student stats");
          }

          const data = await response.json();
          setStudentInfo(data); // Set student info and attendance data into state
        } catch (err: any) {
          setError(
            err.message || "An error occurred while fetching student stats."
          );
        } finally {
          setLoading(false);
        }
      };

      fetchStudentStats();
    }
  }, [studentId]); // Re-run the effect when studentId changes

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Format the date as Saturday - 07 December 2024
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Count the number of absences
  const absencesCount = studentInfo?.studentAttendance?.filter(
    (entry: { isPresent: boolean }) => !entry.isPresent
  ).length;

  // Calculate absentee percentage
  const absenteePercentage =
    studentInfo.totalAttendance > 0
      ? absencesCount === 0
        ? "100.00" // If no absences, attendance is 100%
        : (
            ((studentInfo.totalAttendance - absencesCount) /
              studentInfo.totalAttendance) *
            100
          ).toFixed(2)
      : "0.00"; // Default to "0.00" if totalAttendance is 0 or undefined

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-800 bg-white flex flex-col h-full w-full space-y-5">
      <TitleBar title={`Student Attendance Stats`} />
      <div className="flex w-full h-full space-x-10">
        <div className="flex-1 relative">
          {/* Student Details */}
          <div className="bg-white rounded-lg space-y-4">
            <h3 className="text-xl text-azure-600 font-semibold mb-4">
              Student Details
            </h3>

            <p className="text-gray-800 text-base capitalize">
              <span className="font-normal text-gray-600">Name:</span>{" "}
              {studentInfo?.name}
            </p>
            <p className="text-gray-800 text-base">
              <span className="font-normal text-gray-600">
                Admission Number:
              </span>{" "}
              {studentInfo?.admnNo}
            </p>
            <p className="text-gray-800 text-base">
              <span className="font-normal text-gray-600">Branch:</span>{" "}
              {studentInfo?.branch}
            </p>
            <p className="text-gray-800 text-base">
              <span className="font-normal text-gray-600">Division:</span>{" "}
              {studentInfo?.division}
            </p>
            <p className="text-gray-800 text-base">
              <span className="font-normal text-gray-600">Contact info: </span>{" "}
              {studentInfo?.phoneNo}
            </p>
          </div>
          <div className="absolute bottom-0 w-full text-gray-700 space-y-6">
            <div className="w-full h-[1px] bg-azure-200"></div>
            <div className="w-full flex flex-col space-y-2">
              <div className="flex items-center space-x-3">
                <span className="">Total absent days</span>
                <span className="">:</span>
                <span className="">{absencesCount}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="">Total attended days</span>
                <span className="">:</span>
                <span className="">{studentInfo.totalAttendance}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="">Attendance percentage</span>
                <span className="">:</span>
                <span className="">{absenteePercentage}%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full w-[1px] bg-gray-400"></div>
        <div className="flex-[2]">
          <h3 className="text-xl text-azure-600 font-semibold mb-4">
            Attendance Records
          </h3>
          <div className="max-h-[60vh] overflow-auto py-1 pr-3">
            {studentInfo?.studentAttendance?.length > 0 ? (
              <ul className="space-y-4">
                {studentInfo.studentAttendance.map(
                  (
                    entry: { date: string; isPresent: boolean },
                    index: number
                  ) => (
                    <li
                      key={index}
                      className="flex justify-between text-gray-700 items-center text-sm bg-azure-50 p-2 rounded-lg"
                    >
                      <span className="font-medium">
                        {formatDate(entry.date)}
                      </span>
                      <span
                        className={
                          entry.isPresent ? "text-azure-700" : "text-red-600"
                        }
                      >
                        {entry.isPresent ? "Present" : "Absent"}
                      </span>
                    </li>
                  )
                )}
              </ul>
            ) : (
              <div className="text-gray-500">No attendance data available.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
