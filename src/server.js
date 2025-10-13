// 1. All imports must be at the top of the file.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ImageKit from "imagekit";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import complaintRoutes from "./routes/complaints.js";
import passwordRoutes from "./routes/password.js";

// --- Initial Setup ---
dotenv.config();
const app = express();

// --- Environment Variable Validation ---
// Best practice: Check for required variables on startup.
const {
  PORT,
  MONGO_URI,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT,
} = process.env;

if (!PORT || !MONGO_URI || !IMAGEKIT_PUBLIC_KEY || !IMAGEKIT_PRIVATE_KEY || !IMAGEKIT_URL_ENDPOINT) {
  console.error("FATAL ERROR: Missing required environment variables.");
  process.exit(1);
}

// --- Middleware ---
// Consolidate middleware calls to avoid redundancy.
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// --- Database Connection ---
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// --- API Routes ---
// The root "welcome" route should be defined before other routes.
app.get('/', (_req, res) => {
  res.send('Clean Street API is running!');
});

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", passwordRoutes); // Note: This might conflict with userRoutes. Consider a different path like /api/password.
app.use("/api/complaints", complaintRoutes);

// NOTE: The photo upload logic should be moved from here into your './routes/users.js' file.
// Keeping this file clean is important for maintainability.

// --- Error Handling Middleware ---
// This should be the last `app.use` before `app.listen`.
app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" });
});

// --- Start Server ---
// This must be the last part of the file.
app.listen(PORT, () =>
  console.log(`API listening on http://localhost:${PORT}`)
);