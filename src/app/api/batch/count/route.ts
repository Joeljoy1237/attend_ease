import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function GET() {
    try {
        connectToDB()
        const data = await Student.aggregate([{
            $group: {
                _id: "$branch",
                totalStudent: { $sum: 1 }
            }
        }]);

        return new Response(JSON.stringify({ data }), { status: 200 });
    }
    catch (err) {
        return new Response(JSON.stringify({ message: "Internal Serber Error" }), { status: 500 });
    }
}