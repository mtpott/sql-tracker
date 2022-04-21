const mysql = require('mysql2');

//connect to the correct database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'employee'
    }
);

module.exports = db;