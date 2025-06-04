const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const cookie = require("cookie-parser");
const User = require("../models/UserSchema");
// const verifyToken = require("../middleware/verifyToken");
const admin = require("../firebase/firebaseAdmin");
const Joi = require("joi");

const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

const signupSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
}).or("username", "email"); 

// const googleSchema = Joi.object({
//   idToken: Joi.string().required(),
// });

router.post("/signup", async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const { username, email, password } = req.body;

    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Lax",
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    res.status(201).json({
      msg: "User registered",
      // token,
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


router.post("/login", async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const { username, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { username }],

    });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("user", user, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "Login successful",
      // token,

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



// router.post("/google", async (req, res) => {
//   try {
//     const { error } = googleSchema.validate(req.body);
//     if (error) return res.status(400).json({ msg: error.details[0].message });

//     const { idToken } = req.body;

//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     const { email, name } = decodedToken;

//     let user = await User.findOne({ email });

//     if (!user) {
//       user = new User({
//         username: name || email.split("@")[0],
//         email,
//         password: "",
//         badges: [],
//         points: 0,
//       });
//       await user.save();
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       msg: "Google login successful",
//       token,
//       user: {
//         username: user.username,
//         email: user.email,
//         points: user.points,
//         badges: user.badges,
//       },
//     });
//   } catch (error) {
//     console.error("Firebase ID token verification failed", error);
//     res.status(401).json({ msg: "Invalid Firebase ID token" });
//   }
// });
router.get("/me", async (req, res) => {
  const userCookie = req.cookies.user;

  if (!userCookie) return res.status(401).json({ msg: "Not authenticated" });

  const { email, username } = userCookie;

  try {
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.status(200).json({
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


router.post("/logout", (req, res) => {
  res.clearCookie("user", {

    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });

  res.status(200).json({ msg: "Logout successful" });
});

module.exports = router;
