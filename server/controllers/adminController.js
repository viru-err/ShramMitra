import Labor from "../models/Labor.js";
import Client from "../models/Client.js";
import Job from "../models/Job.js";

// ✅ Get all laborers
export const getAllLaborers = async (req, res) => {
  try {
    const laborers = await Labor.find().select("-password -__v");
    res.json({ success: true, laborers });
  } catch (error) {
    console.error("Fetch laborers error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch laborers" });
  }
};

// ✅ Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select("-password -__v");
    res.json({ success: true, clients });
  } catch (error) {
    console.error("Fetch clients error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch clients" });
  }
};

// ✅ Delete a user (labor or client)
export const deleteUser = async (req, res) => {
  const { id, role } = req.params;

  try {
    let deleted;
    if (role === "labor") {
      deleted = await Labor.findByIdAndDelete(id);
    } else if (role === "client") {
      deleted = await Client.findByIdAndDelete(id);
    } else {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: `${role} not found` });
    }

    res.json({ success: true, message: `${role} deleted successfully.` });
  } catch (error) {
    console.error("User deletion error:", error);
    res.status(500).json({ success: false, message: "User deletion failed" });
  }
};

// ✅ Get all job posts
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("postedBy", "name company phone")
      .select("-__v");
    res.json({ success: true, jobs });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch jobs" });
  }
};

// ✅ Delete a job post
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Job.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Job deletion error:", error);
    res.status(500).json({ success: false, message: "Job deletion failed" });
  }
};
