const express = require("express");
const mcoRoute = express.Router();
const { authUser, authorizeRole } = require("../middlewares/auth");
const studentStatusUpdate = require("../controllers/studentStatusUpdate");
const getAllCommentsOnStudent = require("../controllers/getAllCommentsOnStudent");
const addComment = require("../controllers/addComment");

const mcoRoleOnly = ["mco"];

mcoRoute.get("/", authUser, authorizeRole(mcoRoleOnly), (req, res) => {
  res.json("mco home");
});

//change student status
mcoRoute.post(
  "/update-status/:id",
  authUser,
  authorizeRole(mcoRoleOnly),
  studentStatusUpdate
);

//comment on student
mcoRoute.post(
  "/comments/:id",
  authUser,
  authorizeRole(["mco", "member"]),
  addComment
);
//get all comments of a student by id
mcoRoute.get(
  "/comments/:id",
  authUser,
  authorizeRole(["mco", "member"]),
  getAllCommentsOnStudent
);

module.exports = mcoRoute;
