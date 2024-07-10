const sendMail = require("../others/sendEmail");

const signUp = async (req, res) => {
  const { email, username } = req.body;
  // sign-up logic pore dibo ...

  //send email to the user
  try {
    await sendMail(
      email,
      "Welcome to Our App",
      `Hello ${username}, welcome to our app!`,
      `<p>Hello <strong>${username}</strong>, welcome to our app!</p>`
    );
    res.status(201).json({ message: "Sign-up successful and email sent" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Sign-up successful but failed to send email" });
  }
};

module.exports = signUp;
