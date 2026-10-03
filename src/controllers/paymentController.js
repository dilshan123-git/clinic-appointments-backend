const Payment = require("../models/Payment");

const {
  successResponse,
  createdResponse,
  errorResponse,
  notFoundResponse,
  serverErrorResponse,
} = require("../template/response");


// ==========================================
// Create Payment
// ==========================================
exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    // Populate appointment information
    const populatedPayment =
      await Payment.findById(payment._id)
        .populate("appointment");

    return createdResponse(
      res,
      "Payment created successfully",
      populatedPayment
    );

  } catch (error) {

    console.error(
      "Create Payment Error:",
      error
    );

    return errorResponse(
      res,
      "Payment creation failed",
      error.message,
      400
    );
  }
};


// ==========================================
// Get Payment By Appointment
// ==========================================
exports.getPaymentByAppointment = async (
  req,
  res
) => {
  try {
    const payment =
      await Payment.findOne({
        appointment: req.params.appointmentId,
      }).populate("appointment");

    // Payment not found
    if (!payment) {
      return notFoundResponse(
        res,
        "Payment not found"
      );
    }

    return successResponse(
      res,
      "Payment retrieved successfully",
      payment
    );

  } catch (error) {

    console.error(
      "Get Payment By Appointment Error:",
      error
    );

    return serverErrorResponse(
      res,
      "Failed to fetch payment",
      error.message
    );
  }
};