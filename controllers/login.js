const sendMail = require("../others/mailer");

const login = async (req, res) => {
  const { email, username = "" } = req.body;
  // login logic pore dibo ...

  //send email to the user
  try {
    await sendMail(
      email,
      "Login successful",
      `Hello ${username}, welcome to our app!`,
      `<p>Hello <strong>${username}</strong>, welcome to our app!</p>
      <p> You have logged in successfully!</p>
      `
    );
    res.status(201).json({ message: "login successful and email sent" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "login successful but failed to send email" });
  }
};

module.exports = login;
