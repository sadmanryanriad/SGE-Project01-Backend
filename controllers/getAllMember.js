const Member = require("../models/member");

const getAllMember = async (req, res) => {
  try {
    const result = await Member.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

module.exports = getAllMember;
