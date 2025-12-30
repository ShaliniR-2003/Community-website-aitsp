const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// ========================
// REGISTER ROUTE
// ========================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json("User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set role based on email (only admin@gmail.com is admin)
    const role = email === "admin@gmail.com" ? "admin" : "user";

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      suspended: false
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// ========================
// LOGIN ROUTE
// ========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    // Check if suspended
    if (user.suspended) return res.status(403).json("Account suspended");

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json("Wrong password");

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role,
      id: user._id,
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

// ========================
// RESET PASSWORD ROUTE
// ========================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json("Email and new password required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json("Password reset successful");
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;