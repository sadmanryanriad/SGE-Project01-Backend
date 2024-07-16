const Student = require("../models/Student");

const assignStudentToMCO = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const { assignedTo } = req.body;

    const filter = { _id: studentId };
    const update = {
      assignedTo,
    };
    const options = { new: true };

    const result = await Student.findOneAndUpdate(filter, update, options);
    //if result is null
    if (!result) {
      return res.status(400).json("student not found");
    }

    res.status(201).json({
      message: "assigned successfully",
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error ");
  }
};

module.exports = assignStudentToMCO;
