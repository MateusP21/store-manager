const { NotFoundError } = require('../errors');
const productModel = require('../models/productModel');

const productService = {
  async getAll() {
    const products = await productModel.getAllProducts();
    return products;
  },

  async getById(id) {
    const products = await productModel.getProductById(id);
    return products;
  },

  async checkIfExists(id) {
    const [[exists]] = await productModel.exists(id);

    if (!exists) throw new NotFoundError('Product not found');
  },
};

module.exports = productService;
