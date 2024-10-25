const express = require("express");
const connectDB = require("./database/config.js");
const healthDataRoutes = require("./routes/healthDataRoutes");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api", healthDataRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
