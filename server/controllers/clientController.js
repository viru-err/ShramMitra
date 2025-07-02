import Client from "../models/Client.js";
import Job from "../models/Job.js";
import Labor from "../models/Labor.js";
import Notification from "../models/Notification.js";

// ✅ Register a new client
export const registerClient = async (req, res) => {
  try {
    const { name, phone, location, password, company } = req.body;

    if (!name || !phone || !location || !password || !company) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existing = await Client.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: "Client already exists" });
    }

    const newClient = new Client({
      name: name.trim(),
      phone,
      company: company.trim(),
      location: location.trim(),
      password,
    });

    await newClient.save();

    const clientResponse = newClient.toObject();
    delete clientResponse.password;

    res.status(201).json({
      message: "Client registered successfully",
      client: clientResponse,
    });
  } catch (err) {
    console.error("Client Registration Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get logged-in client profile
export const getClientProfile = async (req, res) => {
  try {
    const client = await Client.findOne({ phone: req.user.phone }).select("-password");
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ client });
  } catch (error) {
    console.error("Get Client Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all jobs posted by this client
export const getMyJobs = async (req, res) => {
  if (!req.user || req.user.role !== "client") {
    return res.status(403).json({ message: "Forbidden: Clients only" });
  }
  try {
    const jobs = await Job.find({ postedBy: req.user.phone }).sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    console.error("Get My Jobs Error:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

// ✅ Accept a laborer for a job
export const acceptLaborer = async (req, res) => {
  try {
    const clientId = req.user.id;
    const { jobId, laborId } = req.body;

    if (!jobId || !laborId) {
      return res.status(400).json({ message: "Job ID and Labor ID are required" });
    }

    const job = await Job.findOne({ _id: jobId, postedBy: req.user.phone });
    if (!job) {
      return res.status(403).json({ message: "Job not found or unauthorized" });
    }

    const labor = await Labor.findById(laborId);
    const client = await Client.findById(clientId).select("name phone company location");

    if (!labor || !client) {
      return res.status(404).json({ message: "Labor or Client not found" });
    }

    await Notification.create({
      user: labor._id,
      userModel: "Labor",
      message: `You've been accepted for the job "${job.title}"`,
      type: "success",
      meta: {
        clientName: client.name,
        clientPhone: client.phone,
        clientCompany: client.company,
        clientLocation: client.location,
        jobId: job._id,
        jobTitle: job.title,
      },
    });

    res.status(200).json({ message: "Labor accepted and notified." });
  } catch (error) {
    console.error("Accept Labor Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
