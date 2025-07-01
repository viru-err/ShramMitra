import Labor from "../models/Labor.js";
import Notification from "../models/Notification.js";
import Job from "../models/Job.js";
import { sendNotification } from "../utils.js/sendNotification.js"; // <-- Import your notification util

// ✅ Register a new Laborer
export const registerLabor = async (req, res) => {
  const { name, phone, skill, location, experience, password } = req.body;

  try {
    // Validate required fields
    if (!name || !phone || !skill || !location || !experience || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing laborer
    const existingLabor = await Labor.findOne({ phone });
    if (existingLabor) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    // Create new laborer
    const newLabor = new Labor({
      name,
      phone,
      skill,
      location,
      experience,
      password,
    });

    await newLabor.save();

    // Remove password from response
    const laborResponse = newLabor.toObject();
    delete laborResponse.password;

    res.status(201).json({ message: "Laborer registered successfully", labor: laborResponse });
  } catch (error) {
    console.error("Labor Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Apply for a job (protected route)
export const applyForJob = async (req, res) => {
  try {
    const laborId = req.user.id;
    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Prevent duplicate applications
    if (job.applicants && job.applicants.includes(laborId)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    job.applicants = job.applicants || [];
    job.applicants.push(laborId);
    await job.save();

    // --- Send notification to client with labor details ---
    const labor = await Labor.findById(laborId).select("name phone skill location experience");
    const clientId = job.postedBy; // assuming job.postedBy is the client's user ID

    const message = `New application from ${labor.name} (${labor.phone}) for your job: ${job.title}`;
    const meta = {
      laborId: labor._id,
      laborName: labor.name,
      laborPhone: labor.phone,
      laborSkill: labor.skill,
      laborLocation: labor.location,
      laborExperience: labor.experience,
      jobId: job._id,
      jobTitle: job.title,
    };

    await sendNotification(clientId, message, "info", meta);
    // ------------------------------------------------------

    res.json({ message: "Applied successfully!" });
  } catch (error) {
    console.error("Apply for job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all notifications for the logged-in labor
export const getLaborNotifications = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "labor") {
      return res.status(403).json({ message: "Access denied: Labor only" });
    }

    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Notification Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};
