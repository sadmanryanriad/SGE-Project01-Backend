const mongoose = require("mongoose");
const { Schema } = mongoose;

const newDate = new Date();

const StatusSchema = new Schema({
  status: {
    type: String,
    default: "application processing",
  },
  createdAt: {
    type: Date,
    default: newDate,
  },
  comment: {
    type: String,
  },
});

const StudentSchema = new Schema({
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
  preferredCourse: {
    type: String,
  },
  preferredUniversity: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: String,
    required: [true, "Member email is required"],
    match: [/.+\@.+\..+/, "Member email is not valid"],
  },
  status: {
    type: StatusSchema,
    default: () => ({ status: "application processing" }),
  },
  canUpload: {
    type: Boolean,
    default: false,
  },
  statusHistory: {
    type: Array,
    default: {
      status: "application processing",
      createdAt: newDate,
      comment: "application processing",
    },
  },
  studentId: {
    type: String,
  },
  comments: {
    type: Array,
  },
  universityCommunication: {
    type: Array,
  },
  files: {
    type: Array,
  },
  enrollmentStartDate: {
    type: Date,
  },
  paymentStatus: {
    type: String,
    default: "unpaid",
  },
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
