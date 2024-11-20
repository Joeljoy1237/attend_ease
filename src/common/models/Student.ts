import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            require: [true, "Fist Name is required"],
        },
        phone: {
            type: String,
            require: [true, "Phone number is required"],
        },
        branch: {
            type: String,
            require: [true, "branch is required"],
            enum: ["C1", "C2", "B1", "B2"]
        },

        division: {
            type: String,
            require: [true, "division is required"],
        },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;
