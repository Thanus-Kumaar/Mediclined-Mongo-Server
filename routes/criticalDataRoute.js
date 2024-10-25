const express = require("express");
const criticalDataController = require("../controllers/criticalDataController.js");

const router = express.Router();

router.post("/critical", criticalDataController.createHealthData);

router.get('/critical/:email', healthDataController.getHealthDataByStudent);

router.get('/critical', healthDataController.getCriticalHealthData);

module.exports = router;
