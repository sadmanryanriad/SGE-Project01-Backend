const Student = require("../models/Student");

const getAllCommentsOnStudent = async (req, res) => {
  try {
    const id = req.params.id;
    //get all comments
    const result = await Student.findById(id).select("comments");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = getAllCommentsOnStudent;
