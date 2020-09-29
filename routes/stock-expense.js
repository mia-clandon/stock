const express = require('express');
const router = express.Router();
const pool = require('../core/db/pool');

router.get('/', function (req, res, next) {
    const query = "select * from stock_parts where type='Расход'";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('stock-expense', {title: "История расходов", data: ''})
        } else {
            res.render('stock-expense', {title: "История расходов", data: rows})
        }
    })
});

module.exports = router;
