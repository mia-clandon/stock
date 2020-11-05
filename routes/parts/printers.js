const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');
const excel = require('exceljs');
router.get('/', async (req, res, next) => {
    // const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.id in (select max(stock_parts.id) from stock_parts where parts.title_rus = stock_parts.part)";
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.date in (select max(stock_parts.date) from stock_parts where parts.title_rus = stock_parts.part)";

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
});

router.post('/excel', async (req, res, next) => {
    const data = [req.body.nameforexcel];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.id in (select max(stock_parts.id) from stock_parts where parts.title_rus = stock_parts.part and stock_parts.printer= ?)";
    const message = "Файл выгружен";

    pool.query(query,data, function (err, customers, fields) {
        const jsonCustomers = JSON.parse(JSON.stringify(customers));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Customers');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 30},
            {header: 'Название на латыни', key: 'title_latin', width: 50},
            {header: 'Принтер', key: 'printer', width: 50},
            {header: 'Текущее количество', key: 'current_amount', width: 50},
        ];

        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile("customer.xlsx")
            .then(function () {
                console.log('file saved');
            })

    });


    res.render('index', {messageSuccess: message});

});
module.exports = router;
