const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dosage: {
    type: Number,
    required: true,
    min: 1,
  },
  timing: {
    NB: { type: String, default: "" },
    MA: { type: String, default: "" },
    AB: { type: String, default: "" },
    AA: { type: String, default: "" },
    NT: { type: String, default: "" },
    NA: { type: String, default: "" },
  },
  strengthAndForm: {
    type: String, // Changed from array to single string
    required: true,
  },
});

const PrescriptionSchema = new mongoose.Schema({
  studentEmail: {
    type: String,
    required: true,
  },
  rollNumber: {
    type: String,
    required: true,
    unique: false,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  tests: [
    {
      type: String,
    },
  ],
  medicines: [MedicineSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);

module.exports = Prescription;
