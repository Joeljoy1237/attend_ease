import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function GET(req: Request, { params }: { params: { name: string } }) {
    let studentData
    const data = await params;
    if (data.name === "all") {
        studentData = await Student.find({}).lean();
    }
    else {
        studentData = await Student.find({ branch: data.name }).lean();
    }


    await connectToDB();

    return new Response(JSON.stringify({ studentData }), { status: 200 });
}
