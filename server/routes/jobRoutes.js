import express from "express";
import { postJob } from "../controllers/jobController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Post a new job (protected, client only)
router.post("/post", verifyToken, postJob);

// 404 handler for undefined job routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Job route not found" });
});

export default router;
