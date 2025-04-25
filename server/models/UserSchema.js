const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  points: { type: Number, default: 0 },
  badges: [String],
  rank: { type: Number, default: 0 },
  submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Species" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = UserSchema;
