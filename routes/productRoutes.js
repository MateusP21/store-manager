const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoutes = Router();

productRoutes.get('/', productController.get);

module.exports = productRoutes;
