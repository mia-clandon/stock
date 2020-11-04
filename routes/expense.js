const express = require('express');
const router = express.Router();
const pool = require('../core/db/pool');
const {getStockCreate} = require('../core/db/models/modelStock');


router.get('/', function (req, res, next) {
    const query = "select * from parts";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('expense', {title:"Расход запчастей", data: ''})
        } else {
            res.render('expense', {title:"Расход запчастей", data: rows})
        }
    })
});
router.post('/expense-part', function (req, res, next) {
    const data = [req.body.name];
    let result_total;
    const typeOperation = "Расход";
    const query = "select current_amount from stock_parts where printer = (?) and id in (select max(id) from stock_parts)";
    pool.query(query, data, function (err, rows) {
        if (err) {
            throw err;
        }
        const lastAmountPart = rows[0].current_amount;
            if (lastAmountPart > 0) {
                result_total = parseInt(lastAmountPart) - parseInt(req.body.amount);
                const stockInput = {
                    printer: req.body.name,
                    part: req.body.part,
                    current_amount: result_total,
                    type: typeOperation,
                    amount: req.body.amount,
                    date: req.body.date
                };
                getStockCreate(stockInput, function (lastId) {
                    if (lastId) {
                        res.render('index', {messageSuccess: "Успешно добавлено"});
                    } else {
                        res.render('index', {message: "Что-то пошло не так"});
                    }
                });
        } else {
            res.render('index', {message: "Нельзя израсходовать больше, чем имеется на складе"})
        }
    });
});
module.exports = router;
