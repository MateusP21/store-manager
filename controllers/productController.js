const {
  validateBodyAdd,
  validateParamsId,
} = require('../services/productService');
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

  async editProduct(req, res) {
    const { id } = await validateParamsId(req.params);
    await productService.checkIfExists(id);
    const data = await validateBodyAdd(req.body);
    await productService.edit(id, data);
    const item = await productService.getById(id);
    return res.status(200).json(item);
  },

  async deleteProduct(req, res) {
    const { id } = await validateParamsId(req.params);
    await productService.checkIfExists(id);
    await productService.delete(id);
    return res.sendStatus(204);
  },

  async getById(req, res) {
    const { id } = await validateParamsId(req.params);
    await productService.checkIfExists(id);
    const products = await productService.getById(id);
    return res.status(200).json(products);
  },

  async searchProduct(req, res) {
    const { q } = req.query;
    const [products] = await productService.search(q);
    return res.status(200).json(products);
  },
};

module.exports = productController;
