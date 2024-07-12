const Student = require("../models/Student");

const getAllUniversityCommunication = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    //get all comments
    const result = await Student.findById(studentId).select(
      "universityCommunication email"
    );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = getAllUniversityCommunication;
