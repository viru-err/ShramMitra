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
import clientRoutes from "./routes/clientRoutes.js"

// Environment setup
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Startup log
console.log("🌱 Middleware initialized and DB connected");

// Health check
app.get("/", (req, res) => {
  res.send("ShramMitra API is running...");
});

// Routes
app.use("/api/labor", laborRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes); 
// 404 & Error handlers
app.use(notFound);
app.use(errorHandler);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
