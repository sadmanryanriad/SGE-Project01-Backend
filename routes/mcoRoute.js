const express = require("express");
const mcoRoute = express.Router();
const { authUser, authorizeRole } = require("../middlewares/auth");
const studentStatusUpdate = require("../controllers/studentStatusUpdate");
const getAllCommentsOnStudent = require("../controllers/getAllCommentsOnStudent");
const addComment = require("../controllers/addComment");
const upload = require("../others/multer.config");
const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");

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

// Route to handle file uploads
mcoRoute.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "project-01",
      access_mode: "public",
    });

    // Remove file from local server after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: "File uploaded successfully",
      file: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to upload file to Cloudinary", details: error });
  }
});

module.exports = mcoRoute;
