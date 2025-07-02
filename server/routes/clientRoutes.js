import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  registerClient,
  getClientProfile,
  getMyJobs,
  acceptLaborer,
} from "../controllers/clientController.js";
import { postJob } from "../controllers/jobController.js";

const router = express.Router();

// ✅ Register a new client (public)
router.post("/register", registerClient);

// ✅ Get client profile (protected)
router.get("/me", verifyToken, getClientProfile);

// ✅ Get all jobs posted by the logged-in client (protected)
router.get("/my-jobs", verifyToken, (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ message: "Access denied. Clients only." });
  }
  getMyJobs(req, res, next);
});

// ✅ Post a new job (protected)
router.post("/post-job", verifyToken, (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ message: "Access denied. Clients only." });
  }
  postJob(req, res, next);
});

// ✅ Accept a laborer for a job (protected)
router.post("/accept-laborer", verifyToken, acceptLaborer);

// 🟡 (Optional) Notifications route if implemented in the future
// router.get("/notifications", verifyToken, getClientNotifications);

// ✅ Catch-all route for unmatched client API requests
router.all("*", (req, res) => {
  res.status(404).json({ message: "Client route not found" });
});

export default router;
