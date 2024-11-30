"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import TitleBar from "@components/TitleBar";
import customToast from "@components/CustomToast";

const EdituserContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { userId } = useParams(); // Get userId from route params

  const [formData, setFormData] = useState({
    id: "",
    division: "",
    phoneNo: "",
    rollNo: "",
    name: "",
    admnNo: "",
    branch: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const res = await fetch("/api/manage/getStudentDetailsById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId: userId }), // Pass the student ID
      });

      if (!res.ok) {
        throw new Error(`Error fetching student data: ${res.statusText}`);
      }

      const data = await res.json();
      setFormData({
        id: data._id || "",
        division: data.division || "",
        phoneNo: data.phoneNo || "",
        rollNo: data.rollNo || "",
        name: data.name || "",
        admnNo: data.admnNo || "",
        branch: data.branch || "",
      });
    } catch (err: any) {
      console.error(err.message);
      setError("Failed to fetch student details. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      const response = await fetch("/api/manage/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Parse response
      const data = await response.json();
  
      // Handle non-OK responses
      if (!response.ok) {
        throw data
      }
  
      // Success
      console.log('hi',data.message);
      setSuccessMessage("Student details updated successfully!");
      customToast({
        message: data.message || "Student details updated successfully!",
        type: "success",
        showIcon:true
      });
  
      setTimeout(() => {
        // router.push("/dashboard/manage");
      }, 500);
    } catch (err: any) {
      // Ensure consistent error message display
      const errorMessage = err.message || "Something went wrong. Please try again.";
      setError(errorMessage);
  
      customToast({
        message: errorMessage,
        type: "error",
        desc:err.desc,
        showIcon:true
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg p-6 w-[40vw] mx-auto space-y-6">
      <div className="flex w-full items-center justify-start">
        <TitleBar title="Edit Student Details" />
      </div>

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-6">
          <div className="flex flex-col  flex-1">
            <label htmlFor="rollNo" className="text-azure-400 text-sm font-medium">
              Roll No.
            </label>
            <input
              type="text"
              id="rollNo"
              value={formData.rollNo}
              name="rollNo"
              onChange={handleChange}
              className="border border-azure-100 rounded-md px-4 py-2 outline-none"
              placeholder="Enter Roll No."
            />
          </div>

          {/* Name */}
          <div className="flex flex-col  flex-1">
            <label htmlFor="name" className="text-azure-400 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              name="name"
              onChange={handleChange}
              className="border border-azure-100 rounded-md px-4 py-2 outline-none"
              placeholder="Enter Name"
            />
          </div>
        </div>
        <div className="flex flex-row  space-x-6">
          <div className="flex flex-col  flex-1">
            <label htmlFor="division" className="text-azure-400 text-sm font-medium">
              Division
            </label>
            <input
              type="text"
              id="division"
              value={formData.division}
              name="division"
              onChange={handleChange}
              className="border border-azure-100 rounded-md px-4 py-2 outline-none"
              placeholder="Enter Division"
            />
          </div>

          {/* Phone No */}
          <div className="flex flex-col  flex-1">
            <label htmlFor="phoneNo" className="text-azure-400 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNo"
              value={formData.phoneNo}
              name="phoneNo"
              onChange={handleChange}
              className="border border-azure-100 rounded-md px-4 py-2 outline-none"
              placeholder="Enter Phone Number"
            />
          </div>
        </div>

        <div className="flex flex-row  space-x-6 mb-10">
          <div className="flex flex-col  flex-1">
            <label htmlFor="admissionNo" className="text-azure-400 text-sm font-medium">
              Admission No.
            </label>
            <input
              type="text"
              id="admnNo"
              value={formData.admnNo}
              name="admnNo"
              onChange={handleChange}
              className="border border-azure-100 rounded-md px-4 py-2 outline-none"
              placeholder="Enter Admission No."
            />
          </div>

          <div className="flex flex-col  flex-1">
            <label htmlFor="class" className="text-azure-400 text-sm font-medium">
              Class
            </label>
            <input
              type="text"
              id="branch"
              value={formData.branch}
              name="branch"
              onChange={handleChange}
              className="border border-azure-100 rounded-md px-4 py-2 outline-none"
              placeholder="Enter Class"
            />
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex-row pt-6 flex justify-between w-full space-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-azure-50 w-full text-azure-600 font-semibold py-2 px-4 rounded-md hover:bg-azure-200 outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-azure-600 w-full text-white py-2 px-4 rounded-md hover:bg-azure-700 focus:ring-2 focus:ring-azure-500 focus:outline-none ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EdituserContent;
