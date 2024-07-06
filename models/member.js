const mongoose = require("mongoose");
const { Schema } = mongoose;

const memberRegistrationSchema = new Schema({
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
  primaryMobileNumber: {
    type: Number,
    required: [true, "Please enter primary mobile number"],
    minlength: [10, "Primary mobile number must be at least 10 digits"],
  },
  whatsappNumber: {
    type: Number,
    minlength: [10, "WhatsApp number must be at least 10 digits"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
  role: {
    type: String,
    enum: ["admin", "mco", "member"],
    default: "member",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  studentAdded: {
    type: Array,
  },
});

const MemberRegistration = mongoose.model("member", memberRegistrationSchema);

module.exports = MemberRegistration;
