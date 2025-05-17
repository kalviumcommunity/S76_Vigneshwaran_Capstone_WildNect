const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const User = require("../models/UserSchema");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";
// 🔐 Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing){
       
        return res.status(400).json({ msg: "User already exists" });
    } 


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use https in prod
      sameSite: "Lax", // or 'None' with secure=true
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      msg: "User registered",
      token,
      user: {
        username: user.username,
        email: user.email,
        points: user.points,
        badges: user.badges,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 Login
router.post("/login", async (req, res) => {
  try {
    const { username,email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email}, { username: username }],
    });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
       
        return res.status(400).json({ msg: "Invalid credentials" });
    } 
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // use https in prod
      sameSite: "Lax", // or 'None' with secure=true
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
   

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email,
        points: user.points,
        badges: user.badges,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 👤 Get Current User from Session
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.status(404).json({ msg: "User not found" });
  res.status(200).json({ user });
  
});

// 🔓 Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  res.status(200).json({ msg: "Logout successful" });
});

module.exports = router;
