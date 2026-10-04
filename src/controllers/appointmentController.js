const Appointment = require("../models/Appointment");

const {
  successResponse,
  createdResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../template/response");


// ==========================================
// Create Appointment
// ==========================================
exports.createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create({
      patient: req.body.patient,
      doctor: req.body.doctor,
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      reason: req.body.reason,
    });

    const populatedAppointment =
      await Appointment.findById(appointment._id)
        .populate("patient", "name email")
        .populate("doctor");

    return createdResponse(
      res,
      "Appointment created successfully",
      populatedAppointment
    );

  } catch (error) {
    console.error(
      "Create Appointment Error:",
      error
    );

    return errorResponse(
      res,
      "Failed to create appointment",
      error.message,
      400
    );
  }
};

// ==========================================
// Get My Appointments
// ==========================================
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments =
      await Appointment.find({
        patient: req.user.id,
      })
        .populate("doctor")
        .sort({
          appointmentDate: 1,
        });

    return successResponse(
      res,
      "Appointments retrieved successfully",
      appointments
    );

  } catch (error) {

    console.error(
      "Get My Appointments Error:",
      error
    );

    return serverErrorResponse(
      res,
      "Failed to fetch appointments",
      error.message
    );
  }
};


// ==========================================
// Update Appointment Status
// ==========================================
exports.updateAppointmentStatus = async (
  req,
  res
) => {
  try {
    const { status } = req.body;

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        { status },
        {
          new: true,
          runValidators: true,
        }
      );

    // Appointment not found
    if (!appointment) {
      return notFoundResponse(
        res,
        "Appointment not found"
      );
    }

    return successResponse(
      res,
      "Appointment status updated successfully",
      appointment
    );

  } catch (error) {

    console.error(
      "Update Appointment Status Error:",
      error
    );

    return errorResponse(
      res,
      "Failed to update appointment",
      error.message,
      400
    );
  }
};