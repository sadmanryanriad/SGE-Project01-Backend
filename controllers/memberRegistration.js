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
    // Validate new member data first
    //It ensures that the member data is validated first before attempting to save user data
    const newMember = new MemberSchema({
      firstName,
      lastName,
      email,
      primaryMobileNumber,
      whatsappNumber,
      password,
    });
    //save member data
    const savedMember = await newMember.save();

    // Save user data
    const user = {
      email: newMember.email,
      password: newMember.password,
      role: "member",
    };
    //save user data
    const savedUser = await saveUser(user);

    res.status(201).json({
      message: "Member registered successfully",
      user: {
        name: `${firstName} ${lastName}`,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
  } catch (error) {
    if (error.message === "Email already exists") {
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
