const transformIncomingData = (req, res, next) => {
  if (req.body.medicines && Array.isArray(req.body.medicines)) {
    req.body.medicines.forEach(medicine => {
      medicine.dosage = parseInt(medicine.dosage); // Convert dosage to number
      medicine.strengthAndForm = [medicine.strengthAndForm]; // Wrap strengthAndForm in an array
    });
  }
  next();
};

module.exports = transformIncomingData
