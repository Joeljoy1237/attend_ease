"use client";
import customToast from "@components/CustomToast";
import TitleBar from "@components/TitleBar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Student {
  name: string;
  rollNo: string;
  batchCode: string;
}

export default function MarkAttendanceContent() {
  const [activeTab, setActiveTab] = useState<"rollNo" | "checkList">("rollNo");
  const [rollNo, setRollNo] = useState<string>("");
  const [attendance, setAttendance] = useState<{
    [key: string]: boolean;
  }>({});
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [todaysDate, setTodaysDate] = useState<Date | null>(null);
  const [confirmationModal, setConfirmationModal] = useState<boolean>(false);
  const { division, type } = useParams();
  const router = useRouter();

  const handleDataSubmit = async () => {
    try {
      if (activeTab === "rollNo" && !attendance) {
        throw { message: "Please enter somthing" };
      }
      const res: Response = await fetch("/api/attendance/markAttendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date:
            type === "custom-date"
              ? selectedDate?.toISOString().split("T")[0]
              : todaysDate?.toISOString().split("T")[0],
          data: attendance,
          batchCode: division,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw errorData;
      }

      const responseData = await res.json();
      console.log("Success:", responseData);
      customToast({
        message: "Attendance marked successfully!",
        type: "success",
      });
    } catch (error: any) {
      console.log("Error:", error);

      // Show error toast with the error message
      customToast({
        message: error.message || "An unexpected error occurred.",
        desc: error.desc,
        type: "error",
      });
    }
  };

  const handleCheckListChange = (rollNo: string, isChecked: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNo]: isChecked,
    }));
  };

  const handleRollNoSubmit = () => {
    if (rollNo.trim() && rollNo in attendance) {
      setAttendance((prev) => ({
        ...prev,
        [rollNo]: false,
      }));

      setRollNo(""); // Clear input after marking attendance
    } else if (rollNo === "") {
      customToast({
        message: "Kindly enter a roll number",
        type: "error",
      });
    } else {
      customToast({
        message: "Invalid roll number",
        type: "error",
        desc: "Kindly check the roll number",
      });
    }
  };

  const fetchAttendance = async () => {
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: "2024-11-24", batchCode: division }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch attendance.");
      }
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setAttendance(data);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    setStudents(null);

    try {
      const response = await fetch("/api/attendance/getStudentsListByBatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ batchCode: division }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch students.");
      }

      const data = await response.json();
      console.log(data);
      const newAttendance = data.students.reduce((acc: any, student: any) => {
        acc[student.rollNo] = true;
        return acc;
      }, {});
      setAttendance(newAttendance);
      setStudents(data.students);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    fetchAttendance();
  }, []);

  const absentStudents = students?.filter(
    (student) => !attendance[student.rollNo]
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (type === "custom-date") {
      setIsModalOpen(true);
    } else if (type === "today") {
      const todaysDate = new Date();

      setTodaysDate(todaysDate);
      console.log(todaysDate); // For debugging, you can see the formatted date in the console
    }
  }, [type]);

  return (
    <div className="p-6 bg-white flex flex-col gap-8">
      <div className="flex w-full justify-between">
        <TitleBar title="Mark Attendance" />
        {type === "today" ? (
          <button
            onClick={() =>
              router.push(
                `/dashboard/attendance/${division}/mark-attendance/custom-date`
              )
            }
            className="bg-azure-600 text-white px-4 py-2 rounded-lg"
          >
            Go for Custom date
          </button>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-azure-600 text-white px-4 py-2 rounded-lg"
          >
            {selectedDate ? "Change date" : "Select Date"}
          </button>
        )}
      </div>
      <div className="flex flex-row items-center justify-between mb-1">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "rollNo"
                ? "bg-azure-600 text-white"
                : "bg-azure-100 text-azure-600"
            }`}
            onClick={() => setActiveTab("rollNo")}
          >
            Roll No Method
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "checkList"
                ? "bg-azure-600 text-white"
                : "bg-azure-100 text-azure-600"
            }`}
            onClick={() => setActiveTab("checkList")}
          >
            Check List Method
          </button>
        </div>
        {selectedDate && !isModalOpen && (
          <div className="">
            <p className="mt-2 text-gray-600 text-sm">
              Selected Date:{" "}
              <span className="text-azure-600 text-base font-semibold">
                {" "}
                {formatDate(selectedDate)}
              </span>
            </p>
          </div>
        )}
        {todaysDate && (
          <div className="">
            <p className="mt-2 text-gray-600 text-sm">
              Todays Date:{" "}
              <span className="text-azure-600 text-base font-semibold">
                {" "}
                {formatDate(todaysDate)}
              </span>
            </p>
          </div>
        )}
      </div>

      {activeTab === "rollNo" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Enter Absentees Roll Number
          </h2>
          <input
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter roll number"
            className="border rounded-lg px-4 py-2 w-full mb-4"
          />
          <button
            onClick={handleRollNoSubmit}
            className="bg-azure-600 text-white px-4 py-2 rounded-lg"
          >
            Mark Absent
          </button>

          <h2 className="text-xl font-semibold my-4">
            Absentees (Roll Number Method)
          </h2>
          <ul className="space-y-2">
            {absentStudents?.length ? (
              absentStudents.map((student) => (
                <li
                  key={student.rollNo}
                  className="flex items-center space-x-4"
                >
                  <span className="capitalize">
                    {student.rollNo} - {student.name}
                  </span>
                  <span className="text-red-500 ml-2">Absent</span>
                </li>
              ))
            ) : (
              <li>No absentees marked.</li>
            )}
          </ul>
        </div>
      )}

      {activeTab === "checkList" && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold mb-1 flex flex-col">
            Check List
          </h2>
          <ul className="space-y-2 grid">
            {students?.map((student) => (
              <li
                key={student.rollNo}
                className="flex items-center space-x-4 border rounded-lg px-4 py-2"
              >
                <input
                  type="checkbox"
                  checked={!!attendance[student.rollNo]}
                  onChange={(e) =>
                    handleCheckListChange(student.rollNo, e.target.checked)
                  }
                />
                <span className="capitalize">
                  {student.rollNo} - {student.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        onClick={() => {
          setConfirmationModal(true);
        }}
        className="bg-azure-600 text-white px-4 py-2 rounded-lg"
      >
        Submit
      </button>

      {isModalOpen && (
        <div className="absolute w-full h-full inset-0 bg-azure-100 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
            <input
              type="date"
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="w-full border px-4 py-2 rounded-lg"
            />
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-azure-600 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {confirmationModal && (
        <div
          onClick={() => {
            setConfirmationModal(false);
          }}
          className="absolute w-full h-full inset-0 bg-azure-100 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Select a Date</h2>
            <div className="">
              <span className="">Are you sure you want to continue ?</span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDataSubmit}
                className="bg-azure-600 text-white px-4 py-2 rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
