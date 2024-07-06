const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
    match: [/.+\@.+\..+/, "Email is not valid"]
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  role: {
    type: String,
    enum: ["admin", "mco", "member"],
    required: [true, "Role is required"]
  }
});

const User = mongoose.model("user", userSchema);
module.exports = User;
