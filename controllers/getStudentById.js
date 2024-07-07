const Student = require("../models/Student");

const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Student.findById({ _id: id });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

module.exports = getStudentById;
