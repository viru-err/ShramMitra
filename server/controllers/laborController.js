import Notification from "../models/Notification.js";
import Job from "../models/Job.js";
import Labor from "../models/Labor.js";
import Client from "../models/Client.js";

// ✅ Register a new Laborer
export const registerLabor = async (req, res) => {
  const { name, phone, skill, location, experience, password } = req.body;

  try {
    if (!name || !phone || !skill || !location || !experience || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingLabor = await Labor.findOne({ phone });
    if (existingLabor) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    const newLabor = new Labor({
      name,
      phone,
      skill,
      location,
      experience,
      password,
    });

    await newLabor.save();

    const laborResponse = newLabor.toObject();
    delete laborResponse.password;

    res.status(201).json({
      message: "Laborer registered successfully",
      labor: laborResponse,
    });
  } catch (error) {
    console.error("Labor Registration Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Labor applies for a job
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

    if (job.applicants && job.applicants.includes(laborId)) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    // ✅ Add labor to job's applicants
    job.applicants = job.applicants || [];
    job.applicants.push(laborId);
    await job.save();

    // ✅ Add job to labor's appliedJobs
    const labor = await Labor.findById(laborId).select("name phone skill location experience appliedJobs");
    labor.appliedJobs = labor.appliedJobs || [];
    labor.appliedJobs.push(job._id);
    await labor.save();

    // ✅ Notify the client
    const client = await Client.findOne({ phone: job.postedBy });
    if (client) {
      await Notification.create({
        user: client._id,
        userModel: "Client",
        message: `Labor ${labor.name} (${labor.phone}) applied for your job: ${job.title}`,
        type: "application",
        meta: {
          laborId: labor._id,
          laborName: labor.name,
          laborPhone: labor.phone,
          laborSkill: labor.skill,
          laborLocation: labor.location,
          laborExperience: labor.experience,
          jobId: job._id,
          jobTitle: job.title,
        },
      });
    }

    res.json({ message: "Applied successfully!" });
  } catch (error) {
    console.error("Apply for job error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get notifications for logged-in labor
export const getLaborNotifications = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "labor") {
      return res.status(403).json({ message: "Access denied: Labor only" });
    }

    const notifications = await Notification.find({
      user: req.user.id,
      userModel: "Labor",
    })
      .sort({ createdAt: -1 })
      .lean();

    res.json({ success: true, notifications });
  } catch (error) {
    console.error("Notification Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

// ✅ Get logged-in labor profile
export const getLaborProfile = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "labor") {
      return res.status(403).json({ message: "Access denied: Labor only" });
    }

    const labor = await Labor.findById(req.user.id).select("-password");
    if (!labor) {
      return res.status(404).json({ message: "Labor not found" });
    }

    res.status(200).json({ labor });
  } catch (error) {
    console.error("Get Labor Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ View all laborers (admin or client)
export const viewLaborers = async (req, res) => {
  try {
    if (!req.user || !["admin", "client"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: Admin or Client only" });
    }

    const laborers = await Labor.find().select("-password");
    res.json({ laborers });
  } catch (error) {
    console.error("View Laborers Error:", error);
    res.status(500).json({ message: "Failed to fetch laborers" });
  }
};
// ✅ Fetch jobs applied by logged-in labor
export const appliedJob = async (req, res) => {
  try {
    const laborId = req.user.id;

    const labor = await Labor.findById(laborId)
      .populate({
        path: "appliedJobs",
        select: "title location deadline skill",
      })
      .select("appliedJobs");

    if (!labor) {
      return res.status(404).json({ message: "Labor not found" });
    }

    res.status(200).json({ appliedJobs: labor.appliedJobs });
  } catch (error) {
    console.error("Applied Job Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch applied jobs" });
  }
};

