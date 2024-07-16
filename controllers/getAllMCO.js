const MCO = require("../models/MCO");

const getAllMCO = async (req, res) => {
  try {
    const result = await MCO.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

module.exports = getAllMCO;
