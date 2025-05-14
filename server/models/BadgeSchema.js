const mongoose= require("mongoose");
const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  icon: String,
  criteria: String, 
});
module.exports = mongoose.model("Badge", BadgeSchema);