import jwt from "jsonwebtoken";
import Labor from "../models/Labor.js";
import Client from "../models/Client.js";
import Admin from "../models/Admin.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token missing or malformed" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = null;
    switch (decoded.role) {
      case "labor":
        user = await Labor.findById(decoded.id).select("_id role isActive");
        break;
      case "client":
        user = await Client.findById(decoded.id).select("_id role isActive");
        break;
      case "admin":
        user = await Admin.findById(decoded.id).select("_id role isActive");
        break;
      default:
        return res.status(401).json({ message: "Invalid user role" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isActive === false) return res.status(403).json({ message: "User is deactivated" });

    req.user = { id: user._id, role: decoded.role };
    next();
  } catch (error) {
    console.error("Token error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
