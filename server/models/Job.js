import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 100 },
    skill: { type: String, required: true, trim: true, maxlength: 50 },
    location: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, default: "", maxlength: 1000 },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true, index: true },
    salary: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Labor" }],
    deadline: { type: Date }, // Optional: add deadline for job
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "temporary", "internship"],
      default: "full-time",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
