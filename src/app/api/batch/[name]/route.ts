import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(req: Request) {
    let studentData;
    try {
        await connectToDB();

        // Parse the request body to get params and sortOrder
        const { branch, sortOrder } = await req.json(); // Assuming the body contains { branch, sortOrder }

        // Fetch student data based on the branch (if provided)
        if (branch === "all") {
            studentData = await Student.find({}).lean();
        } else {
            studentData = await Student.find({ branch }).lean();
        }

        // Sort the student data based on the sortOrder
        studentData.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.name.localeCompare(b.name); // Ascending order by name
            } else if (sortOrder === "desc") {
                return b.name.localeCompare(a.name); // Descending order by name
            }
            return 0; // Default if no valid sortOrder is provided
        });

        return new Response(JSON.stringify({ studentData }), { status: 200 });
    } catch (err) {
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
