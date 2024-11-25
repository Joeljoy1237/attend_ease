import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        // Parse the request body to get the batch code
        const { batchCode } = await request.json();

        // Ensure batchCode is provided
        if (!batchCode) {
            return new Response(
                JSON.stringify({ message: "Batch code is required" }),
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDB();

        // Query to find students based on the batch code
        const students = await Student.find({ division: batchCode }).select("-__v -_id"); // Exclude unnecessary fields

        // Return the response
        return new Response(JSON.stringify({ students }), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
