import express from "express";
import {
  getAllLaborers,
  getAllClients,
  deleteUser,
  getAllJobs,
  deleteJob,
} from "../controllers/adminController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Middleware to ensure only admins can access these routes
const checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// ✅ Get all laborers
router.get("/laborers", verifyToken, checkAdmin, getAllLaborers);

// ✅ Get all clients
router.get("/clients", verifyToken, checkAdmin, getAllClients);

// ✅ Delete user (labor or client)
router.delete("/user/:role/:id", verifyToken, checkAdmin, deleteUser);

// ✅ Get all jobs
router.get("/jobs", verifyToken, checkAdmin, getAllJobs);

// ✅ Delete a job post
router.delete("/job/:id", verifyToken, checkAdmin, deleteJob);

// ✅ 404 handler for undefined admin routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Admin route not found" });
});

export default router;
