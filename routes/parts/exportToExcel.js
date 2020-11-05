const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');
const excel = require('exceljs');
router.get('/',  (req, res, next) => {
    res.render('parts/exportToExcel', {title: "Выгрузка отчетов", data: ''})
});

router.post('/excel', async (req, res, next) => {
    const data = [req.body.nameforexcel];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.current_amount from parts,stock_parts where parts.title_rus = stock_parts.part  and stock_parts.id in (select max(stock_parts.id) from stock_parts where parts.title_rus = stock_parts.part and stock_parts.printer= ?)";
    const message = "Файл выгружен";

    await pool.query(query, data, function (err, customers, fields) {
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
        workbook.xlsx.writeFile("reports/customer.xlsx")
            .then(function () {
                console.log('file saved');
            })
        res.render('index', {messageSuccess: message});
    });

});
router.post('/excelAll', async (req, res, next) => {
    const data = [req.body.nameforexcelall];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.type, stock_parts.amount, stock_parts.date, stock_parts.current_amount from parts,stock_parts where stock_parts.printer=?";
    const message = "Файл выгружен";

    await pool.query(query, data, function (err, parts, fields) {
        const jsonCustomers = JSON.parse(JSON.stringify(parts));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Parts');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 20},
            {header: 'Название на латыни', key: 'title_latin', width: 20},
            {header: 'Тип', key: 'type', width: 10},
            {header: 'Количество', key: 'amount', width: 20},
            {header: 'Дата', key: 'date', width: 20},
            {header: 'Принтер', key: 'printer', width: 20},
            {header: 'Текущее количество', key: 'current_amount', width: 20},
        ];
        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile("reports/parts/parts.xlsx")
            .then(function () {
                console.log('file saved');
            });
        res.render('index', {messageSuccess: message});

    });

});
router.post('/excelAllMonth', async (req, res, next) => {
    const data = [req.body.nameforexcelallmonth];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.type, stock_parts.amount, stock_parts.date, stock_parts.current_amount from parts,stock_parts where stock_parts.printer=? and stock_parts.date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)";
    const message = "Файл выгружен";

    await pool.query(query, data, function (err, parts, fields) {
        const jsonCustomers = JSON.parse(JSON.stringify(parts));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Parts');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 20},
            {header: 'Название на латыни', key: 'title_latin', width: 20},
            {header: 'Тип', key: 'type', width: 10},
            {header: 'Количество', key: 'amount', width: 20},
            {header: 'Дата', key: 'date', width: 20},
            {header: 'Принтер', key: 'printer', width: 20},
            {header: 'Текущее количество', key: 'current_amount', width: 20},
        ];
        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile("reports/parts/parts.xlsx")
            .then(function () {
                console.log('file saved');
            });
        res.render('index', {messageSuccess: message});

    });

});

router.post('/excelAllExpense', async (req, res, next) => {
    const data = [req.body.nameforexcelallexpense];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.type, stock_parts.amount, stock_parts.date, stock_parts.current_amount from parts,stock_parts where stock_parts.type='Расход' and stock_parts.printer = ? ";
    const message = "Файл выгружен";

    await pool.query(query, data, function (err, parts, fields) {
        console.log(parts)
        const jsonCustomers = JSON.parse(JSON.stringify(parts));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Parts');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 20},
            {header: 'Название на латыни', key: 'title_latin', width: 20},
            {header: 'Тип', key: 'type', width: 10},
            {header: 'Количество', key: 'amount', width: 20},
            {header: 'Дата', key: 'date', width: 20},
            {header: 'Принтер', key: 'printer', width: 20},
            {header: 'Текущее количество', key: 'current_amount', width: 20},
        ];
        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile("reports/parts/expense/parts.xlsx")
            .then(function () {
                console.log('file saved');
            });
        res.render('index', {messageSuccess: message});

    });

});
router.post('/excelAllAdd', async (req, res, next) => {
    const data = [req.body.nameforexcelalladd];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.type, stock_parts.amount, stock_parts.date, stock_parts.current_amount from parts,stock_parts where stock_parts.type='Приход' and stock_parts.printer = ?";
    const message = "Файл выгружен";

    await pool.query(query, data, function (err, parts, fields) {
        console.log(parts)
        const jsonCustomers = JSON.parse(JSON.stringify(parts));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Parts');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 20},
            {header: 'Название на латыни', key: 'title_latin', width: 20},
            {header: 'Тип', key: 'type', width: 10},
            {header: 'Количество', key: 'amount', width: 20},
            {header: 'Дата', key: 'date', width: 20},
            {header: 'Принтер', key: 'printer', width: 20},
            {header: 'Текущее количество', key: 'current_amount', width: 20},
        ];
        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile("reports/parts/add/parts.xlsx")
            .then(function () {
                console.log('file saved');
            });
        res.render('index', {messageSuccess: message});

    });

});
router.post('/excelAllExpenseMonth', async (req, res, next) => {
    const data = [req.body.nameforexcelallexpense];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.type, stock_parts.amount, stock_parts.date, stock_parts.current_amount from parts,stock_parts where stock_parts.type='Расход' and stock_parts.printer = ? and stock_parts.date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)";
    const message = "Файл выгружен";

    await pool.query(query, data, function (err, parts, fields) {
        console.log(parts)
        const jsonCustomers = JSON.parse(JSON.stringify(parts));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Parts');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 20},
            {header: 'Название на латыни', key: 'title_latin', width: 20},
            {header: 'Тип', key: 'type', width: 10},
            {header: 'Количество', key: 'amount', width: 20},
            {header: 'Дата', key: 'date', width: 20},
            {header: 'Принтер', key: 'printer', width: 20},
            {header: 'Текущее количество', key: 'current_amount', width: 20},
        ];
        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile("reports/parts/expense/parts.xlsx")
            .then(function () {
                console.log('file saved');
            });
        res.render('index', {messageSuccess: message});

    });

});
router.post('/excelAllAddMonth', async (req, res, next) => {
    const data = [req.body.nameforexcelalladd];
    const query = "select parts.serial_id, parts.title_rus, parts.title_latin, stock_parts.printer, stock_parts.type, stock_parts.amount, stock_parts.date, stock_parts.current_amount from parts,stock_parts where stock_parts.type='Приход' and stock_parts.printer = ? and stock_parts.date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)";
    const message = "Файл выгружен";
    let now = new Date();

    await pool.query(query, data, function (err, parts, fields) {
        console.log(parts)
        const jsonCustomers = JSON.parse(JSON.stringify(parts));
        console.log(jsonCustomers);
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Parts');

        worksheet.columns = [
            {header: 'Серийный номер', key: 'serial_id', width: 10},
            {header: 'Название на русском', key: 'title_rus', width: 20},
            {header: 'Название на латыни', key: 'title_latin', width: 20},
            {header: 'Тип', key: 'type', width: 10},
            {header: 'Количество', key: 'amount', width: 20},
            {header: 'Дата', key: 'date', width: 20},
            {header: 'Принтер', key: 'printer', width: 20},
            {header: 'Текущее количество', key: 'current_amount', width: 20},
        ];
        let path = "reports/parts/addMonth/Приход за месяц для принтера " + data + " год " + now.getFullYear() + " месяц " + now.getMonth() + " день" + now.getDay() + ".xlsx";
        worksheet.addRows(jsonCustomers);
        workbook.xlsx.writeFile(path)
            .then(function () {
                console.log('file saved');
            });
        console.log(path);
        res.render('index', {messageSuccess: message});

    });

});
module.exports = router;
