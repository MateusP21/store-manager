const Joi = require('joi');
const { NotFoundError } = require('../errors');
const saleModel = require('../models/saleModel');
const runSchema = require('../utils/validationSchema');

const saleService = {
  validateBodyAdd: runSchema(
    Joi.array().items(
      Joi.object({
        productId: Joi.number()
          .required()
          .messages({ 'any.required': '"productId" is required' }),
        quantity: Joi.number().min(1).required().messages({
          'any.required': '"quantity" is required',
          'number.min': '"quantity" must be greater than or equal to 1',
        }),
      }),
    ),
  ),

  async getAll() {
    const sale = await saleModel.getAllSales();
    return sale;
  },

  async add(data) {
    const sale = await saleModel.add(data);
    return sale;
  },

  async getById(id) {
    const products = await saleModel.getSaleById(id);
    return products;
  },

  async checkSale(id) {
    const exists = await saleModel.exists(id);
    if (!exists) throw new NotFoundError('Sale not found');
  },
};

module.exports = saleService;
