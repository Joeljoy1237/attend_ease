import Student from "@models/Student";
import { connectToDB } from "@utils/database";


export async function POST(req: any, res: any) {
    try {
        const studentData = await req.json();
        console.log(studentData);
        connectToDB();

        Student.insertMany(studentData);

        return new Response(
            JSON.stringify({ message: "Uploaded Sucessfully" }),
            { status: 200 }
        );
    } catch (err) {
        console.log(err);
        return new Response(
            JSON.stringify({ message: "Internal Server error" }),
            { status: 500 }
        );
    }

} 