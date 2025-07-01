const mongoose = require("mongoose");

const laborSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  skill: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: String, required: true },
});

module.exports = mongoose.model("Labor", laborSchema);
