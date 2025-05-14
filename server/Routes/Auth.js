const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/UserSchema");

const router = express.Router();

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
    req.session.user = user; // store in session

    res.status(201).json({
      msg: "User registered",
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

    req.session.user = user; // store in session

    res.status(200).json({
      msg: "Login successful",
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
router.get("/me", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ msg: "Not authenticated" });
  }
});

// 🔓 Logout
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ msg: "Logged out" });
  });
});

module.exports = router;
