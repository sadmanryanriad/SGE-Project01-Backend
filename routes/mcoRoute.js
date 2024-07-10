const express = require("express");
const mcoRoute = express.Router();
const { authUser, authorizeRole } = require("../middlewares/auth");
const studentStatusUpdate = require("../controllers/studentStatusUpdate");
const getAllCommentsOnStudent = require("../controllers/getAllCommentsOnStudent");
const addComment = require("../controllers/addComment");
const upload = require("../others/multer.config");
const fileUploadController = require("../controllers/fileUploadController");
const getAllStudents = require("../controllers/getAllStudents");

const mcoRoleOnly = ["mco"];

mcoRoute.get("/", authUser, authorizeRole(mcoRoleOnly), (req, res) => {
  res.json("mco home");
});

//get all students
mcoRoute.get("/students", authUser, authorizeRole(["mco"]), getAllStudents);

//change student status
mcoRoute.post(
  "/change-status/:id",
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

// Route to handle file uploads
mcoRoute.post(
  "/upload/:studentId",
  upload.single("file"),
  fileUploadController
);

module.exports = mcoRoute;
