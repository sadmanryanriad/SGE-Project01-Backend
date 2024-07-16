const mongoose = require("mongoose");
const { Schema } = mongoose;

const MCO = new Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [3, "First name must be at least 3 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [3, "Last name must be at least 3 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Email is not valid"],
  },
  role: {
    type: String,
    default: "mco",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MCORegistration = mongoose.model("MCO", MCO);

module.exports = MCORegistration;
