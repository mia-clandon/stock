const util = require('util');
const mysql = require('mysql');
const configDB = require('../config/config');
/**
 * Connection to the database.
 *  */
const pool = mysql.createPool({
    connectionLimit: 10,
    host: configDB.HOST,
    user: configDB.USER, // use your mysql username.
    password: configDB.PASSWORD, // user your mysql password.
    database: configDB.DB
});

pool.getConnection((err, connection) => {
    if(err)
        console.error("Something went wrong connecting to the database ...");

    if(connection)
        connection.release();
    console.log("Работает")
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
