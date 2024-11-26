import Attendance from "@models/Attendence";
import Student from "@models/Student";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        // Connect to the database
        await connectToDB();

        // Parse the request body to get the division
        const { division } = await request.json();
        console.log(division);

        if (!division) {
            return new Response(
                JSON.stringify({ message: "Division is required" }),
                { status: 400 }
            );
        }

        // Retrieve all attendance records for the given division
        const attendanceRecords = await Attendance.find({ division });
        const studentCount = await Student.countDocuments({ division });
        console.log(studentCount);

        if (attendanceRecords.length === 0) {
            return new Response(
                JSON.stringify({ message: "No attendance records found for the given division" }),
                { status: 404 }
            );
        }

        // Get today's date in the format "YYYY-MM-DD"
        const currentDate = new Date().toISOString().split('T')[0];

        // Initialize today's attendance stats
        let todaysPresentCount = 0;
        let todaysAbsentCount = 0;

        // Group attendance counts by date, excluding the current date
        const groupedAttendance = attendanceRecords.reduce((acc, record) => {
            const attendanceValues = Array.from(record.data.values());

            const presentCount = attendanceValues.filter(
                (status) => status === true
            ).length;

            const absentCount = attendanceValues.filter(
                (status) => status === false
            ).length;

            // Format record date to "YYYY-MM-DD" for comparison
            const formattedDate = new Date(record.date).toISOString().split('T')[0];

            // If it's today, we track it separately
            if (formattedDate === currentDate) {
                todaysPresentCount += presentCount;
                todaysAbsentCount += absentCount;
            } else {
                // Exclude the current date from the historical data
                if (!acc[formattedDate]) {
                    acc[formattedDate] = {
                        date: formattedDate,
                        presentCount: 0,
                        absentCount: 0
                    };
                }

                acc[formattedDate].presentCount += presentCount;
                acc[formattedDate].absentCount += absentCount; // Fix: Increment absentCount
                acc[formattedDate].studentCount = studentCount;
            }
            return acc;
        }, {});

        // Convert groupedAttendance to an array and sort by date in ascending order
        const attendanceCounts = Object.values(groupedAttendance).sort((a:any, b:any) => {
            return new Date(b.date).getTime()-new Date(a.date).getTime();
        });

        // Return the result with today's attendance stats
        return Response.json({
            attendanceCounts,
            studentCount,
            todaysAttendance: {
                present: todaysPresentCount,
                absent: todaysAbsentCount,
                total: studentCount,
            },
        },
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
