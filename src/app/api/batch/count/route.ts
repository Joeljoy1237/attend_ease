import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(req: Request) {
  try {
    // Parse the request body to get the sortOrder
    const { sortOrder } = await req.json();

    // Connect to the database
    await connectToDB();

    // Perform aggregation
    const data = await Student.aggregate([
      {
        $group: {
          _id: { branch: "$branch", division: "$division" }, // Group by branch and division
          totalStudents: { $sum: 1 }, // Count total students
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          branch: "$_id.branch",
          division: "$_id.division",
          totalStudents: 1, // Include totalStudents in the output
        },
      },
    ]).sort({ branch: sortOrder === "asc" ? 1 : -1 }); // Sort by branch in the specified order

    // Return the response
    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
