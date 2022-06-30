const db = require('./db');

const productModel = {
  async getAllProducts() {
    const listAllProducts = 'SELECT * FROM StoreManager.products';
    const list = await db.query(listAllProducts);
    return list;
  },

  async getProductById(id) {
    const productQuery = 'SELECT * FROM StorageManager.products WHERE id = ?';
    const product = await db.query(productQuery, [id]);
    return product;
  },
};

module.exports = productModel;
