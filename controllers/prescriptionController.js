const Prescription = require("../models/prescription.js");
const validator = require("validator");

const prescriptionController = {
  // Controller to add a prescription
  addPrescription: async (req, res) => {
    console.log("Received request to add a prescription");
    const { studentEmail, rollNumber, diagnosis, tests, medicines } = req.body;

    // Validate input
    if (!studentEmail || !validator.isEmail(studentEmail)) {
      return res.status(400).json({ error: "Invalid student email" });
    }

    if (!rollNumber) {
      return res.status(400).json({ error: "Roll number is required" });
    }

    if (!diagnosis) {
      return res.status(400).json({ error: "Diagnosis is required" });
    }

    if (medicines && !Array.isArray(medicines)) {
      return res.status(400).json({ error: "Medicines must be an array" });
    }

    try {
      // Create a new prescription
      const newPrescription = new Prescription({
        studentEmail,
        rollNumber,
        diagnosis,
        tests,
        medicines,
      });

      // Save the prescription to the database
      const savedPrescription = await newPrescription.save();
      return res.status(201).json(savedPrescription);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error adding prescription", error });
    }
  },

  // Controller to get prescriptions by email
  getPrescriptionsByEmail: async (req, res) => {
    const { email } = req.params;

    // Validate email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    try {
      const prescriptions = await Prescription.find({ studentEmail: email });
      return res.status(200).json(prescriptions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching prescriptions", error });
    }
  },

  // Controller to get prescriptions by roll number
  getPrescriptionsByRollNumber: async (req, res) => {
    const { rollNumber } = req.params;
    const { startDate, endDate } = req.query;

    // Validate roll number
    if (!rollNumber) {
      return res.status(400).json({ error: "Roll number is required" });
    }

    // Validate dates
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start and end dates are required" });
    }

    try {
      // Convert query parameters to Date objects
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);

      // Use a regular expression to find all roll numbers that match the given partial roll number
      const prescriptions = await Prescription.find({
        rollNumber: { $regex: new RegExp(rollNumber, "i") },
        createdAt: {
          $gte: startDateTime,
          $lte: endDateTime,
        },
      }).sort({ createdAt: -1 }); // Sort by creation date in descending order

      return res.status(200).json(prescriptions);
    } catch (error) {
      console.error("Error fetching prescriptions:", error);
      return res.status(500).json({ message: "Error fetching prescriptions" });
    }
  },

  // Controller to get prescriptions for a specific student on a specific day
  getPrescriptionByDate: async (req, res) => {
    const { identifier, date } = req.query; // identifier can be email or roll number

    // Validate identifier
    if (
      !identifier ||
      (!validator.isEmail(identifier) && !validator.isNumeric(identifier))
    ) {
      return res
        .status(400)
        .json({
          error: "Invalid identifier. It must be an email or roll number.",
        });
    }

    // Validate date
    if (!date || !validator.isISO8601(date)) {
      return res
        .status(400)
        .json({
          error: "Invalid date format. It must be a valid ISO8601 date.",
        });
    }

    try {
      const dateObj = new Date(date);
      const startDate = new Date(dateObj.setHours(0, 0, 0, 0));
      const endDate = new Date(dateObj.setHours(23, 59, 59, 999));

      const prescriptions = await Prescription.find({
        $or: [
          {
            studentEmail: identifier,
            createdAt: { $gte: startDate, $lt: endDate },
          },
          {
            rollNumber: identifier,
            createdAt: { $gte: startDate, $lt: endDate },
          },
        ],
      });

      return res.status(200).json(prescriptions);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching prescriptions", error });
    }
  },
};

module.exports = prescriptionController;
