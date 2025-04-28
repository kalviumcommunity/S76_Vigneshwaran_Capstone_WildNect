const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: String,
  createdAt: { type: Date, default: Date.now },
  room: { type: String, default: "global" },
});

module.exports = ChatSchema;
