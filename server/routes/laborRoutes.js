import express from "express";
import {
  registerLabor,
  getLaborNotifications,
  applyForJob, // <-- Import the controller
} from "../controllers/laborController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register Laborer
router.post("/register", registerLabor);

// Apply for a job (protected route)
router.post("/apply", verifyToken, applyForJob);

// Labor Dashboard (protected, labor only)
router.get("/dashboard", verifyToken, (req, res) => {
  if (!req.user || req.user.role !== "labor") {
    return res.status(403).json({ message: "Access denied: Labor only" });
  }

  res.json({
    message: "Welcome to Labor Dashboard",
    userId: req.user.id,
    role: req.user.role,
  });
});

// Get Notifications for Logged-in Laborer
router.get("/notifications", verifyToken, getLaborNotifications);

// 404 handler for undefined labor routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Labor route not found" });
});

export default router;
