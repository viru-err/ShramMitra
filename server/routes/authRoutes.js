import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// Login route
router.post("/login", login);

// 404 handler for undefined auth routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Auth route not found" });
});

export default router;
