const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  species: { type: mongoose.Schema.Types.ObjectId, ref: "Species" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = CommentSchema; 