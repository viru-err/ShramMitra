import Labor from "../models/Labor.js";
import Client from "../models/Client.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { phone, password } = req.body;

  try {
    if (!phone || !password) {
      return res.status(400).json({ message: "Phone and password are required" });
    }

    // Helper function to check user and return token if valid
    const tryLogin = async (Model, role) => {
      // Always select password explicitly due to select: false in schema
      const user = await Model.findOne({ phone }).select("+password");
      if (!user) return null;

      // Use model's matchPassword method if available, else bcrypt.compare
      const isMatch = typeof user.matchPassword === "function"
        ? await user.matchPassword(password)
        : await bcrypt.compare(password, user.password);

      if (isMatch) {
        if (user.isActive === false) {
          return { error: `${role.charAt(0).toUpperCase() + role.slice(1)} account is deactivated` };
        }
        const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return { token, role };
      }
      return null;
    };

    // Try Labor login
    // Try Labor login
let result = await tryLogin(Labor, "labor");
if (result?.error) return res.status(403).json({ message: result.error });
if (result) {
  console.log("Login successful for role:", result.role);
  return res.json(result);
}

// Try Client login
result = await tryLogin(Client, "client");
if (result?.error) return res.status(403).json({ message: result.error });
if (result) {
  console.log("Login successful for role:", result.role);
  return res.json(result);
}

// Try Admin login
result = await tryLogin(Admin, "admin");
if (result?.error) return res.status(403).json({ message: result.error });
if (result) {
  console.log("Login successful for role:", result.role);
  return res.json(result);
}

    return res.status(401).json({ message: "Invalid credentials" });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
