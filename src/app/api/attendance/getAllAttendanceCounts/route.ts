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

        // Get today's date in the format "YYYY-MM-DD"
        const currentDate = new Date().toISOString().split('T')[0];

        // Group attendance counts by date, excluding the current date
        const groupedAttendance = attendanceRecords.reduce((acc, record) => {
            const attendanceValues = Array.from(record.data.values());

            const presentCount = attendanceValues.filter(
                (status) => status === true
            ).length;

            // Format record date to "YYYY-MM-DD" for comparison
            const formattedDate = new Date(record.date).toISOString().split('T')[0];

            // Exclude the current date
            if (formattedDate === currentDate) return acc;

            if (!acc[formattedDate]) {
                acc[formattedDate] = {
                    date: formattedDate,
                    presentCount: 0,
                };
            }

            acc[formattedDate].presentCount += presentCount;
            return acc;
        }, {});

        // Convert groupedAttendance to an array
        const attendanceCounts = Object.values(groupedAttendance);

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
