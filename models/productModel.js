const db = require('./db');

const productModel = {
  async add(name) {
    const query = `
    INSERT INTO StoreManager.products (name) VALUES(?)
    `;
    const [{ insertId }] = await db.query(query, [name]);
    return insertId;
  },

  async edit(id, name) {
    const query = `
    UPDATE 
      StoreManager.products 
    SET
      name = ?
    WHERE 
      id = ?
    `;

    const product = await db.query(query, [name, id]);
    return product;
  },

  async delete(id) {
    const query = `
    DELETE FROM StoreManager.products WHERE id = ?`;
    await db.query(query, [id]);
  },

  async getAllProducts() {
    const query = `
    SELECT *
    FROM StoreManager.products`;
    const list = await db.query(query);
    return list;
  },

  async getProductById(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await db.query(query, [id]);

    return product;
  },

  async exists(id) {
    const query = 'SELECT 1 FROM StoreManager.products WHERE id = ?';
    const [[item]] = await db.query(query, [id]);
    const bool = Boolean(item);
    return bool;
  },
};

module.exports = productModel;
