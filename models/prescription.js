const mongoose = require('mongoose');

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
    MN: { type: String, default: "" },
    AF: { type: String, default: "" },
    NT: { type: String, default: "" },
  },
  strengthAndForm: {
    type: String,
    required: true,
  },
});

const PrescriptionSchema = new mongoose.Schema({
  studentEmail: {
    type: String,
    required: true,
    match: /.+\@.+\..+/
  },
  rollNumber: {
    type: String,
    required: true,
    unique: true,
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

const Prescription = mongoose.model('Prescription', PrescriptionSchema);

module.exports = Prescription;
