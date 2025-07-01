export const errorHandler = (err, req, res, next) => {
  // Log error details for debugging (avoid leaking sensitive info in production)
  if (process.env.NODE_ENV !== "production") {
    console.error("Error:", err.stack || err.message);
  }

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only show stack trace in development
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

// 404 Not Found middleware
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};
