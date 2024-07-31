const express = require('express');
const router = express.Router();
const trackingController = require('../controller/trackingController'); // Adjust the path as needed
const userController = require("../controller/userController");
// Create a new tracking record
router.post('/', trackingController.createTracking);

// Get all tracking records
router.get('/', trackingController.getAllTrackings);

// Get a single tracking record by ID
router.get('/:id', trackingController.getTrackingById);

// Get All tracking record by UserID
router.get('/creator/:id', trackingController.getTrackingByUserId);

// Update a tracking record by ID
router.put('/:id', userController.protect , trackingController.updateTrackingById);

// Delete a tracking record by ID
router.delete('/:id', trackingController.deleteTrackingById);

module.exports = router;
