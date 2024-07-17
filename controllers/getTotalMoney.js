const Member = require("../models/member");
const Student = require("../models/Student");

const getTotalMoney = async (req, res) => {
  try {
    //member email
    const memberEmail = req.params.memberEmail;
    //find the member
    const member = await Member.findOne({ email: memberEmail });
    //if member not found
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }
    let totalMoney = 0;

    //find students
    const students = await Student.find({ createdBy: memberEmail });
    //if no students
    if (!students.length) {
      return res
        .status(404)
        .json({ message: `No student found for ${memberEmail}` });
    }

    // Calculate total money
    students.forEach((student) => {
      const paymentStatus = student.paymentStatus;
      const paymentAmount = parseFloat(paymentStatus);
      if (!isNaN(paymentAmount)) {
        totalMoney += paymentAmount;
      }
    });

    res.status(200).json({ totalMoney });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = getTotalMoney;
