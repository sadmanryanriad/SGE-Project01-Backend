const MemberSchema = require("../models/member");
const { saveUser } = require("./userController");
const sendEmail = require("../others/sendEmail");
const admin = require("../others/firebaseService"); // Import the initialized Firebase Admin SDK

const memberRegistration = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    primaryMobileNumber,
    whatsappNumber,
  } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !password || !primaryMobileNumber) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // First, create the Firebase account
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });
    console.log(firebaseUser);

    // Save user data
    const user = {
      firstName,
      lastName,
      email,
      password, // omit or hash the password before saving it to MongoDB pore korbo
      role: "member",
      firebaseUid: firebaseUser.uid, // Save the Firebase UID for reference
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

    if (!savedMember) {
      // If saving MCO data fails, delete the Firebase user to maintain consistency
      await admin.auth().deleteUser(firebaseUser.uid);
      return res.status(500).json("Internal server error");
    }

    res.status(201).json({
      message: "Member registered successfully",
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
      `You are now a member.\n\n` +
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

module.exports = memberRegistration;
