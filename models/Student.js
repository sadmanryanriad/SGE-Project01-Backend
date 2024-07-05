const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const StudentSchema = new Schema({
  name: {
    type: String,
  },
});

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;
