const mysql = require('mysql');

const connection = mysql.createConnection({
     host : 'localhost',
     user: 'root',
     password: 'Simeon2017!',
     database: 'homer'
});
module.exports = connection;
