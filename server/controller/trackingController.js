const Tracking = require('../Model/trackingModel');

// Create a new tracking record
exports.createTracking = async (req, res) => {
  try {
    const {
      trackingId,
      seqNo,
      dateTime,
      actionBy,
      actionByCompany,
      actionPerformed,
      city,
      country,
    } = req.body;

    const newTracking = new Tracking({
      trackingId,
      seqNo,
      dateTime,
      actionBy,
      actionByCompany,
      actionPerformed,
      city,
      country,
    });

    const tracking = await newTracking.save();
    res.status(201).json({ message: 'Tracking record created successfully', tracking });
  } catch (error) {
    console.error('Error creating tracking record:', error);
    res.status(500).json({ error: 'An error occurred while creating the tracking record' });
  }
};

// Read all tracking records
exports.getAllTrackings = async (req, res) => {
  try {
    const trackings = await Tracking.find();
    res.status(200).json(trackings);
  } catch (error) {
    console.error('Error fetching tracking records:', error);
    res.status(500).json({ error: 'An error occurred while fetching tracking records' });
  }
};

// Read a single tracking record by ID
exports.getTrackingById = async (req, res) => {
  try {
    const { id } = req.params;
    const tracking = await Tracking.findOne({trackingId:id});
    if (!tracking) {
      return res.status(404).json({ error: 'Tracking record not found' });
    }
    res.status(200).json(tracking);
  } catch (error) {
    console.error('Error fetching tracking record:', error);
    res.status(500).json({ error: 'An error occurred while fetching the tracking record' });
  }
};
exports.getTrackingByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const tracking = await Tracking.find({ creator: id });
    if (!tracking || tracking.length === 0) {
      return res.status(404).json({ error: 'Tracking record not found' });
    }
    res.status(200).json(tracking);
  } catch (error) {
    console.error('Error fetching tracking record:', error);
    res.status(500).json({ error: 'An error occurred while fetching the tracking record' });
  }
};

// Update a tracking record by ID
exports.updateTrackingById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const tracking = await Tracking.findByIdAndUpdate(id, updates, { new: true });
    if (!tracking) {
      return res.status(404).json({ error: 'Tracking record not found' });
    }
    res.status(200).json({ success: 'record updated', tracking });
  } catch (error) {
    console.error('Error updating tracking record:', error);
    res.status(500).json({ error: 'An error occurred while updating the tracking record' });
  }
};

// Delete a tracking record by ID
exports.deleteTrackingById = async (req, res) => {
  try {
    const { id } = req.params;
    const tracking = await Tracking.findByIdAndDelete(id);
    if (!tracking) {
      return res.status(404).json({ error: 'Tracking record not found' });
    }
    res.status(200).json({ message: 'Tracking record deleted successfully' });
  } catch (error) {
    console.error('Error deleting tracking record:', error);
    res.status(500).json({ error: 'An error occurred while deleting the tracking record' });
  }
};
