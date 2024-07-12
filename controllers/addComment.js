const Student = require("../models/Student");
const sendEmail = require("../others/sendEmail");

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
    // Check if the student exists
    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Comment added successfully",
      saved: result.comments,
    });
    //send email notifications for member
    const studentCreator = result.createdBy;
    const emailSubject = `New comment for ${result.firstName} ${result.lastName} by ${commentedByEmail}`;
    const emailText =
      `There was a new comment for the student: ${result.firstName} ${result.lastName}\n\n` +
      `Comment: ${comment}\n\n` +
      `Commented by ${commentedByEmail} at ${new Date().toLocaleString()}`;
    sendEmail(studentCreator, emailSubject, emailText).catch(console.error);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json("Internal server error");
    }
  }
};

module.exports = addComment;
