import Job from "../models/Job.js";
import Labor from "../models/Labor.js";
import Notification from "../models/Notification.js";
import Client from "../models/Client.js";

// ✅ Post a new job (Client only)
export const postJob = async (req, res) => {
  try {
    const {
      title,
      skill,
      location,
      description = "",
      numberOfLaborers,
      date, // deadline
    } = req.body;

    // Validate required fields
    if (
      !title?.trim() ||
      !skill?.trim() ||
      !location?.trim() ||
      !date ||
      !numberOfLaborers ||
      isNaN(numberOfLaborers) ||
      Number(numberOfLaborers) <= 0
    ) {
      return res.status(400).json({
        message:
          "Title, skill, location, date, and valid number of laborers are required.",
      });
    }

    // Check date validity
    const deadline = new Date(date);
    if (isNaN(deadline.getTime())) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    const phone = req.user?.phone;
    if (!phone) {
      return res.status(401).json({ message: "Unauthorized. No client phone found." });
    }

    const client = await Client.findOne({ phone }).select("_id");
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    const job = new Job({
      title: title.trim(),
      skill: skill.trim(),
      location: location.trim(),
      description: description.trim(),
      numberOfLaborers: Number(numberOfLaborers),
      deadline,
      postedBy: phone,
    });

    await job.save();

    // Notify matching laborers
    const matchedLabors = await Labor.find({
      skill: { $regex: new RegExp(skill, "i") },
      location: { $regex: new RegExp(location, "i") },
      isActive: true,
    }).select("_id");

    if (matchedLabors.length > 0) {
      const notifications = matchedLabors.map((labor) => ({
        user: labor._id,
        message: `New job posted: ${title} in ${location}`,
        type: "info",
        meta: { jobId: job._id },
        userModel: "Labor",
      }));
      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      message: "Job posted successfully.",
      jobId: job._id,
      notifiedLabors: matchedLabors.length,
    });
  } catch (error) {
    console.error("Job Post Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json({ jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};
