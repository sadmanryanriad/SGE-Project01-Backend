const Student = require("../models/Student");

const getStudentsAssignedToMCO = async (req, res) => {
  try {
    const students = await Student.find({ assignedTo: req.user.email });
    if (!students) {
      return res.status(400).json("student not found");
    }
    res.status(200).json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server error");
  }
};

module.exports = getStudentsAssignedToMCO;
