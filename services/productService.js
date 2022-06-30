const productModel = require('../models/productModel');

const productService = {
  async getAll() {
    const products = await productModel.getAllProducts();
    return products;
  },

  async getProduct(id) {
    const products = await productModel.getProductById(id);
    return products;
  },
};

module.exports = productService;
