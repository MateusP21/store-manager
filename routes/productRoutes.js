const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoutes = Router();

productRoutes.get('/', productController.getAll);
productRoutes.get('/:id', productController.getById);

productRoutes.post('/', productController.addProduct);

module.exports = productRoutes;
