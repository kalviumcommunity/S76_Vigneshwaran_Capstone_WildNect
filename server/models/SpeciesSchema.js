const SpeciesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ["Mammal", "Bird", "Reptile", "Fish", "Insect", "Tree", "Plant"],
  },
  scientificName: { type: String },
  image: { type: String },
  description: { type: String },
  habitat: { type: String },
  conservationStatus: { type: String },
  discoveryDate: { type: Date },
  discoveredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: {
    lat: Number,
    lng: Number,
    region: String,
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  isVerified: { type: Boolean, default: false },
});

module.exports = SpeciesSchema;