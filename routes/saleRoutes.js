const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRoutes = Router();

saleRoutes.post('/', saleController.addSale);

module.exports = saleRoutes;
