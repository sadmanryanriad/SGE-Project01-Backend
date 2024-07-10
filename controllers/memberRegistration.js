const MemberSchema = require("../models/member");
const { saveUser } = require("./userController");

const memberRegistration = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    primaryMobileNumber,
    whatsappNumber,
    password,
  } = req.body;

  try {
    // Save user data first
    const user = {
      email,
      password,
      role: "member",
    };
    const savedUser = await saveUser(user);

    // Save member data
    const newMember = new MemberSchema({
      firstName,
      lastName,
      email,
      primaryMobileNumber,
      whatsappNumber,
      password,
    });
    const savedMember = await newMember.save();

    res.status(201).json({
      message: "Member registered successfully",
      user: {
        name: `${firstName} ${lastName}`,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    // Handle the duplicate email error
    if (error.message === "Email already exists") {
      res.status(400).json({ message: "Email already exists" });
    } else if (
      error.code === 11000 &&
      error.keyPattern &&
      error.keyPattern.email
    ) {
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

module.exports = memberRegistration;
