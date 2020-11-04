let pool = require('../pool');

function getCreatePartPrinter(body, callback){
        let bind = [];
        for (prop in body) {
            bind.push(body[prop]);
        }
        let sql = `INSERT INTO parts(serial_id, title_rus, title_latin) VALUES (?, ?, ?)`;
        pool.query(sql, bind, function (err, result) {
            if (err) throw err;
            callback(result.insertId)
        });
};

module.exports = {getCreatePartPrinter};
