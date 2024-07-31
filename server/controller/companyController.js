const Company = require('../Model/companyModel');

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json({ success: 'Company created successfully', company });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({success: 'Company created successfully', result:companies});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ success: 'Company not found' });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const company = await Company.findByIdAndUpdate(id, updates, { new: true });
    if (!company) {
      return res.status(404).json({ success: 'Company not found' });
    }
    res.status(200).json({ success: 'Company updated successfully', company });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) {
      return res.status(404).json({ success: 'Company not found' });
    }
    res.status(200).json({ success: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
