const sendResponse = (
    res,
    statusCode,
    success,
    message,
    data = null,
    error = null,
    meta = null
) => {
    const response = {
        success,
        message,
        data,
    };

    // Add error only when available
    if (error) {
        response.error = error;
    }

    // Add metadata only when available
    if (meta) {
        response.meta = meta;
    }

    return res.status(statusCode).json(response);
};

// Success response
const successResponse = (
    res,
    message = "Request successful",
    data = null,
    statusCode = 200,
    meta = null
) => {
    return sendResponse(
        res,
        statusCode,
        true,
        message,
        data,
        null,
        meta
    );
};

// Error response
const errorResponse = (
    res,
    message = "Something went wrong",
    error = null,
    statusCode = 500
) => {
    return sendResponse(
        res,
        statusCode,
        false,
        message,
        null,
        error
    );
};

// Created response
const createdResponse = (
    res,
    message = "Resource created successfully",
    data = null
) => {
    return successResponse(res, message, data, 201);
};

// No content response
const noContentResponse = (res) => {
    return res.status(204).send();
};

// Validation error
const validationErrorResponse = (
    res,
    message = "Validation failed",
    error = null
) => {
    return errorResponse(res, message, error, 400);
};

// Unauthorized response
const unauthorizedResponse = (
    res,
    message = "Unauthorized access"
) => {
    return errorResponse(res, message, null, 401);
};

// Forbidden response
const forbiddenResponse = (
    res,
    message = "Access forbidden"
) => {
    return errorResponse(res, message, null, 403);
};

// Not found response
const notFoundResponse = (
    res,
    message = "Resource not found"
) => {
    return errorResponse(res, message, null, 404);
};

// Conflict response
const conflictResponse = (
    res,
    message = "Resource already exists",
    error = null
) => {
    return errorResponse(res, message, error, 409);
};

// Server error response
const serverErrorResponse = (
    res,
    message = "Internal server error",
    error = null
) => {
    return errorResponse(res, message, error, 500);
};

module.exports = {
    sendResponse,
    successResponse,
    errorResponse,
    createdResponse,
    noContentResponse,
    validationErrorResponse,
    unauthorizedResponse,
    forbiddenResponse,
    notFoundResponse,
    conflictResponse,
    serverErrorResponse,
};