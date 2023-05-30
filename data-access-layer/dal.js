const mysql = require("mysql2");

const connection = mysql.createPool({
    host: process.env.MYSQLDB_HOST || config.mysql.host,
    user: process.env.MYSQLDB_USER || config.mysql.user,
    password: process.env.MYSQLDB_ROOT_PASSWORD || config.mysql.password,
    database: config.mysql.database
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