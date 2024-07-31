const mongoose = require('mongoose');

const trackingSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, ref: 'Shipment' },
  seqNo: { type: Number, required: true },
  dateTime: { type: Date, required: true },
  actionBy: { type: String, required: true },
  actionByCompany: { type: String, required: true },
  actionPerformed: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  creator:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Tracking', trackingSchema);
