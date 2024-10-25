const validator = require("validator");
const HealthData = require("../models/criticalData.js");

const criticalDataController = {
  createHealthData: async (req, res) => {
    console.log("Received request to create health data");
    try {
      const { email, deviceData } = req.body;

      // Validate input
      if (!email || !deviceData || !validator.isEmail(email)) {
        console.error("Validation failed: email or deviceData is missing or invalid");
        return res
          .status(400)
          .json({ error: "Email and deviceData are required and must be in proper format!" });
      }

      const healthData = new HealthData({ email, deviceData });
      await healthData.save();
      console.log("Health data saved successfully:");

      res.status(201).json({ message: "Health data saved successfully", data: healthData });
    } catch (error) {
      console.error("Error saving health data:", error);
      res.status(500).json({ error: "Failed to save health data" });
    }
  },

  getHealthDataByStudent: async (req, res) => {
    const { email } = req.params;
    console.log(`Received request to fetch health data for student with email: ${email}`);

    // Validate input
    if (!email || !validator.isEmail(email)) {
      console.error("Validation failed: email is missing or invalid");
      return res.status(400).json({ message: "Invalid email address." });
    }

    try {
      const data = await HealthData.find({ email: email });
      console.log(`Fetched health data for ${email}:`);

      if (!data.length) {
        console.warn(`No health data found for student: ${email}`);
        return res.status(404).json({ message: "No health data found for this student." });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching health data:", error);
      res.status(500).json({ message: "Error fetching health data", error });
    }
  },

  getCriticalHealthData: async (req, res) => {
    console.log("Received request to fetch critical health data");
    try {
      // Define critical thresholds (you can modify these based on your requirements)
      const criticalCriteria = {
        $or: [
          { "deviceData.heartRate": { $lt: 40, $gt: 120 } },
          { "deviceData.bloodPressure.systolic": { $gt: 180 } },
          { "deviceData.bloodPressure.diastolic": { $gt: 120 } },
          { "deviceData.oxygenLevel": { $lt: 85 } },
        ],
      };

      const criticalData = await HealthData.find(criticalCriteria);
      console.log("Fetched critical health data");

      if (!criticalData.length) {
        console.warn("No critical health data found.");
        return res.status(404).json({ message: "No critical health data found." });
      }

      res.status(200).json(criticalData);
    } catch (error) {
      console.error("Error fetching critical health data:", error);
      res.status(500).json({ message: "Error fetching critical health data", error });
    }
  },
};

module.exports = criticalDataController;
