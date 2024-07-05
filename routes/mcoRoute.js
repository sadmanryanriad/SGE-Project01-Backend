const express = require("express");
const mcoRoute = express.Router();

mcoRoute.get("/", (req, res) => {
  res.json("mco home");
});

module.exports = mcoRoute;
