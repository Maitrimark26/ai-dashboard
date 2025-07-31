const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const { uploadCSV } = require("../controllers/uploadController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, upload.single("file"), uploadCSV);

module.exports = router;
