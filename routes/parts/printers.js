const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');

router.get('/', function (req, res, next) {
    res.render('parts/printers', {title: "Распределение запчастей по принтерам"})
});

module.exports = router;
