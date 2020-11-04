const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');
router.get('/', function (req, res, next) {
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts, stock_parts where parts.title_rus=stock_parts.part and stock_parts.id in (select max(stock_parts.id) from stock_parts)";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('parts/printers', {title: "Распределение запчастей по принтерам", data: ''})
        } else {
            res.render('parts/printers', {title: "Распределение запчастей по принтерам", data: rows})
        }
    })
});
router.get('/printer1', function (req, res, next) {
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts, stock_parts where parts.title_rus=stock_parts.part, parts.title_rus='Шарик'and stock_parts.id in (select max(stock_parts.id) from stock_parts)";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('parts/printer1', {title: "Распределение запчастей по принтерам", data: ''})
        } else {
            res.render('parts/printer1', {title: "Распределение запчастей по принтерам", data: rows})
        }
    })
});

module.exports = router;
