import { Schema, model, models } from "mongoose";

const AttendanceSchema = new Schema(
    {
        date: {
            type: Date,
            require: [true, "Date is required"]
        },
        division: {
            type: String,
            require: [true, "Division is required"]
        },
        data: {
            type: Map,
            of: Boolean,
            required: true,
        },
    },
    { timestamps: true }
)

const Attendance = models.Attendance || model("Attendance", AttendanceSchema);

export default Attendance;