const MCO = require("../models/MCO");
const { saveUser } = require("./userController");
const sendEmail = require("../others/sendEmail");

const MCORegistration = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Save user data first
    const user = {
      firstName,
      lastName,
      email,
      password,
      role: "mco",
    };
    const savedUser = await saveUser(user);

    // Save MCO data
    const newMCO = new MCO({
      firstName,
      lastName,
      email,
    });
    const savedMCO = await newMCO.save();

    if (!savedMCO) res.status(500).json("Internal server error");

    res.status(201).json({
      message: "MCO registered successfully",
      user: {
        name: `${firstName} ${lastName}`,
        email: savedUser.email,
        role: savedUser.role,
      },
    });
    // Send email notifications asynchronously
    const emailSubject = "Welcome to Shabuj Global Education";
    const emailText =
      `Dear  ${firstName} ${lastName}\n\n` +
      `You are now a MCO.\n\n` +
      `You can login to your dashboard.\n\n`;
    sendEmail(email, emailSubject, emailText).catch(console.error);
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

module.exports = MCORegistration;
