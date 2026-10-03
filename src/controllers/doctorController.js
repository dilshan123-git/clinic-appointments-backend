const Doctor = require("../models/Doctor");

const {
  successResponse,
  createdResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../template/response");


// ==========================================
// Create Doctor
// ==========================================
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    // Populate specialization and clinic
    const populatedDoctor =
      await Doctor.findById(doctor._id)
        .populate("specialization")
        .populate("clinic");

    return createdResponse(
      res,
      "Doctor created successfully",
      populatedDoctor
    );

  } catch (error) {

    console.error(
      "Create Doctor Error:",
      error
    );

    return errorResponse(
      res,
      "Failed to create doctor",
      error.message,
      400
    );
  }
};


// ==========================================
// Get All Doctors
// ==========================================
exports.getDoctors = async (req, res) => {
  try {
    const doctors =
      await Doctor.find()
        .populate("specialization")
        .populate("clinic");

    return successResponse(
      res,
      "Doctors retrieved successfully",
      doctors
    );

  } catch (error) {

    console.error(
      "Get Doctors Error:",
      error
    );

    return serverErrorResponse(
      res,
      "Failed to fetch doctors",
      error.message
    );
  }
};


// ==========================================
// Get Doctor By ID
// ==========================================
exports.getDoctorById = async (req, res) => {
  try {
    const doctor =
      await Doctor.findById(req.params.id)
        .populate("specialization")
        .populate("clinic");

    // Doctor not found
    if (!doctor) {
      return notFoundResponse(
        res,
        "Doctor not found"
      );
    }

    return successResponse(
      res,
      "Doctor retrieved successfully",
      doctor
    );

  } catch (error) {

    console.error(
      "Get Doctor By ID Error:",
      error
    );

    return serverErrorResponse(
      res,
      "Failed to fetch doctor",
      error.message
    );
  }
};