const cloudinary = require("../config/cloudinaryConfig");
const Student = require("../models/Student");
const canUploadStatuses = require("../others/canUploadStatuses");

const fileUploadController = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Check student status first
    const statusResult = await Student.findById(req.params.studentId).select(
      "status"
    );

    if (!statusResult) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (canUploadStatuses.includes(statusResult.status)) {
      return res.status(403).json({
        error: "File upload not allowed for this status!",
      });
    }

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "project-01", access_mode: "public" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({
              error: "Failed to upload file to Cloudinary",
              details: error,
            });
        }

        // Update the Student model to add the uploaded file details
        const studentId = req.params.studentId;
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
      }
    );

    // Convert the buffer to a stream and pipe it to Cloudinary uploader
    const streamifier = require("streamifier");
    const bufferStream = streamifier.createReadStream(req.file.buffer);
    bufferStream.pipe(result);
  } catch (error) {
    res.status(500).json({
      error: "Failed to upload file to Cloudinary and update student",
      details: error,
    });
  }
};

module.exports = fileUploadController;
