import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";

// Middleware
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

// Routes
import laborRoutes from "./routes/laborRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

// Load env variables & connect DB
dotenv.config();
connectDB();

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

console.log("🌱 Middleware initialized and DB connected");

// Health Check
app.get("/", (req, res) => {
  res.send("ShramMitra API is running...");
});

// API Routes
app.use("/api/labor", laborRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
