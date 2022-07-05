const { validateBodyAdd } = require('../services/saleService');
const productService = require('../services/productService');
const saleService = require('../services/saleService');

const saleController = {
  async getAll(_req, res) {
    const [products] = await productService.getAll();
    return res.status(200).json(products);
  },

  async addSale(req, res) {
    const data = await validateBodyAdd(req.body);
    await Promise.all(
      req.body.map(async ({ productId }) => {
        console.log(productId);
        await productService.checkIfExists(productId);
      }),
    );

    const id = await saleService.add(data);
    const item = await saleService.getById(id);

    return res.status(201).json({
      id,
      itemsSold: item.map(({ product_id: productId, quantity }) => ({
        productId,
        quantity,
      })),
    });
  },
};

module.exports = saleController;
