const express = require("express");
const adminRoute = express.Router();
const { authUser, authorizeRole } = require("../middlewares/auth");
const getAllStudents = require("../controllers/getAllStudents");
const createMCO = require("../controllers/createMCO");
const getAllMCO = require("../controllers/getAllMCO");
const assignStudentToMCO = require("../controllers/assignStudentToMCO");
const getAllMember = require("../controllers/getAllMember");
const getMemberByEmail = require("../controllers/getMemberByEmail");
const createAdmin = require("../controllers/createAdmin");
const getMemberStudentsByEmail = require("../controllers/getMemberStudentsByEmail");
const getAllAdmins = require("../controllers/getAllAdmins");

adminRoute.get("/", authUser, authorizeRole(["admin"]), async (req, res) =>
  res.json("admin home")
);

//create new admin
adminRoute.post(
  "/create-admin",
  authUser,
  authorizeRole(["admin"]),
  createAdmin
);

//get all admins
adminRoute.get(
  "/get-all-admins",
  authUser,
  authorizeRole(["admin"]),
  getAllAdmins
);

//get all student
adminRoute.get(
  "/all-students",
  authUser,
  authorizeRole(["admin"]),
  getAllStudents
);

//create MCO
adminRoute.post("/create-mco", authUser, authorizeRole(["admin"]), createMCO);

//get all MCO
adminRoute.get("/all-mco", authUser, authorizeRole(["admin"]), getAllMCO);

//assign mco a student
adminRoute.post(
  "/assign-student/:studentId",
  authUser,
  authorizeRole(["admin"]),
  assignStudentToMCO
);

//get all members
adminRoute.get("/all-member", authUser, authorizeRole(["admin"]), getAllMember);

//get a member by email
adminRoute.get(
  "/member/:memberEmail",
  authUser,
  authorizeRole(["admin"]),
  getMemberByEmail
);

//get member's students
adminRoute.get(
  "/member-students/:memberEmail",
  authUser,
  authorizeRole(["admin"]),
  getMemberStudentsByEmail
);

module.exports = adminRoute;
