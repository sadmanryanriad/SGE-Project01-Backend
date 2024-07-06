const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");
const studentRegistration = require("../controllers/studentRegistration");
const { authorizeRole } = require("../middlewares/auth");

//routes
memberRoute.get("/", authorizeRole(["member"]), async (req, res) => {
  res.json("member Home");
});

//member registration
memberRoute.post("/registration", authorizeRole(["member"]), memberRegistration);
//student registration
memberRoute.post("/student/registration", authorizeRole(["member"]), studentRegistration);

module.exports = memberRoute;
