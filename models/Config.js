const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  paymentTime: {
    type: String,
  },
  discount: {
    type: String,
  },
});

const User = mongoose.model("Config", userSchema);
module.exports = User;
