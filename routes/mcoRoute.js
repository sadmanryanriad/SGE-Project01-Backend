const express = require("express");
const mcoRoute = express.Router();
const { authUser, authorizeRole } = require("../middlewares/auth");
const studentStatusUpdate = require("../controllers/studentStatusUpdate");

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

module.exports = mcoRoute;
