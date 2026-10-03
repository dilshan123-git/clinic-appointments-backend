const Clinic = require("../models/Clinic");

const {
  successResponse,
  createdResponse,
  errorResponse,
  serverErrorResponse,
} = require("../template/response");


// ==========================================
// Create Clinic
// ==========================================
exports.createClinic = async (req, res) => {
  try {
    const clinic = await Clinic.create(req.body);

    return createdResponse(
      res,
      "Clinic created successfully",
      clinic
    );

  } catch (error) {

    console.error(
      "Create Clinic Error:",
      error
    );

    return errorResponse(
      res,
      "Failed to create clinic",
      error.message,
      400
    );
  }
};


// ==========================================
// Get All Clinics
// ==========================================
exports.getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();

    return successResponse(
      res,
      "Clinics retrieved successfully",
      clinics
    );

  } catch (error) {

    console.error(
      "Get Clinics Error:",
      error
    );

    return serverErrorResponse(
      res,
      "Failed to fetch clinics",
      error.message
    );
  }
};