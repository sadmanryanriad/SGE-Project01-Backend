const Member = require("../models/member");

const getEnrolledStudentsCount = async (req, res) => {
  try {
    const memberEmail = req.user.email;
    console.log(memberEmail);
    const member = await Member.findOne({ email: memberEmail });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    const enrolledStudentsCount = member.enrolledStudents.length;

    res.status(200).json({ enrolledStudentsCount });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = getEnrolledStudentsCount;
