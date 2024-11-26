import Attendance from "@models/Attendence";
import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        // Connect to the database
        await connectToDB();

        // Retrieve all attendance records
        const attendanceRecords = await Attendance.find();
        const studentCount = await Student.countDocuments();
        console.log(studentCount);

        if (attendanceRecords.length === 0) {
            return new Response(
                JSON.stringify({ message: "No attendance records found" }),
                { status: 404 }
            );
        }

        // Calculate attendance counts for each date
        const attendanceCounts = attendanceRecords.map((record) => {

            const attendanceValues = Array.from(record.data.values());


            const presentCount = attendanceValues.filter(
                (status) => status === true
            ).length;

            return {
                date: record.date,
                presentCount,
            };
        });

        // Return the result
        return new Response(
            JSON.stringify({ attendanceCounts, studentCount }),
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
