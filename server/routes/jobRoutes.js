import express from "express";
import { postJob, getAllJobs } from "../controllers/jobController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Post a job (client only, protected)
router.post("/post", verifyToken, (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ message: "Access denied. Clients only." });
  }
  postJob(req, res, next);
});

// ✅ Get all jobs (protected, used by laborers to find jobs)
router.get("/", verifyToken, getAllJobs);

// ✅ Catch-all for undefined job routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Job route not found" });
});

export default router;
