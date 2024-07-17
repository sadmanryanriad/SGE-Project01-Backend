const express = require("express");
const memberRoute = express.Router();
const memberRegistration = require("../controllers/memberRegistration");
const studentRegistration = require("../controllers/studentRegistration");
const { authUser, authorizeRole } = require("../middlewares/auth");
const getStudentById = require("../controllers/getStudentById");
const myStudents = require("../controllers/myStudents");
const getEnrolledStudents = require("../controllers/getEnrolledStudents");
const getEnrolledStudentsCount = require("../controllers/getEnrolledStudentsCount");
const getTotalMoney = require("../controllers/getTotalMoney");

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

//get all students created by the member
memberRoute.get(
  "/my-students",
  authUser,
  authorizeRole(["member"]),
  myStudents
);

//get student by id
memberRoute.get(
  "/student/:id",
  authUser,
  authorizeRole(["member", "mco"]),
  getStudentById
);
//get Enrolled students
memberRoute.get(
  "/enrolled/:email",
  authUser,
  authorizeRole(["member", "mco"]),
  getEnrolledStudents
);

//get enrolled student count
memberRoute.get("/enrolled-count", authUser, getEnrolledStudentsCount);

//get total money for a member
memberRoute.get(
  "/total-money/:memberEmail",
  authUser,
  authorizeRole(["member", "mco"]),
  getTotalMoney
);

module.exports = memberRoute;
