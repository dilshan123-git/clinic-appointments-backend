const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {
  successResponse,
  errorResponse,
  createdResponse,
  conflictResponse,
  unauthorizedResponse,
  serverErrorResponse,
} = require("../template/response");


// ==========================================
// Generate JWT Token
// ==========================================
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// ==========================================
// Register User
// ==========================================
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check whether email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return conflictResponse(
        res,
        "Email already registered"
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Response user data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return createdResponse(
      res,
      "Registration successful",
      {
        token,
        user: userData,
      }
    );

  } catch (error) {

    console.error("Registration Error:", error);

    return serverErrorResponse(
      res,
      "Registration failed",
      error.message
    );
  }
};


// ==========================================
// Login User
// ==========================================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return unauthorizedResponse(
        res,
        "Invalid email or password"
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return unauthorizedResponse(
        res,
        "Invalid email or password"
      );
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Response user data
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    return successResponse(
      res,
      "Login successful",
      {
        token,
        user: userData,
      }
    );

  } catch (error) {

    console.error("Login Error:", error);

    return serverErrorResponse(
      res,
      "Login failed",
      error.message
    );
  }
};
