const User = require("../models/user");

const getRole = async (req, res) => {
  try {
    const email = req.params.email;

    const result = await User.findOne({ email }).select("-_id email role");

    //if user not found
    if (!result) return res.status(404).json({ error: "User not found" });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getRole;
