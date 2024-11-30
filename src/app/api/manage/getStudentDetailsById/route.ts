import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        // Connect to the database
        await connectToDB();

        // Parse the request body to get the student ID
        const { studentId } = await request.json();
        console.log(studentId);

        if (!studentId) {
            return Response.json(
                { message: "Student ID is required" },
                { status: 400 }
            );
        }

        // Retrieve the student details by ID
        const student = await Student.findOne({ studentId });

        if (!student) {
            return Response.json(
                { message: "Student not found" },
                { status: 404 }
            );
        }

        // Return the student details
        return Response.json(student, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
