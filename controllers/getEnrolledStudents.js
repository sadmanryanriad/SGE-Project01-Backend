const Member = require("../models/member");
const getEnrolledStudents = async (req, res) => {
  const email = req.params.email;
  try {
    const result = await Member.findOne({ email });
    res.status(200).json(result.enrolledStudents);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports = getEnrolledStudents;
