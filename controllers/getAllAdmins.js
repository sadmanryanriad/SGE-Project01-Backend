const adminRegistration = require("../models/Admin");

const getAllAdmins = async (req, res) => {
  try {
    const result = await adminRegistration.find({ role: "admin" });
    res.status(200).json({
      totalAdmins: result.length,
      admins: result,
    });
  } catch (error) {
    console.log("error in getAllAdmins.js ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = getAllAdmins;
