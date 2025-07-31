const express = require("express");
const router = express.Router();
const { getKPIs } = require("../controllers/dashboardController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/kpi", verifyToken, getKPIs);

module.exports = router;
