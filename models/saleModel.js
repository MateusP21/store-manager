const db = require('./db');

const saleModel = {
  async add(body) {
    const [{ insertId }] = await db.query(
      'INSERT INTO StoreManager.sales (date) VALUES(now())',
    );
    await Promise.all(
      body.map(async ({ productId, quantity }) => {
        const query = `INSERT INTO StoreManager.sales_products
        (sale_id,product_id,quantity) VALUES(?,?,?)`;
        await db.query(query, [insertId, productId, quantity]);
      }),
    );

    return insertId;
  },

  async getAllSales() {
    const query = `
    SELECT *
    FROM StoreManager.sales_products`;
    const list = await db.query(query);
    return list;
  },

  async getSaleById(id) {
    const soldProducts = `
      SELECT product_id,quantity,sale_id FROM sales_products WHERE sale_id = ?`;
    const [result] = await db.query(soldProducts, [id]);
    return result;
  },
};

module.exports = saleModel;
