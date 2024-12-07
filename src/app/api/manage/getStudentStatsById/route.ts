import { NextApiRequest, NextApiResponse } from "next";
import Attendance from "@models/Attendence";
import Student from "@models/Student";
import { connectToDB } from "@utils/database";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

// API handler for attendance fetching
export async function POST(request: Request) {

  try {
    const { studentId } = await request.json();
    console.log(studentId)
    // Validate studentId input
    if (!studentId) {
      throw { message: "Student ID is required", status: 400, desc: "Please provide a valid student ID" };
    }

    // Check if the studentId is a valid ObjectId
    if (!isValidObjectId(studentId)) {
      throw { message: "Student ID is required", status: 400, desc: "Please provide a valid student ID" };
    }

    // Step 1: Connect to the database
    await connectToDB();

    // Step 2: Find the student based on studentId
    const student = await Student.findOne({ _id:studentId });
console.log(student)
    if (!student) {
      throw { message: "Student not found", status: 404, desc: "Student with this ID does not exist" };
    }

    const { division, rollNo, name, branch, admnNo, phoneNo } = student;

    // Step 3: Fetch attendance records based on the division
    const attendanceRecords = await Attendance.find({ division });
    console.log(attendanceRecords)
    if (!attendanceRecords.length) {
      throw { message: "No attendance records found", status: 404, desc: "No attendance records found for this division" };
    }
    // Step 4: Filter the attendance data by the student's roll number and presence status
    // Step 4: Filter the attendance data by the student's roll number and presence status
    const studentAttendance = attendanceRecords.map(record => {
      const isPresent = record.data.has(String(rollNo)) ? record.data.get(String(rollNo)) : false;
      return {
        date: record.date.toISOString(), // Convert to ISO string
        isPresent,
      };
    });

    // Sort the attendance records by date in descending order
    studentAttendance.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    console.log(studentAttendance); // Log to verify

    // Return the filtered and sorted attendance records
    return NextResponse.json({
      studentId,
      name,
      admnNo,
      branch,
      phoneNo,
      division,
      studentAttendance,
      totalAttendance: studentAttendance.length, // Updated count based on filter
    });


  } catch (error: any) {
    console.error("Error fetching student attendance:", error);

    // Send a generic error response
    return NextResponse.json(
      { message: error.message, desc: error.desc || "An unexpected error occurred" },
      { status: error.status || 500 }
    );
  }
}
