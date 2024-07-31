const express = require('express');
const router = express.Router();
const shipmentController = require('../controller/shipmentController'); // Adjust the path as needed
const userController = require("../controller/userController");
// Create a new shipment, tracking record, and invoice
router.post('/', userController.protect , shipmentController.createShipment);

// Get all shipments
router.get('/', shipmentController.getAllShipments);

// Get a single shipment by ID
router.get('/:id', userController.protect , shipmentController.getShipmentById);

// Get All shipments by ID
router.get('/companyshipments/:id', userController.protect , shipmentController.getAllShipmentsById);

// Update a shipment by ID
router.put('/:id',userController.protect, shipmentController.updateShipmentById);

// Delete a shipment by ID
router.delete('/:id', userController.protect,  shipmentController.deleteShipmentById);

module.exports = router;
