const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus,
  getMyUpcomingAppointments,
} = require("../controllers/appointmentController");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createAppointment
);

router.get(
  "/my",
  authMiddleware,
  getMyAppointments
);

router.patch(
  "/:id/status",
  authMiddleware,
  updateAppointmentStatus
);

router.get(
  "/upcoming",
  authMiddleware,
  getMyUpcomingAppointments
);

module.exports = router;