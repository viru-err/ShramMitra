import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    skill: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    numberOfLaborers: { type: Number, required: true },
    deadline: { type: Date, required: true },
    status: { type: String, default: "Open" },
    postedBy: { type: String, required: true }, // phone number
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Labor" }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
