const StudentSchema = require("../models/Student");

const studentRegistration = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    whatsappNumber,
    preferredCourse,
    preferredUniversity,
    createdBy,
  } = req.body;

  const newStudent = new StudentSchema({
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    whatsappNumber,
    preferredCourse,
    preferredUniversity,
    createdBy,
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    if (error.code === 11000) {
      // error code indicates a duplicate key error
      res.status(400).json({ message: "Email already exists" });
    } else if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = studentRegistration;
