import Attendance from "@models/Attendence";
import Student from "@models/Student";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        // Connect to the database
        await connectToDB();

        // Get total students count
        const totalStudentsCount = await Student.countDocuments();

        // Get today's date in the format "YYYY-MM-DD"
        const currentDate = new Date().toISOString().split("T")[0];

        // Get yesterday's date in the format "YYYY-MM-DD"
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split("T")[0];

        // Retrieve all attendance records for today and yesterday
        const todayAttendance = await Attendance.find({ date: currentDate });
        const yesterdayAttendance = await Attendance.find({ date: yesterdayDate });

        // Helper function to calculate present count
        const calculatePresentCount = (attendanceRecords: any[]) => {
            let presentCount = 0;
            attendanceRecords.forEach((record) => {
                // Assert that the attendance values are boolean
                const attendanceValues = Array.from(record.data.values()) as boolean[];
                presentCount += attendanceValues.filter((status) => status === true).length;
            });
            return presentCount;
        };

        // Calculate today's present and absent counts
        const todaysPresentCount = calculatePresentCount(todayAttendance);
        const todaysAbsentCount = totalStudentsCount - todaysPresentCount;

        // Calculate yesterday's present and absent counts
        const yesterdaysPresentCount = calculatePresentCount(yesterdayAttendance);
        const yesterdaysAbsentCount = totalStudentsCount - yesterdaysPresentCount;

        // Calculate changes in attendance and absentees
        const presentDifference = todaysPresentCount - yesterdaysPresentCount;
        const absentDifference = todaysAbsentCount - yesterdaysAbsentCount;

        // Calculate percentage changes
        const presentPercentageChange =
            (presentDifference / totalStudentsCount) * 100;
        const absentPercentageChange =
            (absentDifference / totalStudentsCount) * 100;

        // Determine the nature of the change for present count
        const attendanceChange = presentDifference > 0
            ? `${presentPercentageChange.toFixed(2)}% increase in attendance`
            : presentDifference < 0
            ? `${Math.abs(presentPercentageChange).toFixed(2)}% decrease in attendance`
            : "no change in attendance";

        // Determine the nature of the change for absent count
        const absenteeChange = absentDifference > 0
            ? `${absentPercentageChange.toFixed(2)}% increase in absentees`
            : absentDifference < 0
            ? `${Math.abs(absentPercentageChange).toFixed(2)}% decrease in absentees`
            : "no change in absentees";

        // Return the result as a JSON object
        return NextResponse.json({
            totalStudentsCount,
            todaysPresentCount,
            todaysAbsentCount,
            yesterdaysPresentCount,
            yesterdaysAbsentCount,
            attendanceChange,
            absenteeChange,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
