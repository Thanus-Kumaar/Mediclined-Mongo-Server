const express = require("express");
const prescriptionController = require("../controllers/prescriptionController.js");

const router = express.Router();

router.post("/prescription", prescriptionController.addPrescription);

router.get(
  "/prescription/email/:email",
  prescriptionController.getPrescriptionsByEmail
);

router.get(
  "/prescription/rollNo/:rollNumber",
  prescriptionController.getPrescriptionsByRollNumber
);

router.get("/prescription", prescriptionController.getPrescriptionByDate);

module.exports = router;
