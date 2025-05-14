const mongoose = require("mongoose");
const LeaderboardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  score: Number,
  rank: Number,
  week: Date,
});
module.exports = mongoose.model("Leaderboard", LeaderboardSchema);
