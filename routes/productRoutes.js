const { Router } = require('express');
const productController = require('../controllers/productController');

const productRoutes = Router();

productRoutes.get('/', productController.getAll);
productRoutes.get('/search', productController.searchProduct);
productRoutes.get('/:id', productController.getById);

productRoutes.post('/', productController.addProduct);
productRoutes.put('/:id', productController.editProduct);
productRoutes.delete('/:id', productController.deleteProduct);

module.exports = productRoutes;
