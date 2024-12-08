import Attendance from "@models/Attendence";
import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        // Connect to the database
        await connectToDB();
        const { limit } = await request.json();
        console.log(limit)
        // Retrieve all attendance records
        const attendanceRecords = await Attendance.find()
        const studentCount = await Student.countDocuments();

        if (attendanceRecords.length === 0) {
            return new Response(
                JSON.stringify({ message: "No attendance records found" }),
                { status: 404 }
            );
        }
        const currentDate = new Date().toISOString().split("T")[0];

        const groupedAttendance = attendanceRecords.reduce((acc, record) => {
            const attendanceValues = Array.from(record.data.values());

            const presentCount = attendanceValues.filter(
                (status) => status === true
            ).length;

            const formattedDate = new Date(record.date).toISOString().split("T")[0];

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

        // Convert groupedAttendance to an array and sort by date (descending)
        let attendanceCounts
        if (limit > 0) {
            attendanceCounts = Object.values(groupedAttendance).sort(
                (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
            ).slice(0, 8);
        } else {
            attendanceCounts = Object.values(groupedAttendance).sort(
                (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
        }

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
