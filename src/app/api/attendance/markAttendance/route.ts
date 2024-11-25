import Attendance from "@models/Attendence";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        const { date, data, batchCode } = await request.json();

        // Validate the date
        const parsedDate = new Date(date);

        // Connect to the database
        await connectToDB();

        // Check if attendance for the same date and batchCode already exists
        const existingAttendance = await Attendance.findOne({
            date: parsedDate,
            division: batchCode,
        });

        if (existingAttendance) {
            // Update the existing attendance record
            existingAttendance.data = data;
            await existingAttendance.save();
            return new Response(
                JSON.stringify({ message: "Attendance updated successfully" }),
                { status: 200 }
            );
        } else {
            // Create a new attendance entry if no existing record is found
            const attendance = new Attendance({
                date: parsedDate,
                data: data,
                division: batchCode,
            });

            await attendance.save();
            return new Response(
                JSON.stringify({ message: "Marked Successfully" }),
                { status: 200 }
            );
        }
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
