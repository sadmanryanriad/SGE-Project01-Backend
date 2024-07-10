const Student = require("../models/Student");

const myStudents = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const result = await Student.find({ createdBy: userEmail });

    //if not found
    if (!result) {
      if (!result) return res.status(404).json({ error: "data not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = myStudents;
