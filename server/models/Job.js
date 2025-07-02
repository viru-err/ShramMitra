import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 1000,
    },
    skill: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    numberOfLaborers: {
      type: Number,
      required: true,
      min: 1,
    },
    deadline: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: String, // Client phone number (you may also use ObjectId if linking to Client model)
      required: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Labor",
      },
    ],
    // Optional fields
    // jobType: { type: String, enum: ["Full-time", "Part-time", "Contract"], default: "Contract" },
    // salary: { type: Number, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
