const express = require("express");
const criticalDataController = require("../controllers/criticalDataController.js");

const router = express.Router();

router.post("/critical", criticalDataController.createHealthData);

router.get('/critical/:email', criticalDataController.getHealthDataByStudent);

router.get('/critical', criticalDataController.getCriticalHealthData);

module.exports = router;
