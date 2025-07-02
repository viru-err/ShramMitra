import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

// ✅ POST /api/auth/login
// Handles login for Labor, Client, and Admin
router.post("/login", login);

// ✅ Catch-all for undefined auth routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Auth route not found" });
});

export default router;
