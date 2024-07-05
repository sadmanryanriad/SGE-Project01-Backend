const express = require("express");
const mcoRouter = express.Router();

mcoRouter.get("/", (req, res) => {
  res.json("mco home");
});

module.exports = mcoRouter;
