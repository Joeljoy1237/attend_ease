import Student from "@models/Student"; // Ensure this path matches your project structure
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Student ID is required" }, { status: 400 });
        }

        // Connect to the database
        await connectToDB();

        // Find and delete the student
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return NextResponse.json({ message: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
