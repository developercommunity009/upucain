const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  companyName: { type: String , required : true },
  shipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipment', required: true },
  fee: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
