const { Router } = require('express');
const saleController = require('../controllers/saleController');

const saleRoutes = Router();
saleRoutes.get('/', saleController.getAll);
saleRoutes.post('/', saleController.addSale);
saleRoutes.get('/:id', saleController.getById);
saleRoutes.delete('/:id', saleController.deleteSale);

module.exports = saleRoutes;
