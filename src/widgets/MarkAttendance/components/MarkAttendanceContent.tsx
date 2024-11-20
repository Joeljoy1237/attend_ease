"use client";
import TitleBar from "@components/TitleBar";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Student {
  name: string;
  rollNo: string;
  batchCode: string;
}

export default function MarkAttendanceContent() {
  const [activeTab, setActiveTab] = useState<"rollNo" | "checkList">("rollNo");
  const [rollNo, setRollNo] = useState<string>("");
  const [attendance, setAttendance] = useState<{ [key: string]: boolean }>({});
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { division } = useParams();

  // Example student list for the "Check List" method
  const studentList = [
    { rollNo: "101", name: "Alice" },
    { rollNo: "102", name: "Bob" },
    { rollNo: "103", name: "Charlie" },
    { rollNo: "104", name: "Diana" },
  ];

  const handleCheckListChange = (rollNo: string, isChecked: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNo]: isChecked,
    }));
  };

  const handleRollNoSubmit = () => {
    if (rollNo.trim()) {
      setAttendance((prev) => ({
        ...prev,
        [rollNo]: true,
      }));
      setRollNo(""); // Clear input after marking attendance
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
      setStudents(data.students);
      console.log(data);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 bg-white flex flex-col gap-8">
      <TitleBar title="Mark Attendance" />
      <div className="flex space-x-4 mb-6">
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

      {/* Tab Content */}
      {activeTab === "rollNo" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Enter Roll Number</h2>
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
            Mark Attendance
          </button>
        </div>
      )}

      {activeTab === "checkList" && (
        <div className="flex flex-col gap-5">
          <h2 className="text-xl font-semibold mb-4 flex flex-col">
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
          <button
            onClick={handleRollNoSubmit}
            className="bg-azure-600 text-white px-4 py-2 rounded-lg"
          >
            Mark Attendance
          </button>
        </div>
      )}
    </div>
  );
}
