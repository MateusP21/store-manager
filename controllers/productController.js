const productService = require('../services/productService');

const productController = {
  async getAll(_req, res) {
    const [products] = await productService.getAll();
    return res.status(200).json(products);
  },
};

module.exports = productController;
