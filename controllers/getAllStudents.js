// controllers/getAllStudents.js
const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  try {
    const result = await Student.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

module.exports = getAllStudents;
