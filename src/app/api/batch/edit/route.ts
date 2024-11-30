import Student from "@models/Student";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the incoming data
        const data = await req.json();

        // Validate the input data
        if (!data.id || !data.rollNo || !data.name || !data.admissionNo || !data.class) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDB();

        // Find the student by ID
        const student = await Student.findById(data.id);
        if (!student) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        // Update the student's details
        student.rollNo = data.rollNo;
        student.name = data.name;
        student.admnNo = data.admissionNo;
        student.branch = data.class;

        // Save the updated student document
        await student.save();

        // Send a success response
        return NextResponse.json({ message: "Student details updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating student:", error);

        // Send a generic error response
        return NextResponse.json(
            { message: "Internal Server Error", error },
            { status: 500 }
        );
    }
}
