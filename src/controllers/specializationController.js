const Specialization = require("../models/Specialization");

const {
  successResponse,
  createdResponse,
  errorResponse,
  serverErrorResponse,
} = require("../template/response");


// ==========================================
// Create Specialization
// ==========================================
exports.createSpecialization = async (req, res) => {
  try {
    const specialization =
      await Specialization.create(req.body);

    return createdResponse(
      res,
      "Specialization created successfully",
      specialization
    );

  } catch (error) {

    console.error(
      "Create Specialization Error:",
      error
    );

    return errorResponse(
      res,
      "Failed to create specialization",
      error.message,
      400
    );
  }
};


// ==========================================
// Get All Specializations
// ==========================================
exports.getSpecializations = async (req, res) => {
  try {
    const specializations =
      await Specialization.find();

    return successResponse(
      res,
      "Specializations retrieved successfully",
      specializations
    );

  } catch (error) {

    console.error(
      "Get Specializations Error:",
      error
    );

    return serverErrorResponse(
      res,
      "Failed to fetch specializations",
      error.message
    );
  }
};