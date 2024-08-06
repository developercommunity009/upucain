const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoiceController'); // Adjust the path as needed
const userController = require("../controller/userController");
// Create a new invoice
router.post('/', invoiceController.createInvoice);
// Route to request payment notification
router.post('/request-payment', userController.admin , invoiceController.requestPaymentNotification);

// Get all invoices
router.get('/', invoiceController.getAllInvoices);

// Get  invoices  by userID  and status In Progress
router.get('/inprogress', userController.protect  , invoiceController.getInvoiceByIdAndInProgress);
// Get a single invoice by ID
router.get('/:id', invoiceController.getInvoiceById);


// Update an invoice by ID
router.put('/:id', userController.admin ,  invoiceController.updateInvoiceById);

// Update an invoice by ID
router.put('/pay/:id', userController.protect ,  invoiceController.updateInvoiceToPay);

// Delete an invoice by ID
router.delete('/:id', invoiceController.deleteInvoiceById);

module.exports = router;
