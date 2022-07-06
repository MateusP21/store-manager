const { validateBodyAdd } = require('../services/saleService');
const productService = require('../services/productService');
const saleService = require('../services/saleService');
const { validateParamsId } = require('../services/productService');

const saleController = {
  async getAll(_req, res) {
    const sales = await saleService.getAll();
    return res.status(200).json(sales);
  },

  async getById(req, res) {
    const id = Number(req.params.id);
    await saleService.checkSale(id);
    const sales = await saleService.getById(id);
    const result = sales.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    }));
    return res.status(200).json(result);
  },

  async addSale(req, res) {
    const data = await validateBodyAdd(req.body);
    await Promise.all(
      req.body.map(async ({ productId }) => {
        await productService.checkIfExists(productId);
      }),
    );

    const id = await saleService.add(data);
    const item = await saleService.getById(id);
    const result = {
      id,
      itemsSold: item.map(({ product_id: productId, quantity }) => ({
        productId,
        quantity,
      })),
    };
    return res.status(201).json(result);
  },

  async deleteSale(req, res) {
    const { id } = await validateParamsId(req.params);
    await saleService.checkSale(id);
    await saleService.delete(id);
    return res.sendStatus(204);
  },

  async editSale(req, res) {
    const { id } = await validateParamsId(req.params);
    await saleService.checkSale(id);
    const data = await validateBodyAdd(req.body);
    await Promise.all(
      req.body.map(async ({ productId }) => {
        await productService.checkIfExists(productId);
      }),
    );

    await saleService.edit(id, data);
    const item = await saleService.getById(id);
    const result = {
      saleId: id,
      itemsUpdated: item.map(({ product_id: productId, quantity }) => ({
        productId,
        quantity,
      })),
    };
    return res.status(200).json(result);
  },
};

module.exports = saleController;
