const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');
router.get('/', async (req, res, next) => {
    // const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.id in (select max(stock_parts.id) from stock_parts where parts.title_rus = stock_parts.part)";
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.id in (select max(stock_parts.id) from stock_parts where parts.title_rus = stock_parts.part and stock_parts.printer='Шарик')";

    await pool.query(query, function (err, rows) {
        if(err){
            res.render('parts/printers', {title: "Распределение запчастей по принтерам", data: ''})
        } else {
            res.render('parts/printers', {title: "Распределение запчастей по принтерам", data: rows})
        }
    })
});
router.post('/searchPartsOfPrinters', async (req, res, next) => {
    const data = [req.body.name];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.id in (select max(stock_parts.id) from stock_parts where parts.title_rus = stock_parts.part and stock_parts.printer=?)";

    await pool.query(query, data, function (err, rows) {
        if(err) throw err;

        if(rows.length){
            res.render('parts/printers', {title: "Распределение запчастей по принтерам", data: rows});
            console.log(rows)
        } else {
            res.render('parts/printers', {title: "Распределение запчастей по принтерам", data: ''})
        }

    })
})
module.exports = router;
