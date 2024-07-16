const Member = require("../models/member");

const getMemberByEmail = async (req, res) => {
  try {
    const memberEmail = req.params.memberEmail;
    const member = await Member.findOne({ email: memberEmail });
    if (!member) {
      return res.status(404).json({ error: "Member not found" });
    }

    res.status(200).json({ member });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

module.exports = getMemberByEmail;
