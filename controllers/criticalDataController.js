const HealthData = require("../models/criticalData.js");

const criticalDataController = {
  createHealthData: async (req, res)=>{
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
  }
}

module.exports = criticalDataController;