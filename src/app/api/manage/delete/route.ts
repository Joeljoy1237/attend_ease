import Student from "@models/Student"; // Ensure this path matches your project structure
import { connectToDB } from "@utils/database";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Parse the incoming data
        const data = await req.json();

        // Validate the input data
        if (!data.id) {
            throw { message: "Student ID is required", status: 400, desc: "Please provide a valid student ID" };
        }
       if(!isValidObjectId(data.id)){
        throw { message: "Invalid student id", status: 400, desc: "Please provide a valid student ID" };
       }

        // Connect to the database
        await connectToDB();

        // Find and delete the student
        const deletedStudent = await Student.findByIdAndDelete(data.id);

        if (!deletedStudent) {
            throw { message: "Student not found", status: 404, desc: "No student found with the provided ID" };
        }

        // Send a success response
        return NextResponse.json({ message: "Student data deleted" });
    } catch (error: any) {
        console.error("Error deleting student:", error);

        // Send a generic error response
        return NextResponse.json(
            { message: error.message, desc: error.desc || "An unexpected error occurred" },
            { status: error.status || 500 }
        );
    }
}
