const express = require("express");
const mcoRoute = express.Router();
const { authUser } = require("../middlewares/auth");

mcoRoute.get("/", authUser, (req, res) => {
  res.json("mco home");
});

module.exports = mcoRoute;
