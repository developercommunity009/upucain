const Invoice = require('../Model/invoiceModel');

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
