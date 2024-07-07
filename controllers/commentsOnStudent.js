const Student = require("../models/Student");

const commentsOnStudent = async (req, res) => {
  try {
    const newComment = req.body.comment;
    const id = req.params.id;
    const update = { $push: { comments: newComment } };
    const options = { new: true };
    const result = await Student.findByIdAndUpdate(id, update, options);

    res.status(200).json({
      message: "Comment added successfully",
      comments: result.comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = commentsOnStudent;
