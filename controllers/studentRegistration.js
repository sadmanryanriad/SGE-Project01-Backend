const StudentSchema = require("../models/Student");
const sendEmail = require("../others/sendEmail");

const studentRegistration = async (req, res) => {
  //check who is requesting from req
  const createdBy = req.user.email;
  const {
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    whatsappNumber,
    preferredCourse,
    preferredUniversity,
  } = req.body;

  const newStudent = new StudentSchema({
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    whatsappNumber,
    preferredCourse,
    preferredUniversity,
    createdBy,
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);

    // Prepare email details
    const emailSubject = `Registration Successful: ${firstName} ${lastName}`;
    const emailTextStudent =
      `Dear ${firstName},\n\n` +
      `Congratulations! You have been successfully registered as a student.\n\n` +
      `Here are your details:\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Primary Mobile Number: ${primaryMobileNumber}\n` +
      `WhatsApp Number: ${whatsappNumber}\n` +
      `Preferred Course: ${preferredCourse}\n` +
      `Preferred University: ${preferredUniversity}\n\n` +
      `Thank you for choosing our services!\n\n` +
      `Best regards,\nYour Team`;

    const emailTextMember =
      `Dear Member,\n\n` +
      `A new student has been successfully registered by you.\n\n` +
      `Here are the student details:\n` +
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Primary Mobile Number: ${primaryMobileNumber}\n` +
      `WhatsApp Number: ${whatsappNumber}\n` +
      `Preferred Course: ${preferredCourse}\n` +
      `Preferred University: ${preferredUniversity}\n\n` +
      `Thank you for your contribution!\n\n` +
      `Best regards,\nYour Team`;

    // Send email notifications asynchronously
    sendEmail(email, emailSubject, emailTextStudent).catch(console.error);
    sendEmail(createdBy, emailSubject, emailTextMember).catch(console.error);
  } catch (error) {
    if (error.code === 11000) {
      // error code indicates a duplicate key error
      res.status(400).json({ message: "Email already exists" });
    } else if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      res.status(400).json({ errors });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = studentRegistration;
