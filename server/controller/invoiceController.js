const Invoice = require('../Model/invoiceModel');
const Shipment = require('../Model/shipmentModel');
const User = require('../Model/userModel');
const { emitSocketEvent } = require('../socket');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { trackingId, companyId, shipmentId, fee, status } = req.body;

    const newInvoice = new Invoice({
      trackingId,
      companyId,
      shipmentId,
      fee,
      status,
    });

    const invoice = await newInvoice.save();
    res.status(201).json({ message: 'Invoice created successfully', invoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'An error occurred while creating the invoice' });
  }
};

// Read all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('companyId shipmentId');
    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'An error occurred while fetching invoices' });
  }
};

// Read a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id).populate('companyId shipmentId');
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ error: 'An error occurred while fetching the invoice' });
  }
};

// Read a single invoice by ID
exports.getInvoiceByIdAndInProgress = async (req, res) => {
  try {
    console.log(req.user.id);
    // Populate the shipmentId to access the createdBy field
    const invoices = await Invoice.find({ status: 'In Progress' }).populate({
      path: 'shipmentId',
      match: { createdBy: req.user.id } // Match the createdBy field in the populated shipmentId
    });

    // Filter out invoices where the populated shipmentId is null (no match found)
    const filteredInvoices = invoices.filter(invoice => invoice.shipmentId !== null);

    if (!filteredInvoices.length) {
      return res.status(404).json({ error: 'No invoices found' });
    }

    res.status(200).json(filteredInvoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'An error occurred while fetching the invoices' });
  }
};

// Update an invoice by ID
exports.updateInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const invoice = await Invoice.findByIdAndUpdate(id, updates, { new: true });
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice updated successfully', invoice });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'An error occurred while updating the invoice' });
  }
};

// Update an invoice to Pay
exports.updateInvoiceToPay = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the invoice by ID
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }

    // Update the status to "Paid"
    invoice.status = 'Paid';
    await invoice.save();

    res.status(200).json({ success: `pay amount ${invoice.fee} Successfully`, invoice });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'An error occurred while updating the invoice status' });
  }
};

// Delete an invoice by ID
exports.deleteInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByIdAndDelete(id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'An error occurred while deleting the invoice' });
  }
};


exports.requestPaymentNotification = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    // Find the invoice using invoiceId
    const invoice = await Invoice.findById(invoiceId).populate('shipmentId');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    // Find the shipment using shipmentId in the invoice
    const shipment = await Shipment.findById(invoice.shipmentId).populate('createdBy');
    if (!shipment) {
      return res.status(404).json({ message: 'Shipment not found' });
    }

    if (shipment) {
      emitSocketEvent(
        req,
        shipment.createdBy?._id.toString(),
        "payment-request",
        invoice
      );
    }

    // Update the status of the invoice to 'In Progress'
    invoice.status = 'In Progress';
    await invoice.save();

    res.status(200).json({ success: 'Notification sent to the company' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};