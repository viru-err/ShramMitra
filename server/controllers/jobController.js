import Job from "../models/Job.js";
import Labor from "../models/Labor.js";
import Notification from "../models/Notification.js";

export const postJob = async (req, res) => {
  try {
    const { title, skill, location, description, salary, deadline, jobType } = req.body;

    // Validate required fields
    if (!title || !skill || !location) {
      return res.status(400).json({ message: "Title, skill, and location are required." });
    }

    // Create and save the job
    const job = new Job({
      title,
      skill,
      location,
      description,
      salary,
      deadline,
      jobType,
      postedBy: req.user.id, // from JWT
    });

    await job.save();

    // Find matching laborers (case-insensitive, partial match)
    const matchedLabors = await Labor.find({
      skill: { $regex: new RegExp(skill, "i") },
      location: { $regex: new RegExp(location, "i") },
      isActive: true,
    }).select("_id");

    // Notify each matched laborer
    if (matchedLabors.length > 0) {
      const notifications = matchedLabors.map((labor) => ({
        user: labor._id,
        message: `New job posted: ${title} in ${location}`,
        type: "info",
        meta: { jobId: job._id },
      }));

      await Notification.insertMany(notifications);
    }

    res.status(201).json({
      message: "Job posted successfully.",
      notifiedLabors: matchedLabors.length,
      jobId: job._id,
    });

  } catch (error) {
    console.error("Job Post Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
