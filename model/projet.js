const mongoose = require("mongoose");

const projetSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("projet", projetSchema);
