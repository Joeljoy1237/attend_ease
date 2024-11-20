import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function GET(req: Request, { params }: { params: { name: string } }) {
    let studentData
    try {
        await connectToDB();
        const data = await params;
        if (data.name === "all") {
            studentData = await Student.find({}).lean();
        }
        else {
            studentData = await Student.find({ branch: data.name }).lean();
        }
        return new Response(JSON.stringify({ studentData }), { status: 200 });
    }
    catch (err) {
        return new Response(JSON.stringify({ message: "Internal Serber Error" }), { status: 500 });
    }
}
