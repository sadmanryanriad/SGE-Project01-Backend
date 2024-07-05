const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");

//routes
memberRoute.get("/", async (req, res) => {
  res.json("member Home");
});

memberRoute.post("/registration", memberRegistration);

module.exports = memberRoute;
