const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");
const studentRegistration = require("../controllers/studentRegistration");
const { authUser } = require("../middlewares/auth");

//routes
memberRoute.get("/", authUser, async (req, res) => {
  res.json("member Home");
});

//member registration
memberRoute.post("/registration", authUser, memberRegistration);
//student registration
memberRoute.post("/student/registration", authUser, studentRegistration);

module.exports = memberRoute;