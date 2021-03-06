const express = require('express');
const router = express.Router();
const pool = require('../core/db/pool');
router.get('/', function (req, res, next) {
    const query = "select * from stock_parts";
    pool.query(query, function (err, rows) {
        if(err){
            res.render('stock', {title: "История прихода/расхода", data: ''})
        } else {
            res.render('stock', {title: "История прихода/расхода", data: rows})
        }
    })
});

module.exports = router;
