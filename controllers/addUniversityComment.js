const Student = require("../models/Student");
const sendEmail = require("../others/sendEmail");

const addComment = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const commentedByEmail = req.user.email;
    const { from, subject, date } = req.body;

    // Validate types (only string is allowed)
    if (
      typeof from !== "string" ||
      typeof subject !== "string" ||
      typeof date !== "string"
    ) {
      return res.status(400).json({
        error: "Invalid data types for from, subject, date",
      });
    }

    //check for all the fields
    if (!from || !subject || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newUC = {
      from,
      subject,
      date,
      createdAt: new Date(), // Using new Date() for Mongoose timestamp consistency
    };

    const result = await Student.findByIdAndUpdate(
      studentId,
      { $push: { universityCommunication: newUC } },
      { new: true }
    );
    // Check if the student exists
    if (!result) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "University communication added successfully",
      universityCommunication: result.universityCommunication,
    });
    //send email notifications for member
    const studentCreator = result.createdBy;
    const emailSubject = `New University communication for ${result.firstName} ${result.lastName}`;
    const emailText =
      `There was a new University communication for the student: ${result.firstName} ${result.lastName}\n\n` +
      `University communication: \n\n\n` +
      `From: ${from} \n\n` +
      `Subject: ${subject}\n\n` +
      `Date: ${date}\n\n\n` +
      `University communication by ${commentedByEmail} at ${new Date().toLocaleString()}`;
    sendEmail(studentCreator, emailSubject, emailText).catch(console.error);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json("Internal server error");
    }
  }
};

module.exports = addComment;
