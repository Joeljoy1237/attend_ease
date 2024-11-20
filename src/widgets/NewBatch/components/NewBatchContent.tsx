"use client";
import React, { useState, DragEvent, ChangeEvent } from "react";
import Papa from "papaparse";
import TitleBar from "@components/TitleBar";

// Define the structure of the student data
interface Student {
  name: string;
  phoneNo: string;
  rollNo: string;
  admnNo: string;
  branch: string;
  division: string;
}

export default function NewBatchContent() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);

  const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    handleFileUpload(uploadedFile);
  };

  const handleFileUpload = (uploadedFile: File) => {
    if (uploadedFile && uploadedFile.type === "text/csv") {
      setFile(uploadedFile);
      setError("");
      parseCSV(uploadedFile);
    } else {
      setError("Please upload a valid CSV file.");
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse<Student>(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setStudents(results.data);
      },
      error: function (err) {
        setError("Error parsing CSV file.");
        console.error(err);
      },
    });
  };

  return (
    <div className="p-6 bg-white round-[5px] flex flex-col gap-5">
      <TitleBar title="Upload Student Details" />
      <p className="mb-4 text-gray-700">
        Please upload a CSV file containing the following columns: <br />
        <strong>
          Name, Phone Number, Roll No, Admission No, Branch, Division
        </strong>
        .
        <br />
        You can drag and drop the file or click to select one.
      </p>
      <div
        className={`border-dashed border-2 border-azure-300 rounded-lg ${
          file ? "h-[10vh]" : "h-[50vh]"
        } items-center justify-center flex text-center bg-gray-100 hover:bg-azure-200`}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => document.getElementById("fileInput")?.click()}
        style={{ cursor: "pointer" }}
      >
        {file ? (
          <p className="text-azure-600">File Selected: {file.name}</p>
        ) : (
          <p>Drag and drop a CSV file here or click to upload</p>
        )}
      </div>
      <input
        type="file"
        id="fileInput"
        accept=".csv"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          e.target.files && handleFileUpload(e.target.files[0])
        }
        className="hidden"
      />
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {students.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Parsed Students:</h2>
          <table className="table-auto w-full border-collapse border border-azure-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">
                  Phone Number
                </th>
                <th className="border border-gray-300 px-4 py-2">Roll No</th>
                <th className="border border-gray-300 px-4 py-2">
                  Admission No
                </th>
                <th className="border border-gray-300 px-4 py-2">Branch</th>
                <th className="border border-gray-300 px-4 py-2">Division</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.rollNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.admnNo}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.branch}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.division}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {student.phoneNo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
