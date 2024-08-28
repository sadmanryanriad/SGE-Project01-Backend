const Student = require("../models/Student");

const getMemberStudentsByEmail = async (req, res) => {
  try {
    //get member email
    const memberEmail = req.params.memberEmail;
    const result = await Student.find({ createdBy: memberEmail });

    //if not found
    if (!result) {
      if (!result) return res.status(404).json({ error: "data not found" });
    }

    res.status(200).json({
      totalStudents: result.length,
      students: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getMemberStudentsByEmail;
