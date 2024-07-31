const Shipment = require('../Model/shipmentModel');
const Tracking = require('../Model/trackingModel');
const Invoice = require('../Model/invoiceModel');
const Company = require('../Model/companyModel');
const { generateNumericId } = require('../Utils/generateNumericId');
const mongoose = require('mongoose');


// Create a new shipment
exports.createShipment = async (req, res) => {
  try {
    const {
      companyName,
      serviceType,
      shipmentContent,
      shipmentValue,
      shipmentWeight,
      collectedAmount,
      senderDetails,
      receiverDetails,
    } = req.body;

     
    const company = await Company.findOne({ companyName });
      
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    if (req.user.role === "admin") {
      return res.status(404).json({ error: 'admin cannot create Shipment' });
    }

  
    const newShipment = new Shipment({
      companyName,
      serviceType,
      shipmentContent,
      shipmentValue,
      shipmentWeight,
      collectedAmount,
      senderDetails,
      receiverDetails,
      trackingId: generateNumericId(10), // Ensure tracking ID is generated
      createdBy:req.user.id
    });
    const shipment = await newShipment.save();
    // Create a tracking record for the shipment
    const newTracking = new Tracking({
      trackingId: shipment.trackingId,
      seqNo: 1,
      dateTime: new Date(),
      actionBy: senderDetails.name,
      actionByCompany: companyName,
      actionPerformed: 'Shipment Created',
      city: senderDetails.city,
      country: senderDetails.country,
      creator:req.user._id
    });
    const tracking = await newTracking.save();
    // Calculate the fee (20% of the collected amount)
    const feePercentage = 20;
    const fee = collectedAmount * (feePercentage / 100);
    // Create an invoice for the shipment
    const newInvoice = new Invoice({
      trackingId: shipment.trackingId,
      companyName,
      shipmentId: shipment._id,
      fee: fee,
    });
    const invoice = await newInvoice.save();
    res.status(201).json({
      success: 'Shipment created',
      shipment,
      tracking,
      invoice,
    });
  } catch (error) {
    console.error('Error creating shipment, tracking record, or invoice:', error);
    res.status(500).json({ error: 'An error occurred while creating the shipment, tracking record, or invoice' });
  }
};



// Read all shipments
exports.getAllShipments = async (req, res) => {
    try {
      const shipments = await Shipment.find();
      res.status(200).json(shipments);
    } catch (error) {
      console.error('Error fetching shipments:', error);
      res.status(500).json({ error: 'An error occurred while fetching shipments' });
    }
  };
  
  // Read a single shipment by ID
  exports.getShipmentById = async (req, res) => {
    try {
      const { id } = req.params;
      const shipment = await Shipment.findById(id);
      if (!shipment) {
        return res.status(404).json({ error: 'Shipment not found' });
      }
      res.status(200).json(shipment);
    } catch (error) {
      console.error('Error fetching shipment:', error);
      res.status(500).json({ error: 'An error occurred while fetching the shipment' });
    }
  };

    // Read All shipments by ID
    exports.getAllShipmentsById = async (req, res) => {
      try {
        const { id } = req.params;
        if (req.user.id !== id) {
          return res.status(405).json({ error: 'not relevant data' });
        }
        // Find all shipments created by the given user ID
        const shipments = await Shipment.find({ createdBy: id });
    
        if (!shipments || shipments.length === 0) {
          return res.status(404).json({ error: 'No shipments found for this user' });
        }
    
        res.status(200).json(shipments);
      } catch (error) {
        console.error('Error fetching shipments:', error);
        res.status(500).json({ error: 'An error occurred while fetching the shipments' });
      }
    };
  
  // Update a shipment by ID
  exports.updateShipmentById = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      // Validate the ID format if necessary
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid shipment ID' });
      }
  
      const shipment = await Shipment.findById(id);
      if (!shipment) {
        return res.status(404).json({ error: 'Shipment not found' });
      }
  
      // Check if the user is authorized to update this shipment
      if (req.user.id !== shipment.createdBy.toString()) {
        return res.status(403).json({ error: 'You are not authorized to update this shipment' });
      }
  
      // Track changes to collectedAmount
      let collectedAmountChanged = false;
      if (updates.collectedAmount && updates.collectedAmount !== shipment.collectedAmount) {
        collectedAmountChanged = true;
      }
  
      // Update the shipment
      Object.assign(shipment, updates);
      const updatedShipment = await shipment.save();
  
      // If collectedAmount changed, update the invoice
      let updatedInvoice;
      if (collectedAmountChanged) {
        const feePercentage = 20;
        const newFee = updatedShipment.collectedAmount * (feePercentage / 100);
  
        updatedInvoice = await Invoice.findOneAndUpdate(
          { trackingId: updatedShipment.trackingId },
          { fee: newFee },
          { new: true }
        );
      }
  
      // Update the existing tracking record
      const updatedTracking = await Tracking.findOneAndUpdate(
        { trackingId: updatedShipment.trackingId },
        {
          seqNo: await Tracking.countDocuments({ trackingId: updatedShipment.trackingId }),
          dateTime: new Date(),
          actionBy: updatedShipment.senderDetails.name,
          actionByCompany: updatedShipment.companyName,
          actionPerformed: 'Shipment Updated',
          city: updatedShipment.senderDetails.city,
          country: updatedShipment.senderDetails.country,
        },
        { new: true }
      );
  
      res.status(200).json({
        success: 'Shipment updated successfully',
        updatedShipment,
        updatedInvoice,
        updatedTracking,
      });
    } catch (error) {
      console.error('Error updating shipment:', error);
      res.status(500).json({ error: 'An error occurred while updating the shipment' });
    }
  };
  
  // Delete a shipment by ID
  exports.deleteShipmentById = async (req, res) => {
    try {
      const { id } = req.params;
      const shipment = await Shipment.findByIdAndDelete(id);
      if (!shipment) {
        return res.status(404).json({ error: 'Shipment not found' });
      }
      res.status(200).json({ message: 'Shipment deleted successfully' });
    } catch (error) {
      console.error('Error deleting shipment:', error);
      res.status(500).json({ error: 'An error occurred while deleting the shipment' });
    }
  };


