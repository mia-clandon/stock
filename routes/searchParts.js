const express = require('express');
const router = express.Router();
const pool = require('../core/db/pool');
const {getStockCreate} = require('../core/db/models/modelStock');


router.get('/', function (req, res, next) {
    const query = "select * from parts, stock_parts";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('searchParts', {title:"Поиск запчастей", data: ''})
        } else {
            res.render('searchParts', {title:"Поиск запчастей", data: rows})
        }
    })
});
router.post('/searchParts', async (req, res, next) => {
    const data = [[req.body.name], [req.body.part]];
    const query = "select parts.serial_id ,parts.title_rus, parts.title_latin,stock_parts.current_amount, stock_parts.printer from stock_parts, parts where stock_parts.printer = ? and stock_parts.part = ? order by stock_parts.id desc limit 1";

    await pool.query(query, data, function (err, rows) {
        if(err) throw err;

        if(rows.length){
            res.render('searchParts', {title:"Поиск запчастей", data: rows})
            console.log(rows)
        } else {
            res.render('searchParts', {title:"Поиск запчастей", data: ''})
        }
    })
});
module.exports = router;
