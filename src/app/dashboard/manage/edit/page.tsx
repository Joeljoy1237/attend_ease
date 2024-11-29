"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const EditStudentForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    id: "",
    rollNo: "",
    name: "",
    admissionNo: "",
    class: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData({
      id: searchParams.get("id") || "",
      rollNo: searchParams.get("rollNo") || "",
      name: searchParams.get("name") || "",
      admissionNo: searchParams.get("admissionNo") || "",
      class: searchParams.get("class") || "",
    });
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
      const response = await fetch("/api/batch/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to edit student details");
      }

      setSuccessMessage("Student details updated successfully!");
      // Redirect to /dashboard/manage after a short delay
      setTimeout(() => {
        router.push("/dashboard/manage");
      }, 500);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back(); // Navigates to the previous page
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-blue-600">
        Edit Student Details
      </h2>

      {/* Success/Error Message */}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-600 mb-4">{successMessage}</p>
      )}

      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        {/* Roll No */}
        <div className="flex flex-col">
          <label htmlFor="rollNo" className="text-gray-700 font-medium">
            Roll No.
          </label>
          <input
            type="text"
            id="rollNo"
            value={formData.rollNo}
            name="rollNo"
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter Roll No."
          />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-medium">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={handleChange}
            id="name"
            name="name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter Name"
          />
        </div>

        {/* Admission No */}
        <div className="flex flex-col">
          <label htmlFor="admissionNo" className="text-gray-700 font-medium">
            Admission No.
          </label>
          <input
            type="text"
            id="admissionNo"
            name="admissionNo"
            onChange={handleChange}
            value={formData.admissionNo}
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter Admission No."
          />
        </div>

        {/* Class */}
        <div className="flex flex-col">
          <label htmlFor="class" className="text-gray-700 font-medium">
            Class
          </label>
          <input
            type="text"
            id="class"
            value={formData.class}
            onChange={handleChange}
            name="class"
            className="border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter Class"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 bg-azure-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;
