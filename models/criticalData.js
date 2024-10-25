const mongoose = require("mongoose");
const { transformKeys, toCamelCase } = require("../utils/requestFormatter.js");

const healthDataSchema = new mongoose.Schema({
  email: { type: String, required: true },
  deviceData: { type: mongoose.Schema.Types.Mixed, required: true },
  timestamp: { type: Date, default: Date.now },
});

healthDataSchema.pre("save", function (next) {
  if (this.deviceData) {
    this.deviceData = transformKeys(this.deviceData, toCamelCase);
  }
  next();
});

const HealthData = mongoose.model("HealthData", healthDataSchema);
module.exports = HealthData;
