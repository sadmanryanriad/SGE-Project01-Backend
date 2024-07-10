const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");
const studentRegistration = require("../controllers/studentRegistration");
const { authUser, authorizeRole } = require("../middlewares/auth");
const getStudentById = require("../controllers/getStudentById");

//routes
memberRoute.get("/", authorizeRole(["member"]), async (req, res) => {
  res.json("member Home");
});

//member registration
memberRoute.post("/registration", memberRegistration);
//student registration
memberRoute.post(
  "/student-registration",
  authUser,
  authorizeRole(["member"]),
  studentRegistration
);

//get student by id
memberRoute.get(
  "/student/:id",
  authUser,
  authorizeRole(["member", "mco"]),
  getStudentById
);

module.exports = memberRoute;
