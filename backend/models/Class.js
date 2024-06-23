const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    className: { type: String, required: true },
    classId: {
      type: String,
      enum: ["b1", "b2", "c1", "c2", "e1", "e2", "h1", "h2"],
      required: true,
      unique: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Class", classSchema);
