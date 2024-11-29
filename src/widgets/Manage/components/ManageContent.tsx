"use client";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import TitleBar from "@components/TitleBar";
import BatchItem from "@components/BatchItem";

type Student = {
  _id: string;
  rollNo: string;
  name: string;
  admnNo: string;
  branch: string;
};

export default function ManageContent() {
  const router = useRouter();
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudentData, setFilteredStudentData] = useState<Student[]>([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [status, setStatus] = useState("Loading....");

  useEffect(() => {
    const fetchStudent = async () => {
      const requestBody = {
        branch: "all", // or a specific branch like "CSE"
        sortOrder, // or "desc" depending on how you want to sort
      };

      const res = await fetch("/api/batch/all", {
        method: "POST", // Changed to POST
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Include the body data
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data.studentData);
        setStudentData(data.studentData);
        setFilteredStudentData(data.studentData);
      } else {
        setStatus("No data found");
      }
    };

    fetchStudent();
  }, [sortOrder]);

  const handleEdit = (index: number) => {
    const formData = {
      id: studentData[index]._id,
      rollNo: studentData[index].rollNo,
      name: studentData[index].name,
      admissionNo: studentData[index].admnNo,
      class: studentData[index].branch,
    };

    const query = new URLSearchParams(formData).toString();
    router.push(`manage/edit?${query}`);
  };

  const handleDelete = async (index: number) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (isConfirmed) {
      const res = await fetch("/api/batch/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: studentData[index]._id,
        }),
      });

      if (res.ok) {
        setStudentData(
          studentData.filter((_, i) => i !== index) // Remove deleted item from the state
        );
      } else {
        alert("Failed to delete the student");
      }
    }
  };

  useEffect(() => {
    const filtered = studentData.filter(
      (student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.admnNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.rollNo.toString().includes(searchQuery)
    );
    setFilteredStudentData(filtered);
  }, [searchQuery]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="bg-white w-full h-auto rounded-[5px] p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-row items-center justify-between">
          <TitleBar title="All batches" />
          <div className="">
            <button className="p-3 text-white bg-azure-600 outline-none border-none rounded-[8px] flex items-center justify-center gap-2">
              <FaCirclePlus className="text-2xl text-white" />
              Add New Batch
            </button>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex-1">
            <div className="bg-azure-50 flex flex-row items-center rounded-[50px] px-2">
              <IoSearchOutline className="text-2xl text-azure-600" />
              <input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-azure-50 py-3 px-2 rounded-[50px] outline-none border-none placeholder:text-azure-600"
                placeholder="Search by batch code, name, roll no ..."
              />
            </div>
          </div>
          <div className="flex-[2] flex items-center justify-end gap-5">
            <div className="bg-azure-50 rounded-[10px] p-2">
              <span className="text-azure-600">
                Items count: {filteredStudentData.length}
              </span>
            </div>
            <div className="relative">
              <select
                className="px-4 py-2 text-white bg-azure-600 rounded-md outline-none appearance-none cursor-pointer"
                onChange={handleSortChange}
              >
                <option value="asc">Sort: Ascending</option>
                <option value="desc">Sort: Descending</option>
              </select>
            </div>
            <button className="px-2 outline-none border-none">
              <LuRefreshCcw className="text-azure-600 text-2xl" />
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div>
          <div className="flex bg-azure-50 p-1">
            <div className="flex-1 px-4 py-2 text-left text-base font-medium text-azure-600">
              Sl No.
            </div>
            <div className="flex-1 px-4 py-2 text-left text-base font-medium text-azure-600">
              Roll no.
            </div>
            <div className="flex-1 px-4 py-2 text-left text-base font-medium text-azure-600">
              Name
            </div>
            <div className="flex-1 px-4 py-2 text-left text-base font-medium text-azure-600">
              Admission No.
            </div>
            <div className="flex-1 px-4 py-2 text-left text-base font-medium text-azure-600">
              Class
            </div>
            <div className="flex-1 px-4 py-2 text-center text-base font-medium text-azure-600">
              Actions
            </div>
          </div>
          {filteredStudentData.length !== 0 ? (
            <div className="overflow-y-auto" style={{ maxHeight: "42vh" }}>
              {filteredStudentData.map((student, index) => (
                <div
                  key={index}
                  id={student._id}
                  className="flex items-center border-b border-gray-200 p-2"
                >
                  <div className="flex-1 px-4 py-2 text-base text-gray-700">
                    {index + 1}
                  </div>
                  <div className="flex-1 px-4 py-2 text-base text-gray-700">
                    {student.rollNo}
                  </div>
                  <div className="flex-1 px-4 py-2 text-base text-gray-700">
                    {student.name}
                  </div>
                  <div className="flex-1 px-4 py-2 text-base text-gray-700">
                    {student.admnNo}
                  </div>
                  <div className="flex-1 px-4 py-2 text-base text-gray-700">
                    {student.branch}
                  </div>
                  <div className="flex-1 px-4 py-2 text-center text-base text-gray-700">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        className="text-azure-600"
                        onClick={() => handleEdit(index)}
                      >
                        <FiEdit className="text-2xl" />
                      </button>
                      <button
                        className="text-red-600"
                        onClick={() => handleDelete(index)}
                      >
                        <MdOutlineDelete className="text-2xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[42vh] flex items-center justify-center">
              <span className="text-azure-600">{status}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
