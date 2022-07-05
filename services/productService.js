const Joi = require('joi');
const { NotFoundError } = require('../errors');
const productModel = require('../models/productModel');
const runSchema = require('../utils/validationSchema');

const productService = {
  validateBodyAdd: runSchema(
    Joi.object({
      name: Joi.string().min(5).required(),
    }),
  ),

  async getAll() {
    const products = await productModel.getAllProducts();
    return products;
  },

  async getById(id) {
    const products = await productModel.getProductById(id);
    return products;
  },

  async add({ name }) {
    const product = await productModel.add(name);
    return product;
  },

  async checkIfExists(id) {
    const exists = await productModel.exists(id);
    if (!exists) throw new NotFoundError('Product not found');
  },
};

module.exports = productService;
