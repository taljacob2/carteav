const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand')
const mysql = require("mysql2");

// Configure environment variables.
dotenvExpand.expand(dotenv.config())

const connection = mysql.createPool({
    host: process.env.MYSQLDB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    port: process.env.MYSQLDB_PORT
});

function executeAsync(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
};