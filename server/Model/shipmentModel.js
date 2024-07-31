const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  serviceType: { type: String, required: true },
  shipmentContent: { type: String, required: true },
  shipmentValue: { type: Number, required: true },
  shipmentWeight: { type: String, required: true },
  collectedAmount: { type: Number, required: true },
  senderDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  receiverDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  trackingId: { type: String, required: true, unique: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
