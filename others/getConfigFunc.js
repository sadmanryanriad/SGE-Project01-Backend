const Config = require("../models/Config");

const getConfig = async () => {
  try {
    const result = await Config.find({});
    if (!result) return null;
    return result;
  } catch (error) {
    console.log("error in getConfig.js ", error);
    return error;
  }
};

module.exports = getConfig;
