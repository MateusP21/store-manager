const productService = require('../services/productService');

const productController = {
  async getAll(_req, res) {
    const [products] = await productService.getAll();
    return res.status(200).json(products);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    await productService.checkIfExists(id);
    const [[products]] = await productService.getById(id);
    console.log(products);
    return res.status(200).json(products);
  },
};

module.exports = productController;
