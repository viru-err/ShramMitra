import express from "express";
import {
  registerLabor,
  getLaborProfile,
  applyForJob,
  getLaborNotifications,
  viewLaborers,
  appliedJob, // ✅ make sure this function exists in laborController.js
} from "../controllers/laborController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Public: Register a new laborer
router.post("/register", registerLabor);

// ✅ Protected: Get logged-in labor profile
router.get("/me", verifyToken, getLaborProfile);

// ✅ Protected: Apply for a job (Labor only)
router.post("/apply", verifyToken, (req, res, next) => {
  if (req.user.role !== "labor") {
    return res.status(403).json({ message: "Access denied. Labor only." });
  }
  applyForJob(req, res, next);
});

// ✅ Protected: View all laborers (Admin or Client only)
router.get("/view-laborers", verifyToken, (req, res, next) => {
  if (!["admin", "client"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied. Admin or Client only." });
  }
  viewLaborers(req, res, next);
});

// ✅ Protected: Labor dashboard
router.get("/dashboard", verifyToken, (req, res) => {
  if (req.user.role !== "labor") {
    return res.status(403).json({ message: "Access denied. Labor only." });
  }

  res.json({
    message: "Welcome to Labor Dashboard",
    userId: req.user.id,
    role: req.user.role,
  });
});

// ✅ Protected: Get labor notifications
router.get("/notifications", verifyToken, (req, res, next) => {
  if (req.user.role !== "labor") {
    return res.status(403).json({ message: "Access denied. Labor only." });
  }
  getLaborNotifications(req, res, next);
});

// ✅ Protected: Get all applied jobs by logged-in labor
router.get("/application", verifyToken, (req, res, next) => {
  if (req.user.role !== "labor") {
    return res.status(403).json({ message: "Access denied. Labor only." });
  }
  appliedJob(req, res, next);
});

// ❌ Fallback for undefined labor routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Labor route not found" });
});

export default router;
