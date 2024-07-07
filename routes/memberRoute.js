const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");
const studentRegistration = require("../controllers/studentRegistration");
const { authUser, authorizeRole } = require("../middlewares/auth");
const getAllStudents = require("../controllers/getAllStudents");

//routes
memberRoute.get("/", authorizeRole(["member"]), async (req, res) => {
  res.json("member Home");
});

//member registration
memberRoute.post(
  "/registration",
  authorizeRole(["member"]),
  memberRegistration
);
//student registration
memberRoute.post(
  "/student/registration",
  authUser,
  authorizeRole(["member"]),
  studentRegistration
);
//get all students
memberRoute.get(
  "/students",
  authUser,
  authorizeRole(["member", "mco"]),
  getAllStudents
);

module.exports = memberRoute;
