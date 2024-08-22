const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    pseudo: {
      type: String,
      // required: true,
    },
    email_old: { type: String, required: true, unique: true },
    email_new: { type: String , unique: true },
    password:String,
    role: String,
    token:String
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
