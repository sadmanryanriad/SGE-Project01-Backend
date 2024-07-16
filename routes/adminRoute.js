const express = require("express");
const adminRoute = express.Router();
const { authUser, authorizeRole } = require("../middlewares/auth");
const getAllStudents = require("../controllers/getAllStudents");
const createMCO = require("../controllers/createMCO");
const getAllMCO = require("../controllers/getAllMCO");
const assignStudentToMCO = require("../controllers/assignStudentToMCO");
const getAllMember = require("../controllers/getAllMember");

adminRoute.get("/", authUser, authorizeRole(["admin"]), async (req, res) =>
  res.json("admin home")
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
//get all MCO
adminRoute.get("/all-member", authUser, authorizeRole(["admin"]), getAllMember);

module.exports = adminRoute;
