const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '334416',
    database: 'todoApp',
    port: 3306,
})

module.exports = pool;