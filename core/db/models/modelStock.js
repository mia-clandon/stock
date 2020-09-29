const pool = require('../pool');
function getStockCreate(body, callback){
    const bind = [];
    for (prop in body){
        bind.push(body[prop])
    }
    let sql = `INSERT INTO stock_parts(printer,part,current_amount,type,amount,date) values (?,?,?,?,?,?)`;
    pool.query(sql, bind, function (err, result) {
        if(err) throw err;
        callback(result.insertId);
    })
}
module.exports = {getStockCreate};
