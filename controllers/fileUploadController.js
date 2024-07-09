const cloudinary = require("../config/cloudinaryConfig");
const fs = require("fs");
const Student = require("../models/Student");

const fileUploadController = async (req, res) => {
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

    // Update the Student model to add the uploaded file details
    const studentId = req.params.studentId;
    // Find the student by ID and update the 'files' property
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      {
        $push: {
          files: {
            public_id: result.public_id,
            url: result.secure_url,
            filename: req.file.originalname,
            uploadedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "File uploaded and student updated successfully",
      file: {
        url: result.secure_url,
        public_id: result.public_id,
      },
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to upload file to Cloudinary and update student",
      details: error,
    });
  }
};

module.exports = fileUploadController;
