import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { registerClient, getClientProfile } from "../controllers/clientController.js";
// import { postJobForClient } from "../controllers/clientController.js";

const router = express.Router();

// Register a new client (public)
router.post("/register", registerClient);

// Get logged-in client profile (protected)
router.get("/me", verifyToken, getClientProfile);

// Post a job (protected, client only)
router.post("/post-job", verifyToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== "client") {
      return res.status(403).json({ message: "Forbidden: Clients only" });
    }

    // TODO: Replace with actual job posting logic/controller
    // await postJobForClient(req, res);

    res.status(201).json({ message: "Job posted successfully" });
  } catch (error) {
    console.error("Error posting job:", error);
    res.status(500).json({ message: "Server error while posting job" });
  }
});

// 404 handler for undefined client routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Client route not found" });
});

export default router;
