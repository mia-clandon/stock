const express = require('express');
const router = express.Router();
const pool = require('../../core/db/pool');
const {getCreatePartPrinter} = require('../../core/db/models/modelPartPrinter');

router.get('/', function (req, res, next) {
    res.render('parts/add-new-parts', {title: "Добавление новых запчастей"})
});
router.post('/add-new-part', function (req, res, next) {
    const partInput = {
        serial_id: req.body.serial_id,
        title_rus: req.body.title_rus,
        title_latin: req.body.title_latin,
        printer: req.body.name
    };
    getCreatePartPrinter(partInput, function (lastId) {
        if (lastId) {
            res.render('index');
        } else {
            console.log("Что-то пошло не так");
        }
    });
});

module.exports = router;
