import { Schema, model, models } from "mongoose";

const StudentSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, "Fist Name is required"],
        },
        phoneNo: {
            type: String,
            require: [true, "Phone number is required"],
        },
        admnNo: {
            type: String,
            require: [true, "Admission number is required"],
        },
        rollNo: {
            type: Number,
            require: [true, "Roll number is required"],
        },
        branch: {
            type: String,
            require: [true, "branch is required"]
        },
        division: {
            type: String,
            require: [true, "division is required"],
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const Student = models.Student || model("Student", StudentSchema);
export default Student;
