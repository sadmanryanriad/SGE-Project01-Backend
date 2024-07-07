const Student = require("../models/Student");

const addComment = async (req, res) => {
  try {
    const id = req.params.id;
    const { comment, subject, commentedByEmail } = req.body;

    // Validate types (only string is allowed)
    if (
      typeof comment !== "string" ||
      typeof subject !== "string" ||
      typeof commentedByEmail !== "string"
    ) {
      return res.status(400).json({
        error: "Invalid data types for comment, subject, or Email",
      });
    }

    //check for all the fields
    if (!comment || !subject || !commentedByEmail) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newComment = {
      comment,
      subject,
      commentedByEmail,
      createdAt: new Date(), // Using new Date() for Mongoose timestamp consistency
    };

    const result = await Student.findByIdAndUpdate(
      id,
      { $push: { comments: newComment } },
      { new: true }
    );

    res.status(200).json({
      message: "Comment added successfully",
      saved: result.comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = addComment;
