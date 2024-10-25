const HealthData = require("../models/criticalData.js");

const criticalDataController = {
  createHealthData: async (req, res) => {
    try {
      const { email, deviceData } = req.body;

      if (!email || !deviceData) {
        return res
          .status(400)
          .json({ error: "email and deviceData are required" });
      }

      const healthData = new HealthData({ email, deviceData });
      await healthData.save();

      res
        .status(201)
        .json({ message: "Health data saved successfully", data: healthData });
    } catch (error) {
      res.status(500).json({ error: "Failed to save health data" });
    }
  },
  getHealthDataByStudent: async (req, res) => {
    const { email } = req.params;
    if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      try {
        const data = await HealthData.find({ studentId });

        if (!data.length) {
          return res
            .status(404)
            .json({ message: "No health data found for this student." });
        }

        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: "Error fetching health data", error });
      }
  },
  getCriticalHealthData: async (req, res) => {
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

      if (!criticalData.length) {
        return res
          .status(404)
          .json({ message: "No critical health data found." });
      }

      res.status(200).json(criticalData);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching critical health data", error });
    }
  },
};

module.exports = criticalDataController;
