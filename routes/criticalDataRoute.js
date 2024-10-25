const express = require("express");
const criticalDataController = require("../controllers/criticalDataController.js");

const router = express.Router();

router.post("/criticalData", criticalDataController.createHealthData);

module.exports = router;
