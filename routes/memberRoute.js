const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");
const studentRegistration = require("../controllers/studentRegistration");

//routes
memberRoute.get("/", async (req, res) => {
  res.json("member Home");
});

//member registration
memberRoute.post("/registration", memberRegistration);
//student registration
memberRoute.post("/student/registration", studentRegistration);

module.exports = memberRoute;
