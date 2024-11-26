import Attendance from "@models/Attendence";
import { connectToDB } from "@utils/database";

export async function POST(request: Request) {
    try {
        const { date, data, batchCode } = await request.json();

        // Validate the input date
        if (!date) {
            throw { message: "No date provided", desc: "Kindly choose a date.", status: 400 }
        }

        const parsedDate = new Date(date); // Assuming 'date' is a valid Date string or object
        const formattedDate = parsedDate.toDateString(); // Outputs: "Tue Nov 26 2024"
        console.log(formattedDate);

        // Connect to the database
        await connectToDB();

        // Check if attendance for the same date and batchCode already exists
        const existingAttendance = await Attendance.findOne({
            date: parsedDate,
            division: batchCode,
        });

        if (existingAttendance) {
            const upperCaseBatchCode = batchCode.toUpperCase();
            return Response.json(
                {
                    message: `${upperCaseBatchCode} attendance already marked`,
                    desc: `${formattedDate} is already marked`
                },
                { status: 400 }
            );
        }


        // Create a new attendance entry
        const attendance = new Attendance({
            date: parsedDate,
            data,
            division: batchCode,
        });

        await attendance.save();
        return Response.json({ message: "Marked Successfully" }, { status: 200 });
    } catch (err: any) {
        console.error(err);
        return Response.json(
            { message: err.message || "Internal Server Error", desc: err.desc },
            { status: err.status || 500 } // Default to 500 if err.status is undefined
        );

    }
}
