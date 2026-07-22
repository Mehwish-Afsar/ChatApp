const User = require("../models/User");
const bcrypt = require("bcryptjs");
const  generateToken = require("../lib/utils");
const { sendWelcomeEmail } = require("../emails/emailHandlers");
const ENV = require("../lib/env")


const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate fields
    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // Save user
    const savedUser = await newUser.save();

    // Generate JWT cookie
    generateToken(savedUser._id, res);

    // Send welcome email
    try {
      await sendWelcomeEmail(
        savedUser.email,
        savedUser.fullName,
        ENV.CLIENT_URL
      );
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError.message);
    }

    // Send response
    return res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      profilePic: savedUser.profilePic,
    });
  } catch (error) {
    console.error("Signup Error:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const login = (req, res) => {
  res.send("Login endpoint");
};

const logout = (req, res) => {
  res.send("Logout endpoint");
};

module.exports = {
  signup,
  login,
  logout,
};