import Attendance from "@models/Attendence";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        const { date, batchCode } = await request.json();
        await connectToDB();
        const data = await Attendance.findOne({ date: new Date(date), division: batchCode })
        console.log(data);
        return new Response(
            JSON.stringify(data.data),
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}