// multerConfig.js
const multer = require("multer");
const path = require("path");

// Configure storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Append timestamp to the original file name
  },
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
