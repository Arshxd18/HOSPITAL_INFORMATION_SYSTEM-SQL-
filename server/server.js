import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import all routes
import patientRoutes from "./routes/patient.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import visitRoutes from "./routes/visit.routes.js";
import otherRoutes from "./routes/other.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register all routes
app.use("/api/patients", patientRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api", otherRoutes); // This covers prescriptions, billing, labs, and dashboard stats

app.get("/", (req, res) => {
  res.send("Hospital API is running");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Basic Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something broke on the server!",
    error: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
