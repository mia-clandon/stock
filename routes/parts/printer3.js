const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');
router.get('/', function (req, res, next) {
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts, stock_parts where stock_parts.printer='Китайцы' and stock_parts.id in (select max(stock_parts.id) from stock_parts)";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('parts/printer3', {title: "Запчасти для принтера Китайцы", data: ''})
        } else {
            res.render('parts/printer3', {title: "Запчасти для принтера Китайцы", data: rows})
        }
    })
});

module.exports = router;
