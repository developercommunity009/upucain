const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyEmail: { type: String, required: true, unique: true },
  shipmentPrice: { type: Number, required: true },
  country: { type: String, required: true },
  countryState: { type: String, required: true },
  location: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
