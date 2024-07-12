// multerConfig.js
const multer = require("multer");

// Configure storage for multer to use memory storage
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

module.exports = upload;
