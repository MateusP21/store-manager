const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRoutes = Router();
saleRoutes.get('/', saleController.getAll);
saleRoutes.get('/:id', saleController.getById);
saleRoutes.post('/', saleController.addSale);

module.exports = saleRoutes;
