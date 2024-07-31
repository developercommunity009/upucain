const express = require('express');
const router = express.Router();
const companyController = require('../controller/companyController');
const userController = require("../controller/userController");

router.post('/', userController.admin, companyController.createCompany);
router.get('/',   companyController.getAllCompanies);
router.get('/:id',userController.admin ,  companyController.getCompanyById);
router.put('/:id', userController.admin, companyController.updateCompany);
router.delete('/:id', userController.admin ,   companyController.deleteCompany);

module.exports = router;
