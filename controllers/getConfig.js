const Config = require("../models/Config");

const getConfig = async (req, res) => {
  try {
    const result = await Config.find({});
    if (!result) res.status(404).json("no data found");
    res.status(200).json(result);
  } catch (error) {
    console.log("error in getConfig.js ", error);
    return error;
  }
};

module.exports = getConfig;
