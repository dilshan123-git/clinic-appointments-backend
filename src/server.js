const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

dotenv.config();

const app = express();

// Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Healthcare Appointment API is healthy",
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use(
  "/api/specializations",
  require("./routes/specializationRoutes")
);

app.use(
  "/api/clinics",
  require("./routes/clinicRoutes")
);

app.use(
  "/api/doctors",
  require("./routes/doctorRoutes")
);

app.use(
  "/api/appointments",
  require("./routes/appointmentRoutes")
);

app.use(
  "/api/payments",
  require("./routes/paymentRoutes")
);

// Root
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Healthcare Appointment API is running",
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});