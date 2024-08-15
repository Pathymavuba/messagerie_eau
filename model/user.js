const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: string,
    },
    role: string,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
