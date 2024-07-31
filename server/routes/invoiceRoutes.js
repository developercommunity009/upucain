const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoiceController'); // Adjust the path as needed
const userController = require("../controller/userController");
// Create a new invoice
router.post('/', invoiceController.createInvoice);

// Get all invoices
router.get('/', invoiceController.getAllInvoices);

// Get a single invoice by ID
router.get('/:id', invoiceController.getInvoiceById);

// Update an invoice by ID
router.put('/:id', invoiceController.updateInvoiceById);

// Delete an invoice by ID
router.delete('/:id', invoiceController.deleteInvoiceById);

module.exports = router;
