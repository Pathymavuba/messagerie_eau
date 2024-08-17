const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      // required: true,
    },
    phoneNumber:String,
    password:String,
    role: String,
    token:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
