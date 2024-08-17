const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    phoneNumber:String,
    password:String,
    role: String,
    token:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
