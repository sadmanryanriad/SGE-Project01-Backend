const UserSchema = require("../models/user");

const saveUser = async (userData) => {
  try {
    const newUser = new UserSchema(userData);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    } else if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => error.errors[key].message);
      throw new Error(errors.join(", "));
    } else {
      throw new Error(error.message);
    }
  }
};

module.exports = {
  saveUser,
};
