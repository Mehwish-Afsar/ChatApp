const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../lib/utils");
const { sendWelcomeEmail } = require("../emails/emailHandlers");
const ENV = require("../lib/env")
const cloudinary = require("../lib/cloudinary")



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

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password)
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    generateToken(user._id, res)

    return res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });

  } catch (error) {
    console.error("Error in Login Controller:", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

const logout = async (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 })
  res.status(200).json({ message: "Logged out Successfully" })
};

const updateProfile = async (req, res) => {
  try {
    const profilePic = req.body
    if (!profilePic) {
      return res.status(400).json({ message: "Profile Pic is required" })
    }
    const userId = req.user._id
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findbyIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true}
      )
      return res.status(200).json({message: "Updated User"})

  } catch (error) {
    console.log("Error in updated User", error)
    return res.status(500).json({message: "Internal Server Error"})

  }
}

module.exports = {
  signup,
  login,
  logout,
  updateProfile
};