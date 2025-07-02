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
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    let user = null;
    switch (decoded.role) {
      case "labor":
        user = decoded.id
          ? await Labor.findById(decoded.id).select("_id role isActive")
          : null;
        break;
      case "client":
        if (decoded.phone) {
          user = await Client.findOne({ phone: decoded.phone }).select("_id role isActive phone");
        } else if (decoded.id) {
          user = await Client.findById(decoded.id).select("_id role isActive phone");
        }
        break;
      case "admin":
        user = decoded.id
          ? await Admin.findById(decoded.id).select("_id role isActive")
          : null;
        break;
      default:
        return res.status(401).json({ message: "Invalid user role" });
    }

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isActive === false) return res.status(403).json({ message: "User is deactivated" });

    // Use phone as main identifier for client
    req.user = { phone: user.phone, role: decoded.role, id: user._id };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
};
