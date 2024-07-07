// controllers/getAllStudents.js
const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  try {
    const result = await Student.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getAllStudents;
