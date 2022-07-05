const { validateBodyAdd } = require('../services/productService');
const productService = require('../services/productService');

const productController = {
  async getAll(_req, res) {
    const [products] = await productService.getAll();
    return res.status(200).json(products);
  },

  async addProduct(req, res) {
    const data = await validateBodyAdd(req.body);
    const id = await productService.add(data);
    const item = await productService.getById(id);
    return res.status(201).json(item);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    await productService.checkIfExists(id);
    const products = await productService.getById(id);
    return res.status(200).json(products);
  },
};

module.exports = productController;
