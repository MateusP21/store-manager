const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'db',
  user: 'root',
  port: '3306',
  password: 'password',
});

module.exports = db;
