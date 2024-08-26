const Admin = require("../models/Admin");
const { saveUser } = require("./userController");
const sendEmail = require("../others/sendEmail");
const admin = require("../others/firebaseService"); // Import the initialized Firebase Admin SDK

const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // First, create the Firebase account
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    // Save user data to MongoDB
    const user = {
      firstName,
      lastName,
      email,
      password, // omit or hash the password before saving it to MongoDB pore korbo
      role: "admin",
      firebaseUid: firebaseUser.uid, // Save the Firebase UID for reference
    };
    const savedUser = await saveUser(user);

    // Save Admin data to MongoDB
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
    });
    const savedAdmin = await newAdmin.save();

    // If saving Admin data fails, delete the Firebase user to maintain consistency
    if (!savedAdmin) {
      await admin.auth().deleteUser(firebaseUser.uid);
      return res.status(500).json("Internal server error");
    }

    res.status(201).json({
      message: "Admin registered successfully",
      user: {
        name: `${firstName} ${lastName}`,
        email: savedUser.email,
        role: savedUser.role,
      },
    });

    // Send email notifications asynchronously
    const emailSubject = "Welcome to Shabuj Global Education";
    const emailText =
      `Dear ${firstName} ${lastName},\n\n` +
      `You are now an Admin.\n\n` +
      `You can log in to your account.\n\n`;
    sendEmail(email, emailSubject, emailText).catch(console.error);
  } catch (error) {
    // Handle Firebase-specific errors
    if (error.code && error.code.startsWith("auth/")) {
      return res
        .status(400)
        .json({ message: `Firebase error: ${error.message}` });
    }

    // Handle MongoDB duplicate email error
    if (
      error.message === "Email already exists" ||
      (error.code === 11000 && error.keyPattern && error.keyPattern.email)
    ) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map(
        (key) => error.errors[key].message
      );
      return res.status(400).json({ errors });
    }

    // Catch-all for other errors
    res.status(500).json({ message: error.message });
  }
};

module.exports = createAdmin;
