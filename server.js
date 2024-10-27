const express = require("express");
const cors = require("cors");
const connectDB = require("./database/config.js");
const healthDataRoutes = require("./routes/criticalDataRoute.js");
const prescriptionRoutes = require("./routes/prescriptionRoute.js");
require("dotenv").config();

const app = express();
app.use(cors());
// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", healthDataRoutes);
app.use("/api", prescriptionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
