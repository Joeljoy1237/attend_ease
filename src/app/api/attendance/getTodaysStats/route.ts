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

        // Retrieve attendance records for today and yesterday
        const todayAttendance = await Attendance.findOne({ date: currentDate });
        console.log(todayAttendance)
        const yesterdayAttendance = await Attendance.findOne({ date: yesterdayDate });

        // Initialize default attendance data for today and yesterday
        const defaultAttendanceData = new Map<string, boolean>();
        const allStudents = await Student.find();
        allStudents.forEach((student) => {
            defaultAttendanceData.set(student._id.toString(), false); // Default absent
        });

        // Populate today's attendance data
        const todayData = todayAttendance?.data || defaultAttendanceData;

        // Populate yesterday's attendance data
        const yesterdayData = yesterdayAttendance?.data || defaultAttendanceData;

        // Calculate present and absent counts for today
        const todaysPresentCount = Array.from(todayData.values()).filter((status) => status === true).length;
        const todaysAbsentCount = totalStudentsCount - todaysPresentCount;

        // Calculate present and absent counts for yesterday
        const yesterdaysPresentCount = Array.from(yesterdayData.values()).filter((status) => status === true).length;
        const yesterdaysAbsentCount = totalStudentsCount - yesterdaysPresentCount;

        // Calculate changes in attendance and absentees
        const presentDifference = todaysPresentCount - yesterdaysPresentCount;
        const absentDifference = todaysAbsentCount - yesterdaysAbsentCount;

        // Calculate percentage changes
        const presentPercentageChange = (presentDifference / totalStudentsCount) * 100;
        const absentPercentageChange = (absentDifference / totalStudentsCount) * 100;

        // Determine the nature of the change for present count
        const attendanceChange =
            presentDifference > 0
                ? `${presentPercentageChange.toFixed(2)}% increase in attendance`
                : presentDifference < 0
                ? `${Math.abs(presentPercentageChange).toFixed(2)}% decrease in attendance`
                : "no change in attendance";

        // Determine the nature of the change for absent count
        const absenteeChange =
            absentDifference > 0
                ? `${absentPercentageChange.toFixed(2)}% increase in absentees`
                : absentDifference < 0
                ? `${Math.abs(absentPercentageChange).toFixed(2)}% decrease in absentees`
                : "no change in absentees";
console.log(todaysPresentCount)
        // Return the result as a JSON object
        return NextResponse.json({
            totalStudentsCount,
            todaysPresentCount:todaysPresentCount === 0 ? "0" : todaysPresentCount,
            todaysAbsentCount:todaysAbsentCount === 0 ? "0" : todaysAbsentCount,
            yesterdaysPresentCount,
            yesterdaysAbsentCount,
            attendanceChange:todaysPresentCount === 0 ? "Todays attendance not marked yet" : attendanceChange,
            absenteeChange:todaysPresentCount === 0 ? "Todays attendance not marked yet" : absenteeChange,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
