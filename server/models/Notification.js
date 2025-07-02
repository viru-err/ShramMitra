import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      refPath: "userModel", // Dynamically reference either 'Labor' or 'Client'
    },
    userModel: {
      type: String,
      required: true,
      enum: ["Labor", "Client"], // Supported models
    },
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    read: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ["info", "success", "warning", "error", "application"],
      default: "info",
    },
    meta: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

export default mongoose.model("Notification", notificationSchema);
