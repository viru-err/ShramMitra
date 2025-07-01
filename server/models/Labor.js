import mongoose from "mongoose";
import bcrypt from "bcryptjs"; // Add bcrypt for password hashing

const notificationSchema = new mongoose.Schema(
  {
    message: { type: String, trim: true, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["info", "success", "warning", "error"],
      default: "info",
    },
    meta: { type: Object, default: {} },
  },
  { _id: false }
);

const laborSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    skill: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Prevent password from being returned by default
    },
    notifications: [notificationSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Password hashing before saving
laborSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Optional: method to compare password
laborSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Labor", laborSchema);
