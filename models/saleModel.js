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

  async edit(id, data) {
    await Promise.all(
      data.map(async ({ productId, quantity }) => {
        const query = `
        UPDATE 
          StoreManager.sales_products 
        SET
          product_id = ?,
          quantity = ?
        WHERE 
          sale_id = ? AND product_id = ?
        `;
        await db.query(query, [productId, quantity, id, productId]);
      }),
    );
  },

  async getAllSales() {
    const query = `
    SELECT 
      sale_id,
      date,
      product_id,
      quantity
    FROM StoreManager.sales_products
    INNER JOIN StoreManager.sales ON StoreManager.sales.id = StoreManager.sales_products.sale_id
    ORDER BY sales_products.sale_id ,sales_products.product_id`;
    const [list] = await db.query(query);
    return list;
  },

  async getSaleById(id) {
    const soldProducts = `
      SELECT date,product_id,quantity
      FROM StoreManager.sales_products
      INNER JOIN StoreManager.sales ON StoreManager.sales.id = StoreManager.sales_products.sale_id
      WHERE sales.id = ?`;
    const [result] = await db.query(soldProducts, [id]);
    return result;
  },

  async delete(id) {
    const query = `
    DELETE FROM StoreManager.sales WHERE id = ?`;
    await db.query(query, [id]);
  },

  async exists(id) {
    const query = 'SELECT 1 FROM StoreManager.sales WHERE id = ?';
    const [[item]] = await db.query(query, [id]);
    const bool = Boolean(item);
    return bool;
  },
};

module.exports = saleModel;
